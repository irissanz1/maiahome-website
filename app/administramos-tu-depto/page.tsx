import type { Metadata } from "next";
import OwnerLeadForm from "@/components/OwnerLeadForm";
import { whatsappUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Administración de departamentos en CDMX",
  description:
    "Administramos tu departamento amueblado para rentas de corta y mediana estancia en CDMX con estándar hotelero: multiplataforma, pricing dinámico, limpieza, mantenimiento y reportes transparentes. Trabaja menos, gana más.",
  alternates: { canonical: "/administramos-tu-depto" },
};

const BENEFICIOS = [
  ["Más ingresos, cero operación", "Pricing dinámico y gestión multiplataforma (Airbnb, Booking.com, VRBO y reserva directa) para maximizar la ocupación de tu departamento."],
  ["Tu propiedad, protegida", "Perfilamos a cada huésped, controlamos inventarios pieza por pieza y monitoreamos ruido y aforo en tiempo real."],
  ["Transparencia total", "Estado de cuenta mensual, histórico y forecast de ingresos en tiempo real, y acceso de solo lectura al calendario de tu propiedad."],
  ["Estándar hotelero", "Limpieza y mantenimiento profesional en cada estancia, check-in autónomo y atención al huésped 24/7."],
  ["Corta y mediana estancia", "Rentas por noche y estancias ejecutivas: combinamos ambas modalidades para sostener la rentabilidad todo el año."],
  ["Esquemas claros", "Comisión del 25% mes a mes sin permanencia, o 20% con contrato anual. Sin letras chiquitas."],
];

const PILARES = [
  ["01", "Comercialización", "Publicación multiplataforma (Airbnb, Booking.com, VRBO, web propia), anuncios diseñados a medida, herramientas de tarifas y revenue, y difusión en redes de Maia Home."],
  ["02", "Administración", "Histórico y forecast de ingresos en tiempo real, estado de cuenta mensual y administración de servicios de la propiedad (amenidades, limpieza y mantenimiento)."],
  ["03", "Operación", "Atención al huésped en línea, check-in autónomo en todas las propiedades, limpieza profesional por estancia y control de inventario por departamento."],
  ["04", "Tecnología", "Motor de pagos seguro multipago (Visa, MasterCard, Amex, PayPal), motor de reservas independiente y monitoreo de ruido y aforo en tiempo real."],
];

const PASOS = [
  ["01", "Evaluación", "Analizamos tu departamento, su zona y su potencial de renta de corta y mediana estancia."],
  ["02", "Diseño y montaje", "Equilibrio entre diseño y ocupación: interiorismo, inventario, fotografía profesional e identidad propia para cada espacio."],
  ["03", "Publicación", "Construimos y publicamos tu anuncio en Airbnb, Booking.com, VRBO y nuestro motor de reserva directa."],
  ["04", "Operación diaria", "Reservas, check-in autónomo, limpieza por estancia, mantenimiento y atención al huésped 24/7."],
  ["05", "Reporte y pago", "Estado de cuenta mensual con el 100% de las reservas reportadas y depósito de tus utilidades."],
];

const SERVICIOS = [
  "Gestión multiplataforma: Airbnb, Booking.com, VRBO y web propia",
  "Diseño y construcción personalizada de anuncios",
  "Pricing dinámico y herramientas de revenue management",
  "Limpieza y mantenimiento profesional por estancia",
  "Check-in autónomo en todas las propiedades",
  "Atención al huésped 24/7 en línea",
  "Estado de cuenta mensual e histórico de ingresos en tiempo real",
  "Administración y pago de servicios de la propiedad",
  "Control de inventario de mobiliario y amenidades",
];

const CONFIANZA = [
  ["Propiedad documentada", "Trabajamos solo con propiedades acreditadas con documentos vigentes y en buen estado."],
  ["Inventario formal", "Entrega formal de inventario al inicio y fin del contrato, pieza por pieza, con marca y modelo."],
  ["Calendario visible", "Acceso de solo lectura al calendario de tu propiedad para transparencia y comparación de fechas."],
  ["Reglas claras", "Daños cubiertos según políticas de cada plataforma; esos ingresos se destinan íntegros a reparación."],
];

const FAQ = [
  ["¿Cuánto cobra Maia Home por la administración?", "25% mes a mes sin permanencia, o 20% con contrato anual. La comisión es sobre las utilidades, después de gastos y servicios. Sin letras chiquitas."],
  ["¿Mi departamento debe estar amueblado?", "Sí. La renta de corta y mediana estancia requiere un espacio amueblado y listo. Si aún no lo está, te acompañamos en el diseño, montaje e inventario."],
  ["¿En qué plataformas se publica mi propiedad?", "Airbnb, Booking.com, VRBO y nuestro motor de reserva directa, además de difusión en las redes de Maia Home."],
  ["¿Cómo sé cuánto está generando mi departamento?", "Con estado de cuenta mensual, histórico y forecast de ingresos en tiempo real, y acceso de solo lectura al calendario de tu propiedad. Reportamos el 100% de las reservas."],
  ["¿Qué pasa si un huésped daña mi propiedad?", "Los daños se cubren según las políticas de cada plataforma, y esos ingresos se destinan íntegros a la reparación. Además controlamos inventario pieza por pieza y monitoreamos ruido y aforo."],
  ["¿Puedo usar mi departamento cuando quiera?", "Sí. Coordinamos las fechas que quieras para tu uso personal y bloqueamos el calendario."],
  ["¿En qué zonas de CDMX administran propiedades?", "Operamos en las mejores zonas de la ciudad: Polanco, Condesa y Roma."],
  ["¿Qué necesito para empezar?", "Una propiedad documentada, con papeles vigentes y en buen estado. Hacemos una evaluación gratuita de su potencial y una entrega formal de inventario al inicio."],
];

export default function AdministramosTuDepto() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-neutral-100 bg-gradient-to-b from-neutral-50 to-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">
            Para propietarios · Property management CDMX
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.1] text-neutral-900 md:text-5xl">
            Administramos tu departamento para rentas de corta y mediana estancia en CDMX
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600">
            Convierte tu departamento amueblado en un activo rentable sin operar nada tú.
            Administración profesional con estándar hotelero: publicación multiplataforma, pricing
            dinámico, limpieza, mantenimiento y reportes transparentes.{" "}
            <b className="text-neutral-800">Trabaja menos, gana más.</b>
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#empecemos" className="rounded-xl bg-maia-yellow px-6 py-3 text-sm font-bold text-black transition hover:bg-maia-strong">
              Quiero rentar mi depto
            </a>
            <a href={whatsappUrl("Hola Maia Home, quiero información para administrar mi departamento.")} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50">
              Hablar por WhatsApp
            </a>
          </div>
          <p className="mt-6 text-sm text-neutral-500">
            <span className="font-semibold text-neutral-700">Polanco · Condesa · Roma</span> — operación
            profesional en las mejores zonas de la ciudad.
          </p>
        </div>
      </section>

      {/* Por qué Maia Home */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Por qué Maia Home</p>
        <h2 className="mt-3 font-serif text-2xl text-neutral-900 md:text-3xl">
          Tu aliado en la administración de departamentos en CDMX
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFICIOS.map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-neutral-200 p-6">
              <h3 className="text-sm font-semibold text-neutral-900">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modelo de gestión: esquemas */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Modelo de gestión</p>
          <h2 className="mt-3 font-serif text-2xl text-neutral-900 md:text-3xl">
            Dos esquemas, cuatro pilares, un solo estándar
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:max-w-3xl">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Sin permanencia · Esquema libre mensual</p>
              <p className="mt-2 text-4xl font-bold text-neutral-900">25%</p>
              <ul className="mt-4 space-y-1.5 text-sm text-neutral-600">
                <li>Comisión sobre utilidades después de gastos y servicios</li>
                <li>Cancela cuando quieras</li>
                <li>Mismos servicios operativos incluidos</li>
                <li>Ideal para probar el modelo</li>
              </ul>
            </div>
            <div className="relative rounded-2xl border-2 border-maia-strong bg-white p-6">
              <span className="absolute -top-3 left-6 rounded-full bg-maia-strong px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide text-black">Recomendado</span>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Contrato anual</p>
              <p className="mt-2 text-4xl font-bold text-neutral-900">20%</p>
              <ul className="mt-4 space-y-1.5 text-sm text-neutral-600">
                <li>Comisión preferencial sobre utilidades</li>
                <li>Gastos de montaje diferidos durante el contrato</li>
                <li>Prioridad en calendario y revenue management</li>
                <li>Mayor estabilidad de ingresos</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILARES.map(([n, t, d]) => (
              <div key={n} className="rounded-2xl border border-neutral-200 bg-white p-6">
                <span className="font-serif text-2xl font-bold text-maia-strong">{n}</span>
                <h3 className="mt-2 text-base font-semibold text-neutral-900">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Cómo funciona</p>
        <h2 className="mt-3 font-serif text-2xl text-neutral-900 md:text-3xl">
          Del primer contacto a tu primer depósito
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {PASOS.map(([n, t, d]) => (
            <div key={n} className="rounded-2xl border border-neutral-200 p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-maia-yellow text-sm font-bold text-black">{n}</span>
              <h3 className="mt-4 text-sm font-semibold text-neutral-900">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Servicios incluidos */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Servicios incluidos</p>
          <h2 className="mt-3 font-serif text-2xl text-neutral-900 md:text-3xl">
            Todo lo que tu departamento necesita, en un solo lugar
          </h2>
          <p className="mt-3 max-w-2xl text-neutral-600">
            La administración de rentas vacacionales en CDMX exige operar como un hotel. Esto es lo que
            incluye nuestra gestión integral, sin costos ocultos:
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SERVICIOS.map((s) => (
              <li key={s} className="flex items-start gap-2.5 text-sm text-neutral-700">
                <span className="mt-0.5 text-maia-strong">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Confianza y condiciones */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Confianza y condiciones</p>
        <h2 className="mt-3 font-serif text-2xl text-neutral-900 md:text-3xl">Reglas claras, relaciones largas</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CONFIANZA.map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-neutral-200 p-6">
              <h3 className="text-sm font-semibold text-neutral-900">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Empecemos — formulario */}
      <section id="empecemos" className="bg-maia-dark text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-16 lg:grid-cols-[1fr_460px]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-yellow">Empecemos</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Gana más, trabaja menos</h2>
            <p className="mt-4 max-w-md text-neutral-300">
              Cuéntanos sobre tu departamento y te contactamos con una evaluación gratuita de su
              potencial de renta. Sin compromiso.
            </p>
            <p className="mt-4 text-sm text-neutral-400">
              ¿Prefieres WhatsApp?{" "}
              <a href={whatsappUrl("Hola Maia Home, quiero información para administrar mi departamento.")} target="_blank" rel="noopener noreferrer" className="font-semibold text-maia-yellow underline">
                Escríbenos directo
              </a>
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 text-neutral-900 shadow-sm">
            <OwnerLeadForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Preguntas frecuentes</p>
        <h2 className="mt-3 font-serif text-2xl text-neutral-900 md:text-3xl">Lo que todo propietario pregunta</h2>
        <div className="mt-8 divide-y divide-neutral-200 border-t border-neutral-200">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-neutral-900">
                {q}
                <span className="text-maia-strong transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-neutral-600">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
