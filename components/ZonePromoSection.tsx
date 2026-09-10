import Link from "next/link";
import { ZONAS } from "@/lib/market";
import { withLang, type Lang } from "@/lib/i18n";

type Intent = "monthly" | "corporate";

const BASE = "https://maiahome.mx";

// Texto por intención + idioma. Centralizado para no duplicar copy entre las 4 páginas.
const COPY: Record<Intent, Record<Lang, {
  breadcrumb: string;
  breadcrumbPath: string;
  zoneHeading: string;
  zoneAnchor: (zona: string) => string;
  body: string;
  links: { label: string; href: string }[];
}>> = {
  monthly: {
    es: {
      breadcrumb: "Estancias mensuales",
      breadcrumbPath: "/mensuales",
      zoneHeading: "Renta mensual por zona",
      zoneAnchor: (z) => `Departamentos amueblados por mes en ${z}`,
      body:
        "Nuestras estancias mensuales son ideales para relocations, nómadas digitales, tratamientos médicos o simplemente para vivir la ciudad sin las complicaciones de un contrato tradicional. Reservas directo, pagas con tarifa preferencial por 30 noches o más, y llegas a un departamento amueblado y equipado desde el primer día.",
      links: [
        { label: "Vivienda corporativa", href: "/corporativo" },
        { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
        { label: "Formas de pago", href: "/formas-de-pago" },
        { label: "Ver todos los departamentos", href: "/departamentos" },
      ],
    },
    en: {
      breadcrumb: "Monthly stays",
      breadcrumbPath: "/en/monthly-stays",
      zoneHeading: "Monthly rentals by area",
      zoneAnchor: (z) => `Furnished apartments by the month in ${z}`,
      body:
        "Our monthly stays are ideal for relocations, digital nomads, medical treatments or simply living the city without the hassle of a traditional lease. Book directly, pay a preferential rate for 30 nights or more, and move into a fully furnished, equipped apartment from day one.",
      links: [
        { label: "Corporate housing", href: "/en/corporate-housing" },
        { label: "Frequently asked questions", href: "/en/faq" },
        { label: "Payment options", href: "/en/payment-options" },
        { label: "View all apartments", href: "/en/apartments" },
      ],
    },
  },
  corporate: {
    es: {
      breadcrumb: "Vivienda corporativa",
      breadcrumbPath: "/corporativo",
      zoneHeading: "Vivienda corporativa por zona",
      zoneAnchor: (z) => `Alojamiento corporativo en ${z}`,
      body:
        "Alojamiento corporativo para relocations, proyectos y viajes de negocio en las mejores zonas de la Ciudad de México y Houston. Un solo contacto para reservas, cambios y facturación empresarial, con departamentos cerca de torres corporativas, oficinas y el Medical Center de Houston, y convenios para estancias recurrentes.",
      links: [
        { label: "Estancias mensuales", href: "/mensuales" },
        { label: "Facturación (CFDI)", href: "/facturacion" },
        { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
        { label: "Ver todos los departamentos", href: "/departamentos" },
      ],
    },
    en: {
      breadcrumb: "Corporate housing",
      breadcrumbPath: "/en/corporate-housing",
      zoneHeading: "Corporate housing by area",
      zoneAnchor: (z) => `Corporate housing in ${z}`,
      body:
        "Corporate housing in Mexico City and Houston for relocations, projects and business travel in the best areas. A single point of contact for bookings, changes and company invoicing, with apartments near corporate towers, offices and Houston's Medical Center, plus agreements for recurring stays.",
      links: [
        { label: "Monthly stays", href: "/en/monthly-stays" },
        { label: "Invoicing (CFDI)", href: "/en/invoicing" },
        { label: "Frequently asked questions", href: "/en/faq" },
        { label: "View all apartments", href: "/en/apartments" },
      ],
    },
  },
};

export default function ZonePromoSection({ intent, lang }: { intent: Intent; lang: Lang }) {
  const c = COPY[intent][lang];
  const zonas = Object.values(ZONAS);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "es" ? "Inicio" : "Home", item: `${BASE}${lang === "es" ? "/" : "/en"}` },
      { "@type": "ListItem", position: 2, name: c.breadcrumb, item: `${BASE}${c.breadcrumbPath}` },
    ],
  };

  return (
    <section className="border-t border-neutral-200 bg-neutral-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="mx-auto max-w-5xl px-5 py-14">
        <h2 className="font-serif text-2xl text-neutral-900 md:text-3xl">{c.zoneHeading}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {zonas.map((z) => (
            <Link
              key={z.slug}
              href={withLang(lang, `/${z.slug}`)}
              className="group rounded-2xl border border-neutral-200 bg-white p-5 transition hover:border-maia-strong"
            >
              <span className="block font-serif text-lg text-neutral-900">{z.nombre}</span>
              <span className="mt-1 block text-sm text-neutral-600">{c.zoneAnchor(z.nombre)}</span>
              <span className="mt-3 inline-block text-sm font-semibold text-maia-strong group-hover:underline">
                {lang === "es" ? "Ver disponibilidad →" : "See availability →"}
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-8 max-w-3xl leading-relaxed text-neutral-600">{c.body}</p>

        <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
          {c.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="font-medium text-maia-strong underline">{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
