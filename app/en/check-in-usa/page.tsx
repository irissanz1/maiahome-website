import type { Metadata } from "next";
import Link from "next/link";
import { whatsappUrl, WHATSAPP_DISPLAY } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Check-in process (Houston)",
  description:
    "Before you arrive at Maia Home in Houston: complete the check-in form and register all guests to activate your access codes. Send it at least one day before.",
  alternates: { canonical: "/en/check-in-usa", languages: { es: "/check-in-usa", en: "/en/check-in-usa" } },
  robots: { index: false, follow: false }, // página operativa post-reserva (no indexar)
};

// Mismo formulario "Registro cliente" (Zoho Forms) que el check-in general.
const FORM_CHECKIN =
  "https://forms.zohopublic.com/maiahome/form/Registrocliente/formperma/bWjqVFwzm1erKYTem6NblUrmdOVbDVqaB2DgI3yMx6w";

const STEPS = [
  ["1. Fill out the check-in form", "It's required: your details and those of your companions let us activate the access codes. Send it at least one day before your arrival; at minimum, 1 hour before."],
  ["2. We validate your information", "We check that everything is ready to give you access to the house. This step is required before we can share your codes."],
  ["3. You receive your instructions", "Once validated, we send you the exact address, access codes and entry instructions by WhatsApp and email."],
];

export default function CheckInUsa() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Before you arrive · Houston</p>
      <h1 className="mt-3 font-serif text-4xl text-neutral-900 md:text-5xl">Check-in process</h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600">
        To make your arrival simple and secure, we need you to complete the check-in form. It's what
        activates your access codes.
      </p>

      {/* Aviso clave */}
      <div className="mt-6 rounded-2xl border-l-4 border-maia-yellow bg-[#FBF7EC] p-5">
        <p className="text-sm font-semibold text-neutral-900">Important</p>
        <p className="mt-1 text-sm text-neutral-700">
          Without the form we can't activate your access codes. Send it <strong>at least one day
          before</strong> your arrival (or a <strong>minimum of 1 hour before</strong>). Instructions are
          sent <strong>after</strong> we validate your information.
        </p>
        <a
          href="#form"
          className="mt-4 inline-block rounded-lg bg-maia-yellow px-6 py-3 text-sm font-bold text-black transition hover:bg-maia-strong"
        >
          Fill out the check-in form
        </a>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Form</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">Required</p>
          <p className="mt-1 text-xs text-neutral-500">Activates your access codes.</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Send it</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">1 day ahead</p>
          <p className="mt-1 text-xs text-neutral-500">At least 1 hour before arrival.</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Guests</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">Everyone</p>
          <p className="mt-1 text-xs text-neutral-500">Register each person staying.</p>
        </div>
      </div>

      <section className="mt-10 space-y-4">
        {STEPS.map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-neutral-200 p-5">
            <p className="text-sm font-semibold text-neutral-900">{t}</p>
            <p className="mt-1 text-sm text-neutral-600">{d}</p>
          </div>
        ))}
      </section>

      {/* Why we register all guests */}
      <section className="mt-10 rounded-2xl border-l-4 border-maia-yellow bg-[#FBF7EC] p-5">
        <p className="text-sm font-semibold text-neutral-900">🔒 We register all guests</p>
        <p className="mt-1 text-sm text-neutral-700">
          We need the name of <strong>every person</strong> who will be staying. It's not extra
          paperwork: it's a <strong>security measure</strong> that lets us manage access to the house,
          know who is inside in case of an emergency, and comply with the property's and the area's
          security rules. This is how we protect all our guests and the home.
        </p>
        <p className="mt-2 text-sm text-neutral-700">
          Your information is handled <strong>confidentially</strong> and used <strong>only for your
          stay</strong> (see our{" "}
          <Link href="/en/privacy-notice" className="font-semibold text-maia-strong underline">
            Privacy Notice
          </Link>
          ). Thank you for understanding.
        </p>
      </section>

      {/* Pet policy */}
      <section className="mt-6 rounded-2xl border-l-4 border-maia-yellow bg-[#FBF7EC] p-5">
        <p className="text-sm font-semibold text-neutral-900">🐾 Pet policy</p>
        <p className="mt-1 text-sm text-neutral-700">
          We're pet friendly, but every pet must be <strong>declared and approved before</strong> your
          stay. A <strong>pet fee of $50 USD</strong> applies. An <strong>undeclared pet</strong> results
          in an <strong>additional cleaning charge of $90 USD</strong> (the entrance has a security
          camera). Message us and we'll gladly add it to your booking.
        </p>
      </section>

      {/* Formulario de check-in embebido */}
      <section id="form" className="mt-12 scroll-mt-24">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="font-serif text-2xl text-neutral-900">Check-in form</h2>
          <a
            href={FORM_CHECKIN}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-neutral-500 hover:text-maia-strong"
          >
            Open in full screen ↗
          </a>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <iframe
            src={FORM_CHECKIN}
            title="Check-in form — Maia Home"
            className="h-[1600px] w-full"
            loading="lazy"
          />
        </div>
      </section>

      <section className="mt-10 rounded-2xl bg-[#FBF7EC] p-6 md:p-8">
        <h2 className="font-serif text-2xl text-neutral-900">Need help with your arrival?</h2>
        <p className="mt-2 text-neutral-600">Message us on WhatsApp and we'll assist you right away.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={whatsappUrl("Hi, I have a question about the check-in for my Maia Home booking (Houston).")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-maia-yellow px-6 py-3 text-sm font-bold text-black transition hover:bg-maia-strong"
          >
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <Link
            href="/en/check-out-usa"
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-white"
          >
            See check-out process →
          </Link>
        </div>
      </section>
    </div>
  );
}
