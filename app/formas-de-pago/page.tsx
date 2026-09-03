import type { Metadata } from "next";
import Link from "next/link";
import { whatsappUrl, WHATSAPP_DISPLAY, SUPPORT_EMAIL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Formas de pago",
  description:
    "Opciones de pago en Maia Home: liga de pago con tarjeta (Visa, Mastercard, Amex), transferencia bancaria y pago en línea. Reserva directo con confianza.",
  alternates: { canonical: "/formas-de-pago" },
};

// Ligas de pago reales (tomadas de la página de pago de Maia Home).
const LIGA_WHATSAPP = whatsappUrl("Hola MaiaHome, ¿me pueden enviar una liga para pago, por favor?");
const STRIPE_TARJETA = "https://buy.stripe.com/28o4gicWt1yMbpSaEH"; // liga de pago confirmada por Iris (2026-09-03)

const CONFIANZA = [
  ["Pago 100% seguro", "Los cobros con tarjeta se procesan con Stripe en un entorno cifrado (SSL). Tus datos de tarjeta nunca se almacenan en nuestros servidores."],
  ["Sin comisiones de plataformas", "Al reservar directo con Maia Home obtienes la mejor tarifa, sin cargos de intermediarios."],
  ["Confirmación y factura", "Recibes confirmación por correo al completar el pago y puedes solicitar tu factura fiscal (CFDI)."],
];

const btnYellow = "inline-block rounded-lg bg-maia-yellow px-6 py-3 text-sm font-bold text-black transition hover:bg-maia-strong";

export default function FormasDePago() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Reserva con confianza</p>
      <h1 className="mt-3 font-serif text-4xl text-neutral-900 md:text-5xl">Formas de pago</h1>
      <p className="mt-4 text-lg text-neutral-600">
        Reservas directo y pagas de forma segura. Estas son las opciones disponibles:
      </p>

      {/* 1. Liga de pago con tarjeta */}
      <section className="mt-10 rounded-2xl border border-neutral-200 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-neutral-900">1. Liga de pago con tarjeta bancaria</h2>
          <span className="text-xs font-medium text-neutral-500">Visa · Mastercard · American Express</span>
        </div>
        <p className="mt-1 text-sm text-neutral-600">
          Te enviamos por WhatsApp una liga segura para que pagues con tu tarjeta.
        </p>
        <a href={LIGA_WHATSAPP} target="_blank" rel="noopener noreferrer" className={`mt-4 ${btnYellow}`}>
          Solicitar liga de pago por WhatsApp
        </a>
      </section>

      {/* 2. Transferencia bancaria */}
      <section className="mt-6 rounded-2xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-900">2. Transferencia bancaria</h2>
        <dl className="mt-3 space-y-1 text-sm">
          <div className="flex gap-2"><dt className="w-20 text-neutral-500">Cta BBVA</dt><dd className="font-medium text-neutral-900">0115807069</dd></div>
          <div className="flex gap-2"><dt className="w-20 text-neutral-500">CLABE</dt><dd className="font-medium text-neutral-900">012180001158070695</dd></div>
          <div className="flex gap-2"><dt className="w-20 text-neutral-500">Titular</dt><dd className="font-medium text-neutral-900">Maia Luxury Apartments and Services</dd></div>
        </dl>
        <p className="mt-3 text-xs text-neutral-400">Envíanos tu comprobante por WhatsApp para confirmar tu reserva.</p>
      </section>

      {/* 3. Pago con tarjeta en línea */}
      <section className="mt-6 rounded-2xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-900">3. Pago con tarjeta en línea</h2>
        <p className="mt-1 text-sm text-neutral-600">Paga al instante con tu tarjeta a través de nuestra plataforma segura (Stripe).</p>
        <div className="mt-4">
          <a href={STRIPE_TARJETA} target="_blank" rel="noopener noreferrer" className={btnYellow}>
            Pagar con tarjeta de crédito
          </a>
        </div>
      </section>

      {/* Confianza */}
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

      {/* Ayuda */}
      <section className="mt-10 rounded-2xl bg-[#FBF7EC] p-6 md:p-8">
        <h2 className="font-serif text-2xl text-neutral-900">¿Dudas sobre tu pago o factura?</h2>
        <p className="mt-2 text-neutral-600">Escríbenos y te ayudamos antes, durante y después de tu reserva.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={whatsappUrl("Hola, tengo una duda sobre las formas de pago de Maia Home.")} target="_blank" rel="noopener noreferrer" className={btnYellow}>
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <a href={`mailto:${SUPPORT_EMAIL}`} className={btnYellow}>{SUPPORT_EMAIL}</a>
          <Link href="/facturacion" className={btnYellow}>Solicitar factura</Link>
        </div>
      </section>

      <div className="mt-10">
        <Link href="/departamentos" className="inline-block rounded-full bg-maia-yellow px-7 py-3 text-sm font-bold text-black transition hover:bg-maia-strong">
          Ver departamentos y reservar →
        </Link>
      </div>
    </div>
  );
}
