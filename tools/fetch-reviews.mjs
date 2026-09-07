/**
 * fetch-reviews.mjs — Trae calificaciones y reseñas publicadas desde la API pública de base44
 * y las guarda en data/reviews.json (empaquetado con la app). Cero dependencia en runtime.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = "https://book.maiahome.mx/api/apps/6977966e4d4826177c38cef7/functions";

async function reviews(body, attempt = 0) {
  const r = await fetch(`${BASE}/getPublishedAirbnbReviews`, {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body),
  });
  if (!r.ok) {
    if (attempt < 4) { await new Promise((s) => setTimeout(s, 2000 * (attempt + 1))); return reviews(body, attempt + 1); }
    throw new Error(`reviews ${r.status}`);
  }
  return r.json();
}

const mapReview = (r) => ({
  name: r.guestFirstName || "Huésped",
  text: r.translatedText || r.reviewText || "",
  rating: r.rating ?? null,
  date: r.reviewDate || (r.reviewMonth && r.reviewYear ? `${r.reviewMonth}/${r.reviewYear}` : ""),
  avatar: r.guestProfileImageUrl || null,
});

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";

// Total REAL de reseñas desde el listing público de Airbnb (JSON-LD aggregateRating).
// base44 capa en 50; Airbnb da el total verdadero (p.ej. Tamayo 151). Falla suave -> 0.
async function airbnbCount(listingId) {
  if (!listingId) return 0;
  try {
    const r = await fetch(`https://www.airbnb.com/rooms/${listingId}`, { headers: { "user-agent": UA } });
    if (!r.ok) return 0;
    const html = await r.text();
    // El primer "reviewCount":N del HTML es el del listing (JSON-LD/aggregateRating).
    const m = html.match(/"reviewCount":"?(\d+)"?/);
    return m ? parseInt(m[1], 10) : 0;
  } catch {
    return 0;
  }
}

const base44 = JSON.parse(await readFile(join(__dirname, "..", "..", "maia-sanity", "seed-data", "base44-photos.json"), "utf8"));

// Conteos previos: las reseñas solo crecen, así que nunca regresamos (max con lo anterior).
let prev = {};
try { prev = (JSON.parse(await readFile(join(__dirname, "..", "data", "reviews.json"), "utf8")).byRoom) || {}; } catch {}

const out = { generatedAt: new Date().toISOString(), byRoom: {}, featured: [] };
let withRating = 0;
for (const row of base44) {
  const rid = String(row.beds24RoomId);
  try {
    const d = await reviews({ mode: "property_by_slug", slug: row.slug, limit: 8, language: "es" });
    const rating = d.authorizedAverageRating ?? d.averageRating ?? d.reportedAverageRating ?? d.summary?.overallRating ?? null;
    // base44 (authorizedReviewCount) viene capado; el total real está en Airbnb.
    const base44Count = d.authorizedReviewCount ?? d.totalReviews ?? d.reportedReviewCount ?? d.publishedReviewCount ?? 0;
    const abnb = await airbnbCount(d.airbnbListingId);
    // Las reseñas solo crecen: total = max(Airbnb, base44, valor previo) -> nunca regresa.
    const count = Math.max(abnb || 0, base44Count || 0, prev[rid]?.count || 0);
    out.byRoom[rid] = {
      rating: rating ? Math.round(rating * 10) / 10 : null,
      count: count || 0,
      reviews: (d.reviews || []).map(mapReview).filter((r) => r.text),
    };
    if (rating) withRating++;
    console.log(`  ${row.slug} (${rid}): ${rating ?? "-"}★ · ${count} (abnb ${abnb}/base44 ${base44Count}) · ${(d.reviews || []).length} textos`);
  } catch (e) { console.error(`  ! ${rid}: ${e.message}`); }
}

try {
  const f = await reviews({ mode: "featured", limit: 9 });
  out.featured = (f.reviews || []).map((r) => ({ ...mapReview(r), property: r.propertyPublicTitle || "" }));
} catch (e) { console.error("featured:", e.message); }

await writeFile(join(__dirname, "..", "data", "reviews.json"), JSON.stringify(out, null, 2));
console.log(`\n✅ ${withRating} con rating · ${out.featured.length} destacadas · data/reviews.json`);
