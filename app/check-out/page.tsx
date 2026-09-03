import type { Metadata } from "next";
import Link from "next/link";
import { whatsappUrl, WHATSAPP_DISPLAY } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Proceso de check-out",
  description:
    "Guía de salida de Maia Home: horario de check-out, qué hacer antes de irte y cómo pedir late check-out.",
  alternates: { canonical: "/check-out" },
};

const PASOS = [
  ["1. Antes de salir", "Cierra ventanas, apaga luces y aire acondicionado, y asegúrate de no olvidar tus pertenencias."],
  ["2. Llaves y acceso", "Sigue las instrucciones de tu guía para dejar las llaves o cerrar el acceso al salir."],
  ["3. ¿Algo que reportar?", "Si algo necesita atención, avísanos por WhatsApp. Nos encanta saber cómo estuvo tu estancia."],
];

export default function CheckOut() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Antes de tu salida</p>
      <h1 className="mt-3 font-serif text-4xl text-neutral-900 md:text-5xl">Proceso de check-out</h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600">
        Una salida sencilla para cerrar tu estancia con broche de oro. Esto es lo que necesitas saber.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Salida</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">Hasta 11:00 h</p>
          <p className="mt-1 text-xs text-neutral-500">Late check-out sujeto a disponibilidad (consúltanos).</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Al salir</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">Cierra y listo</p>
          <p className="mt-1 text-xs text-neutral-500">Sin trámites complicados: sigue tu guía de salida.</p>
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
        <h2 className="font-serif text-2xl text-neutral-900">¿Dudas con tu salida?</h2>
        <p className="mt-2 text-neutral-600">Estamos disponibles por WhatsApp para lo que necesites.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={whatsappUrl("Hola, tengo una duda sobre el check-out de mi reserva en Maia Home.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-maia-yellow px-6 py-3 text-sm font-bold text-black transition hover:bg-maia-strong"
          >
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <Link
            href="/check-in"
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-white"
          >
            ← Ver proceso de check-in
          </Link>
        </div>
      </section>
    </div>
  );
}
