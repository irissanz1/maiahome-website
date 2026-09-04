"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/lib/contact";
import { langFromPath, withLang } from "@/lib/i18n";

const T = {
  es: {
    title: "Esta página no existe (o cambió de lugar)",
    body: "Puede que el enlace esté roto o que la página se haya movido. Te dejamos por dónde seguir:",
    home: "Ir al inicio", apartments: "Ver departamentos", whatsapp: "Escríbenos por WhatsApp",
    also: "También puedes explorar:",
    links: [["/polanco", "Polanco"], ["/condesa", "Condesa"], ["/houston", "Houston"], ["/mensuales", "Estancias mensuales"], ["/blog", "Guía de la ciudad"]] as [string, string][],
    wa: "Hola, tuve un problema al navegar el sitio de Maia Home.",
  },
  en: {
    title: "This page doesn't exist (or moved)",
    body: "The link may be broken or the page may have moved. Here's where to go next:",
    home: "Go home", apartments: "View apartments", whatsapp: "Message us on WhatsApp",
    also: "You can also explore:",
    links: [["/polanco", "Polanco"], ["/condesa", "Condesa"], ["/houston", "Houston"], ["/mensuales", "Monthly stays"], ["/blog", "City guide"]] as [string, string][],
    wa: "Hi, I had a problem navigating the Maia Home site.",
  },
} as const;

export default function NotFound() {
  const lang = langFromPath(usePathname());
  const t = T[lang];
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 py-16 text-center">
      <svg viewBox="0 0 280 210" className="h-44 w-auto md:h-52" role="img" aria-label="Maia Home">
        <circle cx="205" cy="55" r="46" fill="#FDDB51" opacity="0.25" />
        <line x1="24" y1="182" x2="256" y2="182" stroke="#171717" strokeWidth="3" strokeLinecap="round" />
        <rect x="70" y="66" width="104" height="116" rx="8" fill="#fff" stroke="#171717" strokeWidth="3.5" />
        <path d="M64 66 L122 40 L180 66" fill="none" stroke="#171717" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
        <rect x="86" y="82" width="26" height="26" rx="3" fill="#FDDB51" stroke="#171717" strokeWidth="2.5" />
        <rect x="132" y="82" width="26" height="26" rx="3" fill="#fff" stroke="#171717" strokeWidth="2.5" />
        <rect x="86" y="120" width="26" height="26" rx="3" fill="#fff" stroke="#171717" strokeWidth="2.5" />
        <rect x="132" y="120" width="26" height="26" rx="3" fill="#FDDB51" stroke="#171717" strokeWidth="2.5" />
        <path d="M108 182 v-24 a14 14 0 0 1 28 0 v24" fill="#fff" stroke="#171717" strokeWidth="3" strokeLinejoin="round" />
        <path d="M176 92 q40 -6 44 26" fill="none" stroke="#171717" strokeWidth="2" strokeDasharray="3 6" strokeLinecap="round" />
        <path d="M220 74 c-13 0 -23 10 -23 23 c0 17 23 38 23 38 c0 0 23 -21 23 -38 c0 -13 -10 -23 -23 -23 z" fill="#F9D316" stroke="#171717" strokeWidth="3" strokeLinejoin="round" />
        <text x="220" y="104" textAnchor="middle" fontSize="24" fontWeight="700" fill="#171717" fontFamily="var(--font-montserrat), sans-serif">?</text>
      </svg>

      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.28em] text-maia-strong">Error 404</p>
      <h1 className="mt-3 font-serif text-3xl text-neutral-900 md:text-4xl">{t.title}</h1>
      <p className="mt-4 text-neutral-600">{t.body}</p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href={withLang(lang, "/")} className="rounded-full bg-maia-yellow px-6 py-3 text-sm font-bold text-black transition hover:bg-maia-strong">{t.home}</Link>
        <Link href={withLang(lang, "/departamentos")} className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50">{t.apartments}</Link>
        <a href={whatsappUrl(t.wa)} target="_blank" rel="noopener noreferrer" className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50">{t.whatsapp}</a>
      </div>

      <div className="mt-10 text-sm text-neutral-500">
        <p>{t.also}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {t.links.map(([href, label]) => (
            <Link key={href} href={href === "/blog" ? "/blog" : withLang(lang, href)} className="hover:text-maia-strong">{label}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}
