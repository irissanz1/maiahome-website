"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { MARKETS, ZONAS, resolveMarket } from "@/lib/market";
import { track } from "@/lib/analytics";
import { langFromPath } from "@/lib/i18n";

const ST = {
  es: { checkin: "Entrada", checkout: "Salida", guests: "Huéspedes", add: "Agregar", zone: "Zona", all: "Todas", search: "Buscar" },
  en: { checkin: "Check-in", checkout: "Check-out", guests: "Guests", add: "Add", zone: "Area", all: "All", search: "Search" },
} as const;

export default function SearchStrip({
  basePath = "/departamentos",
  fixedZona,
}: {
  basePath?: string;
  fixedZona?: string; // en una landing de zona: fija la zona y oculta el selector
} = {}) {
  const router = useRouter();
  const sp = useSearchParams();
  const pathname = usePathname();
  const st = ST[langFromPath(pathname)];
  const market = resolveMarket(sp.get("market"));

  const [checkin, setCheckin] = useState(sp.get("checkin") ?? "");
  const [checkout, setCheckout] = useState(sp.get("checkout") ?? "");
  const [guests, setGuests] = useState(sp.get("guests") ?? "2");
  const [zona, setZona] = useState(fixedZona ?? sp.get("zona") ?? "");

  function search() {
    const params = new URLSearchParams();
    params.set("market", market.id);
    if (checkin) params.set("checkin", checkin);
    if (checkout) params.set("checkout", checkout);
    if (guests) params.set("guests", guests);
    if (!fixedZona && zona) params.set("zona", zona);
    track("search", { market: market.id, checkin, checkout, guests, zona });
    router.push(`${basePath}?${params.toString()}`);
  }

  const field =
    "w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800 outline-none focus:border-maia-strong";

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm">
      <div
        className={`grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:items-end ${
          fixedZona ? "lg:grid-cols-[1fr_1fr_auto_auto]" : "lg:grid-cols-[1fr_1fr_auto_1fr_auto]"
        }`}
      >
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-500">{st.checkin}</span>
          <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className={field} />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-500">{st.checkout}</span>
          <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} className={field} />
        </label>
        <label className="block lg:w-28">
          <span className="mb-1 block text-xs font-medium text-neutral-500">{st.guests}</span>
          <select value={guests} onChange={(e) => setGuests(e.target.value)} className={field}>
            <option value="">{st.add}</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
            <option value="6">6+</option>
          </select>
        </label>
        {!fixedZona && (
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-neutral-500">{st.zone}</span>
            <select value={zona} onChange={(e) => setZona(e.target.value)} className={field}>
              <option value="">{st.all} ({market.label})</option>
              {market.zonas.map((z) => (
                <option key={z} value={z}>
                  {ZONAS[z]?.nombre}
                </option>
              ))}
            </select>
          </label>
        )}
        <button
          type="button"
          onClick={search}
          className="rounded-xl bg-maia-yellow px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-maia-strong"
        >
          {st.search}
        </button>
      </div>
    </div>
  );
}
