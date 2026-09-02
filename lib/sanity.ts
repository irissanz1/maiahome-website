import { createClient } from "@sanity/client";

// Lee contenido PUBLICADO (modo producción). Cambia a "drafts" solo para previsualizar borradores.
export const sanity = createClient({
  projectId: "6o3ro0a1",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  perspective: "published",
  token: process.env.SANITY_API_TOKEN,
});

// Construye URL de imagen del CDN de Sanity con tamaño/format.
export function img(url: string | undefined | null, w = 1200): string | null {
  if (!url) return null;
  return `${url}?w=${w}&auto=format&fit=max`;
}
