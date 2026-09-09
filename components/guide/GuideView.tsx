"use client";

import { useEffect, useMemo, useState } from "react";
import GuideMap from "@/components/guide/GuideMap";
import type { Guide } from "@/lib/guides";
import { nearbyPois } from "@/lib/pois";

type Lang = "es" | "en";
const pick = (l: Lang, f?: { es: string; en: string } | null) => (f ? (l === "en" ? f.en || f.es : f.es || f.en) : "");

const T = {
  es: {
    arrival: "Cómo llegar", house: "Manual de la casa", map: "Mapa", nearby: "Explora la zona", checkout: "Salida",
    checkIn: "Check-in desde las", address: "Dirección", maps: "Google Maps", waze: "Waze",
    noCar: "Sin auto", byCar: "En auto", access: "Instrucciones de acceso", accessVideo: "Ver video de acceso",
    entrance: "Vista de la entrada",
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
    entrance: "Entrance view",
    security: "Security", cleaning: "Cleaning", kitchen: "Amenities & equipment", trash: "Trash",
    attractions: "Attractions", restaurants: "Where to eat", malls: "Shopping", checkoutTitle: "Before you leave",
    checkoutTime: "Check-out is at 12:00. If you need to leave later, let us know in advance and we'll gladly try to help.",
    checkoutList: "Leave the keys where we indicated, close windows and turn off the lights. Used linens can stay on the bed. Thanks for taking care of the home!",
    help: "Questions during your stay? Message us on WhatsApp and we'll help right away.", km: "km",
  },
};

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

  const nearby = useMemo(
    () => (guide.lat != null && guide.lng != null ? nearbyPois(guide.lat, guide.lng) : []),
    [guide]
  );
  const hasNearby = nearby.length > 0;
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
        {(() => {
          const street = (m: "noCar" | "byCar") => (m === "noCar" ? guide.arrival.streetNoCar : guide.arrival.streetByCar);
          const hasMode = (m: "noCar" | "byCar") => !!pick(lang, guide.arrival[m]) || !!street(m);
          const renderMode = (m: "noCar" | "byCar") => (
            <>
              {pick(lang, guide.arrival[m]) && (
                <p className="mt-3 whitespace-pre-line leading-relaxed text-neutral-700">{pick(lang, guide.arrival[m])}</p>
              )}
              {street(m) && (
                <figure className="mt-3 overflow-hidden rounded-xl border border-neutral-200">
                  <iframe src={street(m)!} title={t.entrance} loading="lazy" className="aspect-video w-full" style={{ border: 0 }} allowFullScreen />
                  <figcaption className="bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-neutral-500">📍 {t.entrance}</figcaption>
                </figure>
              )}
            </>
          );
          const nc = hasMode("noCar"), bc = hasMode("byCar");
          if (!nc && !bc) return null;
          if (nc && bc) {
            return (
              <div className="mt-4">
                <div className="flex overflow-hidden rounded-full border border-neutral-300 text-sm font-semibold">
                  {(["noCar", "byCar"] as const).map((m) => (
                    <button key={m} onClick={() => setArrivalMode(m)}
                      className={`flex-1 px-4 py-2 ${arrivalMode === m ? "bg-maia-yellow text-black" : "text-neutral-600"}`}>{t[m]}</button>
                  ))}
                </div>
                {renderMode(arrivalMode)}
              </div>
            );
          }
          return <div className="mt-1">{renderMode(nc ? "noCar" : "byCar")}</div>;
        })()}
        {/* Acceso al depto */}
        {(pick(lang, guide.access.toApt) || pick(lang, guide.access.instructions)) && (
          <div className="mt-4 rounded-2xl border-l-4 border-maia-yellow bg-[#FBF7EC] p-4">
            <p className="text-sm font-semibold text-neutral-900">{t.access}</p>
            {pick(lang, guide.access.toApt) && <p className="mt-1 whitespace-pre-line text-sm text-neutral-700">{pick(lang, guide.access.toApt)}</p>}
            {pick(lang, guide.access.instructions) && <p className="mt-2 whitespace-pre-line text-sm text-neutral-700">{pick(lang, guide.access.instructions)}</p>}
            {guide.access.video && (
              <figure className="mt-3 overflow-hidden rounded-xl border border-neutral-200 bg-black">
                <video controls preload="metadata" className="aspect-video w-full" src={guide.access.video} />
                <figcaption className="bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-neutral-500">{t.accessVideo}</figcaption>
              </figure>
            )}
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
            <GuideMap lat={guide.lat} lng={guide.lng} label={guide.title} lang={lang} />
          </div>
        </section>
      )}

      {/* Explora la zona */}
      {hasNearby && (
        <section id="nearby" className="scroll-mt-24 pt-10">
          <SectionTitle>{t.nearby}</SectionTitle>
          {nearby.map((g) => (
            <div key={g.key} className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-maia-strong">
                {g.emoji} {lang === "en" ? g.labelEn : g.label}
              </h3>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {g.items.map((p, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-neutral-900">{p.name}</p>
                      <p className="text-xs text-neutral-400">{p.dist.toFixed(1)} {t.km}</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <a href={p.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-maia-strong hover:underline">{t.maps}</a>
                      <a href={p.wazeUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-maia-strong hover:underline">{t.waze}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Salida */}
      <section id="checkout" className="scroll-mt-24 pt-10">
        <SectionTitle>{t.checkoutTitle}</SectionTitle>
        {guide.checkout ? (
          <>
            <p className="mt-2 text-sm text-neutral-500">{lang === "en" ? "Check-out at" : "Check-out a las"} {guide.checkout.time}</p>
            <p className="mt-2 leading-relaxed text-neutral-700">{pick(lang, guide.checkout.note)}</p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {guide.checkout.items.map((it, i) => (
                <div key={i} className="rounded-2xl border border-neutral-200 p-4">
                  <p className="text-base font-semibold text-neutral-900">{pick(lang, it.title)}</p>
                  <p className="mt-1 text-sm text-neutral-600">{pick(lang, it.desc)}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="mt-3 leading-relaxed text-neutral-700">{t.checkoutTime}</p>
            <p className="mt-2 leading-relaxed text-neutral-600">{t.checkoutList}</p>
            {pick(lang, guide.access.trash) && (
              <p className="mt-3 text-sm text-neutral-500"><b className="text-neutral-700">{t.trash}:</b> {pick(lang, guide.access.trash)}</p>
            )}
          </>
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
