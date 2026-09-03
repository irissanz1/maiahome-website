import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadPropertyRedirects() {
  try {
    const list = JSON.parse(readFileSync(join(__dirname, "redirects.generated.json"), "utf8"));
    return list.map((r) => ({
      source: "/StayDetail",
      has: [{ type: "query", key: "slug", value: r.old }],
      destination: `/depto/${r.new}`,
      permanent: true,
    }));
  } catch {
    return [];
  }
}

// Posts de blog migrados: /post/<viejo> → /blog/<nuevo>. El resto de /post/* → /blog.
function loadBlogRedirects() {
  try {
    const list = JSON.parse(readFileSync(join(__dirname, "blog-redirects.generated.json"), "utf8"));
    return list.map((r) => ({ source: `/post/${r.old}`, destination: `/blog/${r.new}`, permanent: true }));
  } catch {
    return [];
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Rutas viejas de base44 → nuevas.
      // OJO: Vercel matchea sin distinguir mayúsculas, así que NO se agregan
      // redirects cuya única diferencia sea el case (p.ej. /Nosotros→/nosotros,
      // /Facturacion→/facturacion) porque crean un loop de redirección infinito;
      // esas rutas ya resuelven solas por el match case-insensitive.
      { source: "/Stays", destination: "/departamentos", permanent: true },
      { source: "/Home", destination: "/", permanent: true },
      { source: "/CorporateHousing", destination: "/corporativo", permanent: true },
      // Rutas viejas del Wix (www.maiahome.mx) cuyo path CAMBIA de nombre.
      // Las que mantienen el mismo path (nosotros, administramos-tu-depto,
      // aviso-privacidad, terminos-uso, terminos-y-condiciones, stay-agreement,
      // facturacion, blog, departamentos, recorridos-departamentos) NO necesitan
      // redirect: resuelven solas.
      { source: "/tours-mexico-city", destination: "/recorridos-departamentos", permanent: true },
      { source: "/corporate-housing", destination: "/corporativo", permanent: true },
      { source: "/reserva-ahora", destination: "/departamentos", permanent: true },
      { source: "/descubre", destination: "/blog", permanent: true },
      { source: "/explora", destination: "/blog", permanent: true },
      { source: "/check-in", destination: "/", permanent: true },
      { source: "/payment", destination: "/departamentos", permanent: true },
      // Fichas de propiedad viejas → nuevas (por slug)
      ...loadPropertyRedirects(),
      // Blog: posts migrados a su nuevo slug, y el resto de /post/* a la guía.
      ...loadBlogRedirects(),
      { source: "/post/:slug*", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
