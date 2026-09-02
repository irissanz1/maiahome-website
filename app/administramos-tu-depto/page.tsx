import type { Metadata } from "next";
import OwnerLeadForm from "@/components/OwnerLeadForm";

export const metadata: Metadata = {
  title: "Administramos tu departamento",
  description:
    "Administración profesional de tu propiedad con Maia Home: multiplataforma, revenue management, limpieza, check-in autónomo y reportes. Trabaja menos, gana más.",
  alternates: { canonical: "/administramos-tu-depto" },
};

const SERVICIOS = [
  ["Gestión multiplataforma", "Airbnb, VRBO, Booking.com, Tripadvisor y sitio propio, todo administrado por nosotros."],
  ["Diseño del anuncio", "Construcción y diseño personalizado de tu listing para destacar y convertir."],
  ["Revenue management", "Herramientas de precios dinámicos para maximizar tus ingresos."],
  ["Limpieza y mantenimiento", "Limpieza profesional y mantenimiento por cada estancia."],
  ["Check-in autónomo", "Acceso autónomo en todas las propiedades, sin que tengas que estar presente."],
  ["Reportes en tiempo real", "Historial de ingresos y pronósticos, siempre a la vista."],
  ["Pagos seguros", "Visa, Mastercard, Amex, PayPal y más, con procesamiento seguro."],
  ["Redes y difusión", "Incluimos tu espacio en las redes sociales de Maia Home."],
];

const PASOS = [
  ["Cuéntanos de tu propiedad", "Déjanos saber qué te interesa y compártenos los datos de tu depto."],
  ["Evaluamos y calificamos", "Verificamos que tu propiedad califique para el programa Maia Home."],
  ["Nosotros la operamos", "Relájate y disfruta ingresos maximizados mientras nosotros hacemos el resto."],
];

export default function AdministramosTuDepto() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-neutral-100 bg-gradient-to-b from-neutral-50 to-white">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">
            Administración de propiedades
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl text-neutral-900 md:text-5xl">
            Superando tus expectativas en la gestión de tus propiedades
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-600">
            El tiempo libre que necesitas al ofrecer tu espacio a viajeros que buscan hospedaje de
            calidad. <b className="text-neutral-800">Trabaja menos, gana más.</b>
          </p>
          <a
            href="#contacto"
            className="mt-6 inline-block rounded-xl bg-maia-yellow px-6 py-3 text-sm font-bold text-black transition hover:bg-maia-strong"
          >
            Quiero información
          </a>
        </div>
      </section>

      {/* Servicios */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="font-serif text-2xl text-neutral-900 md:text-3xl">Todo incluido en la gestión</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICIOS.map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-neutral-200 p-5">
              <h3 className="text-sm font-semibold text-neutral-900">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comisión */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="font-serif text-2xl text-neutral-900 md:text-3xl">Comisión clara y flexible</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-2xl">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <p className="text-4xl font-bold text-neutral-900">25%</p>
              <p className="mt-1 text-sm text-neutral-600">Esquema mensual flexible</p>
            </div>
            <div className="rounded-2xl border-2 border-maia-strong bg-white p-6">
              <p className="text-4xl font-bold text-neutral-900">20%</p>
              <p className="mt-1 text-sm text-neutral-600">Contrato anual</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="font-serif text-2xl text-neutral-900 md:text-3xl">Cómo funciona</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PASOS.map(([t, d], i) => (
            <div key={t} className="rounded-2xl border border-neutral-200 p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-maia-yellow text-sm font-bold text-black">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold text-neutral-900">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="bg-neutral-50">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-14 lg:grid-cols-[1fr_460px]">
          <div>
            <h2 className="font-serif text-2xl text-neutral-900 md:text-3xl">
              Hablemos de tu propiedad
            </h2>
            <p className="mt-3 max-w-md text-neutral-600">
              Déjanos tus datos y te contactamos para evaluar tu departamento y explicarte cómo
              maximizamos tus ingresos. Sin compromiso.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <OwnerLeadForm />
          </div>
        </div>
      </section>
    </div>
  );
}
