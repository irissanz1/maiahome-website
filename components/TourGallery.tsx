"use client";

import { useEffect, useState } from "react";

export type Tour = { nombre: string; specs: string; url: string; image?: string | null };

export default function TourGallery({ tours }: { tours: Tour[] }) {
  const [active, setActive] = useState<Tour | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((t) => (
          <button
            key={t.nombre}
            onClick={() => setActive(t)}
            className="group overflow-hidden rounded-2xl border border-neutral-200 text-left transition hover:shadow-lg"
          >
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-600">
              {t.image && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.image}
                    alt={t.nombre}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-black/25 transition group-hover:bg-black/35" />
                </>
              )}
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-md transition group-hover:scale-110">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white">
                Recorrido 3D
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold text-neutral-900">{t.nombre}</h3>
              <p className="mt-0.5 text-sm text-neutral-500">{t.specs}</p>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/90 p-4 md:p-8"
          onClick={() => setActive(null)}
        >
          <div className="mb-3 flex items-center justify-between text-white">
            <span className="font-semibold">{active.nombre}</span>
            <button
              onClick={() => setActive(null)}
              aria-label="Cerrar"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xl hover:bg-white/20"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-hidden rounded-2xl bg-black" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={active.url}
              title={`Recorrido virtual — ${active.nombre}`}
              className="h-full w-full"
              allow="fullscreen; xr-spatial-tracking"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
