"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "@/lib/analytics";

// Selector de fechas + UN SOLO botón que hace ambas cosas:
//  - si faltan fechas o cambiaron → "Ver disponibilidad" (recalcula en el servidor)
//  - si las fechas aplicadas están disponibles → "Reservar" (checkout de Beds24)
//  - si no están disponibles → "No disponible" (bloqueado)
export default function StayDateForm({
  slug,
  checkin: dci,
  checkout: dco,
  guests: dg,
  status,
  beds24Url,
  roomId,
  nombre,
}: {
  slug: string;
  checkin?: string;
  checkout?: string;
  guests?: number;
  status: string;
  beds24Url: string;
  roomId: string;
  nombre: string;
}) {
  const router = useRouter();
  const [checkin, setCheckin] = useState(dci ?? "");
  const [checkout, setCheckout] = useState(dco ?? "");
  const [guests, setGuests] = useState(dg ? String(dg) : "2");
  const ciRef = useRef<HTMLInputElement>(null);

  const appliedGuests = dg ? String(dg) : "2";
  const complete = Boolean(checkin && checkout);
  const changed = checkin !== (dci ?? "") || checkout !== (dco ?? "") || guests !== appliedGuests;

  // Modo del botón
  let mode: "apply" | "reserve" | "blocked" = "apply";
  let label = "Ver disponibilidad";
  if (complete && !changed) {
    if (status === "disponible") {
      mode = "reserve";
      label = "Reservar";
    } else if (status === "no-disponible" || status === "estancia-minima" || status === "capacidad") {
      mode = "blocked";
      label = "No disponible";
    }
  }

  function apply() {
    const q = new URLSearchParams();
    if (checkin) q.set("checkin", checkin);
    if (checkout) q.set("checkout", checkout);
    if (guests) q.set("guests", guests);
    router.push(`/depto/${slug}${q.toString() ? `?${q.toString()}` : ""}`);
  }

  function onClick() {
    if (mode === "blocked") return;
    if (mode === "reserve") {
      track("reserva_click", { roomId, nombre });
      window.open(beds24Url, "_blank", "noopener");
      return;
    }
    // apply
    if (!complete) {
      ciRef.current?.focus();
      if (ciRef.current?.showPicker) try { ciRef.current.showPicker(); } catch {}
      return;
    }
    apply();
  }

  const field =
    "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800 outline-none focus:border-maia-strong";

  return (
    <div className="mt-4 space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-500">Entrada</span>
          <input ref={ciRef} type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className={field} />
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
        onClick={onClick}
        aria-disabled={mode === "blocked"}
        className={`w-full rounded-xl px-4 py-3 text-sm font-bold transition ${
          mode === "blocked"
            ? "cursor-not-allowed bg-neutral-200 text-neutral-500"
            : "bg-maia-yellow text-black hover:bg-maia-strong"
        }`}
      >
        {label}
      </button>
    </div>
  );
}
