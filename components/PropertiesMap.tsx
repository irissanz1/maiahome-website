"use client";

import { useEffect, useRef } from "react";
import { loadMarkerCluster } from "@/lib/leaflet";

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

// Pin SVG en dorado de la marca (divIcon, sin imagen externa).
const PIN_SVG =
  '<svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M15 0C6.7 0 0 6.7 0 15c0 10.3 15 25 15 25s15-14.7 15-25C30 6.7 23.3 0 15 0z" fill="#F9D316" stroke="#171717" stroke-width="1.5"/>' +
  '<circle cx="15" cy="15" r="5.2" fill="#171717"/></svg>';

export default function PropertiesMap({ markers }: { markers: MapMarker[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    loadMarkerCluster()
      .then((L) => {
        if (cancelled || !ref.current || mapRef.current) return;
        const map = L.map(ref.current, { scrollWheelZoom: false });
        mapRef.current = map;
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        const icon = L.divIcon({
          html: PIN_SVG,
          className: "maia-pin",
          iconSize: [30, 40],
          iconAnchor: [15, 40],
          popupAnchor: [0, -36],
        });

        // Agrupa unidades del mismo edificio / muy cercanas; al hacer clic las
        // abre en abanico (spiderfy) para poder elegir cada una.
        const cluster = L.markerClusterGroup({
          showCoverageOnHover: false,
          spiderfyDistanceMultiplier: 1.6,
          maxClusterRadius: 40,
          iconCreateFunction: (c: any) =>
            L.divIcon({
              html: `<span>${c.getChildCount()}</span>`,
              className: "maia-cluster",
              iconSize: [38, 38],
            }),
        });

        const pts: [number, number][] = [];
        markers.forEach((m) => {
          pts.push([m.lat, m.lng]); // coordenada real
          const marker = L.marker([m.lat, m.lng], { icon, title: m.nombre });
          const html = `
            <a href="${esc(m.href)}" style="display:block;width:190px;text-decoration:none;color:inherit">
              ${m.image ? `<img src="${esc(m.image)}" alt="" style="width:100%;height:104px;object-fit:cover;border-radius:8px;display:block" />` : ""}
              <div style="font-weight:600;font-size:13px;margin-top:6px;color:#171717">${esc(m.nombre)}</div>
              <div style="font-size:11px;color:#737373;margin-top:1px">${esc(m.zonaNombre)}${m.rating != null ? ` &middot; &#9733; ${m.rating.toFixed(1)}` : ""}</div>
              ${m.priceLabel ? `<div style="font-size:12px;font-weight:600;margin-top:3px;color:#171717">${esc(m.priceLabel)}</div>` : ""}
              <div style="margin-top:6px;font-size:12px;font-weight:700;color:#a16207">Ver departamento →</div>
            </a>`;
          marker.bindPopup(html);
          marker.on("mouseover", () => marker.openPopup());
          cluster.addLayer(marker);
        });
        map.addLayer(cluster);

        if (pts.length) map.fitBounds(pts, { padding: [50, 50], maxZoom: 15 });
        else map.setView([19.42, -99.19], 12);
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
      className="h-[560px] w-full overflow-hidden rounded-2xl border border-neutral-200"
      aria-label="Mapa de ubicaciones de los departamentos"
    />
  );
}
