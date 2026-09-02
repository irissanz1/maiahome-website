"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MARKETS, ZONAS, resolveMarket } from "@/lib/market";
import { track } from "@/lib/analytics";

export default function SearchStrip() {
  const router = useRouter();
  const sp = useSearchParams();
  const market = resolveMarket(sp.get("market"));

  const [checkin, setCheckin] = useState(sp.get("checkin") ?? "");
  const [checkout, setCheckout] = useState(sp.get("checkout") ?? "");
  const [guests, setGuests] = useState(sp.get("guests") ?? "2");
  const [zona, setZona] = useState(sp.get("zona") ?? "");

  function search() {
    const params = new URLSearchParams();
    params.set("market", market.id);
    if (checkin) params.set("checkin", checkin);
    if (checkout) params.set("checkout", checkout);
    if (guests) params.set("guests", guests);
    if (zona) params.set("zona", zona);
    track("search", { market: market.id, checkin, checkout, guests, zona });
    router.push(`/departamentos?${params.toString()}`);
  }

  const field =
    "w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800 outline-none focus:border-maia-strong";

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm">
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_1fr_auto] lg:items-end">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-500">Entrada</span>
          <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className={field} />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-500">Salida</span>
          <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} className={field} />
        </label>
        <label className="block lg:w-28">
          <span className="mb-1 block text-xs font-medium text-neutral-500">Huéspedes</span>
          <select value={guests} onChange={(e) => setGuests(e.target.value)} className={field}>
            <option value="">Agregar</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
            <option value="6">6+</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-500">Zona</span>
          <select value={zona} onChange={(e) => setZona(e.target.value)} className={field}>
            <option value="">Todas ({market.label})</option>
            {market.zonas.map((z) => (
              <option key={z} value={z}>
                {ZONAS[z]?.nombre}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={search}
          className="rounded-xl bg-maia-yellow px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-maia-strong"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
