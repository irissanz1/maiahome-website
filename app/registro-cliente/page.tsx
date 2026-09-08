import type { Metadata } from "next";
import Link from "next/link";
import { whatsappUrl, WHATSAPP_DISPLAY, SUPPORT_EMAIL } from "@/lib/contact";
import RegLangRedirect from "@/components/RegLangRedirect";

export const metadata: Metadata = {
  title: "¡Registro exitoso!",
  description: "Gracias por completar tu registro en Maia Home. Aquí te contamos qué sigue antes de tu llegada.",
  alternates: { canonical: "/registro-cliente", languages: { es: "/registro-cliente", en: "/en/registration-complete" } },
  robots: { index: false, follow: false }, // página post-formulario (privada, no indexar)
};

const PASOS = [
  ["🔑", "Acceso al departamento", "Te enviamos la dirección exacta, tus claves de acceso y el paso a paso para entrar sin complicaciones."],
  ["🛎️", "Comodidades y servicios", "Detalles de lo que encontrarás en el departamento (WiFi, cocina equipada, amenidades) para que planees tu viaje."],
  ["💬", "Siempre disponibles", "Cualquier duda antes o durante tu estancia, escríbenos por WhatsApp y te asistimos al momento."],
];

const DESCUBRE = [
  ["Guía de la ciudad", "Museos, mercados, barrios y lo mejor de CDMX.", "/blog"],
  ["Tours y experiencias", "Actividades y recorridos para tu estancia.", "/tours-mexico-city"],
  ["Explora los barrios", "Recomendaciones curadas cerca de tu departamento.", "https://explore.maiahome.mx"],
];

const btn = "inline-block rounded-lg bg-maia-yellow px-6 py-3 text-sm font-bold text-black transition hover:bg-maia-strong";

export default function RegistroCliente() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14 md:py-16">
      <RegLangRedirect />
      {/* Éxito */}
      <div className="text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-maia-yellow text-black">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h1 className="mt-5 font-serif text-4xl text-neutral-900 md:text-5xl">¡Registro exitoso!</h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-neutral-600">
          Gracias por completar tu registro. Estamos encantados de recibirte en Maia Home y no podemos
          esperar a que disfrutes tu estancia.
        </p>
      </div>

      {/* Qué sigue */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl text-neutral-900 md:text-3xl">¿Qué sigue ahora?</h2>
        <p className="mt-2 max-w-2xl text-neutral-600">
          En un plazo <strong>máximo de 24 horas</strong> recibirás un correo con toda la información
          necesaria para tu llegada:
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PASOS.map(([icon, t, d]) => (
            <div key={t} className="rounded-2xl border border-neutral-200 p-5">
              <span className="text-2xl" aria-hidden="true">{icon}</span>
              <p className="mt-2 text-base font-semibold text-neutral-900">{t}</p>
              <p className="mt-1 text-sm text-neutral-600">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border-l-4 border-maia-yellow bg-[#FBF7EC] p-4 text-sm text-neutral-700">
          Revisa tu bandeja de entrada (y la carpeta de spam). Si no te llega o necesitas ayuda,
          escríbenos y con gusto lo resolvemos.
        </div>
      </section>

      {/* Descubre la zona */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl text-neutral-900 md:text-3xl">Mientras esperas, descubre lo mejor de la zona</h2>
        <p className="mt-2 max-w-2xl text-neutral-600">
          Preparamos recomendaciones de lugares de interés, restaurantes y actividades cerca de tu
          departamento. Inspírate y empieza a planear tu viaje.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {DESCUBRE.map(([t, d, href]) => {
            const external = href.startsWith("http");
            const cls = "group block rounded-2xl border border-neutral-200 p-5 transition hover:border-maia-strong hover:shadow-sm";
            const inner = (
              <>
                <p className="text-base font-semibold text-neutral-900">{t}</p>
                <p className="mt-1 text-sm text-neutral-600">{d}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-maia-strong">Ver más →</span>
              </>
            );
            return external ? (
              <a key={t} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
            ) : (
              <Link key={t} href={href} className={cls}>{inner}</Link>
            );
          })}
        </div>
      </section>

      {/* Ayuda */}
      <section className="mt-12 rounded-2xl bg-[#FBF7EC] p-6 text-center md:p-8">
        <h2 className="font-serif text-2xl text-neutral-900">¿Tienes alguna duda?</h2>
        <p className="mt-2 text-neutral-600">Estamos para ayudarte antes, durante y después de tu estancia.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a href={whatsappUrl("Hola, acabo de completar mi registro en Maia Home y tengo una duda.")} target="_blank" rel="noopener noreferrer" className={btn}>
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <a href={`mailto:${SUPPORT_EMAIL}`} className={btn}>{SUPPORT_EMAIL}</a>
        </div>
      </section>
    </div>
  );
}
