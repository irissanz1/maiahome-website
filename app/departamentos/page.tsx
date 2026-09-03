import type { Metadata } from "next";
import { Suspense } from "react";
import SearchStrip from "@/components/SearchStrip";
import AvailabilityChips from "@/components/AvailabilityChips";
import AdvancedFilters from "@/components/AdvancedFilters";
import ListingView from "@/components/ListingView";
import { getByMarket, withLiveAvailability } from "@/lib/data";
import { resolveMarket, ZONAS } from "@/lib/market";
import { applyAvailability, advancedFilter, str, type SP } from "@/lib/listing";
import type { Segment } from "@/lib/types";

const SEGMENT_LABEL: Record<string, string> = {
  monthly: "Estancias mensuales",
  corporate: "Vivienda corporativa",
  nightly: "Por noche",
};

export async function generateMetadata({ searchParams }: { searchParams: Promise<SP> }): Promise<Metadata> {
  const sp = await searchParams;
  const market = resolveMarket(str(sp.market));
  const zona = str(sp.zona) ? ZONAS[str(sp.zona)!] : undefined;
  const seg = str(sp.segmento);
  const where = zona ? zona.nombre : market.geo;
  const what = seg ? SEGMENT_LABEL[seg] : "Departamentos amueblados";
  // Barrios del mercado para reforzar la señal geográfica (SEO/GEO).
  const barrios = market.zonas.map((z) => ZONAS[z]?.nombre).filter(Boolean).join(", ");
  const zonaHint = !zona && barrios ? ` (${barrios})` : "";
  return {
    title: `${what} en ${where}${zonaHint}`,
    description: `${what} premium en ${where}${zonaHint}. Reserva directo con Maia Home: mejor tarifa, sin intermediarios ni comisiones.`,
    alternates: { canonical: "/departamentos", languages: { es: "/departamentos", en: "/en/apartments" } },
  };
}

export default async function Departamentos({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const market = resolveMarket(str(sp.market));
  const zonaSlug = str(sp.zona);
  const segmento = str(sp.segmento) as Segment | undefined;
  const q = str(sp.q)?.toLowerCase();

  let list = await getByMarket(market.id);
  if (zonaSlug) list = list.filter((p) => p.zona === zonaSlug);
  if (segmento) list = list.filter((p) => p.segmentos.includes(segmento));
  if (q) list = list.filter((p) => p.nombre.toLowerCase().includes(q));

  // Filtros avanzados (recámaras, baños, amenidades).
  list = advancedFilter(list, sp);

  // Disponibilidad y precios EN VIVO directo de Beds24 (1 llamada, cacheada 90s).
  list = await withLiveAvailability(list, str(sp.checkout));

  const a = applyAvailability(list, sp);

  const zona = zonaSlug ? ZONAS[zonaSlug] : undefined;
  const heading = segmento
    ? SEGMENT_LABEL[segmento]
    : zona
      ? `Departamentos en ${zona.nombre}`
      : `Departamentos en ${market.geo}`;

  // Hero por mercado. CDMX: Palacio de Bellas Artes; Houston: skyline (de explore).
  const heroImg = market.id === "mx" ? "/departamentos/cdmx.jpg" : "/zonas/houston.webp";

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-700">
        {heroImg && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImg} alt={market.geo} className="absolute inset-0 h-full w-full object-cover object-center" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/45" />
        <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-14 md:pb-28 md:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-yellow">
            Estancias Maia · {market.geo}
          </p>
          <h1 className="mt-3 font-serif text-4xl text-white md:text-5xl">{heading}</h1>
          <p className="mt-2 text-sm text-white/85">
            {a.totalCount} {a.totalCount === 1 ? "propiedad" : "propiedades"}
            {a.hasDates ? ` · ${a.search.checkin} → ${a.search.checkout}` : ""}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 pb-12">
        {/* Buscador flotante sobre el hero */}
        <div className="relative z-10 -mt-16">
          <Suspense fallback={<div className="h-24 rounded-2xl border border-neutral-200 bg-white shadow-lg" />}>
            <SearchStrip />
          </Suspense>
          <div className="mt-3">
            <Suspense fallback={null}>
              <AdvancedFilters />
            </Suspense>
          </div>
        </div>

        <AvailabilityChips
          basePath="/departamentos"
          params={sp}
          disp={a.disp}
          total={a.totalCount}
          available={a.availableCount}
          unavailable={a.unavailableCount}
          hasDates={a.hasDates}
        />

        {a.filtered.length === 0 ? (
          <p className="mt-16 text-center text-neutral-500">No hay propiedades que coincidan con tu búsqueda.</p>
        ) : (
          <ListingView properties={a.filtered} search={a.search} />
        )}
      </div>
    </div>
  );
}
