import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Maia Home ofrece departamentos amueblados premium en CDMX y Houston, con reserva directa y atención personal. Conoce nuestra historia.",
  alternates: { canonical: "/nosotros" },
};

const VALUES = [
  { t: "Cercanía", d: "Atención humana y directa, antes y durante tu estancia." },
  { t: "Calidad", d: "Espacios cuidados, amueblados y listos para vivir." },
  { t: "Transparencia", d: "Reserva directa, mejor tarifa y sin sorpresas." },
];

export default function Nosotros() {
  return (
    <>
      <section className="border-b border-neutral-100 bg-gradient-to-b from-neutral-50 to-white">
        <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">
            Nosotros
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-neutral-900 md:text-5xl">
            Un lugar para vivir extraordinario
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-600">
            Maia Home nació para ofrecer estancias amuebladas con el confort de un hogar y el
            servicio de un hotel. Seleccionamos departamentos en las mejores zonas de la Ciudad de
            México —Polanco y Condesa— y en Houston, Texas, para viajeros, familias y empresas que
            buscan algo mejor que lo de siempre.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.t} className="rounded-2xl border border-neutral-200 p-6">
              <h2 className="font-serif text-2xl text-neutral-900">{v.t}</h2>
              <p className="mt-2 text-neutral-600">{v.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-maia-dark px-8 py-12 text-center text-white">
          <h2 className="font-serif text-3xl">¿Listo para tu próxima estancia?</h2>
          <p className="mt-2 text-neutral-300">Explora nuestros departamentos disponibles.</p>
          <Link
            href="/departamentos"
            className="mt-6 inline-block rounded-full bg-maia-yellow px-6 py-3 text-sm font-semibold text-black transition hover:bg-maia-strong"
          >
            Ver departamentos
          </Link>
        </div>
      </section>
    </>
  );
}
