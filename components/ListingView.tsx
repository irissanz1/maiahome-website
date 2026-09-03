"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import PropertyCard from "./PropertyCard";
import PropertiesMap, { type MapMarker } from "./PropertiesMap";
import type { Property } from "@/lib/types";
import type { SearchInput } from "@/lib/availability";
import { formatMoney, img } from "@/lib/format";
import { langFromPath, withLang } from "@/lib/i18n";

const LV = {
  es: { list: "Lista", map: "Mapa", empty: "No hay propiedades que coincidan con tu búsqueda.",
    note: "Cada pin es un edificio. El número indica cuántas propiedades hay ahí: haz clic para verlas todas. Recibes el interior y las instrucciones de acceso al confirmar tu reserva.", night: "/ noche" },
  en: { list: "List", map: "Map", empty: "No properties match your search.",
    note: "Each pin is a building. The number shows how many properties are there: click to see them all. You receive the unit and access instructions once your booking is confirmed.", night: "/ night" },
} as const;

export default function ListingView({
  properties,
  search,
}: {
  properties: Property[];
  search: SearchInput;
}) {
  const [view, setView] = useState<"list" | "map">("list");
  const lang = langFromPath(usePathname());
  const t = LV[lang];

  const markers: MapMarker[] = properties
    .filter((p) => typeof p.lat === "number" && typeof p.lng === "number")
    .map((p) => {
      const q = new URLSearchParams();
      if (search.checkin) q.set("checkin", search.checkin);
      if (search.checkout) q.set("checkout", search.checkout);
      if (search.guests) q.set("guests", String(search.guests));
      return {
        slug: p.slug,
        nombre: p.nombre,
        zonaNombre: p.zonaNombre,
        lat: p.lat as number,
        lng: p.lng as number,
        priceLabel: p.precioDesde != null ? `${formatMoney(p.precioDesde, p.currency)} ${t.night}` : null,
        image: img(p.images[0], 400),
        rating: p.rating,
        href: withLang(lang, `/depto/${p.slug}`) + (q.toString() ? `?${q.toString()}` : ""),
      };
    });

  const tab = (v: "list" | "map", label: string) => (
    <button
      type="button"
      onClick={() => setView(v)}
      aria-pressed={view === v}
      className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
        view === v ? "bg-neutral-900 text-white" : "text-neutral-600 hover:text-neutral-900"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="mt-6 flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-1 w-fit">
        {tab("list", t.list)}
        {tab("map", `${t.map}${markers.length ? ` · ${markers.length}` : ""}`)}
      </div>

      {view === "list" ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <PropertyCard key={p.beds24RoomId} property={p} search={search} lang={lang} />
          ))}
        </div>
      ) : markers.length ? (
        <div className="mt-6">
          <PropertiesMap markers={markers} showPois />
          <p className="mt-3 text-xs text-neutral-400">{t.note}</p>
        </div>
      ) : (
        <p className="mt-16 text-center text-neutral-500">{t.empty}</p>
      )}
    </div>
  );
}
