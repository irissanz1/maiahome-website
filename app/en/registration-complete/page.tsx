import type { Metadata } from "next";
import Link from "next/link";
import { whatsappUrl, WHATSAPP_DISPLAY, SUPPORT_EMAIL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Registration complete!",
  description: "Thanks for completing your registration at Maia Home. Here's what happens next before your arrival.",
  alternates: { canonical: "/en/registration-complete", languages: { es: "/registro-cliente", en: "/en/registration-complete" } },
  robots: { index: false, follow: false }, // página post-formulario (privada, no indexar)
};

const STEPS = [
  ["🔑", "Access to the apartment", "We'll send you the exact address, your access codes and step-by-step entry instructions."],
  ["🛎️", "Amenities and services", "Details of what you'll find in the apartment (WiFi, equipped kitchen, amenities) so you can plan your trip."],
  ["💬", "Always available", "Any questions before or during your stay, message us on WhatsApp and we'll help you right away."],
];

const DISCOVER = [
  ["City guide", "Museums, markets, neighborhoods and the best of Mexico City.", "/en/blog"],
  ["Tours & experiences", "Activities and tours for your stay.", "/en/mexico-city-tours"],
  ["Explore the neighborhoods", "Curated recommendations near your apartment.", "https://explore.maiahome.mx"],
];

const btn = "inline-block rounded-lg bg-maia-yellow px-6 py-3 text-sm font-bold text-black transition hover:bg-maia-strong";

export default function RegistrationComplete() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14 md:py-16">
      <div className="text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-maia-yellow text-black">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h1 className="mt-5 font-serif text-4xl text-neutral-900 md:text-5xl">Registration complete!</h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-neutral-600">
          Thank you for completing your registration. We're delighted to welcome you to Maia Home and
          can't wait for you to enjoy your stay.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-neutral-900 md:text-3xl">What happens next?</h2>
        <p className="mt-2 max-w-2xl text-neutral-600">
          Within <strong>24 hours</strong> you'll receive an email with everything you need for your arrival:
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STEPS.map(([icon, t, d]) => (
            <div key={t} className="rounded-2xl border border-neutral-200 p-5">
              <span className="text-2xl" aria-hidden="true">{icon}</span>
              <p className="mt-2 text-base font-semibold text-neutral-900">{t}</p>
              <p className="mt-1 text-sm text-neutral-600">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border-l-4 border-maia-yellow bg-[#FBF7EC] p-4 text-sm text-neutral-700">
          Check your inbox (and your spam folder). If it doesn't arrive or you need help, message us and
          we'll gladly sort it out.
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-neutral-900 md:text-3xl">While you wait, discover the best of the area</h2>
        <p className="mt-2 max-w-2xl text-neutral-600">
          We've put together recommendations for attractions, restaurants and activities near your
          apartment. Get inspired and start planning your trip.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {DISCOVER.map(([t, d, href]) => {
            const external = href.startsWith("http");
            const cls = "group block rounded-2xl border border-neutral-200 p-5 transition hover:border-maia-strong hover:shadow-sm";
            const inner = (
              <>
                <p className="text-base font-semibold text-neutral-900">{t}</p>
                <p className="mt-1 text-sm text-neutral-600">{d}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-maia-strong">See more →</span>
              </>
            );
            return external ? (
              <a key={t} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
            ) : (
              <Link key={t} href={href} className={cls}>{inner}</Link>
            );
          })}
        </div>
      </section>

      <section className="mt-12 rounded-2xl bg-[#FBF7EC] p-6 text-center md:p-8">
        <h2 className="font-serif text-2xl text-neutral-900">Any questions?</h2>
        <p className="mt-2 text-neutral-600">We're here to help before, during and after your stay.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a href={whatsappUrl("Hi, I just completed my registration at Maia Home and I have a question.")} target="_blank" rel="noopener noreferrer" className={btn}>
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <a href={`mailto:${SUPPORT_EMAIL}`} className={btn}>{SUPPORT_EMAIL}</a>
        </div>
      </section>
    </div>
  );
}
