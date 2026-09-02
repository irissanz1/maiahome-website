import type { Metadata } from "next";
import { Suspense } from "react";
import SearchStrip from "@/components/SearchStrip";
import PropertyCard from "@/components/PropertyCard";
import AvailabilityChips from "@/components/AvailabilityChips";
import { getByMarket } from "@/lib/data";
import { resolveMarket, ZONAS } from "@/lib/market";
import { applyAvailability, str, type SP } from "@/lib/listing";
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
  const where = zona ? zona.nombre : market.label;
  const what = seg ? SEGMENT_LABEL[seg] : "Departamentos amueblados";
  return {
    title: `${what} en ${where}`,
    description: `${what} en ${where}. Reserva directo con Maia Home: mejor tarifa, sin intermediarios.`,
    alternates: { canonical: "/departamentos" },
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

  const a = applyAvailability(list, sp);

  const zona = zonaSlug ? ZONAS[zonaSlug] : undefined;
  const heading = segmento
    ? SEGMENT_LABEL[segmento]
    : zona
      ? `Departamentos en ${zona.nombre}`
      : `Departamentos en ${market.label}`;

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="font-serif text-3xl text-neutral-900 md:text-4xl">{heading}</h1>
      <p className="mt-2 text-sm text-neutral-500">
        {a.totalCount} {a.totalCount === 1 ? "propiedad" : "propiedades"}
        {a.hasDates ? ` · ${a.search.checkin} → ${a.search.checkout}` : ""}
      </p>

      <div className="mt-6">
        <Suspense fallback={<div className="h-24 rounded-2xl border border-neutral-200 bg-white" />}>
          <SearchStrip />
        </Suspense>
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
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {a.filtered.map((p) => (
            <PropertyCard key={p.beds24RoomId} property={p} search={a.search} />
          ))}
        </div>
      )}
    </div>
  );
}
