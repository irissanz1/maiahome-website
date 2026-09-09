import type { Currency, Property } from "./types";

// Fragmento de JSON-LD con la calificación agregada + reseñas (para rich snippet
// de estrellas). Solo se emite si hay rating real y reseñas; el rating coincide
// con el que se muestra en la ficha (mismo redondeo a 1 decimal).
export function ratingJsonLd(p: Property): Record<string, unknown> {
  if (p.rating == null || !p.reviewCount) return {};
  const out: Record<string, unknown> = {
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: Number(p.rating.toFixed(1)),
      reviewCount: p.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
  const reviews = (p.reviews || [])
    .filter((rv) => rv.rating != null && rv.name)
    .slice(0, 5)
    .map((rv) => {
      const r: Record<string, unknown> = {
        "@type": "Review",
        author: { "@type": "Person", name: rv.name },
        reviewRating: { "@type": "Rating", ratingValue: rv.rating, bestRating: 5, worstRating: 1 },
      };
      if (rv.text) r.reviewBody = rv.text;
      if (rv.date && /\d{4}/.test(rv.date)) r.datePublished = rv.date;
      return r;
    });
  if (reviews.length) out.review = reviews;
  return out;
}

// Descripción en texto plano para datos estructurados (JSON-LD). Une el intro
// (headline) con las viñetas sin el marcador "•", en una sola frase legible.
export function plainDescription(headline: string, descripcion: string): string {
  const body = (descripcion || "")
    .split("\n")
    .map((l) => l.replace(/^•\s*/, "").trim())
    .filter(Boolean)
    .join(". ");
  return [headline?.trim(), body].filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}

// Desglose de camas para la página de detalle. Devuelve p.ej.:
// ES: "5 camas · 1 king, 4 individuales · 1 sofá cama" | EN: "5 beds · 1 king, 4 singles · 1 sofa bed"
// Regresa null si no hay dato de camas.
export function bedBreakdown(p: Property, lang: "es" | "en"): string | null {
  if (p.camas == null) return null;
  const es = lang === "es";
  const n = (v: number | undefined, sing: string, plur: string) =>
    v && v > 0 ? `${v} ${v === 1 ? sing : plur}` : null;
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

// URL de imagen del CDN de Sanity con tamaño/format.
export function img(url: string | undefined | null, w = 1200): string | null {
  if (!url) return null;
  return `${url}?w=${w}&auto=format&fit=max`;
}

// Alt text descriptivo para las fotos de una propiedad (SEO + accesibilidad).
// idx>0 agrega " — foto N" / " — photo N" para diferenciar las de la galería.
export function imageAlt(
  p: Pick<Property, "nombre" | "zonaNombre" | "pais">,
  lang: "es" | "en",
  idx = 0
): string {
  const city = p.pais === "MX" ? (lang === "en" ? "Mexico City" : "Ciudad de México") : "Houston";
  const loc = p.zonaNombre && p.zonaNombre !== city ? `${p.zonaNombre}, ${city}` : city;
  const base =
    lang === "en"
      ? `Furnished apartment ${p.nombre} in ${loc}`
      : `Departamento amueblado ${p.nombre} en ${loc}`;
  if (idx > 0) return `${base} — ${lang === "en" ? "photo" : "foto"} ${idx + 1}`;
  return base;
}

export function formatMoney(amount: number, currency: Currency): string {
  const locale = currency === "USD" ? "en-US" : "es-MX";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Placeholder de foto determinista por id (mientras llegan las fotos reales)
export function placeholderColors(seed: string): { c1: string; c2: string } {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
  const c1 = `hsl(${h}, 24%, 82%)`;
  const c2 = `hsl(${(h + 28) % 360}, 22%, 66%)`;
  return { c1, c2 };
}
