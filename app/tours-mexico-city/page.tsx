import type { Metadata } from "next";
import Link from "next/link";
import GygWidget from "@/components/GygWidget";

export const metadata: Metadata = {
  title: "Tours y actividades en CDMX",
  description:
    "Descubre y reserva los mejores tours, experiencias y actividades en la Ciudad de México. Curados por Maia Home para que aproveches al máximo tu estancia.",
  alternates: { canonical: "/tours-mexico-city", languages: { es: "/tours-mexico-city", en: "/en/mexico-city-tours" } },
};

export default function ToursMexicoCity() {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-700">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/departamentos/cdmx.jpg" alt="Ciudad de México" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/45" />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-14 md:pb-20 md:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-yellow">Experiencias · Ciudad de México</p>
          <h1 className="mt-3 font-serif text-4xl text-white md:text-5xl">Tours y actividades en CDMX</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/85">
            Museos, gastronomía, Xochimilco, lucha libre, escapadas a Teotihuacán y mucho más. Reserva
            experiencias inolvidables para vivir la ciudad al máximo durante tu estancia.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-6 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-600">
          Las experiencias son operadas por proveedores externos a través de GetYourGuide. Verifica los
          detalles y contrata directamente con cada proveedor; Maia Home no opera estos tours.
        </div>

        <GygWidget locale="es-ES" q="Ciudad de México" items={12} />

        {/* CTA */}
        <section className="relative mt-12 overflow-hidden rounded-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/zonas/polanco.webp" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
          <div className="relative max-w-xl px-6 py-10 md:px-10 md:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-yellow">Tu base en la ciudad</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-white md:text-4xl">Hospédate donde pasa todo</h2>
            <p className="mt-3 text-white/85">
              Departamentos amueblados en las mejores zonas de la CDMX, a un paso de museos, restaurantes
              y vida cultural. Reserva directo con Maia Home.
            </p>
            <Link href="/departamentos" className="mt-6 inline-block rounded-full bg-maia-yellow px-7 py-3.5 text-sm font-semibold text-black shadow-lg transition hover:bg-maia-strong">
              Ver departamentos →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
