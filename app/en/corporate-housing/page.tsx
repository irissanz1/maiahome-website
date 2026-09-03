import type { Metadata } from "next";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import AvailabilityChips from "@/components/AvailabilityChips";
import { getProperties } from "@/lib/data";
import { applyAvailability, type SP } from "@/lib/listing";
import { whatsappUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Corporate housing",
  description:
    "Corporate housing in Mexico City and Houston for relocations, projects and business travel: one point of contact, invoicing and company agreements.",
  alternates: { canonical: "/en/corporate-housing", languages: { es: "/corporativo", en: "/en/corporate-housing" } },
};

const BENEFITS = [
  { t: "One point of contact", d: "We coordinate everything with your company: bookings, changes and invoicing." },
  { t: "Company invoicing", d: "Tax receipts and terms for your procurement team." },
  { t: "Business districts", d: "Close to offices, corporate towers and the Medical Center in Houston." },
  { t: "Agreements", d: "Special rates and terms for recurring stays." },
];

export default async function CorporateHousing({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const list = (await getProperties()).filter((p) => p.segmentos.includes("corporate"));
  const a = applyAvailability(list, sp);
  return (
    <>
      <section className="border-b border-neutral-100 bg-maia-dark text-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-yellow">For companies and organizations</p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">Corporate housing in Mexico City and Houston</h1>
          <p className="mt-4 max-w-xl text-lg text-neutral-300">
            Relocations, projects and business travel with the comfort of a home and the backing of a single provider.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappUrl("Hi, I'd like information about Maia Home corporate housing.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-maia-yellow px-6 py-3 text-sm font-semibold text-black transition hover:bg-maia-strong"
            >
              Talk to the team
            </a>
            <Link href="/en/invoicing" className="rounded-full border border-neutral-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Invoicing
            </Link>
          </div>
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
        <h2 className="font-serif text-3xl text-neutral-900">Options for your team</h2>
        <AvailabilityChips basePath="/en/corporate-housing" params={sp} disp={a.disp} total={a.totalCount} available={a.availableCount} unavailable={a.unavailableCount} hasDates={a.hasDates} lang="en" />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {a.filtered.map((p) => (
            <PropertyCard key={p.beds24RoomId} property={p} search={a.search} lang="en" />
          ))}
        </div>
      </section>
    </>
  );
}
