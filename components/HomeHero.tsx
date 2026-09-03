"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { langFromPath, withLang } from "@/lib/i18n";

const IMAGES = Array.from({ length: 10 }, (_, k) => `/hero/hero-${String(k + 1).padStart(2, "0")}.jpg`);

const LOCATIONS = [
  { value: "", label: "" }, // label set from dict
  { value: "polanco", label: "Polanco" },
  { value: "condesa", label: "Condesa" },
  { value: "houston", label: "Houston" },
];

const HT = {
  es: { eyebrow: "CDMX · Houston", title1: "Departamentos amueblados para vivir ", title2: "extraordinario",
    sub: "Estancias premium en Polanco, Condesa y Houston. Reserva directo con Maia Home.",
    location: "Ubicación", allAreas: "Todas las áreas", checkin: "Entrada", checkout: "Salida",
    guests: "Huéspedes", guest1: "huésped", guestN: "huéspedes", search: "Buscar", less: "Menos", more: "Más", photo: "Foto" },
  en: { eyebrow: "CDMX · Houston", title1: "Furnished apartments for an ", title2: "extraordinary stay",
    sub: "Premium stays in Polanco, Condesa and Houston. Book directly with Maia Home.",
    location: "Location", allAreas: "All areas", checkin: "Check-in", checkout: "Check-out",
    guests: "Guests", guest1: "guest", guestN: "guests", search: "Search", less: "Less", more: "More", photo: "Photo" },
} as const;

export default function HomeHero() {
  const router = useRouter();
  const lang = langFromPath(usePathname());
  const h = HT[lang];
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
    router.push(withLang(lang, "/departamentos") + `?${p.toString()}`);
  }

  const field =
    "w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800 outline-none focus:border-maia-strong";

  return (
    <section className="grid grid-cols-1 items-stretch gap-0 md:grid-cols-[minmax(320px,380px)_1fr]">
      {/* Tarjeta de búsqueda (móvil: debajo de la imagen, traslapada) */}
      <div className="relative z-10 order-2 -mt-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl md:order-1 md:mt-0 md:-mr-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-maia-strong">
          {h.eyebrow}
        </p>
        <h1 className="mt-2 font-sans text-2xl font-bold leading-[1.1] text-neutral-900 md:text-[2rem]">
          {h.title1}<span className="italic text-neutral-600">{h.title2}</span>
        </h1>
        <p className="mt-2 text-sm text-neutral-600">{h.sub}</p>

        <div className="mt-5 space-y-2.5">
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{h.location}</span>
            <select value={loc} onChange={(e) => setLoc(e.target.value)} className={field}>
              {LOCATIONS.map((l) => (
                <option key={l.value} value={l.value}>{l.value ? l.label : h.allAreas}</option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-2.5">
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{h.checkin}</span>
              <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className={field} />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{h.checkout}</span>
              <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} className={field} />
            </label>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-neutral-200 px-3 py-2.5">
            <div>
              <span className="block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{h.guests}</span>
              <span className="text-sm font-medium text-neutral-800">{guests} {guests !== 1 ? h.guestN : h.guest1}</span>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" aria-label={h.less} onClick={() => setGuests((g) => Math.max(1, g - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-lg text-neutral-700 hover:bg-neutral-50">−</button>
              <button type="button" aria-label={h.more} onClick={() => setGuests((g) => Math.min(16, g + 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-lg text-neutral-700 hover:bg-neutral-50">+</button>
            </div>
          </div>

          <button
            type="button"
            onClick={search}
            className="mt-1 w-full rounded-xl bg-maia-yellow py-3 text-sm font-bold text-black transition hover:bg-maia-strong"
          >
            {h.search}
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
              aria-label={`${h.photo} ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-white" : "w-2 bg-white/70 hover:bg-white"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
