import type { Lang } from "./i18n";

export interface BlogCategory {
  slug: string;
  label: string;
  labelEn: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { slug: "gastronomia", label: "Gastronomía", labelEn: "Food & drink" },
  { slug: "cultura", label: "Cultura y museos", labelEn: "Culture & museums" },
  { slug: "barrios", label: "Barrios y zonas", labelEn: "Neighborhoods" },
  { slug: "que-hacer", label: "Qué hacer", labelEn: "Things to do" },
  { slug: "compras", label: "Compras", labelEn: "Shopping" },
  { slug: "viajes", label: "Viajes y estancia", labelEn: "Travel & stay" },
];

export function categoryLabel(slug?: string | null, lang: Lang = "es"): string | null {
  if (!slug) return null;
  const c = BLOG_CATEGORIES.find((c) => c.slug === slug);
  if (!c) return null;
  return lang === "en" ? c.labelEn : c.label;
}
