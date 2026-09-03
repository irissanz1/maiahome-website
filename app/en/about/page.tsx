import type { Metadata } from "next";
import Link from "next/link";
import { WHATSAPP_DISPLAY, SUPPORT_EMAIL, whatsappUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Hospitality with purpose in the heart of Mexico City. Maia Home: curated apartments, real hosts and a lasting commitment to the community.",
  alternates: { canonical: "/en/about", languages: { es: "/nosotros", en: "/en/about" } },
};

const VISION = [
  { t: "Thoughtful spaces", d: "Curated apartments with local pieces, quality linens and meticulous upkeep. Nothing generic, nothing left to chance." },
  { t: "Real hosts", d: "Human support, in Spanish and English, before and during your stay. Honest recommendations, not tourist checklists." },
  { t: "Connected to the city", d: "Every apartment is a doorway to a living neighborhood: cafés, bookshops, markets, workshops. Live Mexico City like a local." },
];
const METRICS: [string, string][] = [
  ["40", "Curated apartments"],
  ["+5,000", "Memorable stays"],
  ["4.8★", "Average rating"],
  ["+75", "Local initiatives supported"],
];

export default function About() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">About us</p>
            <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.12] tracking-tight text-neutral-900 md:text-6xl">
              Hospitality with <span className="italic">purpose</span> in the heart of{" "}
              <span className="bg-[linear-gradient(transparent_58%,#FDDB51_58%)] px-1">CDMX</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-600">
              Maia Home is more than a collection of furnished apartments. It's a way to live Mexico City with care for the place, the people and the community that sustains it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#story" className="inline-flex items-center gap-2 rounded-full bg-maia-dark px-6 py-3 text-sm font-semibold text-white transition hover:bg-black">
                Read our story
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
              </a>
              <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-800 hover:text-maia-strong">
                Let's talk <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -right-3 -top-3 h-full w-full rounded-[2rem] bg-maia-yellow" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nosotros/hero-apt.jpg" alt="Maia Home furnished apartment in Mexico City" className="relative w-full rounded-[2rem] object-cover shadow-xl" />
          </div>
        </div>
      </section>

      <section className="bg-maia-dark text-white">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-maia-yellow">Manifesto</p>
          <p className="mt-6 font-serif text-2xl leading-snug md:text-3xl">
            We believe in hospitality that gives back rather than extracts. That cares for the neighborhood, listens to its residents and opens up the city without overrunning it.
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-neutral-400">Maia Home — CDMX · Polanco · Condesa</p>
        </div>
      </section>

      <section id="story" className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-maia-strong">Our story</p>
        <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">A home with a story, made in the city</h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-neutral-600">
          <p>
            Maia Home started from a simple idea: that staying in Mexico City should feel like living here, not like watching the city from a hotel. Every apartment is designed, decorated and run by local people who understand the rhythm of the neighborhood.
          </p>
          <p>
            We began in Polanco and grew into Condesa, always keeping the same promise: a few very well-cared-for spaces, real hosts and a lasting commitment to the community around us.
          </p>
        </div>
        <blockquote className="mt-8 border-l-4 border-maia-strong pl-5 font-serif text-2xl italic text-neutral-800">
          “Made in CDMX, for those who want to truly live it.”
        </blockquote>
      </section>

      <section className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-maia-strong">Vision</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-neutral-900 md:text-4xl">Our idea of hospitality</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {VISION.map((v) => (
              <div key={v.t} className="rounded-2xl border border-neutral-200 bg-white p-7">
                <h3 className="font-serif text-xl text-neutral-900">{v.t}</h3>
                <p className="mt-3 leading-relaxed text-neutral-600">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-16 md:py-24 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] lg:order-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero/hero-08.jpg" alt="Mexico City neighborhoods" className="h-full w-full object-cover" />
        </div>
        <div className="lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-maia-strong">Community</p>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">The city is our home. Caring for it, too.</h2>
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">We work with neighbors, not against them</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                We buy from nearby businesses, clean with local teams and maintain with neighborhood technicians. Our operation keeps most of what it generates in CDMX, because a healthy neighborhood is what makes a stay memorable.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">A platform for Mexican talent</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                More than a place to stay, an invitation to inhabit the city with curiosity and respect. Every stay points to design, craft, food and culture we know first-hand — not because they're famous.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-maia-dark text-white">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-maia-yellow">Maia Home in numbers</p>
          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
            {METRICS.map(([n, l]) => (
              <div key={l} className="text-center">
                <p className="font-serif text-4xl font-bold md:text-5xl">{n}</p>
                <p className="mt-2 text-sm text-neutral-400">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FBF7EC]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-16 md:py-24 lg:grid-cols-2 lg:gap-14">
          <div className="overflow-hidden rounded-[2rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nosotros/altia.jpg" alt="Community supported by Fundación Altía" className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-maia-yellow text-black">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-6.7-4.35-9.33-8.24C.9 10.02 1.6 6.5 4.6 5.4c1.9-.7 3.9.1 5 1.7l.9 1.3.9-1.3c1.1-1.6 3.1-2.4 5-1.7 3 1.1 3.7 4.62 1.93 7.36C18.7 16.65 12 21 12 21z" /></svg>
            </span>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">Purpose</p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">
              Staying here also means <span className="italic">supporting Fundación Altía</span>
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-neutral-700">
              <p>Part of every stay goes to the foundation's work with children and vulnerable communities in Mexico City.</p>
              <p>It's not marketing: it's how we understand what it means to open the doors of a place. Hosting also means giving back.</p>
            </div>
            <blockquote className="mt-6 border-l-4 border-maia-strong pl-5 font-serif text-xl italic text-neutral-800">“Thank you for staying with us.”</blockquote>
            <a href="https://grupoaltia.org/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm font-semibold text-maia-dark underline decoration-maia-strong decoration-2 underline-offset-4 hover:text-maia-strong">
              Discover Fundación Altía →
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="rounded-3xl bg-maia-dark px-8 py-14 text-center text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-maia-yellow">Contact</p>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">Let's talk. We'd love to hear from you.</h2>
            <p className="mx-auto mt-3 max-w-xl text-neutral-300">Recommendations, questions, a collaboration or just a hello. Write to us and we'll reply personally.</p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={whatsappUrl("Hi Maia Home, I'd like more information.")} target="_blank" rel="noopener noreferrer" className="rounded-full bg-maia-yellow px-7 py-3 text-sm font-semibold text-black transition hover:bg-maia-strong">
                Message us on WhatsApp
              </a>
              <Link href="/en/apartments" className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10">View apartments</Link>
            </div>
            <p className="mt-6 text-sm text-neutral-400">
              {WHATSAPP_DISPLAY} · <a href={`mailto:${SUPPORT_EMAIL}`} className="underline hover:text-white">{SUPPORT_EMAIL}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
