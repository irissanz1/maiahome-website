import Link from "next/link";
import type { Property } from "@/lib/types";
import { evaluate, statusLabel, type SearchInput } from "@/lib/availability";
import { formatMoney, img } from "@/lib/format";
import Placeholder from "./Placeholder";

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
}: {
  property: Property;
  search: SearchInput;
  priceMode?: "night" | "month";
}) {
  const r = evaluate(property, search);
  const cur = property.currency;
  const showMonth = priceMode === "month" && property.precioMes != null;
  const price = showMonth ? property.precioMes : property.precioDesde;
  const unit = showMonth ? "/ mes" : "/ noche";

  // Pasa las fechas/huéspedes de la búsqueda a la ficha (para que herede disponibilidad y total).
  const q = new URLSearchParams();
  if (search.checkin) q.set("checkin", search.checkin);
  if (search.checkout) q.set("checkout", search.checkout);
  if (search.guests) q.set("guests", String(search.guests));
  const href = `/depto/${property.slug}${q.toString() ? `?${q.toString()}` : ""}`;
  const hero = img(property.images[0], 800);
  const specs = [
    property.tipo,
    property.capacidad ? `${property.capacidad} huéspedes` : null,
    property.banos ? `${property.banos} baño${property.banos !== 1 ? "s" : ""}` : null,
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
          {statusLabel(r.status)}
          {r.status === "estancia-minima" && r.minStayRequerido ? ` · min ${r.minStayRequerido} noches` : ""}
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
            <span className="text-neutral-400">· {property.reviewCount} reseñas</span>
          </p>
        )}
        {property.availNext45 > 0 && property.availNext45 <= 12 && (
          <p className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
            Se reserva rápido · {property.availNext45} noches libres
          </p>
        )}
        {property.headline.es && <p className="mt-2 line-clamp-2 text-sm text-neutral-600">{property.headline.es}</p>}

        <div className="mt-3 flex items-baseline justify-between">
          {price != null ? (
            <p className="text-sm text-neutral-500">
              <span className="text-xs">desde </span>
              <span className="text-lg font-semibold text-neutral-900">{formatMoney(price, cur)}</span> {unit}
            </p>
          ) : (
            <span className="text-sm text-neutral-400">Consultar tarifa</span>
          )}
          {r.status === "disponible" && r.total != null && (
            <p className="text-sm font-medium text-emerald-700">
              {formatMoney(r.total, cur)} · {r.nights} noches
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
