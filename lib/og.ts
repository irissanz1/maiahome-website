import type { Metadata } from "next";

// URL del OG dinámico de marca (ver app/og/route.tsx). metadataBase la vuelve absoluta.
export function ogImageUrl(title: string, subtitle?: string): string {
  const p = new URLSearchParams({ title });
  if (subtitle) p.set("subtitle", subtitle);
  return `/og?${p.toString()}`;
}

// Fragmento de metadata para dar a una página su propio OG (Open Graph + Twitter).
// Se hace spread dentro del objeto `metadata` de la página; hereda el resto (type,
// siteName, locale) del layout.
export function ogMeta(title: string, subtitle?: string): Pick<Metadata, "openGraph" | "twitter"> {
  const url = ogImageUrl(title, subtitle);
  return {
    openGraph: { images: [{ url, width: 1200, height: 630, alt: title }] },
    twitter: { images: [url] },
  };
}
