import type { MetadataRoute } from "next";
import { getProperties } from "@/lib/data";
import { ZONAS } from "@/lib/market";

const BASE = "https://maiahome.mx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const catalog = await getProperties();
  const staticPages = [
    "",
    "/departamentos",
    "/mensuales",
    "/corporativo",
    "/administramos-tu-depto",
    "/recorridos-departamentos",
    "/nosotros",
    "/facturacion",
  ].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const legalPages = [
    "/aviso-privacidad",
    "/terminos-y-condiciones",
    "/terminos-uso",
    "/stay-agreement",
  ].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "yearly" as const,
    priority: 0.2,
  }));

  const zonas = Object.keys(ZONAS).map((slug) => ({
    url: `${BASE}/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const deptos = catalog.map((p) => ({
    url: `${BASE}/depto/${p.slug}`,
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...legalPages, ...zonas, ...deptos];
}
