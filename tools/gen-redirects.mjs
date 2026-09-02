/**
 * gen-redirects.mjs — Mapa de URLs viejas (base44) → nuevas, por beds24RoomId.
 * Viejo: /StayDetail?slug=<oldSlug>  →  Nuevo: /depto/<newSlug>
 * Escribe redirects.generated.json (lo lee next.config.mjs).
 */
import { createClient } from "@sanity/client";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const base44 = JSON.parse(
  await readFile(join(__dirname, "..", "..", "maia-sanity", "seed-data", "base44-photos.json"), "utf8")
);
const oldByRid = new Map(base44.map((p) => [String(p.beds24RoomId), p.slug]));

const sanity = createClient({
  projectId: "6o3ro0a1", dataset: "production", apiVersion: "2024-01-01",
  perspective: "drafts", useCdn: false, token: process.env.SANITY_API_TOKEN,
});
const docs = await sanity.fetch(`*[_type=="property" && defined(slug.current)]{beds24RoomId, "slug": slug.current}`);

const redirects = [];
for (const d of docs) {
  const oldSlug = oldByRid.get(String(d.beds24RoomId));
  if (oldSlug && oldSlug !== d.slug) {
    redirects.push({ old: oldSlug, new: d.slug });
  }
}

await writeFile(join(__dirname, "..", "redirects.generated.json"), JSON.stringify(redirects, null, 2));
console.log(`✓ ${redirects.length} redirects viejo→nuevo escritos en redirects.generated.json`);
redirects.slice(0, 6).forEach((r) => console.log(`  /StayDetail?slug=${r.old} → /depto/${r.new}`));
