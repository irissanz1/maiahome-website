import type { Metadata } from "next";
import Link from "next/link";
import { WHATSAPP_DISPLAY, PHONE_DISPLAY, SUPPORT_EMAIL, whatsappUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Hospitalidad con propósito en el corazón de la CDMX. Maia Home: departamentos curados, anfitriones reales y un compromiso permanente con la comunidad.",
  alternates: { canonical: "/nosotros" },
};

const VISION = [
  {
    t: "Espacios cuidados",
    d: "Departamentos curados con piezas locales, ropa de cama de calidad y un mantenimiento meticuloso. Nada genérico, nada al azar.",
  },
  {
    t: "Anfitriones reales",
    d: "Atención humana, en español e inglés, antes y durante tu estancia. Recomendaciones honestas, no listas turísticas.",
  },
  {
    t: "Conexión con la ciudad",
    d: "Cada departamento es una puerta a un barrio vivo: cafés, librerías, mercados, talleres. Vivir la CDMX como un local.",
  },
];

const METRICAS = [
  ["40", "Departamentos curados"],
  ["+5,000", "Estancias memorables"],
  ["4.8★", "Promedio de reseñas"],
  ["+75", "Iniciativas locales apoyadas"],
];

export default function Nosotros() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[68vh] items-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero/hero-03.jpg" alt="Departamento Maia Home en CDMX" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 md:pb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-yellow">Nosotros</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.08] text-white md:text-6xl">
            Hospitalidad con <span className="italic text-maia-yellow">propósito</span> en el corazón
            de la CDMX
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-200">
            Maia Home no es solo una colección de departamentos amueblados. Es una manera de habitar
            la Ciudad de México con cuidado por el lugar, las personas y la comunidad que la sostiene.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/departamentos" className="rounded-full bg-maia-yellow px-6 py-3 text-sm font-semibold text-black transition hover:bg-maia-strong">
              Ver departamentos
            </Link>
            <a href={whatsappUrl("Hola Maia Home, me gustaría más información.")} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Hablemos →
            </a>
          </div>
        </div>
      </section>

      {/* Manifiesto */}
      <section className="bg-maia-dark text-white">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-yellow">Manifiesto</p>
          <p className="mt-6 font-serif text-2xl leading-snug md:text-3xl">
            Creemos en una hospitalidad que no extrae, sino que devuelve. Que cuida el barrio, escucha
            a sus vecinos y abre la ciudad sin atropellarla.
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-neutral-400">
            Maia Home — CDMX · Polanco · Condesa
          </p>
        </div>
      </section>

      {/* Nuestra historia */}
      <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-strong">Nuestra historia</p>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-neutral-900 md:text-4xl">
          Una casa con historia, hecha en la ciudad
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-neutral-600">
          <p>
            Maia Home nació de una idea sencilla: que quedarse en CDMX se sienta como vivir aquí, no
            como mirar la ciudad desde un hotel. Cada departamento se piensa, decora y opera con
            personas locales que entienden el ritmo del barrio.
          </p>
          <p>
            Empezamos en Polanco y crecimos hacia la Condesa, manteniendo siempre la misma promesa:
            pocos espacios, muy bien cuidados, anfitriones reales y un compromiso permanente con la
            comunidad que nos rodea.
          </p>
        </div>
        <blockquote className="mt-8 border-l-4 border-maia-strong pl-5 font-serif text-2xl italic text-neutral-800">
          “Hechos en CDMX, para quien quiere vivirla de verdad.”
        </blockquote>
      </section>

      {/* Visión */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-strong">Visión</p>
          <h2 className="mt-3 font-serif text-3xl text-neutral-900 md:text-4xl">
            Nuestra idea de hospitalidad
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {VISION.map((v) => (
              <div key={v.t} className="rounded-2xl border border-neutral-200 bg-white p-7">
                <h3 className="font-serif text-xl text-neutral-900">{v.t}</h3>
                <p className="mt-3 leading-relaxed text-neutral-600">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comunidad */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-16 md:py-24 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:order-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero/hero-08.jpg" alt="Barrios de la Ciudad de México" className="h-full w-full object-cover" />
        </div>
        <div className="lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-strong">Comunidad</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-neutral-900 md:text-4xl">
            La ciudad es nuestra casa. Cuidarla, también.
          </h2>
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">Trabajamos con vecinos, no contra ellos</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Compras a comercios cercanos, limpieza con equipos locales, mantenimiento con técnicos
                del barrio. Nuestra operación deja en CDMX la mayor parte de lo que genera, porque un
                barrio sano es lo que hace memorable una estancia.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">Una plataforma para el talento mexicano</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Más que un alojamiento, una invitación a habitar la ciudad con curiosidad y respeto.
                Cada estancia recomienda diseño, artesanía, gastronomía y cultura que conocemos de
                cerca, no porque sean famosas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="bg-maia-dark text-white">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-maia-yellow">
            Maia Home en números
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

      {/* Propósito — Fundación Altía */}
      <section className="mx-auto max-w-3xl px-5 py-16 md:py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-strong">Propósito</p>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-neutral-900 md:text-4xl">
          Hospedarte aquí es también acompañar a Fundación Altía
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-neutral-600">
          Una parte de cada estancia se destina al trabajo de la fundación con niñas, niños y
          comunidades en situación vulnerable de la Ciudad de México. No es marketing: es la manera en
          la que entendemos lo que significa abrir las puertas de un lugar. Hospedar implica también
          devolver.
        </p>
        <a
          href="https://grupoaltia.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-sm font-semibold text-maia-dark underline decoration-maia-strong decoration-2 underline-offset-4 hover:text-maia-strong"
        >
          Conoce Fundación Altía →
        </a>
        <p className="mt-10 font-serif text-2xl italic text-neutral-800">“Gracias por hospedarte con nosotros.”</p>
      </section>

      {/* Contacto */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="rounded-3xl bg-maia-dark px-8 py-14 text-center text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-yellow">Contacto</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Hablemos. Nos encantará escucharte.</h2>
            <p className="mx-auto mt-3 max-w-xl text-neutral-300">
              Recomendaciones, dudas, una colaboración o simplemente un hola. Escríbenos y respondemos
              personalmente.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={whatsappUrl("Hola Maia Home, me gustaría más información.")} target="_blank" rel="noopener noreferrer" className="rounded-full bg-maia-yellow px-7 py-3 text-sm font-semibold text-black transition hover:bg-maia-strong">
                Escríbenos por WhatsApp
              </a>
              <Link href="/departamentos" className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Ver departamentos
              </Link>
            </div>
            <p className="mt-6 text-sm text-neutral-400">
              {WHATSAPP_DISPLAY} · {PHONE_DISPLAY} ·{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="underline hover:text-white">{SUPPORT_EMAIL}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
