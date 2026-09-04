import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoicing",
  description:
    "Request the tax invoice (CFDI) for your stay with Maia Home. Fill in the form with your tax details and receive it by email.",
  alternates: { canonical: "/en/invoicing", languages: { es: "/facturacion", en: "/en/invoicing" } },
};

const CASES = [
  { t: "I booked directly with Maia Home", d: "Fill in the form on this page with your tax details." },
  { t: "I booked via Airbnb, Booking or Vrbo", d: "We still issue your invoice: fill in the form with your tax details and attach your payment receipt." },
  { t: "I need an invoice for a company", d: "Enter the company's legal name and tax details in the form." },
];
const HAVE_READY = ["Tax ID (RFC) and legal name", "Proof of tax status", "CFDI use", "Email to receive the invoice", "Image of your payment receipt"];

export default function Invoicing() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="font-serif text-4xl text-neutral-900">Request your invoice</h1>
      <p className="mt-2 max-w-xl text-neutral-600">
        Generate the tax invoice (CFDI) for your stay with Maia Home. Fill in the form and you'll receive it by email.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
        {CASES.map((c) => (
          <div key={c.t} className="rounded-xl border border-neutral-200 p-4">
            <p className="text-sm font-semibold text-neutral-900">{c.t}</p>
            <p className="mt-1 text-sm text-neutral-600">{c.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        <div className="order-2 lg:order-1">
          <h2 className="mb-3 font-serif text-2xl text-neutral-900">Invoicing form</h2>
          <div className="overflow-hidden rounded-2xl border border-neutral-200">
            <iframe title="Maia Home invoicing form" src="https://zfrmz.com/gmPyMEhv7MaLZFgTj6UR" className="h-[900px] w-full" />
          </div>
        </div>
        <aside className="order-1 space-y-6 lg:order-2">
          <div className="rounded-2xl bg-neutral-50 p-5">
            <h3 className="font-semibold text-neutral-900">Have ready</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              {HAVE_READY.map((h) => (
                <li key={h} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-maia-strong" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            <p className="font-semibold">Deadline</p>
            <p className="mt-1">Request your invoice within the <b>same calendar month</b> of your payment. We issue it within <b>1 to 3 business days</b>.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
