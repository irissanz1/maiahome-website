import type { Metadata } from "next";
import Link from "next/link";
import { ogMeta } from "@/lib/og";
import { FAQ_GROUPS, FAQ_FLAT } from "@/lib/faq";
import { whatsappUrl } from "@/lib/contact";

export const metadata: Metadata = {
  ...ogMeta("Preguntas frecuentes", "Todo sobre tu estancia con Maia Home"),
  title: "Preguntas frecuentes",
  description:
    "Respuestas sobre check-in y check-out, mascotas, estacionamiento, Wi-Fi, limpieza, pagos y facturación en los departamentos amueblados de Maia Home en CDMX y Houston.",
  alternates: { canonical: "/preguntas-frecuentes", languages: { "en": "/en/faq" } },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_FLAT.map((it) => ({
    "@type": "Question",
    name: it.q.es,
    acceptedAnswer: { "@type": "Answer", text: it.a.es },
  })),
};

export default function PreguntasFrecuentes() {
  const wa = whatsappUrl("Hola Maia Home, tengo una pregunta sobre mi estancia.");
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Ayuda</p>
      <h1 className="mt-3 font-serif text-4xl text-neutral-900 md:text-5xl">Preguntas frecuentes</h1>
      <p className="mt-4 text-lg text-neutral-600">
        Lo que necesitas saber sobre tu estancia en nuestros departamentos amueblados en Polanco,
        Condesa y Houston. ¿No encuentras tu respuesta? <a href={wa} target="_blank" rel="noopener noreferrer" className="font-medium text-maia-strong underline">Escríbenos por WhatsApp</a>.
      </p>

      <nav aria-label="Categorías" className="mt-8 flex flex-wrap gap-2">
        {FAQ_GROUPS.map((g) => (
          <a key={g.cat.es} href={`#${slug(g.cat.es)}`} className="rounded-full border border-neutral-300 px-3 py-1 text-sm text-neutral-700 transition hover:border-maia-strong hover:text-maia-strong">
            {g.cat.es}
          </a>
        ))}
      </nav>

      <div className="mt-10 space-y-12">
        {FAQ_GROUPS.map((g) => (
          <section key={g.cat.es} id={slug(g.cat.es)} className="scroll-mt-24">
            <h2 className="font-serif text-2xl text-neutral-900">{g.cat.es}</h2>
            <div className="mt-4 divide-y divide-neutral-200 border-t border-neutral-200">
              {g.items.map((it) => (
                <details key={it.q.es} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-neutral-900">
                    <span>{it.q.es}</span>
                    <span className="mt-1 shrink-0 text-maia-strong transition group-open:rotate-45">＋</span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-neutral-600">{it.a.es}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-14 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
        <h2 className="text-lg font-semibold text-neutral-900">¿Listo para reservar?</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Explora nuestros <Link href="/departamentos" className="font-medium text-maia-strong underline">departamentos amueblados</Link>,
          revisa las <Link href="/formas-de-pago" className="font-medium text-maia-strong underline">formas de pago</Link> o
          consulta la <Link href="/facturacion" className="font-medium text-maia-strong underline">facturación (CFDI)</Link>.
          También ofrecemos <Link href="/mensuales" className="font-medium text-maia-strong underline">estancias mensuales</Link> y
          <Link href="/corporativo" className="font-medium text-maia-strong underline"> housing corporativo</Link>.
        </p>
      </section>
    </div>
  );
}

function slug(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
