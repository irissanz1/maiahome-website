"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { langFromPath, getDict, withLang } from "@/lib/i18n";

const COLS = [
  {
    title: { es: "Explorar", en: "Explore" },
    items: [
      { p: "/departamentos", es: "Departamentos", en: "Apartments" },
      { p: "/polanco", es: "Polanco", en: "Polanco" },
      { p: "/condesa", es: "Condesa", en: "Condesa" },
      { p: "/houston", es: "Houston", en: "Houston" },
      { p: "/recorridos-departamentos", es: "Tours virtuales", en: "Virtual tours" },
      { p: "/tours-mexico-city", es: "Tours y experiencias", en: "Tours & experiences" },
      { p: "/blog", es: "Guía de la ciudad", en: "City guide" },
    ],
  },
  {
    title: { es: "Legal", en: "Legal" },
    items: [
      { p: "/aviso-privacidad", es: "Aviso de Privacidad", en: "Privacy Notice" },
      { p: "/terminos-y-condiciones", es: "Términos y Condiciones", en: "Terms & Conditions" },
      { p: "/terminos-uso", es: "Términos de Uso", en: "Terms of Use" },
      { p: "/stay-agreement", es: "Acuerdo de Estadía", en: "Stay Agreement" },
    ],
  },
  {
    title: { es: "Maia Home", en: "Maia Home" },
    items: [
      { p: "/mensuales", es: "Estancias mensuales", en: "Monthly stays" },
      { p: "/corporativo", es: "Vivienda corporativa", en: "Corporate housing" },
      { p: "/administramos-tu-depto", es: "Administra tu depto", en: "Manage your apartment" },
      { p: "/nosotros", es: "Nosotros", en: "About us" },
      { p: "/formas-de-pago", es: "Formas de pago", en: "Payment options" },
      { p: "/facturacion", es: "Facturación", en: "Invoicing" },
    ],
  },
] as const;

export default function Footer() {
  const pathname = usePathname();
  const lang = langFromPath(pathname);
  const d = getDict(lang);

  return (
    <footer className="mt-20 bg-maia-dark text-white">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/maia-logo-white.png" alt="Maia Home" className="h-14 w-auto" />
            <p className="mt-4 text-sm text-neutral-400">{d.footer.tagline}</p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.instagram.com/maiahomemx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram — Maia Home"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 text-neutral-300 transition hover:border-maia-yellow hover:text-maia-yellow"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.8.07 1.2.06 1.8.25 2.2.42.6.22 1 .48 1.4.9.42.4.68.8.9 1.4.17.4.36 1 .42 2.2.06 1.2.07 1.6.07 4.8s0 3.6-.07 4.8c-.06 1.2-.25 1.8-.42 2.2-.22.6-.48 1-.9 1.4-.4.42-.8.68-1.4.9-.4.17-1 .36-2.2.42-1.2.06-1.6.07-4.8.07s-3.6 0-4.8-.07c-1.2-.06-1.8-.25-2.2-.42-.6-.22-1-.48-1.4-.9-.42-.4-.68-.8-.9-1.4-.17-.4-.36-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.8c.06-1.2.25-1.8.42-2.2.22-.6.48-1 .9-1.4.4-.42.8-.68 1.4-.9.4-.17 1-.36 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.5 0-4.74.07-.9.04-1.38.2-1.7.32-.43.17-.74.37-1.06.7-.32.32-.52.63-.7 1.06-.12.32-.28.8-.32 1.7C3.2 8.5 3.2 8.86 3.2 12s0 3.5.07 4.74c.04.9.2 1.38.32 1.7.17.43.37.74.7 1.06.32.32.63.52 1.06.7.32.12.8.28 1.7.32 1.24.06 1.6.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.38-.2 1.7-.32.43-.17.74-.37 1.06-.7.32-.32.52-.63.7-1.06.12-.32.28-.8.32-1.7.06-1.24.07-1.6.07-4.74s0-3.5-.07-4.74c-.04-.9-.2-1.38-.32-1.7a2.85 2.85 0 0 0-.7-1.06 2.85 2.85 0 0 0-1.06-.7c-.32-.12-.8-.28-1.7-.32C15.5 4 15.14 4 12 4Zm0 3.05A4.95 4.95 0 1 1 12 17a4.95 4.95 0 0 1 0-9.9Zm0 1.8a3.15 3.15 0 1 0 0 6.3 3.15 3.15 0 0 0 0-6.3Zm5.15-.9a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" /></svg>
              </a>
              <a
                href="https://www.facebook.com/maiahomemx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook — Maia Home"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 text-neutral-300 transition hover:border-maia-yellow hover:text-maia-yellow"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.3c0-.8.2-1.4 1.4-1.4h1.4V5.4c-.7-.1-1.5-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v2.8h2.3V21h3.2Z" /></svg>
              </a>
              <a
                href="https://www.tiktok.com/@maiahomemx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok — Maia Home"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 text-neutral-300 transition hover:border-maia-yellow hover:text-maia-yellow"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 5.8a4.3 4.3 0 0 1-1-2.8h-3v11.4a2.5 2.5 0 1 1-2.5-2.5c.26 0 .5.04.75.11V8.9a5.6 5.6 0 0 0-.75-.05 5.5 5.5 0 1 0 5.5 5.5V8.9a7.2 7.2 0 0 0 4.2 1.35V7.2a4.3 4.3 0 0 1-3.2-1.4Z" /></svg>
              </a>
            </div>

            {/* También reservables en OTAs */}
            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                {lang === "en" ? "Also on" : "También en"}
              </p>
              <div className="mt-3 flex items-center gap-5">
                <a href="https://www.airbnb.mx/users/profile/1463379377061041440" target="_blank" rel="noopener noreferrer" aria-label="Airbnb — Maia Home">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/ota/airbnb.svg" alt="Airbnb" className="h-6 w-auto opacity-70 brightness-0 invert transition hover:opacity-100" />
                </a>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/ota/vrbo.svg" alt="Vrbo" className="h-6 w-auto opacity-70 brightness-0 invert" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/ota/booking.svg" alt="Booking.com" className="h-5 w-auto opacity-70 brightness-0 invert" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-12 text-sm">
            {COLS.map((col) => (
              <div key={col.title.es}>
                <h3 className="mb-3 font-semibold text-maia-yellow">{lang === "en" ? col.title.en : col.title.es}</h3>
                <ul className="space-y-2 text-neutral-400">
                  {col.items.map((it) => (
                    <li key={it.p}>
                      <Link href={withLang(lang, it.p)} className="hover:text-maia-yellow">
                        {lang === "en" ? it.en : it.es}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 border-t border-neutral-700 pt-6 text-xs text-neutral-500">
          <p>© 2026 Maia Luxury Apartments and Services Mexico S.A. de C.V. · {d.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
