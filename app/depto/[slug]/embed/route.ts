import { NextRequest } from "next/server";

// Embed del bloque de la ficha (headline + viñetas + capacidad + camas + amenidades)
// para incrustar por <iframe> en la landing de Beds24 (Offer Summary). Se sirve como
// HTML autocontenido (sin el chrome del sitio) para que la landing "traiga 100% del sitio"
// y se auto-ajuste cuando mejoramos el contenido en Sanity. Bilingüe con ?lang=es|en.

export const dynamic = "force-dynamic";

const PROJECT = "6o3ro0a1";
const AMEN_EN: Record<string, string> = {
  "Aire acondicionado": "Air conditioning", "Balcón": "Balcony", "Estacionamiento": "Parking",
  "Lavadora": "Washer", "Secadora": "Dryer", "Pet friendly": "Pet friendly", "Terraza": "Terrace",
  "Alberca": "Pool", "Gimnasio": "Gym", "Wifi": "Wifi", "WiFi": "Wifi", "Elevador": "Elevator",
  "Cocina equipada": "Equipped kitchen", "Vista panorámica": "Panoramic view", "Jacuzzi": "Hot tub",
  "Sauna": "Sauna", "Roof garden": "Roof garden", "Azotea": "Rooftop", "Calefacción": "Heating",
};

function esc(s: string): string {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function bedBreakdown(p: any, es: boolean): string | null {
  if (p.camas == null) return null;
  const n = (v: number | undefined, sing: string, plur: string) => (v && v > 0 ? `${v} ${v === 1 ? sing : plur}` : null);
  const tipos = [
    n(p.camasKing, "king", "king"),
    n(p.camasQueen, "queen", "queen"),
    n(p.camasDobles, es ? "doble" : "double", es ? "dobles" : "doubles"),
    n(p.camasIndividuales, es ? "individual" : "single", es ? "individuales" : "singles"),
  ].filter(Boolean);
  const parts = [`${p.camas} ${p.camas === 1 ? (es ? "cama" : "bed") : es ? "camas" : "beds"}`];
  if (tipos.length) parts.push(tipos.join(", "));
  const sofa = n(p.sofasCama, es ? "sofá cama" : "sofa bed", es ? "sofás cama" : "sofa beds");
  if (sofa) parts.push(sofa);
  return parts.join(" · ");
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const es = new URL(req.url).searchParams.get("lang") !== "en";

  const groq = `*[_type=="property" && slug.current=="${slug.replace(/[^a-z0-9-]/gi, "")}"][0]{nombre,tipo,recamaras,banos,capacidad,capacidadCamas,sofasCama,camas,camasKing,camasQueen,camasDobles,camasIndividuales,pais,amenidades,headlineEs,headlineEn,descripcionEs,descripcionEn,"zonaNombre":zona->nombre}`;
  let p: any = null;
  try {
    const r = await fetch(`https://${PROJECT}.apicdn.sanity.io/v2024-01-01/data/query/production?query=${encodeURIComponent(groq)}`, { cache: "no-store" });
    p = (await r.json())?.result;
  } catch {}

  const frameHeaders = {
    "content-type": "text/html; charset=utf-8",
    "content-security-policy": "frame-ancestors https://beds24.com https://*.beds24.com https://maiahome.mx 'self'",
    "cache-control": "public, max-age=300, s-maxage=300",
  };
  if (!p) return new Response("<!doctype html><meta charset=utf-8><body></body>", { headers: frameHeaders });

  const ciudad = p.pais === "MX" ? (es ? "Ciudad de México" : "Mexico City") : es ? "Houston, TX" : "Houston, TX";
  const eyebrow = `${p.zonaNombre || ""} · ${ciudad}`;
  const specs = es
    ? [p.tipo, p.recamaras != null ? `${p.recamaras} rec` : null, p.banos ? `${p.banos} baño${p.banos !== 1 ? "s" : ""}` : null].filter(Boolean).join(" · ")
    : [p.recamaras != null ? `${p.recamaras} bedroom${p.recamaras !== 1 ? "s" : ""}` : null, p.banos ? `${p.banos} bath${p.banos !== 1 ? "s" : ""}` : null].filter(Boolean).join(" · ");
  const sofa = p.capacidad != null && p.capacidadCamas != null ? p.capacidad - p.capacidadCamas : 0;
  const capMuted = p.capacidadCamas != null
    ? (es ? `· ${p.capacidadCamas} en camas${sofa > 0 ? ` + ${sofa} en sofá cama` : ""}` : `· ${p.capacidadCamas} in beds${sofa > 0 ? ` + ${sofa} on sofa bed` : ""}`)
    : "";
  const beds = bedBreakdown(p, es);
  const headline = es ? p.headlineEs : p.headlineEn;
  const desc = (es ? p.descripcionEs : p.descripcionEn) || "";
  const bullets = desc.split("\n").map((l: string) => l.trim()).filter((l: string) => l.startsWith("•")).map((l: string) => l.replace(/^•\s*/, ""));
  const amen: string[] = (p.amenidades || []).map((a: string) => (es ? a : AMEN_EN[a] || a));

  const html = `<!doctype html><html lang="${es ? "es" : "en"}"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--y:#F9D316}
*{box-sizing:border-box}
html,body{margin:0}
body{font-family:'Montserrat',system-ui,sans-serif;color:#525252;background:#fff;padding:2px 2px 10px;line-height:1.5}
.eyebrow{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.2em;color:#F9D316;margin:0}
.specs{margin:6px 0 0;color:#737373;font-size:14px}
.cap{margin:14px 0 0;display:inline-flex;flex-wrap:wrap;align-items:center;gap:0 8px;background:#fafafa;border-radius:10px;padding:8px 12px;font-size:14px;color:#404040}
.cap b{color:#171717}.cap .m{color:#737373}
.beds{margin:8px 0 0;font-size:14px;color:#525252}.beds b{color:#262626;font-weight:600}
.headline{margin:20px 0 0;font-size:18px;color:#404040}
ul.d{list-style:none;padding:0;margin:12px 0 0}
ul.d li{display:flex;gap:10px;margin:9px 0}
ul.d li::before{content:"";flex:0 0 auto;width:6px;height:6px;border-radius:50%;background:var(--y);margin-top:8px}
.at{margin:26px 0 0;font-size:20px;font-weight:600;color:#171717}
ul.a{list-style:none;padding:0;margin:14px 0 0;display:flex;flex-wrap:wrap;gap:8px}
ul.a li{border:1px solid #e5e5e5;background:#fafafa;border-radius:999px;padding:6px 14px;font-size:14px;color:#404040}
</style></head><body>
${eyebrow.trim() !== "·" ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ""}
${specs ? `<p class="specs">${esc(specs)}</p>` : ""}
${p.capacidad != null ? `<div class="cap"><span aria-hidden="true">👥</span><span>${es ? "Hasta" : "Up to"} <b>${p.capacidad} ${es ? "huéspedes" : "guests"}</b></span>${capMuted ? `<span class="m">${esc(capMuted)}</span>` : ""}</div>` : ""}
${beds ? `<p class="beds"><span aria-hidden="true">🛌</span> <b>${es ? "Camas:" : "Beds:"}</b> ${esc(beds)}</p>` : ""}
${headline ? `<p class="headline">${esc(headline)}</p>` : ""}
${bullets.length ? `<ul class="d">${bullets.map((b: string) => `<li><span>${esc(b)}</span></li>`).join("")}</ul>` : ""}
${amen.length ? `<p class="at">${es ? "Amenidades" : "Amenities"}</p><ul class="a">${amen.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>` : ""}
</body></html>`;

  return new Response(html, { headers: frameHeaders });
}
