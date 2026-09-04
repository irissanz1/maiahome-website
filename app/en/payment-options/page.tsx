import type { Metadata } from "next";
import Link from "next/link";
import { whatsappUrl, WHATSAPP_DISPLAY, SUPPORT_EMAIL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Payment options",
  description:
    "Payment options at Maia Home: card payment link (Visa, Mastercard, Amex), bank transfer and online card payment. Book directly with confidence.",
  alternates: { canonical: "/en/payment-options", languages: { es: "/formas-de-pago", en: "/en/payment-options" } },
};

const STRIPE_TARJETA = "https://buy.stripe.com/28o4gicWt1yMbpSaEH";
const CONFIANZA = [
  ["100% secure payment", "Card charges are processed by Stripe in an encrypted environment (SSL). Your card details are never stored on our servers."],
  ["No platform fees", "Booking directly with Maia Home gets you the best rate, with no middleman charges."],
  ["Confirmation & invoice", "You receive an email confirmation once payment is complete, and can request a tax invoice (CFDI)."],
];
const btnYellow = "inline-block rounded-lg bg-maia-yellow px-6 py-3 text-sm font-bold text-black transition hover:bg-maia-strong";

export default function PaymentOptions() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Book with confidence</p>
      <h1 className="mt-3 font-serif text-4xl text-neutral-900 md:text-5xl">Payment options</h1>
      <p className="mt-4 text-lg text-neutral-600">Book directly and pay securely. These are the available options:</p>

      <section className="mt-10 rounded-2xl border border-neutral-200 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-neutral-900">1. Card payment link</h2>
          <span className="text-xs font-medium text-neutral-500">Visa · Mastercard · American Express</span>
        </div>
        <p className="mt-1 text-sm text-neutral-600">We send you a secure link via WhatsApp so you can pay with your card.</p>
        <a
          href={whatsappUrl("Hi, I'd like a payment link for my Maia Home booking, please.")}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-4 ${btnYellow}`}
        >
          Request a payment link on WhatsApp
        </a>
      </section>

      <section className="mt-6 rounded-2xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-900">2. Bank transfer</h2>
        <p className="mt-1 text-sm text-neutral-600">
          For your security, we share the full bank details directly via WhatsApp. We send the account
          and confirm your booking once we receive your payment proof.
        </p>
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">⚠️ Verify it's our account</p>
          <p className="mt-1">We only receive transfers to this account:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li><strong>Bank:</strong> BBVA</li>
            <li><strong>CLABE:</strong> ending in 70695</li>
            <li><strong>Account:</strong> ending in 7069</li>
            <li><strong>Account holder:</strong> Maia Luxury Apartments and Services Mexico S.A. de C.V.</li>
          </ul>
          <p className="mt-2">
            If anyone gives you a different number or account holder, <strong>do not transfer</strong> and
            contact us to confirm.
          </p>
        </div>
        <a
          href={whatsappUrl("Hi, I'd like to pay my Maia Home booking by bank transfer. Could you share the details?")}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-4 ${btnYellow}`}
        >
          Request transfer details on WhatsApp
        </a>
      </section>

      <section className="mt-6 rounded-2xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-900">3. Online card payment</h2>
        <p className="mt-1 text-sm text-neutral-600">Pay instantly with your card through our secure platform (Stripe).</p>
        <div className="mt-4">
          <a href={STRIPE_TARJETA} target="_blank" rel="noopener noreferrer" className={btnYellow}>
            Pay by credit card
          </a>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-neutral-900">Your payment is protected</h2>
        <div className="mt-4 space-y-4">
          {CONFIANZA.map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-neutral-200 p-5">
              <p className="text-sm font-semibold text-neutral-900">{t}</p>
              <p className="mt-1 text-sm text-neutral-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl bg-[#FBF7EC] p-6 md:p-8">
        <h2 className="font-serif text-2xl text-neutral-900">Questions about payment or invoicing?</h2>
        <p className="mt-2 text-neutral-600">Reach out and we'll help you before, during and after your booking.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={whatsappUrl("Hi, I have a question about Maia Home payment options.")} target="_blank" rel="noopener noreferrer" className={btnYellow}>
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <a href={`mailto:${SUPPORT_EMAIL}`} className={btnYellow}>{SUPPORT_EMAIL}</a>
          <Link href="/en/invoicing" className={btnYellow}>Request an invoice</Link>
        </div>
      </section>

      <div className="mt-10">
        <Link href="/en/apartments" className="inline-block rounded-full bg-maia-yellow px-7 py-3 text-sm font-bold text-black transition hover:bg-maia-strong">
          View apartments and book →
        </Link>
      </div>
    </div>
  );
}
