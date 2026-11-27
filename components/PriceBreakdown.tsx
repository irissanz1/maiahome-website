import type { Quote } from "@/lib/quote";
import type { Currency } from "@/lib/types";
import { formatMoneyCents } from "@/lib/format";

const T = {
  es: {
    nights: (n: number) => `${n} ${n === 1 ? "noche" : "noches"}`,
    discount: (p: number) => `Descuento reserva directa −${p}%`,
    preTax: "Total antes de impuestos",
    total: "Total",
  },
  en: {
    nights: (n: number) => `${n} ${n === 1 ? "night" : "nights"}`,
    discount: (p: number) => `Book-direct discount −${p}%`,
    preTax: "Total before taxes",
    total: "Total",
  },
} as const;

// Desglose idéntico al checkout de Beds24: alojamiento (con el descuento directo
// a la vista), limpieza, impuestos y total, al centavo.
export default function PriceBreakdown({ q, cur, lang = "es" }: { q: Quote; cur: Currency; lang?: "es" | "en" }) {
  const t = T[lang];
  const discount = q.listRoom > q.room ? q.listRoom - q.room : 0;
  const row = "flex items-baseline justify-between gap-3";
  const num = "shrink-0 whitespace-nowrap tabular-nums";
  return (
    <dl className="mt-2 space-y-1.5 text-neutral-600">
      <div className={row}>
        <dt>{t.nights(q.nights)}</dt>
        <dd className={num}>{formatMoneyCents(discount ? q.listRoom : q.room, cur)}</dd>
      </div>
      {discount > 0 && (
        <div className={`${row} text-emerald-700`}>
          <dt>{t.discount(q.discountPct)}</dt>
          <dd className={num}>−{formatMoneyCents(discount, cur)}</dd>
        </div>
      )}
      {q.fees.map((x) => (
        <div key={x.label.en} className={row}>
          <dt>{x.label[lang]}</dt>
          <dd className={num}>{formatMoneyCents(x.amount, cur)}</dd>
        </div>
      ))}
      {q.taxes.length > 0 && (
        <div className={`${row} border-t border-neutral-200 pt-1.5 font-medium text-neutral-800`}>
          <dt>{t.preTax}</dt>
          <dd className={num}>{formatMoneyCents(q.preTax, cur)}</dd>
        </div>
      )}
      {q.taxes.map((x) => (
        <div key={x.label.en} className={row}>
          <dt>{x.label[lang]}</dt>
          <dd className={num}>{formatMoneyCents(x.amount, cur)}</dd>
        </div>
      ))}
      <div className={`${row} border-t border-neutral-200 pt-2 font-semibold text-neutral-900`}>
        <dt>
          {t.total} <span className="text-xs font-normal text-neutral-500">{cur}</span>
        </dt>
        <dd className={num}>{formatMoneyCents(q.total, cur)}</dd>
      </div>
    </dl>
  );
}
