import type { Currency, Property } from "./types";

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
