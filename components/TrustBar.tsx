const POINTS = {
  es: [
    { t: "Mejor tarifa, directo", d: "Sin comisiones de plataformas" },
    { t: "Pago 100% seguro", d: "Visa, Mastercard y Amex vía Stripe" },
    { t: "Confirmación inmediata", d: "Por correo al reservar" },
    { t: "Atención personal", d: "Respuesta rápida por WhatsApp" },
  ],
  en: [
    { t: "Best rate, direct", d: "No platform fees" },
    { t: "100% secure payment", d: "Visa, Mastercard & Amex via Stripe" },
    { t: "Instant confirmation", d: "By email when you book" },
    { t: "Personal support", d: "Fast response on WhatsApp" },
  ],
} as const;

export default function TrustBar({ lang = "es" }: { lang?: "es" | "en" }) {
  return (
    <div className="border-y border-neutral-100 bg-neutral-50/60">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-4 px-5 py-6 md:grid-cols-4">
        {POINTS[lang].map((p) => (
          <div key={p.t} className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-maia-yellow text-[11px] font-bold text-black">
              ✓
            </span>
            <div>
              <p className="text-sm font-semibold text-neutral-800">{p.t}</p>
              <p className="text-xs text-neutral-500">{p.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
