// Cliente mínimo para un Redis REST (Vercel KV / Upstash) sin SDK.
// Si no hay credenciales configuradas, kvEnabled() = false y todo degrada a no-op:
// el sitio sigue funcionando solo con la cache base empaquetada.
//
// Env (cualquiera de los dos pares; Vercel KV pone KV_REST_API_*, Upstash pone UPSTASH_*):
//   KV_REST_API_URL / KV_REST_API_TOKEN
//   UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN

const URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export function kvEnabled(): boolean {
  return !!(URL && TOKEN);
}

/** Ejecuta un comando Redis (formato array, p.ej. ["HSET","k","f","v"]). Devuelve result o null. */
export async function kvCommand(cmd: (string | number)[]): Promise<unknown> {
  if (!kvEnabled()) return null;
  try {
    const res = await fetch(URL as string, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, "content-type": "application/json" },
      body: JSON.stringify(cmd),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json().catch(() => null)) as { result?: unknown } | null;
    return data?.result ?? null;
  } catch {
    return null;
  }
}
