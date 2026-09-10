import { NextRequest } from "next/server";
import { getBySlug, getProperties } from "@/lib/data";
import { bedBreakdown, img, formatMoney } from "@/lib/format";

// Embed del bloque de la ficha + "Departamentos similares" para incrustar por <iframe>
// en la landing de Beds24 (Offer Summary). HTML autocontenido (sin chrome), con la
// misma capa de datos del sitio (lib/data), para que la landing "traiga 100% del sitio"
// y se auto-ajuste al mejorar el contenido. Bilingüe (?lang=es|en). Auto-alto por postMessage.

export const dynamic = "force-dynamic";

const AMEN_EN: Record<string, string> = {
  "Aire acondicionado": "Air conditioning", "Balcón": "Balcony", "Estacionamiento": "Parking",
  "Lavadora": "Washer", "Secadora": "Dryer", "Pet friendly": "Pet friendly", "Terraza": "Terrace",
  "Alberca": "Pool", "Gimnasio": "Gym", "Wifi": "Wifi", "WiFi": "Wifi", "Elevador": "Elevator",
  "Cocina equipada": "Equipped kitchen", "Vista panorámica": "Panoramic view", "Jacuzzi": "Hot tub",
  "Sauna": "Sauna", "Roof garden": "Roof garden", "Azotea": "Rooftop", "Calefacción": "Heating",
};

function esc(s: any): string {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const es = new URL(req.url).searchParams.get("lang") !== "en";

  const frameHeaders = {
    "content-type": "text/html; charset=utf-8",
    "content-security-policy": "frame-ancestors https://beds24.com https://*.beds24.com https://maiahome.mx 'self'",
    "cache-control": "public, max-age=300, s-maxage=300",
  };

  const p = await getBySlug(slug);
  if (!p) return new Response("<!doctype html><meta charset=utf-8><body></body>", { headers: frameHeaders });

  const t = es
    ? { hasta: "Hasta", huesp: "huéspedes", camas: "Camas:", ame: "Amenidades", sim: "Departamentos similares", simSub: "Otras opciones que también te pueden gustar.", ver: "Ver disponibilidad", desde: "desde", noche: "/ noche", enCamas: "en camas", enSofa: "en sofá cama", ciudad: "Ciudad de México", res: "reseñas" }
    : { hasta: "Up to", huesp: "guests", camas: "Beds:", ame: "Amenities", sim: "Similar apartments", simSub: "Other options you may also like.", ver: "Check availability", desde: "from", noche: "/ night", enCamas: "in beds", enSofa: "on sofa bed", ciudad: "Mexico City", res: "reviews" };

  const ciudad = p.pais === "MX" ? t.ciudad : "Houston, TX";
  const specs = es
    ? [p.tipo, p.recamaras != null ? `${p.recamaras} rec` : null, p.banos ? `${p.banos} baño${p.banos !== 1 ? "s" : ""}` : null].filter(Boolean).join(" · ")
    : [p.recamaras != null ? `${p.recamaras} bedroom${p.recamaras !== 1 ? "s" : ""}` : null, p.banos ? `${p.banos} bath${p.banos !== 1 ? "s" : ""}` : null].filter(Boolean).join(" · ");
  const sofa = p.capacidad != null && p.capacidadCamas != null ? p.capacidad - p.capacidadCamas : 0;
  const capMuted = p.capacidadCamas != null
    ? `· ${p.capacidadCamas} ${t.enCamas}${sofa > 0 ? ` + ${sofa} ${t.enSofa}` : ""}`
    : "";
  const beds = bedBreakdown(p as any, es ? "es" : "en");
  const headline = es ? p.headline.es : p.headline.en;
  const desc = (es ? p.descripcion.es : p.descripcion.en) || "";
  const bullets = desc.split("\n").map((l) => l.trim()).filter((l) => l.startsWith("•")).map((l) => l.replace(/^•\s*/, ""));
  const amen: string[] = (p.amenidades || []).map((a: string) => (es ? a : AMEN_EN[a] || a));

  // Departamentos similares (misma lógica que la ficha del sitio)
  const all = await getProperties();
  const similar = all
    .filter((x) => x.slug !== p.slug && x.pais === p.pais)
    .map((x) => ({ x, score: (x.zona === p.zona ? 0 : 3) + Math.abs((x.recamaras ?? 0) - (p.recamaras ?? 0)) }))
    .sort((a, b) => a.score - b.score || (b.x.rating ?? 0) - (a.x.rating ?? 0))
    .slice(0, 3)
    .map((s) => s.x);

  const simCard = (x: any) => {
    const hero = img(x.images?.[0], 800);
    const cardSpecs = [x.tipo, x.camas != null ? `${x.camas} ${x.camas === 1 ? (es ? "cama" : "bed") : es ? "camas" : "beds"}` : null, x.capacidad != null ? `${x.capacidad} ${t.huesp}` : null, x.banos ? `${x.banos} baño${x.banos !== 1 ? "s" : ""}` : null].filter(Boolean).join(" · ");
    const hl = es ? x.headline?.es : x.headline?.en;
    const price = x.precioDesde != null ? formatMoney(x.precioDesde, x.currency) : null;
    return `<a class="sc" href="https://maiahome.mx/depto/${esc(x.slug)}" target="_top">
      <div class="sc-img">${hero ? `<img src="${esc(hero)}" alt="${esc(x.nombre)}" loading="lazy">` : ""}<span class="sc-badge">${t.ver}</span></div>
      <div class="sc-body">
        <div class="sc-head"><h4>${esc(x.nombre)}</h4><span class="sc-zone">${esc(x.zonaNombre)}</span></div>
        <p class="sc-specs">${esc(cardSpecs)}</p>
        ${x.rating != null ? `<p class="sc-rate"><span class="star">★</span> <b>${x.rating.toFixed(1)}</b> <span class="muted">· ${x.reviewCount} ${t.res}</span></p>` : ""}
        ${hl ? `<p class="sc-desc">${esc(hl)}</p>` : ""}
        ${price ? `<p class="sc-price">${t.desde} <b>${esc(price)}</b> ${t.noche}</p>` : ""}
      </div></a>`;
  };

  const html = `<!doctype html><html lang="${es ? "es" : "en"}"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--y:#F9D316}
*{box-sizing:border-box}html,body{margin:0}
body{font-family:'Montserrat',system-ui,sans-serif;color:#525252;background:#fff;padding:2px 2px 12px;line-height:1.5}
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
.sim{margin:34px 0 0}
.sim h3{font-size:22px;font-weight:700;color:#171717;margin:0}
.sim .sub{margin:4px 0 0;color:#737373;font-size:14px}
.sim-row{display:flex;gap:16px;margin:16px 0 0;overflow-x:auto;padding-bottom:6px;-webkit-overflow-scrolling:touch}
.sc{flex:0 0 300px;max-width:300px;border:1px solid #ededed;border-radius:16px;overflow:hidden;text-decoration:none;color:inherit;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.04);display:block}
.sc-img{position:relative;height:180px;background:#f2f2f2}
.sc-img img{width:100%;height:100%;object-fit:cover;display:block}
.sc-badge{position:absolute;top:12px;left:12px;background:#fff;border-radius:999px;padding:6px 12px;font-size:12px;font-weight:600;color:#171717;box-shadow:0 1px 3px rgba(0,0,0,.12)}
.sc-body{padding:14px 16px 16px}
.sc-head{display:flex;justify-content:space-between;align-items:baseline;gap:8px}
.sc-head h4{margin:0;font-size:18px;font-weight:700;color:#171717}
.sc-zone{font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:.05em;color:#a3a3a3;white-space:nowrap}
.sc-specs{margin:6px 0 0;font-size:13px;color:#737373}
.sc-rate{margin:6px 0 0;font-size:13px;color:#525252}.sc-rate .star{color:#f59e0b}.sc-rate b{color:#262626}.sc-rate .muted{color:#a3a3a3}
.sc-desc{margin:8px 0 0;font-size:13px;color:#737373;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.sc-price{margin:12px 0 0;font-size:13px;color:#737373}.sc-price b{color:#171717;font-size:16px}
</style></head><body>
${p.zonaNombre ? `<p class="eyebrow">${esc(p.zonaNombre)} · ${esc(ciudad)}</p>` : ""}
${specs ? `<p class="specs">${esc(specs)}</p>` : ""}
${p.capacidad != null ? `<div class="cap"><span aria-hidden="true">👥</span><span>${t.hasta} <b>${p.capacidad} ${t.huesp}</b></span>${capMuted ? `<span class="m">${esc(capMuted)}</span>` : ""}</div>` : ""}
${beds ? `<p class="beds"><span aria-hidden="true">🛌</span> <b>${t.camas}</b> ${esc(beds)}</p>` : ""}
${headline ? `<p class="headline">${esc(headline)}</p>` : ""}
${bullets.length ? `<ul class="d">${bullets.map((b) => `<li><span>${esc(b)}</span></li>`).join("")}</ul>` : ""}
${amen.length ? `<p class="at">${t.ame}</p><ul class="a">${amen.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>` : ""}
${similar.length ? `<section class="sim"><h3>${t.sim}</h3><p class="sub">${t.simSub}</p><div class="sim-row">${similar.map(simCard).join("")}</div></section>` : ""}
<script>
(function(){
function ph(){try{var w=document.documentElement.clientWidth||0;if(w<240)return;var h=Math.ceil(document.body.scrollHeight);if(h>0&&h<6000)parent.postMessage({type:'maia-embed-h',h:h},'*')}catch(e){}}
if(document.fonts&&document.fonts.ready){document.fonts.ready.then(ph)}
window.addEventListener('load',ph);window.addEventListener('resize',ph);
[400,1200,2500].forEach(function(t){setTimeout(ph,t)});
if(window.ResizeObserver){new ResizeObserver(ph).observe(document.body)}})();
</script>
</body></html>`;

  return new Response(html, { headers: frameHeaders });
}
