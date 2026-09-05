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
      // Dominio técnico de Vercel → dominio canónico. Evita que maia-home.vercel.app
      // sea una superficie separada (contenido duplicado + issues de "Tag coverage" en
      // el Google tag). Solo matchea el alias de producción exacto; los previews usan
      // hosts con hash (maia-home-<hash>.vercel.app) y NO se ven afectados.
      {
        source: "/:path*",
        has: [{ type: "host", value: "maia-home.vercel.app" }],
        destination: "https://maiahome.mx/:path*",
        permanent: true,
      },
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
      { source: "/corporate-housing", destination: "/corporativo", permanent: true },
      { source: "/reserva-ahora", destination: "/departamentos", permanent: true },
      { source: "/descubre", destination: "/blog", permanent: true },
      { source: "/explora", destination: "/blog", permanent: true },
      { source: "/payment", destination: "/formas-de-pago", permanent: true },
      // Rutas EN viejas del Wix: usaban /en/<slug-español>. El sitio nuevo usa
      // slugs EN traducidos, así que estas 404 sin redirect. (Las que ya existen
      // con el mismo path —/en/polanco, /en/condesa, /en/houston, /en/blog,
      // /en/stay-agreement— resuelven solas.)
      { source: "/en/departamentos", destination: "/en/apartments", permanent: true },
      { source: "/en/mensuales", destination: "/en/monthly-stays", permanent: true },
      { source: "/en/corporativo", destination: "/en/corporate-housing", permanent: true },
      { source: "/en/administramos-tu-depto", destination: "/en/manage-your-apartment", permanent: true },
      { source: "/en/nosotros", destination: "/en/about", permanent: true },
      { source: "/en/formas-de-pago", destination: "/en/payment-options", permanent: true },
      { source: "/en/payment", destination: "/en/payment-options", permanent: true },
      { source: "/en/recorridos-departamentos", destination: "/en/virtual-tours", permanent: true },
      { source: "/en/facturacion", destination: "/en/invoicing", permanent: true },
      { source: "/en/tours-mexico-city", destination: "/en/mexico-city-tours", permanent: true },
      { source: "/en/aviso-privacidad", destination: "/en/privacy-notice", permanent: true },
      { source: "/en/terminos-y-condiciones", destination: "/en/terms-and-conditions", permanent: true },
      { source: "/en/terminos-uso", destination: "/en/terms-of-use", permanent: true },
      { source: "/en/reserva-ahora", destination: "/en/apartments", permanent: true },
      { source: "/en/descubre", destination: "/en/blog", permanent: true },
      { source: "/en/explora", destination: "/en/blog", permanent: true },
      { source: "/en/post/:slug*", destination: "/en/blog", permanent: true },
      // /check-in y /check-out viven en el sitio principal con el MISMO path
      // que tenía el Wix → no necesitan redirect.
      // Fichas de propiedad viejas → nuevas (por slug)
      ...loadPropertyRedirects(),
      // Blog: posts migrados a su nuevo slug, y el resto de /post/* a la guía.
      ...loadBlogRedirects(),
      { source: "/post/:slug*", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
