"use client";

import { useEffect, useRef } from "react";
import { loadLeaflet } from "@/lib/leaflet";

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

export default function PropertiesMap({ markers }: { markers: MapMarker[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    loadLeaflet()
      .then((L) => {
        if (cancelled || !ref.current || mapRef.current) return;
        const map = L.map(ref.current, { scrollWheelZoom: false });
        mapRef.current = map;
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        const pts: [number, number][] = [];
        markers.forEach((m) => {
          pts.push([m.lat, m.lng]);
          // Área aproximada (privacidad): no se marca la dirección exacta.
          const circle = L.circle([m.lat, m.lng], {
            radius: 350,
            color: "#F9D316",
            weight: 2,
            fillColor: "#FDDB51",
            fillOpacity: 0.35,
          }).addTo(map);
          const html = `
            <a href="${esc(m.href)}" style="display:block;width:190px;text-decoration:none;color:inherit">
              ${m.image ? `<img src="${esc(m.image)}" alt="" style="width:100%;height:104px;object-fit:cover;border-radius:8px;display:block" />` : ""}
              <div style="font-weight:600;font-size:13px;margin-top:6px;color:#171717">${esc(m.nombre)}</div>
              <div style="font-size:11px;color:#737373;margin-top:1px">${esc(m.zonaNombre)}${m.rating != null ? ` &middot; &#9733; ${m.rating.toFixed(1)}` : ""}</div>
              ${m.priceLabel ? `<div style="font-size:12px;font-weight:600;margin-top:3px;color:#171717">${esc(m.priceLabel)}</div>` : ""}
              <div style="margin-top:6px;font-size:12px;font-weight:700;color:#a16207">Ver departamento →</div>
            </a>`;
          circle.bindPopup(html);
          circle.on("mouseover", () => circle.openPopup());
        });

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
      aria-label="Mapa de ubicaciones aproximadas de los departamentos"
    />
  );
}
