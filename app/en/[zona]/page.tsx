import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import SearchStrip from "@/components/SearchStrip";
import AdvancedFilters from "@/components/AdvancedFilters";
import ListingView from "@/components/ListingView";
import AvailabilityChips from "@/components/AvailabilityChips";
import { getByZona, withLiveAvailability } from "@/lib/data";
import { ZONAS } from "@/lib/market";
import { applyAvailability, advancedFilter, str, type SP } from "@/lib/listing";

export function generateStaticParams() {
  return Object.keys(ZONAS).map((zona) => ({ zona }));
}

export async function generateMetadata({ params }: { params: Promise<{ zona: string }> }): Promise<Metadata> {
  const { zona: slug } = await params;
  const zona = ZONAS[slug];
  if (!zona) return {};
  return {
    title: `Furnished apartments in ${zona.nombre}`,
    description: zona.seo.en,
    alternates: { canonical: `/en/${zona.slug}`, languages: { es: `/${zona.slug}`, en: `/en/${zona.slug}` } },
    openGraph: { title: `Furnished apartments in ${zona.nombre}`, description: zona.seo.en },
  };
}

export default async function ZonaEn({ params, searchParams }: { params: Promise<{ zona: string }>; searchParams: Promise<SP> }) {
  const { zona: slug } = await params;
  const sp = await searchParams;
  const zona = ZONAS[slug];
  if (!zona) notFound();

  let list = await getByZona(slug);
  list = advancedFilter(list, sp);
  list = await withLiveAvailability(list, str(sp.checkout));
  const a = applyAvailability(list, sp);

  return (
    <div>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-700">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/zonas/${slug}.webp`} alt={zona.nombre} className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/55" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-yellow">
            {zona.pais === "MX" ? "Mexico City" : "Houston, Texas"}
          </p>
          <h1 className="mt-3 font-serif text-4xl text-white md:text-5xl">Furnished apartments in {zona.nombre}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{zona.descripcion.en}</p>
          <Link
            href={`/en/apartments?market=${zona.pais === "MX" ? "mx" : "us"}`}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-maia-yellow"
          >
            <span aria-hidden="true">←</span> View all areas
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="space-y-3">
          <Suspense fallback={<div className="h-24 rounded-2xl border border-neutral-200 bg-white" />}>
            <SearchStrip basePath={`/en/${slug}`} fixedZona={slug} />
          </Suspense>
          <Suspense fallback={null}>
            <AdvancedFilters />
          </Suspense>
        </div>

        <AvailabilityChips basePath={`/en/${slug}`} params={sp} disp={a.disp} total={a.totalCount} available={a.availableCount} unavailable={a.unavailableCount} hasDates={a.hasDates} lang="en" />

        {a.filtered.length === 0 ? (
          <p className="mt-16 text-center text-neutral-500">No properties match your search.</p>
        ) : (
          <ListingView properties={a.filtered} search={a.search} />
        )}
      </section>
    </div>
  );
}
