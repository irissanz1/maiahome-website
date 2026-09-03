import type { Metadata } from "next";
import Link from "next/link";
import { whatsappUrl, WHATSAPP_DISPLAY } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Proceso de check-in",
  description:
    "Todo lo que necesitas saber para tu llegada a Maia Home: horario de entrada, acceso autoguiado, qué llevar y cómo pedir ayuda.",
  alternates: { canonical: "/check-in" },
};

const PASOS = [
  ["1. Antes de llegar", "Un día antes recibirás por WhatsApp y correo la dirección exacta y las instrucciones de acceso a tu departamento."],
  ["2. Tu llegada", "Check-in autoguiado a partir de las 15:00 h. Te guiamos paso a paso; si prefieres, un anfitrión puede recibirte."],
  ["3. Al entrar", "Encontrarás el WiFi, la guía del departamento y todo listo para tu estancia. Cualquier duda, estamos a un mensaje."],
];

export default function CheckIn() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Antes de tu llegada</p>
      <h1 className="mt-3 font-serif text-4xl text-neutral-900 md:text-5xl">Proceso de check-in</h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600">
        Queremos que tu llegada sea simple y sin contratiempos. Así funciona el check-in en Maia Home.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Entrada</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">Desde 15:00 h</p>
          <p className="mt-1 text-xs text-neutral-500">Early check-in sujeto a disponibilidad.</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Acceso</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">Autoguiado</p>
          <p className="mt-1 text-xs text-neutral-500">Instrucciones enviadas antes de tu llegada.</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Necesitas</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">Identificación</p>
          <p className="mt-1 text-xs text-neutral-500">Reserva confirmada e ID oficial.</p>
        </div>
      </div>

      <section className="mt-10 space-y-4">
        {PASOS.map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-neutral-200 p-5">
            <p className="text-sm font-semibold text-neutral-900">{t}</p>
            <p className="mt-1 text-sm text-neutral-600">{d}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-2xl bg-[#FBF7EC] p-6 md:p-8">
        <h2 className="font-serif text-2xl text-neutral-900">¿Necesitas ayuda con tu llegada?</h2>
        <p className="mt-2 text-neutral-600">Escríbenos por WhatsApp y te asistimos en el momento.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={whatsappUrl("Hola, tengo una duda sobre el check-in de mi reserva en Maia Home.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-maia-yellow px-6 py-3 text-sm font-bold text-black transition hover:bg-maia-strong"
          >
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <Link
            href="/check-out"
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-white"
          >
            Ver proceso de check-out →
          </Link>
        </div>
      </section>
    </div>
  );
}
