import type { Metadata } from "next";
import Link from "next/link";
import { ogMeta } from "@/lib/og";
import { FAQ_GROUPS, FAQ_FLAT } from "@/lib/faq";
import { whatsappUrl } from "@/lib/contact";

export const metadata: Metadata = {
  ...ogMeta("Frequently asked questions", "Everything about your Maia Home stay", "en_US"),
  title: "Frequently asked questions",
  description:
    "Answers about check-in and check-out, pets, parking, Wi-Fi, cleaning, payments and invoicing at Maia Home's furnished apartments in Mexico City and Houston.",
  alternates: { canonical: "/en/faq", languages: { "es": "/preguntas-frecuentes" } },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_FLAT.map((it) => ({
    "@type": "Question",
    name: it.q.en,
    acceptedAnswer: { "@type": "Answer", text: it.a.en },
  })),
};

export default function Faq() {
  const wa = whatsappUrl("Hi Maia Home, I have a question about my stay.");
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Help</p>
      <h1 className="mt-3 font-serif text-4xl text-neutral-900 md:text-5xl">Frequently asked questions</h1>
      <p className="mt-4 text-lg text-neutral-600">
        What you need to know about your stay in our furnished apartments in Polanco, Condesa and
        Houston. Can't find your answer? <a href={wa} target="_blank" rel="noopener noreferrer" className="font-medium text-maia-strong underline">Message us on WhatsApp</a>.
      </p>

      <nav aria-label="Categories" className="mt-8 flex flex-wrap gap-2">
        {FAQ_GROUPS.map((g) => (
          <a key={g.cat.en} href={`#${slug(g.cat.en)}`} className="rounded-full border border-neutral-300 px-3 py-1 text-sm text-neutral-700 transition hover:border-maia-strong hover:text-maia-strong">
            {g.cat.en}
          </a>
        ))}
      </nav>

      <div className="mt-10 space-y-12">
        {FAQ_GROUPS.map((g) => (
          <section key={g.cat.en} id={slug(g.cat.en)} className="scroll-mt-24">
            <h2 className="font-serif text-2xl text-neutral-900">{g.cat.en}</h2>
            <div className="mt-4 divide-y divide-neutral-200 border-t border-neutral-200">
              {g.items.map((it) => (
                <details key={it.q.en} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-neutral-900">
                    <span>{it.q.en}</span>
                    <span className="mt-1 shrink-0 text-maia-strong transition group-open:rotate-45">＋</span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-neutral-600">{it.a.en}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-14 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
        <h2 className="text-lg font-semibold text-neutral-900">Ready to book?</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Explore our <Link href="/en/apartments" className="font-medium text-maia-strong underline">furnished apartments</Link>,
          review the <Link href="/en/payment-options" className="font-medium text-maia-strong underline">payment options</Link> or
          check <Link href="/en/invoicing" className="font-medium text-maia-strong underline">invoicing (CFDI)</Link>.
          We also offer <Link href="/en/monthly-stays" className="font-medium text-maia-strong underline">monthly stays</Link> and
          <Link href="/en/corporate-housing" className="font-medium text-maia-strong underline"> corporate housing</Link>.
        </p>
      </section>
    </div>
  );
}

function slug(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
