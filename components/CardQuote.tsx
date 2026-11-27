"use client";

import { useEffect, useState, type ReactNode } from "react";
import { formatMoney } from "@/lib/format";
import type { Currency } from "@/lib/types";
import type { Lang } from "@/lib/i18n";

const T = {
  es: { nights: "noches", total: "total", preTax: "antes de impuestos", withClean: "incluye limpieza, antes de impuestos" },
  en: { nights: "nights", total: "total", preTax: "before taxes", withClean: "cleaning included, before taxes" },
} as const;

type Q = { nights: number; preTax: number; total: number; cleaning: boolean };

// Total de la tarjeta igual al de la ficha (y al estilo Airbnb): alojamiento con
// descuento directo + limpieza, antes de impuestos. Se pide al cargar la tarjeta;
// mientras llega (o si Beds24 no responde) se ve un marcador neutro.
export default function CardQuote({
  roomId, checkin, checkout, guests, nights, cur, lang, align = "left", fallback,
}: {
  roomId: string; checkin: string; checkout: string; guests?: number; nights: number; cur: Currency; lang: Lang;
  align?: "left" | "right";
  /** Lo que se ve si Beds24 no responde (p. ej. el "desde $X / noche"). */
  fallback?: ReactNode;
}) {
  const al = align === "right" ? "text-right" : "text-left";
  const t = T[lang === "en" ? "en" : "es"];
  const [q, setQ] = useState<Q | null | undefined>(undefined);
  useEffect(() => {
    let alive = true;
    setQ(undefined);
    const sp = new URLSearchParams({ roomId, checkin, checkout, guests: String(guests || 2) });
    fetch(`/api/quote?${sp.toString()}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => alive && setQ(d?.quote ?? null))
      .catch(() => alive && setQ(null));
    return () => { alive = false; };
  }, [roomId, checkin, checkout, guests]);

  if (q === undefined) {
    return <span className="inline-block h-6 w-28 animate-pulse rounded bg-neutral-100" aria-hidden />;
  }
  if (q === null) {
    return <>{fallback ?? <span className="text-sm font-medium text-emerald-700">{nights} {t.nights}</span>}</>;
  }
  return (
    <span className={`block leading-tight ${al}`}>
      <span className="text-lg font-semibold text-neutral-900">{formatMoney(q.preTax, cur)}</span>
      <span className="text-sm text-neutral-500"> {t.total}</span>
      <span className="block text-xs text-neutral-500">
        {q.nights} {t.nights} · {q.cleaning ? t.withClean : t.preTax}
      </span>
    </span>
  );
}
