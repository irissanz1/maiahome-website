import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    // /g/ = guías del huésped (privadas, post-reserva): nunca indexar.
    rules: { userAgent: "*", allow: "/", disallow: ["/g/", "/en/g/", "/registro-cliente", "/en/registration-complete"] },
    sitemap: "https://maiahome.mx/sitemap.xml",
  };
}
