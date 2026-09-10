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

  const allInZona = await getByZona(slug);
  let list = advancedFilter(allInZona, sp);
  list = await withLiveAvailability(list, str(sp.checkout));
  const a = applyAvailability(list, sp);

  const BASE = "https://maiahome.mx";
  const marketId = zona.pais === "MX" ? "mx" : "us";
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/en` },
      { "@type": "ListItem", position: 2, name: "Apartments", item: `${BASE}/en/apartments` },
      { "@type": "ListItem", position: 3, name: `Apartments in ${zona.nombre}`, item: `${BASE}/en/${slug}` },
    ],
  };
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Furnished apartments in ${zona.nombre}`,
    numberOfItems: allInZona.length,
    itemListElement: allInZona.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE}/en/stay/${p.slug}`,
      name: p.nombre,
    })),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
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

      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-3xl px-5 py-14">
          <h2 className="font-serif text-2xl text-neutral-900 md:text-3xl">
            Furnished apartment rentals in {zona.nombre}
          </h2>
          <p className="mt-4 leading-relaxed text-neutral-600">{zona.seo.en}</p>
          <p className="mt-3 leading-relaxed text-neutral-600">
            Book directly with Maia Home for the best rate, with no intermediary fees. Every apartment
            in {zona.nombre} is fully furnished and equipped, with high-speed Wi-Fi, self check-in and
            the option of nightly or monthly stays.
          </p>
          <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
            <li><Link href="/en/monthly-stays" className="font-medium text-maia-strong underline">Monthly stays</Link></li>
            <li><Link href="/en/corporate-housing" className="font-medium text-maia-strong underline">Corporate housing</Link></li>
            <li><Link href="/en/faq" className="font-medium text-maia-strong underline">Frequently asked questions</Link></li>
            <li><Link href="/en/payment-options" className="font-medium text-maia-strong underline">Payment options</Link></li>
            <li><Link href={`/en/apartments?market=${marketId}`} className="font-medium text-maia-strong underline">View all areas</Link></li>
            <li><Link href="/en/blog" className="font-medium text-maia-strong underline">Neighborhood guides &amp; blog</Link></li>
          </ul>
        </div>
      </section>
    </div>
  );
}
