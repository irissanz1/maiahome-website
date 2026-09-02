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

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Rutas viejas de base44 → nuevas
      { source: "/Stays", destination: "/departamentos", permanent: true },
      { source: "/Home", destination: "/", permanent: true },
      { source: "/CorporateHousing", destination: "/corporativo", permanent: true },
      { source: "/Nosotros", destination: "/nosotros", permanent: true },
      { source: "/Facturacion", destination: "/facturacion", permanent: true },
      // Fichas de propiedad viejas → nuevas (por slug)
      ...loadPropertyRedirects(),
    ];
  },
};

export default nextConfig;
