import type { Metadata } from "next";
import Link from "next/link";
import { whatsappUrl, WHATSAPP_DISPLAY, SUPPORT_EMAIL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Formas de pago",
  description:
    "Opciones de pago en Maia Home: Visa, Mastercard y American Express procesadas de forma segura con Stripe (cifrado SSL). Reserva directo con confianza.",
  alternates: { canonical: "/formas-de-pago" },
};

const METODOS = [
  ["Tarjetas de crédito y débito", "Visa, Mastercard y American Express."],
  ["Procesado por Stripe", "Pasarela líder a nivel mundial, con cifrado SSL de extremo a extremo."],
  ["Confirmación inmediata", "Recibes la confirmación de tu reserva por correo al completar el pago."],
  ["Facturación disponible", "Solicita tu factura fiscal (CFDI) de forma sencilla."],
];

const CONFIANZA = [
  ["Pago 100% seguro", "El cobro se procesa en el entorno cifrado de Stripe. Tus datos de tarjeta nunca se almacenan en nuestros servidores."],
  ["Sin comisiones de plataformas", "Al reservar directo con Maia Home obtienes la mejor tarifa, sin cargos de intermediarios."],
  ["Política de cancelación clara", "Reembolso escalonado según la anticipación con la que canceles (consulta los términos)."],
];

export default function FormasDePago() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Reserva con confianza</p>
      <h1 className="mt-3 font-serif text-4xl text-neutral-900 md:text-5xl">Formas de pago</h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600">
        En Maia Home reservas directo y pagas de forma segura. Estas son las opciones de pago y las
        garantías con las que protegemos cada transacción.
      </p>

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-neutral-900">Métodos aceptados</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {METODOS.map(([t, d]) => (
            <div key={t} className="flex gap-3 rounded-2xl border border-neutral-200 p-5">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-maia-yellow text-black">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-neutral-900">{t}</p>
                <p className="mt-0.5 text-sm text-neutral-600">{d}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-neutral-400">
          Los pagos se realizan en el motor de reserva seguro al completar tu solicitud. Las tarifas se
          muestran en USD.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-neutral-900">Tu pago está protegido</h2>
        <div className="mt-4 space-y-4">
          {CONFIANZA.map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-neutral-200 p-5">
              <p className="text-sm font-semibold text-neutral-900">{t}</p>
              <p className="mt-1 text-sm text-neutral-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10">
        <Link
          href="/departamentos"
          className="inline-block rounded-full bg-maia-yellow px-7 py-3 text-sm font-bold text-black transition hover:bg-maia-strong"
        >
          Ver departamentos y reservar →
        </Link>
      </div>

      <section className="mt-12 rounded-2xl bg-[#FBF7EC] p-6 md:p-8">
        <h2 className="font-serif text-2xl text-neutral-900">¿Dudas sobre tu pago o factura?</h2>
        <p className="mt-2 text-neutral-600">
          Escríbenos y te ayudamos antes, durante y después de tu reserva.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={whatsappUrl("Hola, tengo una duda sobre las formas de pago de Maia Home.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-maia-yellow px-6 py-3 text-sm font-bold text-black transition hover:bg-maia-strong"
          >
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="rounded-full bg-maia-yellow px-6 py-3 text-sm font-bold text-black transition hover:bg-maia-strong"
          >
            {SUPPORT_EMAIL}
          </a>
          <Link
            href="/facturacion"
            className="rounded-full bg-maia-yellow px-6 py-3 text-sm font-bold text-black transition hover:bg-maia-strong"
          >
            Solicitar factura
          </Link>
        </div>
      </section>
    </div>
  );
}
