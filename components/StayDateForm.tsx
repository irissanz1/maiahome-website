"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Selector de fechas/huéspedes dentro de la ficha. Al aplicar, re-navega a la misma
// ficha con los nuevos parámetros → el servidor recalcula disponibilidad, total y el enlace.
export default function StayDateForm({
  slug,
  checkin: dci,
  checkout: dco,
  guests: dg,
}: {
  slug: string;
  checkin?: string;
  checkout?: string;
  guests?: number;
}) {
  const router = useRouter();
  const [checkin, setCheckin] = useState(dci ?? "");
  const [checkout, setCheckout] = useState(dco ?? "");
  const [guests, setGuests] = useState(dg ? String(dg) : "2");

  function apply() {
    const q = new URLSearchParams();
    if (checkin) q.set("checkin", checkin);
    if (checkout) q.set("checkout", checkout);
    if (guests) q.set("guests", guests);
    router.push(`/depto/${slug}${q.toString() ? `?${q.toString()}` : ""}`);
  }

  const field =
    "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800 outline-none focus:border-maia-strong";
  const hasDates = Boolean(checkin && checkout);

  return (
    <div className="mt-4 space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-500">Entrada</span>
          <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className={field} />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-500">Salida</span>
          <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} className={field} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-neutral-500">Huéspedes</span>
        <select value={guests} onChange={(e) => setGuests(e.target.value)} className={field}>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
          <option value="6">6+</option>
        </select>
      </label>
      <button
        type="button"
        onClick={apply}
        className="w-full rounded-lg border border-neutral-300 py-2 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50"
      >
        {hasDates ? "Actualizar fechas" : "Ver disponibilidad"}
      </button>
    </div>
  );
}
