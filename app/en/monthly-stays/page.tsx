import type { Metadata } from "next";
import PropertyCard from "@/components/PropertyCard";
import AvailabilityChips from "@/components/AvailabilityChips";
import { getProperties } from "@/lib/data";
import { applyAvailability, type SP } from "@/lib/listing";

export const metadata: Metadata = {
  title: "Monthly stays",
  description:
    "Furnished apartments by the month in Mexico City and Houston: preferential rates, all-inclusive and no complicated contracts. Ideal for individuals and families.",
  alternates: { canonical: "/en/monthly-stays", languages: { es: "/mensuales", en: "/en/monthly-stays" } },
};

const BENEFITS = [
  { t: "Preferential rate", d: "Special pricing for stays of 30 nights or more." },
  { t: "All-inclusive", d: "Utilities, WiFi and move-in-ready spaces from day one." },
  { t: "No hassle", d: "No long contracts or excessive deposits: book and move in." },
  { t: "Invoicing available", d: "Request your tax invoice easily." },
];

export default async function MonthlyStays({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const list = (await getProperties()).filter((p) => p.segmentos.includes("monthly") && p.precioMes != null);
  const a = applyAvailability(list, sp);
  return (
    <>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-700">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/departamentos/cdmx.jpg" alt="Mexico City" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/50" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-yellow">For individuals and families</p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-white md:text-5xl">Monthly stays, with the comfort of a home</h1>
          <p className="mt-4 max-w-xl text-lg text-white/90">
            Live by the month in Polanco, Condesa or Houston with a preferential rate and everything ready to move in today.
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
        <h2 className="font-serif text-3xl text-neutral-900">Ideal for long stays</h2>
        <AvailabilityChips basePath="/en/monthly-stays" params={sp} disp={a.disp} total={a.totalCount} available={a.availableCount} unavailable={a.unavailableCount} hasDates={a.hasDates} lang="en" />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {a.filtered.map((p) => (
            <PropertyCard key={p.beds24RoomId} property={p} search={a.search} priceMode="month" lang="en" />
          ))}
        </div>
      </section>
    </>
  );
}
