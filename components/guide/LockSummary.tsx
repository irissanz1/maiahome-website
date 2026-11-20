import Link from "next/link";

// Resumen visual de "cómo abrir la chapa" dentro de las guías (reemplaza al video de acceso).
// El detalle (puerta de la calle, ¿No abre?, video) vive en /chapa · /en/lock: un solo lugar que mantener.
type Lang = "es" | "en";

const T = {
  es: {
    title: "Cómo abrir la chapa",
    steps: ["Palma sobre la chapa", "Tu código + #", "Suena: abre (en la calle solo empuja)", "Se cierra sola"],
    more: "Ver paso a paso y qué hacer si no abre →",
    href: "/chapa",
    alt: "Paso",
  },
  en: {
    title: "How to open the lock",
    steps: ["Palm over the lock", "Your code + #", "Beep: open (street door: just push)", "Locks by itself"],
    more: "Step by step, and what to do if it won't open →",
    href: "/en/lock",
    alt: "Step",
  },
} as const;

export default function LockSummary({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <div className="mt-3 rounded-xl border border-neutral-200 bg-white p-3">
      <p className="text-sm font-semibold text-neutral-900">{t.title}</p>
      <ol className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {t.steps.map((label, i) => (
          <li key={label}>
            <div className="relative overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/chapa/paso-${i + 1}.jpg`}
                alt={`${t.alt} ${i + 1}: ${label}`}
                width={406}
                height={360}
                loading="lazy"
                className="aspect-[406/360] w-full object-cover"
              />
              <span className="absolute left-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-maia-strong text-xs font-bold text-neutral-900">
                {i + 1}
              </span>
            </div>
            <p className="mt-1 text-xs font-medium leading-snug text-neutral-800">{label}</p>
          </li>
        ))}
      </ol>
      <Link href={t.href} className="mt-3 inline-block text-sm font-semibold text-neutral-900 underline decoration-maia-strong decoration-2 underline-offset-2">
        {t.more}
      </Link>
    </div>
  );
}
