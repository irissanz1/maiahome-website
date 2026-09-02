"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AMENITY_FILTERS } from "@/lib/listing";

export default function AdvancedFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);

  const rec = params.get("rec") || "";
  const ban = params.get("ban") || "";
  const precio = params.get("precio") || "";
  const m2 = params.get("m2") || "";
  const amen = (params.get("amen") || "").split(",").map((s) => s.trim()).filter(Boolean);
  const activeCount = (rec ? 1 : 0) + (ban ? 1 : 0) + (precio ? 1 : 0) + (m2 ? 1 : 0) + amen.length;

  function update(next: Record<string, string | null>) {
    const p = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v == null || v === "") p.delete(k);
      else p.set(k, v);
    }
    router.push(`${pathname}?${p.toString()}`, { scroll: false });
  }

  function toggleAmen(a: string) {
    const set = new Set(amen);
    if (set.has(a)) set.delete(a);
    else set.add(a);
    update({ amen: [...set].join(",") || null });
  }

  const pill = (active: boolean) =>
    `rounded-full border px-3.5 py-1.5 text-sm transition ${
      active
        ? "border-maia-strong bg-maia-yellow/40 font-semibold text-neutral-900"
        : "border-neutral-300 text-neutral-600 hover:bg-neutral-50"
    }`;

  const recOptions: [string, string][] = [["", "Cualquiera"], ["1", "1+"], ["2", "2+"], ["3", "3+"], ["4", "4+"]];
  const banOptions: [string, string][] = [["", "Cualquiera"], ["1", "1+"], ["2", "2+"], ["3", "3+"]];
  const precioOptions: [string, string][] = [["", "Cualquiera"], ["0-100", "≤ $100"], ["100-150", "$100–150"], ["150-250", "$150–250"], ["250-", "≥ $250"]];
  const m2Options: [string, string][] = [["", "Cualquiera"], ["50", "50+ m²"], ["80", "80+ m²"], ["120", "120+ m²"]];

  return (
    <div className="mt-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M6 12h12M10 18h4" />
          </svg>
          Filtros avanzados
          {activeCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-maia-strong px-1.5 text-xs font-bold text-black">
              {activeCount}
            </span>
          )}
        </button>
        {activeCount > 0 && (
          <button onClick={() => update({ rec: null, ban: null, precio: null, m2: null, amen: null })} className="text-sm text-neutral-500 underline hover:text-neutral-800">
            Limpiar
          </button>
        )}
      </div>

      {open && (
        <div className="mt-3 space-y-5 rounded-2xl border border-neutral-200 bg-white p-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-400">Recámaras</p>
            <div className="flex flex-wrap gap-2">
              {recOptions.map(([v, label]) => (
                <button key={v} className={pill(rec === v)} onClick={() => update({ rec: v || null })}>{label}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-400">Baños</p>
            <div className="flex flex-wrap gap-2">
              {banOptions.map(([v, label]) => (
                <button key={v} className={pill(ban === v)} onClick={() => update({ ban: v || null })}>{label}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-400">Precio por noche (USD)</p>
            <div className="flex flex-wrap gap-2">
              {precioOptions.map(([v, label]) => (
                <button key={v} className={pill(precio === v)} onClick={() => update({ precio: v || null })}>{label}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-400">Tamaño</p>
            <div className="flex flex-wrap gap-2">
              {m2Options.map(([v, label]) => (
                <button key={v} className={pill(m2 === v)} onClick={() => update({ m2: v || null })}>{label}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-400">Amenidades</p>
            <div className="flex flex-wrap gap-2">
              {AMENITY_FILTERS.map((a) => (
                <button key={a} className={pill(amen.includes(a))} onClick={() => toggleAmen(a)}>{a}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
