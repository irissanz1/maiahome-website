import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import HomeHero from "@/components/HomeHero";
import StatsBar from "@/components/StatsBar";
import TrustBar from "@/components/TrustBar";
import FeaturedReviews from "@/components/FeaturedReviews";
import PropertiesMap, { type MapMarker } from "@/components/PropertiesMap";
import { getByMarket } from "@/lib/data";
import { resolveMarket } from "@/lib/market";
import { formatMoney, img } from "@/lib/format";

const BENEFITS = [
  { t: "Ubicaciones premium", d: "Polanco, Condesa y Houston — las mejores zonas para vivir o trabajar." },
  { t: "Espacios de diseño", d: "Departamentos amueblados con estilo, WiFi, cocina equipada y todo incluido." },
  { t: "Estancias a tu medida", d: "Por noche, mensual o vivienda corporativa, según lo que necesites." },
  { t: "Experiencia local", d: "Un equipo que conoce cada zona y te recomienda lo mejor de la ciudad." },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const market = resolveMarket(typeof sp.market === "string" ? sp.market : undefined);

  // Destacados fijos (en orden). Si no están en el mercado actual, se completa con el catálogo.
  const FEATURED_SLUGS = ["condesa-conchita-5", "polanco-leonora-3", "polanco-velasco"];
  const marketProps = await getByMarket(market.id);
  const bySlug = new Map(marketProps.map((p) => [p.slug, p]));
  const pinned = FEATURED_SLUGS.map((s) => bySlug.get(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const featured =
    pinned.length >= 3
      ? pinned.slice(0, 3)
      : [...pinned, ...marketProps.filter((p) => !FEATURED_SLUGS.includes(p.slug)).slice(0, 3 - pinned.length)];

  // Mapa "Dónde estamos": pines del mercado actual + chips por zona con conteo.
  const mapMarkers: MapMarker[] = marketProps
    .filter((p) => typeof p.lat === "number" && typeof p.lng === "number")
    .map((p) => ({
      slug: p.slug,
      nombre: p.nombre,
      zonaNombre: p.zonaNombre,
      lat: p.lat as number,
      lng: p.lng as number,
      priceLabel: p.precioDesde != null ? `${formatMoney(p.precioDesde, p.currency)} / noche` : null,
      image: img(p.images[0], 400),
      rating: p.rating,
      href: `/depto/${p.slug}`,
    }));
  const zoneMap = new Map<string, { slug: string; count: number }>();
  for (const p of marketProps) {
    const cur = zoneMap.get(p.zonaNombre);
    if (cur) cur.count += 1;
    else zoneMap.set(p.zonaNombre, { slug: p.zona, count: 1 });
  }
  const zones = [...zoneMap.entries()].sort((a, b) => b[1].count - a[1].count);

  return (
    <>
      {/* Hero con carrusel + búsqueda */}
      <div className="mx-auto max-w-6xl px-5 pt-6">
        <HomeHero />
      </div>

      <div className="mt-6">
        <StatsBar />
      </div>

      <div className="mt-10">
        <TrustBar />
      </div>

      {/* Beneficios */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div key={b.t} className="rounded-2xl border border-neutral-200 p-6">
              <h3 className="font-serif text-xl text-neutral-900">{b.t}</h3>
              <p className="mt-2 text-sm text-neutral-600">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Destacados */}
      <section className="mx-auto max-w-6xl px-5 pb-4">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl text-neutral-900">Destacados en {market.geo}</h2>
            <p className="mt-1 text-sm text-neutral-500">Una muestra de nuestro catálogo.</p>
          </div>
          <Link
            href={`/departamentos?market=${market.id}`}
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Ver todo
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.beds24RoomId} property={p} search={{}} />
          ))}
        </div>
      </section>

      {/* Dónde estamos — teaser de mapa */}
      {mapMarkers.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">Dónde estamos</p>
              <h2 className="mt-3 font-serif text-3xl text-neutral-900 md:text-4xl">
                En el corazón de las mejores zonas
              </h2>
              <p className="mt-3 text-neutral-600">
                Nuestros departamentos se concentran en Polanco y Condesa (CDMX) y Houston: a pasos de la
                mejor gastronomía, cultura y vida de negocios. Explora el mapa y elige por ubicación.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {zones.map(([nombre, { slug, count }]) => (
                  <Link
                    key={slug}
                    href={`/departamentos?market=${market.id}&zona=${slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3.5 py-1.5 text-sm text-neutral-700 transition hover:border-maia-strong hover:bg-neutral-50"
                  >
                    {nombre}
                    <span className="text-xs font-semibold text-neutral-400">{count}</span>
                  </Link>
                ))}
              </div>

              <Link
                href={`/departamentos?market=${market.id}`}
                className="mt-6 inline-block rounded-full bg-maia-dark px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
              >
                Ver todos en el mapa →
              </Link>
            </div>

            <PropertiesMap
              markers={mapMarkers}
              heightClass="h-[420px] md:h-[460px]"
              showPois
              poiGroupKeys={["cultura", "compras", "parques"]}
              poiControl={false}
            />
          </div>
        </section>
      )}

      <FeaturedReviews />

      {/* Propósito — banda compacta (impacto social) */}
      <section className="mt-4 bg-[#FBF7EC]">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-maia-yellow text-black">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-6.7-4.35-9.33-8.24C.9 10.02 1.6 6.5 4.6 5.4c1.9-.7 3.9.1 5 1.7l.9 1.3.9-1.3c1.1-1.6 3.1-2.4 5-1.7 3 1.1 3.7 4.62 1.93 7.36C18.7 16.65 12 21 12 21z" /></svg>
              </span>
              Propósito
            </p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-neutral-900 md:text-3xl">
              Hospedarte con nosotros también apoya a la comunidad
            </h2>
            <p className="mt-2 text-neutral-600">
              Una parte de cada estancia se destina a Fundación Altía, en favor de niñas, niños y
              comunidades de la Ciudad de México. Más de <strong>75 iniciativas locales</strong>{" "}
              apoyadas.
            </p>
          </div>
          <Link
            href="/nosotros"
            className="shrink-0 rounded-full bg-maia-dark px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
          >
            Conoce nuestro propósito →
          </Link>
        </div>
      </section>
    </>
  );
}
