/**
 * Cliente Beds24 API v2 — auth por token + manejo de créditos.
 * Basado en el patrón del backend de base44 (beds24Client), sin la plataforma.
 *
 * El SECRETO se lee de variables de entorno; nunca se imprime ni se codifica aquí.
 *   BEDS24_LONG_LIFE_TOKEN  (preferido, estático ~3 meses)
 *   BEDS24_REFRESH_TOKEN    (fallback: se intercambia por un access token)
 */

const BASE = "https://api.beds24.com/v2";

let cachedToken = null;
let cachedTokenExp = 0;
// Cola secuencial: nunca lanzamos llamadas concurrentes a Beds24.
let queue = Promise.resolve();

function enqueue(fn) {
  queue = queue.then(fn, fn);
  return queue;
}

async function getToken() {
  const now = Date.now();
  if (cachedToken && now < cachedTokenExp - 60_000) return cachedToken;

  // 1) Long Life Token (estático)
  const longLife = process.env.BEDS24_LONG_LIFE_TOKEN;
  if (longLife && longLife.trim()) {
    cachedToken = longLife.trim();
    cachedTokenExp = now + 3600 * 1000;
    return cachedToken;
  }

  // 2) Refresh token flow
  const refreshToken = process.env.BEDS24_REFRESH_TOKEN;
  if (!refreshToken || !refreshToken.trim()) {
    throw new Error(
      "Falta credencial: define BEDS24_LONG_LIFE_TOKEN o BEDS24_REFRESH_TOKEN en .env"
    );
  }
  const res = await fetch(`${BASE}/authentication/token`, {
    method: "GET",
    headers: { accept: "application/json", refreshToken: refreshToken.trim() },
  });
  if (!res.ok) throw new Error(`Token refresh falló: ${res.status}`);
  const data = await res.json();
  cachedToken = data.token;
  cachedTokenExp = now + (data.expiresIn ?? 3600) * 1000;
  return cachedToken;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Llama a un endpoint de Beds24 v2. Respeta el límite de créditos (5 min):
 * reintenta ante 429 y hace una pausa proactiva solo cuando quedan muy pocos créditos.
 */
export function beds24Fetch(path, opts = {}) {
  return enqueue(() => doFetch(path, opts, 0));
}

async function doFetch(path, { method = "GET", body } = {}, attempt) {
  const token = await getToken();
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { accept: "application/json", token },
    body: body ? JSON.stringify(body) : undefined,
  });

  const remaining = res.headers.get("x-five-min-limit-remaining");
  const resetsIn = res.headers.get("x-five-min-limit-resets-in");
  const cost = res.headers.get("x-request-cost");
  console.log(
    `[beds24] ${method} ${path.split("?")[0]} | costo:${cost ?? "?"} restante:${remaining ?? "?"}`
  );

  // Reintento ante límite (429): esperar al reset y volver a intentar.
  if (res.status === 429 && attempt < 3) {
    const wait = ((Number(resetsIn) || 60) + 1) * 1000;
    console.warn(`[beds24] 429 — esperando ${Math.round(wait / 1000)}s y reintentando…`);
    await sleep(wait);
    return doFetch(path, { method, body }, attempt + 1);
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Beds24 error ${res.status}: ${text}`);
  }

  const data = await res.json();

  // Pausa proactiva solo si quedan muy pocos créditos (evita el 429 en la siguiente).
  if (remaining !== null && Number(remaining) <= 2 && resetsIn) {
    const wait = (Number(resetsIn) + 1) * 1000;
    console.warn(`[beds24] créditos casi agotados (${remaining}) — pausa ${Math.round(wait / 1000)}s…`);
    await sleep(wait);
  }

  return data;
}
