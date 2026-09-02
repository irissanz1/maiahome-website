import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
import AvailabilityChips from "@/components/AvailabilityChips";
import { getByZona, withLiveAvailability } from "@/lib/data";
import { ZONAS } from "@/lib/market";
import { applyAvailability, str, type SP } from "@/lib/listing";

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

  const list = await withLiveAvailability(await getByZona(slug), str(sp.checkout));
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
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <AvailabilityChips
          basePath={`/${slug}`}
          params={sp}
          disp={a.disp}
          total={a.totalCount}
          available={a.availableCount}
          unavailable={a.unavailableCount}
          hasDates={a.hasDates}
        />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {a.filtered.map((p) => (
            <PropertyCard key={p.beds24RoomId} property={p} search={a.search} />
          ))}
        </div>
      </section>
    </div>
  );
}
