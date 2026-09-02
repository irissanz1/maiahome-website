"use client";

import { useState } from "react";

const WD = ["L", "M", "M", "J", "V", "S", "D"];

function ymd(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function monthCells(y: number, m: number): (Date | null)[] {
  const first = new Date(y, m, 1);
  const startPad = (first.getDay() + 6) % 7; // lunes primero
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startPad; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(y, m, d));
  return cells;
}

export default function AvailabilityCalendar({ days }: { days: Record<string, boolean> }) {
  const [offset, setOffset] = useState(0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const base = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const monthsToShow = [0, 1].map((i) => new Date(base.getFullYear(), base.getMonth() + i, 1));

  function Month({ d }: { d: Date }) {
    const cells = monthCells(d.getFullYear(), d.getMonth());
    return (
      <div>
        <p className="mb-2 text-center text-sm font-semibold capitalize text-neutral-800">
          {d.toLocaleDateString("es-MX", { month: "long", year: "numeric" })}
        </p>
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-neutral-400">
          {WD.map((w, i) => (
            <div key={i} className="py-1">{w}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((cell, i) => {
            if (!cell) return <div key={i} />;
            const key = ymd(cell);
            const past = cell < today;
            const avail = days[key];
            let cls = "flex h-9 items-center justify-center rounded-lg text-sm ";
            if (past) cls += "text-neutral-300";
            else if (avail === false) cls += "bg-neutral-100 text-neutral-400 line-through";
            else cls += "bg-maia-yellow/25 font-medium text-neutral-800";
            return (
              <div key={i} className={cls} title={past ? "" : avail === false ? "No disponible" : "Disponible"}>
                {cell.getDate()}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-200 p-5">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => setOffset((o) => Math.max(0, o - 1))}
          disabled={offset <= 0}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 disabled:opacity-30 hover:enabled:bg-neutral-50"
          aria-label="Mes anterior"
        >
          ‹
        </button>
        <div className="flex items-center gap-4 text-xs text-neutral-500">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-maia-yellow/25" /> Disponible</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-neutral-100" /> No disponible</span>
        </div>
        <button
          onClick={() => setOffset((o) => Math.min(10, o + 1))}
          disabled={offset >= 10}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 disabled:opacity-30 hover:enabled:bg-neutral-50"
          aria-label="Mes siguiente"
        >
          ›
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {monthsToShow.map((d, i) => (
          <Month key={i} d={d} />
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-neutral-400">
        Disponibilidad indicativa. Se confirma al reservar.
      </p>
    </div>
  );
}
