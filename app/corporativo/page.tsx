import type { Metadata } from "next";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import AvailabilityChips from "@/components/AvailabilityChips";
import { getProperties } from "@/lib/data";
import { applyAvailability, type SP } from "@/lib/listing";
import { whatsappUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Vivienda corporativa",
  description:
    "Alojamiento corporativo en CDMX y Houston para relocations, proyectos y viajes de negocio: un solo contacto, facturación y convenios para empresas.",
  alternates: { canonical: "/corporativo" },
};

const BENEFITS = [
  { t: "Un solo contacto", d: "Coordinamos todo con tu empresa: reservas, cambios y facturación." },
  { t: "Facturación empresarial", d: "Comprobantes fiscales y condiciones para tu área de compras." },
  { t: "Zonas de negocio", d: "Cerca de oficinas, torres corporativas y el Medical Center en Houston." },
  { t: "Convenios", d: "Tarifas y condiciones especiales para estancias recurrentes." },
];

export default async function Corporativo({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const list = (await getProperties()).filter((p) => p.segmentos.includes("corporate"));
  const a = applyAvailability(list, sp);
  return (
    <>
      <section className="border-b border-neutral-100 bg-maia-dark text-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-yellow">
            Para empresas y organizaciones
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">
            Vivienda corporativa en CDMX y Houston
          </h1>
          <p className="mt-4 max-w-xl text-lg text-neutral-300">
            Relocations, proyectos y viajes de negocio con la comodidad de un hogar y el respaldo de
            un solo proveedor.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappUrl("Hola, quiero información sobre vivienda corporativa de Maia Home.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-maia-yellow px-6 py-3 text-sm font-semibold text-black transition hover:bg-maia-strong"
            >
              Hablar con el equipo
            </a>
            <Link
              href="/facturacion"
              className="rounded-full border border-neutral-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Facturación
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div key={b.t} className="rounded-2xl border border-neutral-200 p-6">
              <h2 className="font-serif text-xl text-neutral-900">{b.t}</h2>
              <p className="mt-2 text-sm text-neutral-600">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-8">
        <h2 className="font-serif text-3xl text-neutral-900">Opciones para tu equipo</h2>
        <AvailabilityChips
          basePath="/corporativo"
          params={sp}
          disp={a.disp}
          total={a.totalCount}
          available={a.availableCount}
          unavailable={a.unavailableCount}
          hasDates={a.hasDates}
        />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {a.filtered.map((p) => (
            <PropertyCard key={p.beds24RoomId} property={p} search={a.search} />
          ))}
        </div>
      </section>
    </>
  );
}
