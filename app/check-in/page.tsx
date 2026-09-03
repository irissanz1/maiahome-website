import type { Metadata } from "next";
import Link from "next/link";
import { whatsappUrl, WHATSAPP_DISPLAY } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Proceso de check-in",
  description:
    "Antes de tu llegada a Maia Home: llena el formulario de check-in para activar tus claves de acceso. Envíalo al menos un día antes (mínimo 1 hora antes de llegar).",
  alternates: { canonical: "/check-in" },
  robots: { index: false, follow: false }, // página operativa post-reserva (no indexar)
};

// Formulario de check-in "Registro cliente" (Zoho Forms). URL directa del perma
// (el link corto zfrmz.com/GY7BmSb90bzEFUWeumQ5 redirige aquí; usamos la directa
// para evitar el 302 dentro del iframe).
const FORM_CHECKIN =
  "https://forms.zohopublic.com/maiahome/form/Registrocliente/formperma/bWjqVFwzm1erKYTem6NblUrmdOVbDVqaB2DgI3yMx6w";

const PASOS = [
  ["1. Llena el formulario de check-in", "Es obligatorio: con tus datos activamos las claves de acceso al edificio y al departamento. Envíalo al menos un día antes de tu llegada; como mínimo, 1 hora antes."],
  ["2. Validamos tu información", "Revisamos que todo esté listo para solicitar el acceso a los edificios. Este paso es necesario antes de compartirte las claves."],
  ["3. Recibes tus instrucciones", "Una vez validado, te enviamos por WhatsApp y correo la dirección exacta, las claves de acceso y las instrucciones para entrar."],
];

export default function CheckIn() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Antes de tu llegada</p>
      <h1 className="mt-3 font-serif text-4xl text-neutral-900 md:text-5xl">Proceso de check-in</h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600">
        Para que tu llegada sea simple y segura, necesitamos que completes el formulario de check-in.
        Con él activamos tus claves de acceso.
      </p>

      {/* Aviso clave */}
      <div className="mt-6 rounded-2xl border-l-4 border-maia-yellow bg-[#FBF7EC] p-5">
        <p className="text-sm font-semibold text-neutral-900">Importante</p>
        <p className="mt-1 text-sm text-neutral-700">
          Sin el formulario no podemos activar tus claves de acceso. Envíalo <strong>al menos un día
          antes</strong> de tu llegada (o <strong>mínimo 1 hora antes</strong>). Las instrucciones se
          envían <strong>después</strong> de validar que todo esté listo para solicitar el acceso a los
          edificios.
        </p>
        <a
          href="#formulario"
          className="mt-4 inline-block rounded-lg bg-maia-yellow px-6 py-3 text-sm font-bold text-black transition hover:bg-maia-strong"
        >
          Llenar formulario de check-in
        </a>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Formulario</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">Obligatorio</p>
          <p className="mt-1 text-xs text-neutral-500">Activa tus claves de acceso.</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Envíalo</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">1 día antes</p>
          <p className="mt-1 text-xs text-neutral-500">Mínimo 1 hora antes de llegar.</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Acceso</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">Tras validar</p>
          <p className="mt-1 text-xs text-neutral-500">Te enviamos claves e instrucciones.</p>
        </div>
      </div>

      <section className="mt-10 space-y-4">
        {PASOS.map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-neutral-200 p-5">
            <p className="text-sm font-semibold text-neutral-900">{t}</p>
            <p className="mt-1 text-sm text-neutral-600">{d}</p>
          </div>
        ))}
      </section>

      {/* Formulario de check-in embebido */}
      <section id="formulario" className="mt-12 scroll-mt-24">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="font-serif text-2xl text-neutral-900">Formulario de check-in</h2>
          <a
            href={FORM_CHECKIN}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-neutral-500 hover:text-maia-strong"
          >
            Abrir en pantalla completa ↗
          </a>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <iframe
            src={FORM_CHECKIN}
            title="Formulario de check-in — Maia Home"
            className="h-[1600px] w-full"
            loading="lazy"
          />
        </div>
      </section>

      <section className="mt-10 rounded-2xl bg-[#FBF7EC] p-6 md:p-8">
        <h2 className="font-serif text-2xl text-neutral-900">¿Necesitas ayuda con tu llegada?</h2>
        <p className="mt-2 text-neutral-600">Escríbenos por WhatsApp y te asistimos en el momento.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={whatsappUrl("Hola, tengo una duda sobre el check-in de mi reserva en Maia Home.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-maia-yellow px-6 py-3 text-sm font-bold text-black transition hover:bg-maia-strong"
          >
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <Link
            href="/check-out"
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-white"
          >
            Ver proceso de check-out →
          </Link>
        </div>
      </section>
    </div>
  );
}
