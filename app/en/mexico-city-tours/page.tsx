import type { Metadata } from "next";
import Link from "next/link";
import GygWidget from "@/components/GygWidget";

export const metadata: Metadata = {
  title: "Tours & activities in Mexico City",
  description:
    "Discover and book the best tours, experiences and activities in Mexico City. Curated by Maia Home so you make the most of your stay.",
  alternates: { canonical: "/en/mexico-city-tours", languages: { es: "/tours-mexico-city", en: "/en/mexico-city-tours" } },
};

export default function ToursMexicoCityEn() {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-700">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/departamentos/cdmx.jpg" alt="Mexico City" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/45" />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-14 md:pb-20 md:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-yellow">Experiences · Mexico City</p>
          <h1 className="mt-3 font-serif text-4xl text-white md:text-5xl">Tours & activities in Mexico City</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/85">
            Museums, food tours, Xochimilco, lucha libre, day trips to Teotihuacán and much more. Book
            unforgettable experiences to make the most of the city during your stay.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-6 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-600">
          Experiences are run by third-party providers through GetYourGuide. Check the details and book
          directly with each provider; Maia Home does not operate these tours.
        </div>

        <GygWidget locale="en-US" q="Mexico City" items={12} />

        {/* CTA */}
        <section className="relative mt-12 overflow-hidden rounded-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/zonas/polanco.webp" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
          <div className="relative max-w-xl px-6 py-10 md:px-10 md:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-yellow">Your base in the city</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-white md:text-4xl">Stay where it all happens</h2>
            <p className="mt-3 text-white/85">
              Furnished apartments in Mexico City's best areas, steps from museums, restaurants and
              cultural life. Book directly with Maia Home.
            </p>
            <Link href="/en/apartments" className="mt-6 inline-block rounded-full bg-maia-yellow px-7 py-3.5 text-sm font-semibold text-black shadow-lg transition hover:bg-maia-strong">
              View apartments →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
