import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import HomeHero from "@/components/HomeHero";
import StatsBar from "@/components/StatsBar";
import TrustBar from "@/components/TrustBar";
import FeaturedReviews from "@/components/FeaturedReviews";
import { getByMarket } from "@/lib/data";
import { resolveMarket } from "@/lib/market";

const BENEFITS = [
  { t: "Ubicaciones premium", d: "Polanco, Condesa y Houston — las mejores zonas para vivir o trabajar." },
  { t: "Mejor tarifa, directo", d: "Reserva sin intermediarios y sin comisiones de plataformas." },
  { t: "Listos para vivir", d: "Amueblados, con WiFi, cocina equipada y todo incluido." },
  { t: "Atención personal", d: "Respuesta rápida por mensaje o correo, antes y durante tu estancia." },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const market = resolveMarket(typeof sp.market === "string" ? sp.market : undefined);
  const featured = (await getByMarket(market.id)).slice(0, 3);

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
            <h2 className="font-serif text-3xl text-neutral-900">Destacados en {market.label}</h2>
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

      <FeaturedReviews />
    </>
  );
}
