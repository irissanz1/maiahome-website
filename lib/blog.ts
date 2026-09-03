export interface BlogCategory {
  slug: string;
  label: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { slug: "gastronomia", label: "Gastronomía" },
  { slug: "cultura", label: "Cultura y museos" },
  { slug: "barrios", label: "Barrios y zonas" },
  { slug: "que-hacer", label: "Qué hacer" },
  { slug: "compras", label: "Compras" },
  { slug: "viajes", label: "Viajes y estancia" },
];

export function categoryLabel(slug?: string | null): string | null {
  if (!slug) return null;
  return BLOG_CATEGORIES.find((c) => c.slug === slug)?.label ?? null;
}
