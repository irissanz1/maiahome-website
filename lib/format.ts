import type { Currency } from "./types";

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
