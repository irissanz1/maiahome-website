"use client";

import { useEffect, useRef } from "react";
import { loadLeaflet, addBaseLayer } from "@/lib/leaflet";
import { POIS, HOUSTON_POIS, POI_GROUPS, CAT_EMOJI } from "@/lib/pois";

// Pin dorado de la propiedad (mismo estilo que el mapa de listado).
const PIN =
  '<svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M15 0C6.7 0 0 6.7 0 15c0 10.3 15 25 15 25s15-14.7 15-25C30 6.7 23.3 0 15 0z" fill="#F9D316" stroke="#171717" stroke-width="1.5"/>' +
  '<circle cx="15" cy="15" r="5.2" fill="#171717"/></svg>';

function distKm(aLat: number, aLng: number, bLat: number, bLng: number) {
  const R = 6371, d = (x: number) => (x * Math.PI) / 180;
  const s = Math.sin(d(bLat - aLat) / 2) ** 2 + Math.cos(d(aLat)) * Math.cos(d(bLat)) * Math.sin(d(bLng - aLng) / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(s));
}

// Mapa de zona estilo EXPLORE para la guía: la propiedad + los POIs cercanos
// (mismos que "Explora la zona": ≤12 km, hasta 6 por grupo), con toggle por grupo.
export default function GuideMap({ lat, lng, label, lang = "es" }: { lat: number; lng: number; label: string; lang?: "es" | "en" }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    loadLeaflet().then((L) => {
      if (cancelled || !ref.current || mapRef.current) return;
      const map = L.map(ref.current, { scrollWheelZoom: false });
      mapRef.current = map;
      addBaseLayer(L, map);

      // Propiedad
      L.marker([lat, lng], {
        icon: L.divIcon({ html: PIN, className: "maia-pin", iconSize: [30, 40], iconAnchor: [15, 40] }),
        zIndexOffset: 1000,
      })
        .bindPopup(`<b>${label}</b>`)
        .addTo(map);

      const bounds: [number, number][] = [[lat, lng]];
      const all = [...POIS, ...HOUSTON_POIS].map((p) => ({ ...p, dist: distKm(lat, lng, p.lat, p.lng) })).filter((p) => p.dist <= 12);
      const overlays: Record<string, any> = {};
      POI_GROUPS.forEach((g) => {
        const items = all.filter((p) => g.cats.includes(p.cat)).sort((a, b) => a.dist - b.dist).slice(0, 6);
        if (!items.length) return;
        const layer = L.layerGroup();
        items.forEach((poi) => {
          const icon = L.divIcon({
            html: `<div class="maia-poi">${CAT_EMOJI[poi.cat]}</div>`,
            className: "maia-poi-wrap",
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          });
          L.marker([poi.lat, poi.lng], { icon }).bindTooltip(poi.name, { direction: "top", offset: [0, -10] }).addTo(layer);
          bounds.push([poi.lat, poi.lng]);
        });
        overlays[`${g.emoji} ${lang === "en" ? g.labelEn : g.label}`] = layer;
        if (g.onByDefault) layer.addTo(map);
      });
      if (Object.keys(overlays).length) {
        L.control.layers(null, overlays, { collapsed: false, position: "topright" }).addTo(map);
      }

      if (bounds.length > 1) map.fitBounds(bounds, { padding: [36, 36], maxZoom: 15 });
      else map.setView([lat, lng], 14);
      setTimeout(() => map.invalidateSize(), 100);
    });
    return () => {
      cancelled = true;
      try { mapRef.current?.remove(); } catch {}
      mapRef.current = null;
    };
  }, [lat, lng, label, lang]);

  return <div ref={ref} className="h-[420px] w-full" />;
}
