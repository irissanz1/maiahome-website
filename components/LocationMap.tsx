"use client";

import { useEffect, useRef } from "react";
import { loadLeaflet, addBaseLayer } from "@/lib/leaflet";

export default function LocationMap({ lat, lng, label }: { lat: number; lng: number; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    loadLeaflet()
      .then((L) => {
        if (cancelled || !ref.current || mapRef.current) return;
        const map = L.map(ref.current, { scrollWheelZoom: false }).setView([lat, lng], 14);
        mapRef.current = map;
        addBaseLayer(L, map);
        // Área aproximada (privacidad): no se muestra el punto exacto.
        L.circle([lat, lng], { radius: 450, color: "#F9D316", weight: 2, fillColor: "#FDDB51", fillOpacity: 0.25 }).addTo(map);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lat, lng]);

  return (
    <div
      ref={ref}
      className="h-72 w-full overflow-hidden rounded-2xl border border-neutral-200 md:h-80"
      aria-label={label ? `Mapa aproximado de ${label}` : "Mapa de ubicación aproximada"}
    />
  );
}
