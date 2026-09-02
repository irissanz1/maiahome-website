import type { Metadata } from "next";
import PropertyCard from "@/components/PropertyCard";
import AvailabilityChips from "@/components/AvailabilityChips";
import { getProperties } from "@/lib/data";
import { applyAvailability, type SP } from "@/lib/listing";

export const metadata: Metadata = {
  title: "Estancias mensuales",
  description:
    "Departamentos amueblados por mes en CDMX y Houston: tarifa preferencial, todo incluido y sin contratos complicados. Ideal para personas y familias.",
  alternates: { canonical: "/mensuales" },
};

const BENEFITS = [
  { t: "Tarifa preferencial", d: "Precios especiales para estancias de 30 noches o más." },
  { t: "Todo incluido", d: "Servicios, WiFi y espacios listos para vivir desde el día uno." },
  { t: "Sin complicaciones", d: "Sin contratos largos ni depósitos excesivos: reservas y llegas." },
  { t: "Facturación disponible", d: "Solicita tu factura fiscal de forma sencilla." },
];

export default async function Mensuales({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const list = (await getProperties()).filter((p) => p.segmentos.includes("monthly") && p.precioMes != null);
  const a = applyAvailability(list, sp);
  return (
    <>
      <section className="border-b border-neutral-100 bg-gradient-to-b from-neutral-50 to-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">
            Para personas y familias
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-neutral-900 md:text-5xl">
            Estancias mensuales, con la comodidad de un hogar
          </h1>
          <p className="mt-4 max-w-xl text-lg text-neutral-600">
            Vive por mes en Polanco, Condesa o Houston con tarifa preferencial y todo listo para
            mudarte hoy.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div key={b.t} className="rounded-2xl border border-neutral-200 p-6">
              <h2 className="font-serif text-xl text-neutral-900">{b.t}</h2>
              <p className="mt-2 text-sm text-neutral-600">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-8">
        <h2 className="font-serif text-3xl text-neutral-900">Ideales para estancia larga</h2>
        <AvailabilityChips
          basePath="/mensuales"
          params={sp}
          disp={a.disp}
          total={a.totalCount}
          available={a.availableCount}
          unavailable={a.unavailableCount}
          hasDates={a.hasDates}
        />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {a.filtered.map((p) => (
            <PropertyCard key={p.beds24RoomId} property={p} search={a.search} priceMode="month" />
          ))}
        </div>
      </section>
    </>
  );
}
