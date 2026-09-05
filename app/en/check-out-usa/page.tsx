import type { Metadata } from "next";
import Link from "next/link";
import { whatsappUrl, WHATSAPP_DISPLAY } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Check-out process (Houston)",
  description:
    "Maia Home Houston departure guide: check-out by 10:00 and what to check before you leave (windows, trash, appliances, front door).",
  alternates: { canonical: "/en/check-out-usa", languages: { es: "/check-out-usa", en: "/en/check-out-usa" } },
  robots: { index: false, follow: false }, // página operativa post-reserva (no indexar)
};

const POINTS = [
  ["Close all windows properly", "For security and to keep rain out."],
  ["Take the trash to the bins outside", "Before you leave, place the trash bags in the bins located outside the house."],
  ["No need to clean", "But we'll appreciate it if you leave the space tidy."],
  ["Turn off the lights", "Switch off the lights when you leave. Please leave the air conditioning on (due to the humidity, don't turn it off)."],
  ["Close the front door firmly", "Make sure it's securely closed when you leave."],
];

export default function CheckOutUsa() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Before you leave · Houston</p>
      <h1 className="mt-3 font-serif text-4xl text-neutral-900 md:text-5xl">Check-out process</h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600">
        A simple departure to end your stay on a high note. Before you go, please check the following.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Check-out · Houston</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">Until 10:00</p>
          <p className="mt-1 text-xs text-neutral-500">Houston local time.</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Late check-out</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">Ask us</p>
          <p className="mt-1 text-xs text-neutral-500">Subject to availability.</p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-neutral-900">Before you leave, please check:</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {POINTS.map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-neutral-200 border-t-4 border-t-maia-yellow p-5">
              <p className="text-base font-semibold text-neutral-900">{t}</p>
              <p className="mt-1 text-sm text-neutral-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 rounded-2xl bg-[#FBF7EC] p-6 text-center">
        <p className="font-serif text-2xl text-neutral-900">💙 Thank you for choosing Maia Home!</p>
        <p className="mt-1 text-sm text-neutral-600">We hope your stay was extraordinary. Come back soon!</p>
      </div>

      <section className="mt-10 rounded-2xl bg-[#FBF7EC] p-6 md:p-8">
        <h2 className="font-serif text-2xl text-neutral-900">Questions about your departure?</h2>
        <p className="mt-2 text-neutral-600">We're available on WhatsApp for whatever you need.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={whatsappUrl("Hi, I have a question about the check-out for my Maia Home booking (Houston).")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-maia-yellow px-6 py-3 text-sm font-bold text-black transition hover:bg-maia-strong"
          >
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <Link
            href="/en/check-in"
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-white"
          >
            ← See check-in process
          </Link>
        </div>
      </section>
    </div>
  );
}
