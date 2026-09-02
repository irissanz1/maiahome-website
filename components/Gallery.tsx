"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { img } from "@/lib/format";

function GridIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor" aria-hidden="true">
      <rect x="1" y="1" width="7" height="7" rx="1.5" />
      <rect x="12" y="1" width="7" height="7" rx="1.5" />
      <rect x="1" y="12" width="7" height="7" rx="1.5" />
      <rect x="12" y="12" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export default function Gallery({ images, nombre }: { images: string[]; nombre: string }) {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const touchX = useRef<number | null>(null);

  const n = images.length;
  const go = useCallback((d: number) => setI((prev) => (prev + d + n) % n), [n]);
  const openAt = (idx: number) => { setI(idx); setOpen(true); };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, go]);

  const hero = img(images[0], 1400);
  const thumbs = images.slice(1, 5);

  return (
    <>
      {/* Vista previa estilo mosaico (hero + 2x2) */}
      <div className="grid grid-cols-1 gap-2 overflow-hidden rounded-2xl md:h-[440px] md:grid-cols-4 md:grid-rows-2">
        <button onClick={() => openAt(0)} className="group relative block overflow-hidden md:col-span-2 md:row-span-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero!} alt={nombre} className="h-72 w-full object-cover transition group-hover:brightness-95 md:h-full" />
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-1.5 text-sm font-semibold text-neutral-800 shadow md:hidden">
            <GridIcon className="h-4 w-4" /> {n} fotos
          </span>
        </button>
        {thumbs.map((u, k) => (
          <button key={k} onClick={() => openAt(k + 1)} className="group relative hidden overflow-hidden md:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img(u, 700)!} alt="" className="h-full w-full object-cover transition group-hover:brightness-95" />
            {k === thumbs.length - 1 && n > 5 && (
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/45 text-white transition group-hover:bg-black/55">
                <GridIcon className="h-6 w-6" />
                <span className="text-sm font-semibold">Ver todas las fotos</span>
                <span className="text-xs opacity-90">+{n - 5} más</span>
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox carrusel */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/95"
          onClick={() => setOpen(false)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current == null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between px-5 py-4 text-white" onClick={(e) => e.stopPropagation()}>
            <span className="text-sm font-medium tabular-nums">{i + 1} / {n}</span>
            <button onClick={() => setOpen(false)} aria-label="Cerrar" className="rounded-full p-2 text-2xl leading-none hover:bg-white/10">×</button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-2 pb-4" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => go(-1)} aria-label="Anterior" className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/25">‹</button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img(images[i], 1600)!} alt={`${nombre} ${i + 1}`} className="max-h-full max-w-full rounded-lg object-contain" />
            <button onClick={() => go(1)} aria-label="Siguiente" className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/25">›</button>
          </div>

          <div className="hidden gap-2 overflow-x-auto px-5 pb-4 md:flex" onClick={(e) => e.stopPropagation()}>
            {images.map((u, k) => (
              <button key={k} onClick={() => setI(k)} className={`shrink-0 overflow-hidden rounded-md ring-2 ${k === i ? "ring-maia-yellow" : "ring-transparent"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img(u, 160)!} alt="" className="h-14 w-20 object-cover opacity-80 hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
