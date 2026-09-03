import type { Metadata } from "next";
import Link from "next/link";
import { whatsappUrl, WHATSAPP_DISPLAY } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Proceso de check-out",
  description:
    "Guía de salida de Maia Home: horario de check-out y qué revisar antes de irte (ventanas, equipos, puerta principal).",
  alternates: { canonical: "/check-out" },
};

const PUNTOS = [
  ["Cierra bien todas las ventanas", "Por seguridad y para evitar que entre agua."],
  ["No es necesario limpiar", "Pero te agradeceremos que dejes el espacio ordenado."],
  ["Apaga todos los equipos", "Especialmente el calentador eléctrico, el aire acondicionado y las luces."],
  ["Cierra bien la puerta principal", "Para asegurarla, toca la chapa con la palma de tu mano hasta escuchar un clic."],
];

export default function CheckOut() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Antes de tu salida</p>
      <h1 className="mt-3 font-serif text-4xl text-neutral-900 md:text-5xl">Proceso de check-out</h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600">
        Una salida sencilla para cerrar tu estancia con broche de oro. Antes de irte, por favor revisa
        lo siguiente.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Salida</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">Hasta 11:00 h</p>
          <p className="mt-1 text-xs text-neutral-500">Late check-out sujeto a disponibilidad (consúltanos).</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Al salir</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">4 pasos rápidos</p>
          <p className="mt-1 text-xs text-neutral-500">Sin trámites: solo asegura el departamento.</p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-neutral-900">Antes de salir, por favor revisa:</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PUNTOS.map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-neutral-200 border-t-4 border-t-maia-yellow p-5">
              <p className="text-base font-semibold text-neutral-900">{t}</p>
              <p className="mt-1 text-sm text-neutral-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 rounded-2xl bg-[#FBF7EC] p-6 text-center">
        <p className="font-serif text-2xl text-neutral-900">💙 ¡Gracias por elegir Maia Home!</p>
        <p className="mt-1 text-sm text-neutral-600">Esperamos que tu estancia haya sido extraordinaria. ¡Vuelve pronto!</p>
      </div>

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
