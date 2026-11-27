"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { langFromPath } from "@/lib/i18n";
import { loadLeaflet, addBaseLayer } from "@/lib/leaflet";
import { POIS, POI_GROUPS, CAT_EMOJI, POI_RADIUS_M } from "@/lib/pois";
import { pinHtml, distM } from "./PropertiesMap";

// Mapa de la ficha: mismo estilo que el mapa del home (pin dorado en la
// ubicación del edificio + puntos de interés de explore con sus toggles), pero
// centrado en esta propiedad.
export default function LocationMap({
  lat,
  lng,
  label,
  name,
}: {
  lat: number;
  lng: number;
  label?: string;
  name?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const lang = langFromPath(usePathname());

  useEffect(() => {
    let cancelled = false;
    loadLeaflet()
      .then((L) => {
        if (cancelled || !ref.current || mapRef.current) return;
        const map = L.map(ref.current, { scrollWheelZoom: false }).setView([lat, lng], 14);
        mapRef.current = map;
        addBaseLayer(L, map);

        const icon = L.divIcon({
          html: pinHtml(1),
          className: "maia-pin",
          iconSize: [30, 40],
          iconAnchor: [15, 40],
          popupAnchor: [0, -36],
        });
        const pin = L.marker([lat, lng], { icon, title: name || label || "", zIndexOffset: 1000 }).addTo(map);
        if (name) pin.bindTooltip(name, { direction: "top", offset: [0, -38], permanent: true, className: "maia-pin-label" });

        // Puntos de interés cercanos, agrupados por tipo con toggle (como en el home).
        const here = { lat, lng };
        const near = POIS.filter((poi) => distM(here, poi) < POI_RADIUS_M);
        const overlays: Record<string, any> = {};
        POI_GROUPS.forEach((g) => {
          const items = near.filter((poi) => g.cats.includes(poi.cat));
          if (!items.length) return;
          const layer = L.layerGroup();
          items.forEach((poi) => {
            const pIcon = L.divIcon({
              html: `<div class="maia-poi">${CAT_EMOJI[poi.cat]}</div>`,
              className: "maia-poi-wrap",
              iconSize: [24, 24],
              iconAnchor: [12, 12],
            });
            L.marker([poi.lat, poi.lng], { icon: pIcon })
              .bindTooltip(lang === "en" && poi.nameEn ? poi.nameEn : poi.name, { direction: "top", offset: [0, -10] })
              .addTo(layer);
          });
          overlays[`${g.emoji} ${lang === "en" ? g.labelEn : g.label}`] = layer;
          if (g.onByDefault) layer.addTo(map);
        });
        if (Object.keys(overlays).length) {
          L.control.layers(null, overlays, { collapsed: window.innerWidth < 640, position: "topright" }).addTo(map);
        }

        // Encuadre: el edificio + los 4 lugares visibles más cercanos (≤ 6 km),
        // sin acercar más de 14. En Polanco/Condesa queda igual (hay lugares a
        // pocas cuadras); en Houston abre lo suficiente para que se vean.
        const onCats = POI_GROUPS.filter((g) => g.onByDefault).flatMap((g) => g.cats);
        const closest = near
          .filter((poi) => onCats.includes(poi.cat))
          .map((poi) => ({ poi, d: distM(here, poi) }))
          .filter((x) => x.d < 6000)
          .sort((a, b) => a.d - b.d)
          .slice(0, 4)
          .map((x) => [x.poi.lat, x.poi.lng] as [number, number]);
        const fit = () => {
          map.invalidateSize();
          if (closest.length) map.fitBounds([[lat, lng], ...closest], { padding: [40, 40], maxZoom: 14 });
          else map.setView([lat, lng], 14);
        };
        setTimeout(fit, 250);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lat, lng, name, label, lang]);

  return (
    <div
      ref={ref}
      className="h-80 w-full overflow-hidden rounded-2xl border border-neutral-200 md:h-96"
      aria-label={
        lang === "en"
          ? `Map of ${name || label || "the apartment"} and nearby places`
          : `Mapa de ${name || label || "el departamento"} y lugares cercanos`
      }
    />
  );
}
