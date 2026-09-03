import type { Metadata } from "next";
import OwnerLeadForm from "@/components/OwnerLeadForm";
import { whatsappUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Apartment management in Mexico City",
  description:
    "We manage your furnished apartment for short and mid-term rentals in Mexico City with hotel standards: multi-platform, dynamic pricing, cleaning, maintenance and transparent reporting. Work less, earn more.",
  alternates: { canonical: "/en/manage-your-apartment", languages: { es: "/administramos-tu-depto", en: "/en/manage-your-apartment" } },
};

const BENEFITS: [string, string][] = [
  ["More income, zero operation", "Dynamic pricing and multi-platform management (Airbnb, Booking.com, VRBO and direct booking) to maximize your apartment's occupancy."],
  ["Your property, protected", "We screen every guest, track inventory piece by piece and monitor noise and occupancy in real time."],
  ["Full transparency", "Monthly statement, real-time income history and forecast, and read-only access to your property's calendar."],
  ["Hotel standard", "Professional cleaning and maintenance every stay, self check-in and 24/7 guest support."],
  ["Short & mid-term", "Nightly rentals and executive stays: we combine both to sustain profitability year-round."],
  ["Clear terms", "25% commission month to month with no lock-in, or 20% with an annual contract. No fine print."],
];
const PILLARS: [string, string, string][] = [
  ["01", "Marketing", "Multi-platform listing (Airbnb, Booking.com, VRBO, own website), custom-designed listings, rate and revenue tools, and promotion across Maia Home's channels."],
  ["02", "Administration", "Real-time income history and forecast, monthly statement and management of the property's services (amenities, cleaning and maintenance)."],
  ["03", "Operations", "Online guest support, self check-in at every property, professional per-stay cleaning and per-apartment inventory control."],
  ["04", "Technology", "Secure payment engine with Stripe (Visa, Mastercard, Amex), independent booking engine and real-time noise and occupancy monitoring."],
];
const STEPS: [string, string, string][] = [
  ["01", "Assessment", "We analyze your apartment, its area and its short and mid-term rental potential."],
  ["02", "Design & setup", "Balance between design and occupancy: interior design, inventory, professional photography and a unique identity for each space."],
  ["03", "Listing", "We build and publish your listing on Airbnb, Booking.com, VRBO and our direct-booking engine."],
  ["04", "Daily operations", "Bookings, self check-in, per-stay cleaning, maintenance and 24/7 guest support."],
  ["05", "Report & payout", "Monthly statement with 100% of bookings reported and your earnings deposited."],
];
const SERVICES = [
  "Multi-platform management: Airbnb, Booking.com, VRBO and own website",
  "Custom listing design and build",
  "Dynamic pricing and revenue management tools",
  "Professional per-stay cleaning and maintenance",
  "Self check-in at every property",
  "24/7 online guest support",
  "Monthly statement and real-time income history",
  "Management and payment of property services",
  "Furniture and amenity inventory control",
];
const TRUST: [string, string][] = [
  ["Documented property", "We only work with properties that have valid documents and are in good condition."],
  ["Formal inventory", "Formal inventory handover at the start and end of the contract, piece by piece, with brand and model."],
  ["Visible calendar", "Read-only access to your property's calendar for transparency and date comparison."],
  ["Clear rules", "Damages covered per each platform's policies; that income goes entirely to repairs."],
];
const FAQ: [string, string][] = [
  ["How much does Maia Home charge for management?", "25% month to month with no lock-in, or 20% with an annual contract. The commission is on profits, after expenses and services. No fine print."],
  ["Does my apartment need to be furnished?", "Yes. Short and mid-term rentals require a furnished, move-in-ready space. If it isn't yet, we help with design, setup and inventory."],
  ["Which platforms is my property listed on?", "Airbnb, Booking.com, VRBO and our direct-booking engine, plus promotion across Maia Home's channels."],
  ["How do I know how much my apartment is earning?", "With a monthly statement, real-time income history and forecast, and read-only access to your property's calendar. We report 100% of bookings."],
  ["What if a guest damages my property?", "Damages are covered per each platform's policies, and that income goes entirely to repairs. We also track inventory piece by piece and monitor noise and occupancy."],
  ["Can I use my apartment whenever I want?", "Yes. We coordinate the dates you want for personal use and block the calendar."],
  ["Which areas of CDMX do you manage in?", "We operate in the best areas of the city: Polanco, Condesa and Roma."],
  ["What do I need to start?", "A documented property, with valid papers and in good condition. We do a free assessment of its potential and a formal inventory handover at the start."],
];

export default function ManageYourApartment() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#FDF3CF] via-white to-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-14 md:py-20 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">For owners · Property management CDMX</p>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.12] tracking-tight text-neutral-900 md:text-5xl">
              We manage your apartment for <span className="italic">short and mid-term rentals</span> in Mexico City
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-600">
              Turn your furnished apartment into a profitable asset without operating a thing. Professional, hotel-standard management: multi-platform listing, dynamic pricing, cleaning, maintenance and transparent reporting. <b className="text-neutral-800">Work less, earn more.</b>
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#start" className="inline-flex items-center gap-2 rounded-full bg-maia-yellow px-6 py-3 text-sm font-bold text-black transition hover:bg-maia-strong">
                I want to rent out my apartment <span aria-hidden="true">→</span>
              </a>
              <a href={whatsappUrl("Hi Maia Home, I'd like information about managing my apartment.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50">
                Chat on WhatsApp
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -right-3 -top-3 h-full w-full rounded-[2rem] bg-maia-yellow" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2rem] shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/duenos/hero.jpg" alt="Furnished rental apartment in Mexico City managed by Maia Home" className="h-full w-full object-cover" />
              <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-black/55 px-4 py-3 text-white backdrop-blur">
                <p className="text-sm font-semibold">Polanco · Condesa · Roma</p>
                <p className="text-xs text-neutral-200">Professional operation in the city's best areas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Why Maia Home</p>
        <h2 className="mt-3 font-serif text-2xl text-neutral-900 md:text-3xl">Your partner in apartment management in Mexico City</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-neutral-200 p-6">
              <h3 className="text-sm font-semibold text-neutral-900">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Management model</p>
          <h2 className="mt-3 font-serif text-2xl text-neutral-900 md:text-3xl">Two plans, four pillars, one standard</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:max-w-3xl">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">No lock-in · Monthly plan</p>
              <p className="mt-2 text-4xl font-bold text-neutral-900">25%</p>
              <ul className="mt-4 space-y-1.5 text-sm text-neutral-600">
                <li>Commission on profits after expenses and services</li>
                <li>Cancel anytime</li>
                <li>Same operational services included</li>
                <li>Ideal to try the model</li>
              </ul>
            </div>
            <div className="relative rounded-2xl border-2 border-maia-strong bg-white p-6">
              <span className="absolute -top-3 left-6 rounded-full bg-maia-strong px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide text-black">Recommended</span>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Annual contract</p>
              <p className="mt-2 text-4xl font-bold text-neutral-900">20%</p>
              <ul className="mt-4 space-y-1.5 text-sm text-neutral-600">
                <li>Preferential commission on profits</li>
                <li>Setup costs deferred over the contract</li>
                <li>Priority in calendar and revenue management</li>
                <li>Greater income stability</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map(([n, t, d]) => (
              <div key={n} className="rounded-2xl border border-neutral-200 bg-white p-6">
                <span className="font-serif text-2xl font-bold text-maia-strong">{n}</span>
                <h3 className="mt-2 text-base font-semibold text-neutral-900">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">How it works</p>
        <h2 className="mt-3 font-serif text-2xl text-neutral-900 md:text-3xl">From first contact to your first payout</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map(([n, t, d]) => (
            <div key={n} className="rounded-2xl border border-neutral-200 p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-maia-yellow text-sm font-bold text-black">{n}</span>
              <h3 className="mt-4 text-sm font-semibold text-neutral-900">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Included services</p>
          <h2 className="mt-3 font-serif text-2xl text-neutral-900 md:text-3xl">Everything your apartment needs, in one place</h2>
          <p className="mt-3 max-w-2xl text-neutral-600">Managing vacation rentals in CDMX means operating like a hotel. Here's what our full-service management includes, with no hidden costs:</p>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <li key={s} className="flex items-start gap-2.5 text-sm text-neutral-700">
                <span className="mt-0.5 text-maia-strong">✓</span><span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Trust & terms</p>
        <h2 className="mt-3 font-serif text-2xl text-neutral-900 md:text-3xl">Clear rules, long relationships</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-neutral-200 p-6">
              <h3 className="text-sm font-semibold text-neutral-900">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="start" className="bg-maia-dark text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-16 lg:grid-cols-[1fr_460px]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-yellow">Let's start</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Earn more, work less</h2>
            <p className="mt-4 max-w-md text-neutral-300">Tell us about your apartment and we'll get in touch with a free assessment of its rental potential. No commitment.</p>
            <p className="mt-4 text-sm text-neutral-400">
              Prefer WhatsApp?{" "}
              <a href={whatsappUrl("Hi Maia Home, I'd like information about managing my apartment.")} target="_blank" rel="noopener noreferrer" className="font-semibold text-maia-yellow underline">Message us directly</a>
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 text-neutral-900 shadow-sm">
            <OwnerLeadForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">FAQ</p>
        <h2 className="mt-3 font-serif text-2xl text-neutral-900 md:text-3xl">What every owner asks</h2>
        <div className="mt-8 divide-y divide-neutral-200 border-t border-neutral-200">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-neutral-900">
                {q}<span className="text-maia-strong transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-neutral-600">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
