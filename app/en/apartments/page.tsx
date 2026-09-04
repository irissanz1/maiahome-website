import type { Metadata } from "next";
import { Suspense } from "react";
import SearchStrip from "@/components/SearchStrip";
import AdvancedFilters from "@/components/AdvancedFilters";
import ListingView from "@/components/ListingView";
import AvailabilityChips from "@/components/AvailabilityChips";
import { getByMarket, withLiveAvailability } from "@/lib/data";
import { resolveMarket, ZONAS } from "@/lib/market";
import { applyAvailability, advancedFilter, str, type SP } from "@/lib/listing";

export async function generateMetadata({ searchParams }: { searchParams: Promise<SP> }): Promise<Metadata> {
  const sp = await searchParams;
  const market = resolveMarket(str(sp.market));
  const where = market.geoEn;
  const barrios = market.zonas.map((z) => ZONAS[z]?.nombre).filter(Boolean).join(", ");
  return {
    title: `Furnished apartments in ${where}`,
    description: `Premium furnished apartments in ${where} (${barrios}). Book directly with Maia Home: best rate, no middlemen.`,
    alternates: { canonical: "/en/apartments", languages: { es: "/departamentos", en: "/en/apartments" } },
  };
}

export default async function Apartments({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const market = resolveMarket(str(sp.market));
  const q = str(sp.q)?.toLowerCase();

  let list = await getByMarket(market.id);
  if (q) list = list.filter((p) => p.nombre.toLowerCase().includes(q));
  list = advancedFilter(list, sp);
  list = await withLiveAvailability(list, str(sp.checkout));
  const a = applyAvailability(list, sp);

  const heroImg = market.id === "mx" ? "/departamentos/cdmx.jpg" : "/zonas/houston.webp";

  return (
    <div>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-700">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroImg} alt={market.geoEn} className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/45" />
        <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-14 md:pb-28 md:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-yellow">Maia stays · {market.geoEn}</p>
          <h1 className="mt-3 font-serif text-4xl text-white md:text-5xl">Furnished apartments in {market.geoEn}</h1>
          <p className="mt-2 text-sm text-white/85">
            {a.totalCount} {a.totalCount === 1 ? "property" : "properties"}
            {a.hasDates ? ` · ${a.search.checkin} → ${a.search.checkout}` : ""}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 pb-12">
        <div className="relative z-10 -mt-16">
          <Suspense fallback={<div className="h-24 rounded-2xl border border-neutral-200 bg-white shadow-lg" />}>
            <SearchStrip basePath="/en/apartments" />
          </Suspense>
          <div className="mt-3">
            <Suspense fallback={null}>
              <AdvancedFilters />
            </Suspense>
          </div>
        </div>

        <AvailabilityChips basePath="/en/apartments" params={sp} disp={a.disp} total={a.totalCount} available={a.availableCount} unavailable={a.unavailableCount} hasDates={a.hasDates} lang="en" />

        {a.filtered.length === 0 ? (
          <p className="mt-16 text-center text-neutral-500">No properties match your search.</p>
        ) : (
          <ListingView properties={a.filtered} search={a.search} />
        )}
      </div>
    </div>
  );
}
