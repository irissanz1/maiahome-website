import type { Metadata } from "next";
import Link from "next/link";
import { WHATSAPP_DISPLAY, PHONE_DISPLAY, SUPPORT_EMAIL, whatsappUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "La historia de Maia Home: departamentos amueblados premium en el corazón de la Ciudad de México y Houston, con hospitalidad auténtica y compromiso con la comunidad.",
  alternates: { canonical: "/nosotros" },
};

const PILARES = [
  {
    t: "El confort de un hogar",
    d: "Espacios amueblados, cuidados y listos para vivir, con la calidez de un lugar propio.",
  },
  {
    t: "El servicio de un hotel",
    d: "Atención humana y directa, antes y durante tu estancia. Reserva directo, sin intermediarios.",
  },
  {
    t: "La ciudad desde adentro",
    d: "Ubicaciones privilegiadas y la mirada de un local para descubrir lo auténtico de la ciudad.",
  },
];

const METRICAS = [
  ["40", "Departamentos únicos"],
  ["+5,000", "Estancias memorables"],
  ["4.8★", "Calificación promedio"],
  ["+75", "Iniciativas locales apoyadas"],
];

const ZONAS = [
  ["Polanco", "polanco", "El corazón cultural y gastronómico de la ciudad."],
  ["Condesa", "condesa", "Bohemia, arbolada y siempre viva."],
  ["Houston", "houston", "Confort y ubicación para tu estancia en Texas."],
];

export default function Nosotros() {
  return (
    <>
      {/* Hero a sangre completa */}
      <section className="relative flex min-h-[68vh] items-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/hero-03.jpg"
          alt="Departamento Maia Home"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 md:pb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-yellow">
            Nuestra historia
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.08] text-white md:text-6xl">
            Lujo <span className="italic text-maia-yellow">auténtico</span> en el corazón de la
            Ciudad de México
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-200">
            Cada departamento es una puerta de entrada a la cultura, los ritmos y las historias de la
            ciudad. No solo un lugar para dormir: una forma de pertenecer.
          </p>
        </div>
      </section>

      {/* La historia */}
      <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-strong">
          Un legado de hospitalidad
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-neutral-900 md:text-4xl">
          Nacimos para transformar la forma de hospedarse
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-neutral-600">
          <p>
            Maia Home nació de una convicción: que hospedarse en la Ciudad de México debería sentirse
            como pertenecer a ella. Por eso creamos estancias que combinan el confort de un hogar con
            el servicio atento de un hotel, en los barrios que mejor cuentan la historia de la ciudad.
          </p>
          <p>
            Cada espacio está cuidadosamente diseñado para reflejar la riqueza histórica y el estilo
            contemporáneo de Polanco y la Condesa. Más que cuatro paredes, son escenarios pensados
            para que vivas la ciudad desde adentro, con la mirada de un local.
          </p>
          <p>
            Desde una noche hasta una estancia de varios meses, nuestra misión es la misma: que cada
            huésped se sienta en casa y se vaya con la ciudad en la piel.
          </p>
        </div>
      </section>

      {/* Pilares */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PILARES.map((p) => (
              <div key={p.t} className="rounded-2xl border border-neutral-200 bg-white p-7">
                <h3 className="font-serif text-xl text-neutral-900">{p.t}</h3>
                <p className="mt-3 leading-relaxed text-neutral-600">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banda de impacto */}
      <section className="bg-maia-dark text-white">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-maia-yellow">
            Nuestro impacto
          </p>
          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
            {METRICAS.map(([n, l]) => (
              <div key={l} className="text-center">
                <p className="font-serif text-4xl font-bold md:text-5xl">{n}</p>
                <p className="mt-2 text-sm text-neutral-400">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compromiso social */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-16 md:py-24 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero/hero-08.jpg" alt="Comunidad y cultura de la Ciudad de México" className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-strong">
            Compromiso social
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-neutral-900 md:text-4xl">
            Cada reserva deja huella
          </h2>
          <div className="mt-5 space-y-4 leading-relaxed text-neutral-600">
            <p>
              En Maia Home creemos que la hospitalidad trasciende nuestras puertas. Cada reserva
              contribuye a programas de educación y salud en nuestra comunidad, fortaleciendo el
              tejido social y económico de la Ciudad de México.
            </p>
            <p>
              Somos también una plataforma para el talento y la cultura mexicana: enriquecemos cada
              estancia con experiencias auténticas y devolvemos a la ciudad parte de lo que nos da.
            </p>
          </div>
          <a
            href="https://grupoaltia.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm font-semibold text-maia-dark underline decoration-maia-strong decoration-2 underline-offset-4 hover:text-maia-strong"
          >
            Conoce nuestra labor social →
          </a>
        </div>
      </section>

      {/* Zonas */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-strong">
            Dónde estamos
          </p>
          <h2 className="mt-3 font-serif text-3xl text-neutral-900 md:text-4xl">
            En los mejores barrios, siempre cerca de todo
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {ZONAS.map(([nombre, slug, desc]) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="group rounded-2xl border border-neutral-200 bg-white p-7 transition hover:border-maia-strong hover:shadow-md"
              >
                <h3 className="font-serif text-2xl text-neutral-900">{nombre}</h3>
                <p className="mt-2 text-neutral-600">{desc}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-maia-strong">
                  Ver departamentos →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + contacto */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-3xl bg-maia-dark px-8 py-14 text-center text-white">
          <h2 className="font-serif text-3xl md:text-4xl">
            ¿Listo para vivir <span className="italic text-maia-yellow">extraordinario</span>?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-neutral-300">
            Descubre nuestros departamentos disponibles o escríbenos: estaremos encantados de
            ayudarte a planear tu estancia.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/departamentos"
              className="rounded-full bg-maia-yellow px-7 py-3 text-sm font-semibold text-black transition hover:bg-maia-strong"
            >
              Ver departamentos
            </Link>
            <a
              href={whatsappUrl("Hola Maia Home, me gustaría más información.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Escríbenos por WhatsApp
            </a>
          </div>
          <p className="mt-6 text-sm text-neutral-400">
            {WHATSAPP_DISPLAY} · {PHONE_DISPLAY} ·{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="underline hover:text-white">
              {SUPPORT_EMAIL}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
