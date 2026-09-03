import type { MetadataRoute } from "next";
import { getProperties, getBlogPosts } from "@/lib/data";
import { ZONAS } from "@/lib/market";
import { BLOG_CATEGORIES } from "@/lib/blog";

const BASE = "https://maiahome.mx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [catalog, posts] = await Promise.all([getProperties(), getBlogPosts()]);
  const staticPages = [
    "",
    "/departamentos",
    "/mensuales",
    "/corporativo",
    "/administramos-tu-depto",
    "/recorridos-departamentos",
    "/nosotros",
    "/formas-de-pago",
    "/facturacion",
    // /check-in y /check-out: páginas operativas post-reserva → noindex, fuera del sitemap.
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

  const blog = [
    { url: `${BASE}/blog`, changeFrequency: "weekly" as const, priority: 0.6 },
    ...BLOG_CATEGORIES.map((c) => ({
      url: `${BASE}/blog/categoria/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];

  // Versión en inglés (/en, slugs traducidos). El blog se mantiene solo en español.
  const enStatic = [
    "/en",
    "/en/apartments",
    "/en/monthly-stays",
    "/en/corporate-housing",
    "/en/manage-your-apartment",
    "/en/virtual-tours",
    "/en/about",
    "/en/payment-options",
    "/en/invoicing",
  ].map((path) => ({ url: `${BASE}${path}`, changeFrequency: "weekly" as const, priority: path === "/en" ? 0.9 : 0.7 }));
  const enZonas = Object.keys(ZONAS).map((slug) => ({
    url: `${BASE}/en/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));
  const enDeptos = catalog.map((p) => ({
    url: `${BASE}/en/stay/${p.slug}`,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...legalPages, ...zonas, ...deptos, ...blog, ...enStatic, ...enZonas, ...enDeptos];
}
