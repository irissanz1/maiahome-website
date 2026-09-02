"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const IMAGES = Array.from({ length: 10 }, (_, k) => `/hero/hero-${String(k + 1).padStart(2, "0")}.jpg`);

const LOCATIONS = [
  { value: "", label: "Todas las áreas" },
  { value: "polanco", label: "Polanco" },
  { value: "condesa", label: "Condesa" },
  { value: "houston", label: "Houston" },
];

export default function HomeHero() {
  const router = useRouter();
  const [i, setI] = useState(0);
  const [loc, setLoc] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  function search() {
    const p = new URLSearchParams();
    p.set("market", loc === "houston" ? "us" : "mx");
    if (loc) p.set("zona", loc);
    if (checkin) p.set("checkin", checkin);
    if (checkout) p.set("checkout", checkout);
    if (guests) p.set("guests", String(guests));
    router.push(`/departamentos?${p.toString()}`);
  }

  const field =
    "w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800 outline-none focus:border-maia-strong";

  return (
    <section className="grid grid-cols-1 items-stretch gap-0 md:grid-cols-[minmax(320px,380px)_1fr]">
      {/* Tarjeta de búsqueda (móvil: debajo de la imagen, traslapada) */}
      <div className="relative z-10 order-2 -mt-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl md:order-1 md:mt-0 md:-mr-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-maia-strong">
          CDMX · Houston
        </p>
        <h1 className="mt-2 font-sans text-2xl font-bold leading-[1.1] text-neutral-900 md:text-[2rem]">
          Departamentos amueblados para vivir <span className="italic text-neutral-600">extraordinario</span>
        </h1>
        <p className="mt-2 text-sm text-neutral-600">Estancias premium en Polanco, Condesa y Houston. Reserva directo con Maia Home.</p>

        <div className="mt-5 space-y-2.5">
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Ubicación</span>
            <select value={loc} onChange={(e) => setLoc(e.target.value)} className={field}>
              {LOCATIONS.map((l) => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-2.5">
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Entrada</span>
              <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className={field} />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Salida</span>
              <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} className={field} />
            </label>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-neutral-200 px-3 py-2.5">
            <div>
              <span className="block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Huéspedes</span>
              <span className="text-sm font-medium text-neutral-800">{guests} huésped{guests !== 1 ? "es" : ""}</span>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Menos" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-lg text-neutral-700 hover:bg-neutral-50">−</button>
              <button type="button" aria-label="Más" onClick={() => setGuests((g) => Math.min(16, g + 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-lg text-neutral-700 hover:bg-neutral-50">+</button>
            </div>
          </div>

          <button
            type="button"
            onClick={search}
            className="mt-1 w-full rounded-xl bg-maia-yellow py-3 text-sm font-bold text-black transition hover:bg-maia-strong"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Carrusel de imagen (móvil: arriba) */}
      <div className="relative order-1 min-h-[320px] overflow-hidden rounded-2xl bg-neutral-100 md:order-2">
        {IMAGES.map((src, idx) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
            loading={idx === 0 ? "eager" : "lazy"}
          />
        ))}
        <div className="absolute bottom-4 right-4 z-10 flex gap-1.5">
          {IMAGES.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Foto ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-white" : "w-2 bg-white/70 hover:bg-white"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
