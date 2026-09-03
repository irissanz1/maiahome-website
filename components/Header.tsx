"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import MarketSelector from "./MarketSelector";
import { langFromPath, getDict, withLang, switchLangPath, LANG_SWITCH_ENABLED } from "@/lib/i18n";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const lang = langFromPath(pathname);
  const d = getDict(lang);
  const NAV = [
    { href: withLang(lang, "/departamentos"), label: d.nav.nightly },
    { href: withLang(lang, "/mensuales"), label: d.nav.monthly },
    { href: withLang(lang, "/corporativo"), label: d.nav.corporate },
    { href: withLang(lang, "/nosotros"), label: d.nav.about },
  ];

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href={withLang(lang, "/")} className="shrink-0" aria-label="Maia Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/maia-logo.png" alt="Maia Home" className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-neutral-100 text-neutral-900"
                    : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Switch de idioma: se activa cuando existan las páginas /en (evita 404 en el sitio vivo). */}
          {LANG_SWITCH_ENABLED && (
            <Link
              href={switchLangPath(pathname, lang === "es" ? "en" : "es")}
              className="rounded-full border border-neutral-200 px-2.5 py-1 text-xs font-semibold text-neutral-600 transition hover:border-neutral-400 hover:text-neutral-900"
              aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
            >
              {lang === "es" ? "EN" : "ES"}
            </Link>
          )}
          <Suspense fallback={null}>
            <MarketSelector />
          </Suspense>
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-700 hover:bg-neutral-100 md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="border-t border-neutral-100 bg-white md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-lg px-3 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={withLang(lang, "/facturacion")}
              className="rounded-lg px-3 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              {d.nav.billing}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
