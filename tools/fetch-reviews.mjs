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

const base44 = JSON.parse(await readFile(join(__dirname, "..", "..", "maia-sanity", "seed-data", "base44-photos.json"), "utf8"));

const out = { generatedAt: new Date().toISOString(), byRoom: {}, featured: [] };
let withRating = 0;
for (const row of base44) {
  const rid = String(row.beds24RoomId);
  try {
    const d = await reviews({ mode: "property_by_slug", slug: row.slug, limit: 8, language: "es" });
    const rating = d.averageRating ?? d.reportedAverageRating ?? d.summary?.overallRating ?? null;
    const count = d.totalReviews ?? d.reportedReviewCount ?? d.publishedReviewCount ?? 0;
    out.byRoom[rid] = {
      rating: rating ? Math.round(rating * 10) / 10 : null,
      count: count || 0,
      reviews: (d.reviews || []).map(mapReview).filter((r) => r.text),
    };
    if (rating) withRating++;
    console.log(`  ${row.slug} (${rid}): ${rating ?? "-"}★ · ${count} · ${(d.reviews || []).length} textos`);
  } catch (e) { console.error(`  ! ${rid}: ${e.message}`); }
}

try {
  const f = await reviews({ mode: "featured", limit: 9 });
  out.featured = (f.reviews || []).map((r) => ({ ...mapReview(r), property: r.propertyPublicTitle || "" }));
} catch (e) { console.error("featured:", e.message); }

await writeFile(join(__dirname, "..", "data", "reviews.json"), JSON.stringify(out, null, 2));
console.log(`\n✅ ${withRating} con rating · ${out.featured.length} destacadas · data/reviews.json`);
