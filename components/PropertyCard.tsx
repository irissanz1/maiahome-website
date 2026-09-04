import Link from "next/link";
import type { Property } from "@/lib/types";
import { evaluate, statusLabel, type SearchInput } from "@/lib/availability";
import { formatMoney, img } from "@/lib/format";
import { type Lang, withLang, pick } from "@/lib/i18n";
import Placeholder from "./Placeholder";

const T = {
  es: { guests: "huéspedes", bath: "baño", baths: "baños", bed: "cama", beds: "camas", min: "min", nights: "noches", reviews: "reseñas",
        fast: "Se reserva rápido", free: "noches libres", from: "desde", night: "/ noche", month: "/ mes",
        ask: "Consultar tarifa" },
  en: { guests: "guests", bath: "bath", baths: "baths", bed: "bed", beds: "beds", min: "min", nights: "nights", reviews: "reviews",
        fast: "Books fast", free: "nights left", from: "from", night: "/ night", month: "/ month",
        ask: "Rates on request" },
} as const;

const badgeStyle: Record<string, string> = {
  disponible: "bg-emerald-100 text-emerald-800",
  "no-disponible": "bg-neutral-200 text-neutral-600",
  "estancia-minima": "bg-amber-100 text-amber-800",
  capacidad: "bg-neutral-200 text-neutral-600",
  "sin-fechas": "bg-white/90 text-neutral-700",
};

export default function PropertyCard({
  property,
  search,
  priceMode = "night",
  lang = "es",
}: {
  property: Property;
  search: SearchInput;
  priceMode?: "night" | "month";
  lang?: Lang;
}) {
  const t = T[lang];
  const r = evaluate(property, search);
  const cur = property.currency;
  const showMonth = priceMode === "month" && property.precioMes != null;
  const price = showMonth ? property.precioMes : property.precioDesde;
  const unit = showMonth ? t.month : t.night;

  // Pasa las fechas/huéspedes de la búsqueda a la ficha (para que herede disponibilidad y total).
  const q = new URLSearchParams();
  if (search.checkin) q.set("checkin", search.checkin);
  if (search.checkout) q.set("checkout", search.checkout);
  if (search.guests) q.set("guests", String(search.guests));
  const href = withLang(lang, `/depto/${property.slug}`) + (q.toString() ? `?${q.toString()}` : "");
  const hero = img(property.images[0], 800);
  const specs = [
    property.tipo,
    property.camas ? `${property.camas} ${property.camas !== 1 ? t.beds : t.bed}` : null,
    property.capacidad ? `${property.capacidad} ${t.guests}` : null,
    property.banos ? `${property.banos} ${property.banos !== 1 ? t.baths : t.bath}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:shadow-lg"
    >
      <div className="relative h-52 w-full">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={hero} alt={property.nombre} className="h-52 w-full object-cover" loading="lazy" />
        ) : (
          <Placeholder seed={property.beds24RoomId} label={property.nombre} className="h-52 w-full" />
        )}
        <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${badgeStyle[r.status]}`}>
          {statusLabel(r.status, lang)}
          {r.status === "estancia-minima" && r.minStayRequerido ? ` · ${t.min} ${r.minStayRequerido} ${t.nights}` : ""}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-serif text-xl text-neutral-900">{property.nombre}</h3>
          <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">{property.zonaNombre}</span>
        </div>
        {specs && <p className="mt-0.5 text-sm text-neutral-500">{specs}</p>}
        {property.rating != null && (
          <p className="mt-1 flex items-center gap-1 text-sm">
            <span className="text-amber-500">★</span>
            <span className="font-semibold text-neutral-800">{property.rating.toFixed(1)}</span>
            <span className="text-neutral-400">· {property.reviewCount} {t.reviews}</span>
          </p>
        )}
        {property.availNext45 > 0 && property.availNext45 <= 12 && (
          <p className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
            {t.fast} · {property.availNext45} {t.free}
          </p>
        )}
        {pick(lang, property.headline) && <p className="mt-2 line-clamp-2 text-sm text-neutral-600">{pick(lang, property.headline)}</p>}

        <div className="mt-3 flex items-baseline justify-between">
          {price != null ? (
            <p className="text-sm text-neutral-500">
              <span className="text-xs">{t.from} </span>
              <span className="text-lg font-semibold text-neutral-900">{formatMoney(price, cur)}</span> {unit}
            </p>
          ) : (
            <span className="text-sm text-neutral-400">{t.ask}</span>
          )}
          {r.status === "disponible" && r.total != null && (
            <p className="text-sm font-medium text-emerald-700">
              {formatMoney(r.total, cur)} · {r.nights} {t.nights}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
