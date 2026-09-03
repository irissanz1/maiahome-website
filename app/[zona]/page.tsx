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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ zona: string }>;
}): Promise<Metadata> {
  const { zona: slug } = await params;
  const zona = ZONAS[slug];
  if (!zona) return {};
  return {
    title: `Departamentos amueblados en ${zona.nombre}`,
    description: zona.seo.es,
    alternates: { canonical: `/${zona.slug}` },
    openGraph: { title: `Departamentos amueblados en ${zona.nombre}`, description: zona.seo.es },
  };
}

export default async function ZonaLanding({
  params,
  searchParams,
}: {
  params: Promise<{ zona: string }>;
  searchParams: Promise<SP>;
}) {
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
      <section className="border-b border-neutral-100 bg-gradient-to-b from-neutral-50 to-white">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">
            {zona.pais === "MX" ? "Ciudad de México" : "Houston, Texas"}
          </p>
          <h1 className="mt-3 font-serif text-4xl text-neutral-900 md:text-5xl">
            Departamentos amueblados en {zona.nombre}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-600">{zona.descripcion.es}</p>
          <Link
            href={`/departamentos?market=${zona.pais === "MX" ? "mx" : "us"}`}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-700 hover:text-maia-strong"
          >
            <span aria-hidden="true">←</span> Ver todas las zonas
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="space-y-3">
          <Suspense fallback={<div className="h-24 rounded-2xl border border-neutral-200 bg-white" />}>
            <SearchStrip basePath={`/${slug}`} fixedZona={slug} />
          </Suspense>
          <Suspense fallback={null}>
            <AdvancedFilters />
          </Suspense>
        </div>

        <AvailabilityChips
          basePath={`/${slug}`}
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
      </section>
    </div>
  );
}
