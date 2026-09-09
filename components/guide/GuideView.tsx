"use client";

import { useEffect, useMemo, useState } from "react";
import LocationMap from "@/components/LocationMap";
import type { Guide, GuidePOI } from "@/lib/guides";

type Lang = "es" | "en";
const pick = (l: Lang, f?: { es: string; en: string } | null) => (f ? (l === "en" ? f.en || f.es : f.es || f.en) : "");

const T = {
  es: {
    arrival: "Cómo llegar", house: "Manual de la casa", map: "Mapa", nearby: "Explora la zona", checkout: "Salida",
    checkIn: "Check-in desde las", address: "Dirección", maps: "Google Maps", waze: "Waze",
    noCar: "Sin auto", byCar: "En auto", access: "Instrucciones de acceso", accessVideo: "Ver video de acceso",
    security: "Seguridad", cleaning: "Limpieza", kitchen: "Amenidades y equipamiento", trash: "Basura",
    attractions: "Atracciones", restaurants: "Dónde comer", malls: "Compras", checkoutTitle: "Antes de salir",
    checkoutTime: "El check-out es a las 12:00. Si necesitas salir más tarde, avísanos con anticipación y con gusto lo revisamos.",
    checkoutList: "Deja las llaves donde te indicamos, cierra ventanas y apaga luces. La ropa de cama usada puede quedar en la cama. ¡Gracias por cuidar la casa!",
    help: "¿Dudas durante tu estancia? Escríbenos por WhatsApp y te asistimos al momento.", km: "km",
  },
  en: {
    arrival: "Getting here", house: "House manual", map: "Map", nearby: "Explore the area", checkout: "Check-out",
    checkIn: "Check-in from", address: "Address", maps: "Google Maps", waze: "Waze",
    noCar: "Without a car", byCar: "By car", access: "Access instructions", accessVideo: "Watch access video",
    security: "Security", cleaning: "Cleaning", kitchen: "Amenities & equipment", trash: "Trash",
    attractions: "Attractions", restaurants: "Where to eat", malls: "Shopping", checkoutTitle: "Before you leave",
    checkoutTime: "Check-out is at 12:00. If you need to leave later, let us know in advance and we'll gladly try to help.",
    checkoutList: "Leave the keys where we indicated, close windows and turn off the lights. Used linens can stay on the bed. Thanks for taking care of the home!",
    help: "Questions during your stay? Message us on WhatsApp and we'll help right away.", km: "km",
  },
};

function haversine(aLat: number, aLng: number, bLat: number, bLng: number) {
  const R = 6371, d = (x: number) => (x * Math.PI) / 180;
  const s = Math.sin(d(bLat - aLat) / 2) ** 2 + Math.cos(d(aLat)) * Math.cos(d(bLat)) * Math.sin(d(bLng - aLng) / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(s));
}

const SECTIONS = ["arrival", "house", "map", "nearby", "checkout"] as const;

export default function GuideView({ guide }: { guide: Guide }) {
  const [lang, setLang] = useState<Lang>("es");
  const [arrivalMode, setArrivalMode] = useState<"noCar" | "byCar">("noCar");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("guideLang");
      if (saved === "es" || saved === "en") setLang(saved);
      else if ((navigator.language || "").toLowerCase().startsWith("en")) setLang("en");
    } catch {}
  }, []);
  const setL = (l: Lang) => { setLang(l); try { localStorage.setItem("guideLang", l); } catch {} };
  const t = T[lang];

  const poisByCat = useMemo(() => {
    const withDist = (p: GuidePOI) => ({
      ...p,
      dist: guide.lat != null && guide.lng != null && p.lat != null && p.lng != null
        ? haversine(guide.lat, guide.lng, p.lat, p.lng) : null,
    });
    const g = (cat: string) => guide.pois.filter((p) => p.category === cat).map(withDist);
    return { attraction: g("attraction"), restaurant: g("restaurant"), mall: g("mall") };
  }, [guide]);

  const hasNearby = guide.pois.length > 0;
  const navItems = SECTIONS.filter((s) => s !== "nearby" || hasNearby);

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24">
      {/* Encabezado sticky */}
      <div className="sticky top-0 z-30 -mx-5 mb-2 border-b border-neutral-200 bg-white/90 px-5 py-3 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <span className="font-serif text-lg text-neutral-900">{guide.title}</span>
          <div className="flex overflow-hidden rounded-full border border-neutral-300 text-xs font-semibold">
            {(["es", "en"] as Lang[]).map((l) => (
              <button key={l} onClick={() => setL(l)} className={`px-3 py-1 ${lang === l ? "bg-neutral-900 text-white" : "text-neutral-600"}`}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <nav className="mt-2 flex gap-4 overflow-x-auto text-sm text-neutral-500">
          {navItems.map((s) => (
            <a key={s} href={`#${s}`} className="whitespace-nowrap hover:text-neutral-900">{t[s]}</a>
          ))}
        </nav>
      </div>

      {/* Bienvenida */}
      <header className="relative mt-4 overflow-hidden rounded-3xl bg-neutral-900 px-6 py-14 text-center text-white">
        {guide.heroImg && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={guide.heroImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        )}
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-yellow">{guide.neighborhood || "Maia Home"}</p>
          <h1 className="mt-3 font-serif text-3xl md:text-4xl">{guide.title}</h1>
          <p className="mx-auto mt-3 max-w-lg text-neutral-200">{pick(lang, guide.welcome)}</p>
        </div>
      </header>

      {/* Llegada */}
      <section id="arrival" className="scroll-mt-24 pt-10">
        <SectionTitle>{t.arrival}</SectionTitle>
        <p className="mt-2 text-sm text-neutral-500">{t.checkIn} {guide.checkInTime}</p>
        {guide.address && (
          <div className="mt-4 rounded-2xl border border-neutral-200 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">{t.address}</p>
            <p className="mt-1 text-neutral-800">{guide.address}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {guide.maps && <LinkBtn href={guide.maps}>{t.maps}</LinkBtn>}
              {guide.waze && <LinkBtn href={guide.waze}>{t.waze}</LinkBtn>}
            </div>
          </div>
        )}
        {(pick(lang, guide.arrival.noCar) || pick(lang, guide.arrival.byCar)) && (
          <div className="mt-4">
            <div className="flex overflow-hidden rounded-full border border-neutral-300 text-sm font-semibold">
              {(["noCar", "byCar"] as const).map((m) => (
                <button key={m} onClick={() => setArrivalMode(m)}
                  className={`flex-1 px-4 py-2 ${arrivalMode === m ? "bg-maia-yellow text-black" : "text-neutral-600"}`}>{t[m]}</button>
              ))}
            </div>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-neutral-700">
              {pick(lang, arrivalMode === "noCar" ? guide.arrival.noCar : guide.arrival.byCar)}
            </p>
          </div>
        )}
        {/* Acceso al depto */}
        {(pick(lang, guide.access.toApt) || pick(lang, guide.access.instructions)) && (
          <div className="mt-4 rounded-2xl border-l-4 border-maia-yellow bg-[#FBF7EC] p-4">
            <p className="text-sm font-semibold text-neutral-900">{t.access}</p>
            {pick(lang, guide.access.toApt) && <p className="mt-1 whitespace-pre-line text-sm text-neutral-700">{pick(lang, guide.access.toApt)}</p>}
            {pick(lang, guide.access.instructions) && <p className="mt-2 whitespace-pre-line text-sm text-neutral-700">{pick(lang, guide.access.instructions)}</p>}
            {guide.access.video && <LinkBtn href={guide.access.video} className="mt-3">{t.accessVideo}</LinkBtn>}
          </div>
        )}
        {pick(lang, guide.access.security) && (
          <p className="mt-3 text-sm text-neutral-500"><b className="text-neutral-700">{t.security}:</b> {pick(lang, guide.access.security)}</p>
        )}
      </section>

      {/* Manual de la casa */}
      {(guide.amenities.length > 0 || pick(lang, guide.kit) || pick(lang, guide.cleaning)) && (
        <section id="house" className="scroll-mt-24 pt-10">
          <SectionTitle>{t.house}</SectionTitle>
          {guide.amenities.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {guide.amenities.map((a, i) => (
                <div key={i} className="rounded-2xl border border-neutral-200 p-4">
                  <p className="text-base font-semibold text-neutral-900">{pick(lang, a.title)}</p>
                  <p className="mt-1 whitespace-pre-line text-sm text-neutral-600">{pick(lang, a.description)}</p>
                </div>
              ))}
            </div>
          )}
          {pick(lang, guide.kit) && (
            <div className="prose-guide mt-5 rounded-2xl border border-neutral-200 p-4 text-sm text-neutral-700"
              dangerouslySetInnerHTML={{ __html: pick(lang, guide.kit) }} />
          )}
          {pick(lang, guide.cleaning) && (
            <div className="mt-4 rounded-2xl bg-neutral-50 p-4">
              <p className="text-sm font-semibold text-neutral-900">{t.cleaning}</p>
              <p className="mt-1 whitespace-pre-line text-sm text-neutral-600">{pick(lang, guide.cleaning)}</p>
            </div>
          )}
        </section>
      )}

      {/* Mapa */}
      {guide.lat != null && guide.lng != null && (
        <section id="map" className="scroll-mt-24 pt-10">
          <SectionTitle>{t.map}</SectionTitle>
          <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-200">
            <LocationMap lat={guide.lat} lng={guide.lng} label={guide.title} />
          </div>
        </section>
      )}

      {/* Explora la zona */}
      {hasNearby && (
        <section id="nearby" className="scroll-mt-24 pt-10">
          <SectionTitle>{t.nearby}</SectionTitle>
          {([["attraction", t.attractions], ["restaurant", t.restaurants], ["mall", t.malls]] as const).map(([cat, label]) => {
            const list = poisByCat[cat as keyof typeof poisByCat];
            if (!list.length) return null;
            return (
              <div key={cat} className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-maia-strong">{label}</h3>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {list.map((p, i) => (
                    <div key={i} className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200">
                      {p.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.imageUrl} alt={pick(lang, p.name)} className="h-28 w-full object-cover" />
                      )}
                      <div className="flex flex-1 flex-col p-4">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-neutral-900">{pick(lang, p.name)}</p>
                          {p.dist != null && <span className="shrink-0 text-xs text-neutral-400">{p.dist.toFixed(1)} {t.km}</span>}
                        </div>
                        <p className="mt-1 line-clamp-3 text-sm text-neutral-600">{pick(lang, p.description)}</p>
                        <div className="mt-3 flex gap-2">
                          {p.mapsUrl && <LinkBtn href={p.mapsUrl} small>{t.maps}</LinkBtn>}
                          {p.wazeUrl && <LinkBtn href={p.wazeUrl} small>{t.waze}</LinkBtn>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Salida */}
      <section id="checkout" className="scroll-mt-24 pt-10">
        <SectionTitle>{t.checkoutTitle}</SectionTitle>
        <p className="mt-3 leading-relaxed text-neutral-700">{t.checkoutTime}</p>
        <p className="mt-2 leading-relaxed text-neutral-600">{t.checkoutList}</p>
        {pick(lang, guide.access.trash) && (
          <p className="mt-3 text-sm text-neutral-500"><b className="text-neutral-700">{t.trash}:</b> {pick(lang, guide.access.trash)}</p>
        )}
      </section>

      <p className="mt-10 rounded-2xl bg-[#FBF7EC] p-4 text-center text-sm text-neutral-600">{t.help}</p>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-serif text-2xl text-neutral-900">{children}</h2>;
}

function LinkBtn({ href, children, small, className = "" }: { href: string; children: React.ReactNode; small?: boolean; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`inline-block rounded-lg bg-neutral-900 font-semibold text-white transition hover:bg-neutral-700 ${small ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"} ${className}`}>
      {children}
    </a>
  );
}
