"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { langFromPath } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/contact";
import { track } from "@/lib/analytics";

type Lang = "es" | "en";

type Question = {
  key: string;
  label: Record<Lang, string>;
  hint?: Record<Lang, string>;
  options: { value: string; label: Record<Lang, string> }[];
};

const QUESTIONS: Question[] = [
  {
    key: "zona",
    label: { es: "¿Dónde está el departamento?", en: "Where is the apartment?" },
    options: [
      { value: "polanco", label: { es: "Polanco", en: "Polanco" } },
      { value: "condesa", label: { es: "Condesa / Hipódromo", en: "Condesa / Hipódromo" } },
      { value: "roma", label: { es: "Roma", en: "Roma" } },
      { value: "cdmx-otra", label: { es: "Otra zona de CDMX", en: "Elsewhere in Mexico City" } },
      { value: "houston", label: { es: "Houston", en: "Houston" } },
      { value: "otra-ciudad", label: { es: "Otra ciudad", en: "Another city" } },
    ],
  },
  {
    key: "reglamento",
    label: { es: "¿El reglamento del edificio permite estancias cortas?", en: "Does the building allow short stays?" },
    options: [
      { value: "si", label: { es: "Sí", en: "Yes" } },
      { value: "no", label: { es: "No", en: "No" } },
      { value: "no-se", label: { es: "No lo sé", en: "I'm not sure" } },
    ],
  },
  {
    key: "amueblado",
    label: { es: "¿Está amueblado?", en: "Is it furnished?" },
    options: [
      { value: "si", label: { es: "Sí, completo", en: "Yes, fully" } },
      { value: "parcial", label: { es: "Parcialmente", en: "Partially" } },
      { value: "no", label: { es: "No", en: "No" } },
    ],
  },
  {
    key: "recamaras",
    label: { es: "¿Cuántas recámaras?", en: "How many bedrooms?" },
    options: [
      { value: "estudio", label: { es: "Estudio / loft", en: "Studio / loft" } },
      { value: "1", label: { es: "1", en: "1" } },
      { value: "2", label: { es: "2", en: "2" } },
      { value: "3+", label: { es: "3 o más", en: "3 or more" } },
    ],
  },
  {
    key: "disponible",
    label: { es: "¿Desde cuándo estaría disponible?", en: "When would it be available?" },
    options: [
      { value: "ya", label: { es: "Ya está disponible", en: "Available now" } },
      { value: "1-3-meses", label: { es: "En 1 a 3 meses", en: "In 1 to 3 months" } },
      { value: "despues", label: { es: "Más adelante", en: "Later on" } },
      { value: "rentado", label: { es: "Está rentado a largo plazo", en: "Currently on a long-term lease" } },
    ],
  },
  {
    key: "situacion",
    label: { es: "¿Cómo está hoy?", en: "How is it being used today?" },
    options: [
      { value: "vacio", label: { es: "Vacío", en: "Empty" } },
      { value: "yo-airbnb", label: { es: "Lo rento yo por Airbnb", en: "I rent it myself on Airbnb" } },
      { value: "otra-admin", label: { es: "Con otra administradora", en: "With another manager" } },
      { value: "largo-plazo", label: { es: "Rentado a largo plazo", en: "Long-term rental" } },
    ],
  },
  {
    key: "objetivo",
    label: { es: "¿Qué buscas principalmente?", en: "What matters most to you?" },
    options: [
      { value: "rentabilidad", label: { es: "Máxima rentabilidad", en: "Maximum return" } },
      { value: "estable", label: { es: "Ingreso estable y predecible", en: "Steady, predictable income" } },
      { value: "sin-problemas", label: { es: "Que no me dé problemas", en: "No hassle for me" } },
      { value: "no-se", label: { es: "Aún no lo sé", en: "Not sure yet" } },
    ],
  },
];

const T = {
  es: {
    intro: "Siete preguntas rápidas para preparar tu evaluación antes de hablar.",
    stepProp: "Tu departamento",
    stepYou: "Tus datos",
    nombre: "Nombre(s)",
    apellidos: "Apellidos",
    whatsapp: "WhatsApp",
    email: "Correo electrónico",
    enlace: "Si ya está publicado, pega el enlace",
    enlaceHint: "Airbnb, Booking o cualquier otra plataforma. Opcional.",
    mensaje: "¿Algo más que debamos saber?",
    mensajeHint: "Opcional.",
    optional: "Opcional",
    submit: "Solicitar evaluación gratuita",
    sending: "Enviando…",
    note: "Al enviar aceptas que Maia Home te contacte. No compartimos tus datos con terceros.",
    reglamentoNo: "No lo descartes: aunque no se permitan estancias cortas, la renta por mes suele estar permitida y también la operamos.",
    okTitle: "Listo, recibimos tus datos",
    okBody: "Revisamos tu departamento y te contactamos en menos de 24 horas hábiles con una estimación de ingresos para tu zona.",
    okWa: "Adelantar la conversación por WhatsApp",
    errTitle: "No pudimos enviar el formulario",
    errBody: "Escríbenos por WhatsApp y lo resolvemos ahí mismo.",
    errWa: "Escribir por WhatsApp",
    retry: "Intentar de nuevo",
    waMsg: "Hola Maia Home, acabo de enviar el formulario para administrar mi departamento.",
  },
  en: {
    intro: "Seven quick questions so we can prepare your assessment before we talk.",
    stepProp: "Your apartment",
    stepYou: "Your details",
    nombre: "First name",
    apellidos: "Last name",
    whatsapp: "WhatsApp",
    email: "Email",
    enlace: "If it's already listed, paste the link",
    enlaceHint: "Airbnb, Booking or any other platform. Optional.",
    mensaje: "Anything else we should know?",
    mensajeHint: "Optional.",
    optional: "Optional",
    submit: "Request a free assessment",
    sending: "Sending…",
    note: "By submitting you agree to be contacted by Maia Home. We never share your data.",
    reglamentoNo: "Don't rule it out: even where short stays aren't allowed, monthly rentals usually are — and we operate those too.",
    okTitle: "Got it, we have your details",
    okBody: "We'll review your apartment and get back to you within one business day with an income estimate for your area.",
    okWa: "Start the conversation on WhatsApp",
    errTitle: "We couldn't send the form",
    errBody: "Message us on WhatsApp and we'll take it from there.",
    errWa: "Message us on WhatsApp",
    retry: "Try again",
    waMsg: "Hi Maia Home, I just submitted the form to have my apartment managed.",
  },
} as const;

const FIELD =
  "w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800 outline-none transition focus:border-maia-strong";
const LABEL = "mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400";
const CHIP =
  "cursor-pointer rounded-full border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700 transition hover:border-maia-strong peer-checked:border-maia-strong peer-checked:bg-maia-yellow peer-checked:font-semibold peer-checked:text-black peer-focus-visible:ring-2 peer-focus-visible:ring-maia-strong";

export default function OwnerLeadForm() {
  const lang = langFromPath(usePathname()) as Lang;
  const t = T[lang];
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ nombre: "", apellidos: "", whatsapp: "", email: "", enlace: "", mensaje: "" });
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/owner-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          ...answers,
          idioma: lang,
          pagina: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("owner_lead", { zona: answers.zona, objetivo: answers.objetivo });
      setState("ok");
    } catch {
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-maia-yellow text-xl font-bold text-black">✓</div>
        <h3 className="mt-4 font-serif text-xl text-neutral-900">{t.okTitle}</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">{t.okBody}</p>
        <a
          href={whatsappUrl(t.waMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block rounded-xl bg-maia-yellow px-5 py-3 text-sm font-bold text-black transition hover:bg-maia-strong"
        >
          {t.okWa}
        </a>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="text-center">
        <h3 className="font-serif text-xl text-neutral-900">{t.errTitle}</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">{t.errBody}</p>
        <a
          href={whatsappUrl(t.waMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block rounded-xl bg-maia-yellow px-5 py-3 text-sm font-bold text-black transition hover:bg-maia-strong"
        >
          {t.errWa}
        </a>
        <button type="button" onClick={() => setState("idle")} className="mt-3 block w-full text-xs font-semibold text-neutral-400 underline">
          {t.retry}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <p className="text-sm leading-relaxed text-neutral-600">{t.intro}</p>

      <div className="space-y-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-maia-strong">{t.stepProp}</p>
        {QUESTIONS.map((q) => (
          <fieldset key={q.key}>
            <legend className="mb-2 text-sm font-semibold text-neutral-900">{q.label[lang]}</legend>
            <div className="flex flex-wrap gap-2">
              {q.options.map((o) => (
                <label key={o.value}>
                  <input
                    type="radio"
                    name={q.key}
                    value={o.value}
                    aria-label={o.label[lang]}
                    required
                    checked={answers[q.key] === o.value}
                    onChange={() => setAnswers((a) => ({ ...a, [q.key]: o.value }))}
                    className="peer sr-only"
                  />
                  <span className={CHIP}>{o.label[lang]}</span>
                </label>
              ))}
            </div>
            {q.key === "reglamento" && answers.reglamento === "no" && (
              <p className="mt-2 rounded-xl bg-[#FBF7EC] px-3 py-2 text-xs leading-relaxed text-neutral-700">{t.reglamentoNo}</p>
            )}
          </fieldset>
        ))}
        <label className="block">
          <span className={LABEL}>{t.enlace}</span>
          <input
            type="url"
            inputMode="url"
            placeholder="https://"
            value={contact.enlace}
            onChange={(e) => setContact({ ...contact, enlace: e.target.value })}
            className={FIELD}
          />
          <span className="mt-1 block text-xs text-neutral-400">{t.enlaceHint}</span>
        </label>
      </div>

      <div className="space-y-3 border-t border-neutral-100 pt-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-maia-strong">{t.stepYou}</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <span className={LABEL}>{t.nombre}</span>
            <input required value={contact.nombre} onChange={(e) => setContact({ ...contact, nombre: e.target.value })} className={FIELD} />
          </label>
          <label className="block">
            <span className={LABEL}>{t.apellidos}</span>
            <input required value={contact.apellidos} onChange={(e) => setContact({ ...contact, apellidos: e.target.value })} className={FIELD} />
          </label>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <span className={LABEL}>{t.whatsapp}</span>
            <input
              required
              type="tel"
              inputMode="tel"
              value={contact.whatsapp}
              onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
              className={FIELD}
            />
          </label>
          <label className="block">
            <span className={LABEL}>{t.email}</span>
            <input
              required
              type="email"
              inputMode="email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className={FIELD}
            />
          </label>
        </div>
        <label className="block">
          <span className={LABEL}>{t.mensaje}</span>
          <textarea rows={3} value={contact.mensaje} onChange={(e) => setContact({ ...contact, mensaje: e.target.value })} className={FIELD} />
          <span className="mt-1 block text-xs text-neutral-400">{t.mensajeHint}</span>
        </label>
      </div>

      <div>
        <button
          type="submit"
          disabled={state === "sending"}
          className="w-full rounded-xl bg-maia-yellow py-3 text-sm font-bold text-black transition hover:bg-maia-strong disabled:opacity-60"
        >
          {state === "sending" ? t.sending : t.submit}
        </button>
        <p className="mt-3 text-center text-xs leading-relaxed text-neutral-400">{t.note}</p>
      </div>
    </form>
  );
}
