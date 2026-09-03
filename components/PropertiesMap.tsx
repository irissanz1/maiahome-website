"use client";

import { useEffect, useRef } from "react";
import { loadLeaflet, addBaseLayer } from "@/lib/leaflet";
import { POIS } from "@/lib/pois";

export type MapMarker = {
  slug: string;
  nombre: string;
  zonaNombre: string;
  lat: number;
  lng: number;
  priceLabel: string | null;
  image: string | null;
  rating: number | null;
  href: string;
};

const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] || c));

// Distancia aproximada en metros (equirectangular, suficiente a esta escala).
function distM(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371000;
  const toRad = Math.PI / 180;
  const lat = ((a.lat + b.lat) / 2) * toRad;
  const x = (b.lng - a.lng) * toRad * Math.cos(lat);
  const y = (b.lat - a.lat) * toRad;
  return Math.sqrt(x * x + y * y) * R;
}

// Agrupa unidades del mismo edificio (< ~70 m). Ancla el grupo en la 1ª coord real.
function groupByBuilding(markers: MapMarker[]): { lat: number; lng: number; units: MapMarker[] }[] {
  const groups: { lat: number; lng: number; units: MapMarker[] }[] = [];
  for (const m of markers) {
    const g = groups.find((gr) => distM(gr, m) < 70);
    if (g) g.units.push(m);
    else groups.push({ lat: m.lat, lng: m.lng, units: [m] });
  }
  return groups;
}

// Pin SVG dorado; con o sin punto central (el numerado no lleva punto).
const teardrop = (dot: boolean) =>
  '<svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M15 0C6.7 0 0 6.7 0 15c0 10.3 15 25 15 25s15-14.7 15-25C30 6.7 23.3 0 15 0z" fill="#F9D316" stroke="#171717" stroke-width="1.5"/>' +
  (dot ? '<circle cx="15" cy="15" r="5.2" fill="#171717"/>' : "") +
  "</svg>";

function pinHtml(count: number) {
  if (count <= 1) return teardrop(true);
  return (
    '<div style="position:relative;width:30px;height:40px">' +
    teardrop(false) +
    `<span style="position:absolute;left:0;top:5px;width:30px;text-align:center;font-weight:700;font-size:13px;color:#171717">${count}</span>` +
    "</div>"
  );
}

function unitCardHtml(m: MapMarker) {
  return `<a href="${esc(m.href)}" style="display:block;width:200px;text-decoration:none;color:inherit">
    ${m.image ? `<img src="${esc(m.image)}" alt="" style="width:100%;height:104px;object-fit:cover;border-radius:8px;display:block" />` : ""}
    <div style="font-weight:600;font-size:13px;margin-top:6px;color:#171717">${esc(m.nombre)}</div>
    <div style="font-size:11px;color:#737373;margin-top:1px">${esc(m.zonaNombre)}${m.rating != null ? ` &middot; &#9733; ${m.rating.toFixed(1)}` : ""}</div>
    ${m.priceLabel ? `<div style="font-size:12px;font-weight:600;margin-top:3px;color:#171717">${esc(m.priceLabel)}</div>` : ""}
    <div style="margin-top:6px;font-size:12px;font-weight:700;color:#a16207">Ver departamento →</div>
  </a>`;
}

function unitRowHtml(m: MapMarker) {
  return `<a href="${esc(m.href)}" style="display:flex;gap:8px;align-items:center;text-decoration:none;color:inherit">
    ${m.image ? `<img src="${esc(m.image)}" alt="" style="width:52px;height:52px;object-fit:cover;border-radius:6px;flex:0 0 auto" />` : ""}
    <span style="min-width:0">
      <span style="display:block;font-weight:600;font-size:12px;color:#171717">${esc(m.nombre)}</span>
      ${m.priceLabel ? `<span style="display:block;font-size:11px;color:#525252">${esc(m.priceLabel)}</span>` : ""}
      <span style="display:block;font-size:11px;font-weight:700;color:#a16207">Ver →</span>
    </span>
  </a>`;
}

function groupPopupHtml(units: MapMarker[]) {
  if (units.length === 1) return unitCardHtml(units[0]);
  return `<div style="width:224px">
    <div style="font-weight:700;font-size:12px;color:#171717;margin-bottom:8px">${units.length} propiedades en este edificio</div>
    <div style="max-height:236px;overflow:auto;display:flex;flex-direction:column;gap:10px">
      ${units.map(unitRowHtml).join("")}
    </div>
  </div>`;
}

export default function PropertiesMap({
  markers,
  heightClass = "h-[560px]",
  showPois = false,
}: {
  markers: MapMarker[];
  heightClass?: string;
  showPois?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    loadLeaflet()
      .then((L) => {
        if (cancelled || !ref.current || mapRef.current) return;
        const map = L.map(ref.current, { scrollWheelZoom: false });
        mapRef.current = map;
        addBaseLayer(L, map);

        const groups = groupByBuilding(markers);
        const pts: [number, number][] = [];
        groups.forEach((g) => {
          pts.push([g.lat, g.lng]);
          const icon = L.divIcon({
            html: pinHtml(g.units.length),
            className: "maia-pin",
            iconSize: [30, 40],
            iconAnchor: [15, 40],
            popupAnchor: [0, -36],
          });
          const marker = L.marker([g.lat, g.lng], {
            icon,
            title: g.units.length > 1 ? `${g.units.length} propiedades` : g.units[0].nombre,
          }).addTo(map);
          marker.bindPopup(groupPopupHtml(g.units), { minWidth: 0 });
          if (g.units.length === 1) marker.on("mouseover", () => marker.openPopup());
        });

        // Puntos de interés cercanos (contexto). Solo los que están a < 8 km de
        // alguna propiedad → el mapa de Houston no muestra POIs de CDMX.
        if (showPois && pts.length) {
          const near = POIS.filter((poi) =>
            markers.some((m) => distM(m, poi) < 8000),
          );
          if (near.length) {
            const poiLayer = L.layerGroup();
            near.forEach((poi) => {
              const icon = L.divIcon({
                html: `<div class="maia-poi">${poi.emoji}</div>`,
                className: "maia-poi-wrap",
                iconSize: [24, 24],
                iconAnchor: [12, 12],
              });
              L.marker([poi.lat, poi.lng], { icon })
                .bindTooltip(poi.name, { direction: "top", offset: [0, -10] })
                .addTo(poiLayer);
            });
            poiLayer.addTo(map);
            L.control
              .layers(null, { "Lugares de interés": poiLayer }, { collapsed: false, position: "topright" })
              .addTo(map);
          }
        }

        // El contenedor puede medir 0 al montar (toggle). Recalcular y encuadrar.
        const fit = () => {
          map.invalidateSize();
          if (pts.length) map.fitBounds(pts, { padding: [50, 50], maxZoom: 15 });
          else map.setView([19.42, -99.19], 12);
        };
        fit();
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
  }, [markers]);

  return (
    <div
      ref={ref}
      className={`${heightClass} w-full overflow-hidden rounded-2xl border border-neutral-200`}
      aria-label="Mapa de ubicaciones de los departamentos"
    />
  );
}
