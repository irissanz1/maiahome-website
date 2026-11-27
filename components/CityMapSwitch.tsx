"use client";

import { useState } from "react";
import PropertiesMap, { type MapMarker } from "./PropertiesMap";

export type CityMap = { id: string; label: string; count: number; markers: MapMarker[] };

// Mapa del home con selector de ciudad (CDMX | Houston). Abre en la ciudad del
// mercado activo, pero deja ver la otra sin cambiar el selector del encabezado.
export default function CityMapSwitch({
  cities,
  initial,
  lang = "es",
  heightClass,
}: {
  cities: CityMap[];
  initial: string;
  lang?: "es" | "en";
  heightClass?: string;
}) {
  const shown = cities.filter((c) => c.markers.length > 0);
  const [active, setActive] = useState(shown.some((c) => c.id === initial) ? initial : shown[0]?.id);
  const city = shown.find((c) => c.id === active) ?? shown[0];
  if (!city) return null;
  return (
    <div>
      {shown.length > 1 && (
        <div
          role="tablist"
          aria-label={lang === "en" ? "City" : "Ciudad"}
          className="mb-3 inline-flex rounded-full border border-neutral-200 bg-white p-1 text-sm shadow-sm"
        >
          {shown.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={c.id === city.id}
              onClick={() => setActive(c.id)}
              className={`rounded-full px-4 py-1.5 font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-maia-strong ${
                c.id === city.id ? "bg-maia-dark text-white" : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              {c.label} <span className={c.id === city.id ? "text-white/60" : "text-neutral-400"}>{c.count}</span>
            </button>
          ))}
        </div>
      )}
      <PropertiesMap
        key={city.id}
        markers={city.markers}
        heightClass={heightClass}
        showPois
        poiGroupKeys={["cultura", "compras", "parques"]}
        poiControl={false}
        lang={lang}
      />
    </div>
  );
}
