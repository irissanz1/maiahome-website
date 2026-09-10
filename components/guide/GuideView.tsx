"use client";

import { useState } from "react";
import type { Guide } from "@/lib/guides";

// Barrio de la guía → zona en explore.maiahome.mx (fuente única de recomendaciones).
const EXPLORE_ZONE: Record<string, string> = { Polanco: "zone-polanco", Condesa: "zone-condesa", Houston: "zone-houston" };

type Lang = "es" | "en";
const pick = (l: Lang, f?: { es: string; en: string } | null) => (f ? (l === "en" ? f.en || f.es : f.es || f.en) : "");

const T = {
  es: {
    arrival: "Cómo llegar", house: "Manual de la casa", explore: "Explora la zona", checkout: "Salida",
    checkIn: "Check-in desde las", checkInLabel: "Hora de entrada", address: "Dirección", maps: "Google Maps", waze: "Waze",
    noCar: "Sin auto", byCar: "En auto", access: "Instrucciones de acceso", accessVideo: "Ver video de acceso",
    entrance: "Vista de la entrada",
    security: "Seguridad", cleaning: "Limpieza", kitchen: "Amenidades y equipamiento", trash: "Basura",
    wifiLabel: "Wi-Fi", climateLabel: "Clima", rulesLabel: "Reglas y seguridad", flexLabel: "Horarios flexibles",
    exploreDesc: "Descubre los mejores lugares cerca —restaurantes, cafés, museos, parques y más— en nuestra guía del barrio.",
    exploreBtn: "Ver la guía del barrio →", checkoutTitle: "Antes de salir", checkoutTimeLabel: "Hora de salida",
    checkoutTime: "Si necesitas salir más tarde, avísanos con anticipación y con gusto lo revisamos.",
    checkoutList: "Cierra ventanas, apaga luces, ventiladores y calentadores. ¡Gracias por cuidar la casa!",
    help: "¿Dudas durante tu estancia? Escríbenos por WhatsApp y te asistimos al momento.",
  },
  en: {
    arrival: "Getting here", house: "House manual", explore: "Explore the area", checkout: "Check-out",
    checkIn: "Check-in from", checkInLabel: "Check-in time", address: "Address", maps: "Google Maps", waze: "Waze",
    noCar: "Without a car", byCar: "By car", access: "Access instructions", accessVideo: "Watch access video",
    entrance: "Entrance view",
    security: "Security", cleaning: "Cleaning", kitchen: "Amenities & equipment", trash: "Trash",
    wifiLabel: "Wi-Fi", climateLabel: "Climate", rulesLabel: "Rules & security", flexLabel: "Flexible hours",
    exploreDesc: "Discover the best spots nearby —restaurants, cafés, museums, parks and more— in our neighborhood guide.",
    exploreBtn: "Open the neighborhood guide →", checkoutTitle: "Before you leave", checkoutTimeLabel: "Check-out time",
    checkoutTime: "If you need to leave later, let us know in advance and we'll gladly try to help.",
    checkoutList: "Close windows, turn off lights, fans and heaters. Thanks for taking care of the home!",
    help: "Questions during your stay? Message us on WhatsApp and we'll help right away.",
  },
};

const SECTIONS = ["arrival", "house", "explore", "checkout"] as const;

// El idioma viene por URL (/g = ES, /en/g = EN), consistente con el resto del
// sitio; el cambio se hace con el toggle del header.
export default function GuideView({ guide, lang }: { guide: Guide; lang: Lang }) {
  const [arrivalMode, setArrivalMode] = useState<"noCar" | "byCar">("noCar");
  const t = T[lang];

  const exploreZone = EXPLORE_ZONE[guide.neighborhood];
  const navItems = SECTIONS.filter((s) => s !== "explore" || !!exploreZone);

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24">
      {/* Encabezado sticky */}
      <div className="sticky top-0 z-30 -mx-5 mb-2 border-b border-neutral-200 bg-white/90 px-5 py-3 backdrop-blur">
        <span className="font-serif text-lg text-neutral-900">{guide.title}</span>
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
        <SectionTitle icon="pin">{t.arrival}</SectionTitle>
        <TimeCallout icon="clock" label={t.checkInLabel} time={guide.schedule?.checkIn || guide.checkInTime} />
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
            <p className="flex items-center gap-1.5 text-sm font-semibold text-neutral-900"><Icon name="key" className="h-4 w-4 text-maia-strong" />{t.access}</p>
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
        {guide.schedule && (pick(lang, guide.schedule.earlyCheckIn) || pick(lang, guide.schedule.luggage)) && (
          <div className="mt-4 rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-600">
            <p className="flex items-center gap-1.5 font-semibold text-neutral-900"><Icon name="luggage" className="h-4 w-4 text-maia-strong" />{t.flexLabel}</p>
            {pick(lang, guide.schedule.earlyCheckIn) && <p className="mt-1">{pick(lang, guide.schedule.earlyCheckIn)}</p>}
            {pick(lang, guide.schedule.luggage) && <p className="mt-1">{pick(lang, guide.schedule.luggage)}</p>}
          </div>
        )}
      </section>

      {/* Manual de la casa */}
      {(guide.amenities.length > 0 || pick(lang, guide.kit) || pick(lang, guide.cleaning) || guide.wifi || guide.climate || guide.amenityRules) && (
        <section id="house" className="scroll-mt-24 pt-10">
          <SectionTitle icon="home">{t.house}</SectionTitle>
          {(guide.wifi || guide.climate || guide.amenityRules) && (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {guide.wifi && <ManualCard title={t.wifiLabel} icon="wifi">{bold(pick(lang, guide.wifi))}</ManualCard>}
              {guide.climate && <ManualCard title={t.climateLabel} icon="temp">{pick(lang, guide.climate)}</ManualCard>}
              {guide.amenityRules && <ManualCard title={t.rulesLabel} icon="shield">{pick(lang, guide.amenityRules)}</ManualCard>}
            </div>
          )}
          {guide.amenities.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {guide.amenities.map((a, i) => (
                <div key={i} className="rounded-2xl border border-neutral-200 p-4">
                  <p className="flex items-center gap-2 text-base font-semibold text-neutral-900">
                    <span className="text-maia-strong">{<Icon name={amenityIcon(a.title.es)} />}</span>
                    {pick(lang, a.title)}
                  </p>
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

      {/* Explora la zona → guía de barrio en explore.maiahome.mx (fuente única) */}
      {exploreZone && (
        <section id="explore" className="scroll-mt-24 pt-10">
          <SectionTitle icon="compass">{t.explore}</SectionTitle>
          <a
            href={`https://explore.maiahome.mx/${exploreZone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-[#FBF7EC] p-5 transition hover:border-maia-strong"
          >
            <div>
              <p className="text-base font-semibold text-neutral-900">{guide.neighborhood}</p>
              <p className="mt-1 text-sm text-neutral-600">{t.exploreDesc}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-maia-strong">{t.exploreBtn}</span>
            </div>
            <span className="hidden shrink-0 text-3xl sm:block" aria-hidden="true">🗺️</span>
          </a>
        </section>
      )}

      {/* Salida */}
      <section id="checkout" className="scroll-mt-24 pt-10">
        <SectionTitle icon="door">{t.checkoutTitle}</SectionTitle>
        <TimeCallout icon="door" label={t.checkoutTimeLabel} time={guide.checkout?.time || guide.schedule?.checkOut || ""} />
        {guide.checkout ? (
          <>
            <p className="mt-4 leading-relaxed text-neutral-700">{pick(lang, guide.checkout.note)}</p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {guide.checkout.items.map((it, i) => (
                <div key={i} className="rounded-2xl border border-neutral-200 p-4">
                  <p className="flex items-center gap-2 text-base font-semibold text-neutral-900">
                    <span className="text-maia-strong">{<Icon name={checkoutIcon(it.title.es)} />}</span>
                    {pick(lang, it.title)}
                  </p>
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
        {guide.schedule && pick(lang, guide.schedule.lateCheckOut) && (
          <p className="mt-3 text-sm text-neutral-500">{pick(lang, guide.schedule.lateCheckOut)}</p>
        )}
      </section>

      <p className="mt-10 rounded-2xl bg-[#FBF7EC] p-4 text-center text-sm text-neutral-600">{t.help}</p>
    </div>
  );
}

// Íconos de línea (estilo Lucide) — stroke currentColor, heredan color del contenedor.
const ICONS: Record<string, React.ReactNode> = {
  pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.6" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7.5V12l3 1.8" /></>,
  key: <><circle cx="7.5" cy="15.5" r="3.5" /><path d="m10 13 8-8M16.5 4.5l2 2M14.5 6.5l2 2" /></>,
  shield: <><path d="M12 3 5 6v5.5c0 4.3 3 7.7 7 9.5 4-1.8 7-5.2 7-9.5V6l-7-3Z" /></>,
  wifi: <><path d="M4.5 12.5a10.5 10.5 0 0 1 15 0M8 16a6 6 0 0 1 8 0" /><circle cx="12" cy="19.5" r="1" /></>,
  temp: <><path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z" /></>,
  home: <><path d="m3 11 9-7 9 7" /><path d="M5 9.5V20h14V9.5" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5.5-5 2 2-5.5 5-2Z" /></>,
  door: <><path d="M4 21h16M6 21V4h11v17" /><path d="M13 12h.5" /></>,
  luggage: <><rect x="6" y="7.5" width="12" height="12.5" rx="2" /><path d="M9.5 7.5V4.5h5v3M10 20.5v1M14 20.5v1" /></>,
  car: <><path d="M5 16.5V13l1.8-4.2A2 2 0 0 1 8.7 7.5h6.6a2 2 0 0 1 1.9 1.3L19 13v3.5" /><path d="M3.5 13h17" /><circle cx="7.5" cy="16.5" r="1.4" /><circle cx="16.5" cy="16.5" r="1.4" /></>,
  // Amenidades del manual:
  droplet: <path d="M12 3s6 5.6 6 10a6 6 0 0 1-12 0c0-4.4 6-10 6-10Z" />,
  snow: <path d="M12 2.5v19M4.2 7l15.6 9M19.8 7 4.2 16M12 5.2l2.4-1.7M12 5.2 9.6 3.5M12 18.8l2.4 1.7M12 18.8l-2.4 1.7" />,
  waves: <path d="M2 15c1.8 0 1.8-1.5 3.5-1.5S7.3 15 9 15s1.8-1.5 3.5-1.5S14.3 15 16 15s1.8-1.5 3.5-1.5M2 10c1.8 0 1.8-1.5 3.5-1.5S7.3 10 9 10s1.8-1.5 3.5-1.5S14.3 10 16 10s1.8-1.5 3.5-1.5" />,
  utensils: <><path d="M7 2v7a2 2 0 0 0 4 0V2M9 9v13" /><path d="M16 2c-1.6 0-2.8 2-2.8 4.5S14.4 11 16 11v11" /></>,
  alert: <path d="M12 3 2.5 20h19L12 3ZM12 9.5v4.5M12 17.3v.2" />,
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  paw: <><circle cx="8" cy="9" r="1.4" /><circle cx="16" cy="9" r="1.4" /><circle cx="5.5" cy="13" r="1.4" /><circle cx="18.5" cy="13" r="1.4" /><path d="M12 13.5c-2.2 0-3.8 1.6-3.8 3.4 0 1.2 1 2 2.2 2 .7 0 1.1-.4 1.6-.4s.9.4 1.6.4c1.2 0 2.2-.8 2.2-2 0-1.8-1.6-3.4-3.8-3.4Z" /></>,
  bed: <path d="M2 5v15M2 10h18a2 2 0 0 1 2 2v8M2 16h20M6 10V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />,
  tv: <><rect x="3" y="6.5" width="18" height="12" rx="2" /><path d="m8 3 4 3 4-3" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8v.2" /></>,
  // Puntos de check-out:
  trash: <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13M10 11v6M14 11v6" />,
  window: <><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M4 12h16M12 3v18" /></>,
  bulb: <path d="M9.5 18h5M10.5 21h3M12 3a6 6 0 0 0-3.8 10.6c.7.6 1.3 1.2 1.3 2.4h5c0-1.2.6-1.8 1.3-2.4A6 6 0 0 0 12 3Z" />,
};

// Título de un punto de check-out (ES) → ícono.
function checkoutIcon(titleEs: string): string {
  const s = (titleEs || "").toLowerCase();
  if (s.includes("lavavajillas") || s.includes("platos")) return "utensils";
  if (s.includes("basura") || s.includes("comida")) return "trash";
  if (s.includes("toalla")) return "bed";
  if (s.includes("ventana")) return "window";
  if (s.includes("luces") || s.includes("luz") || s.includes("a/c")) return "bulb";
  if (s.includes("puerta")) return "door";
  return "info";
}

// Título de amenidad (ES) → nombre de ícono, por palabra clave.
function amenityIcon(titleEs: string): string {
  const s = (titleEs || "").toLowerCase();
  if (s.includes("agua")) return "droplet";
  if (s.includes("aire aconds") || s.includes("aire acond")) return "snow";
  if (s.includes("alberca") || s.includes("gimnasio") || s.includes("gym")) return "waves";
  if (s.includes("cocina") || s.includes("lavander")) return "utensils";
  if (s.includes("emergencia")) return "alert";
  if (s.includes("luz")) return "bolt";
  if (s.includes("estacionamiento")) return "car";
  if (s.includes("mascota")) return "paw";
  if (s.includes("ropa de cama") || s.includes("toalla")) return "bed";
  if (s.includes("televis") || s.includes("cable")) return "tv";
  return "info";
}

function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2.5 font-serif text-2xl text-neutral-900">
      {icon && <span className="text-maia-strong">{<Icon name={icon} className="h-6 w-6" />}</span>}
      {children}
    </h2>
  );
}

// Renderiza **negritas** simples dentro de un texto.
function bold(text: string) {
  return text.split("**").map((seg, i) => (i % 2 ? <strong key={i} className="font-semibold text-neutral-800">{seg}</strong> : <span key={i}>{seg}</span>));
}

// Recuadro destacado con una hora (entrada / salida).
function TimeCallout({ icon, label, time }: { icon: string; label: string; time: string }) {
  if (!time) return null;
  return (
    <div className="mt-3 inline-flex items-center gap-3 rounded-2xl bg-[#FBF7EC] px-5 py-3">
      <span className="text-maia-strong"><Icon name={icon} className="h-7 w-7" /></span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{label}</p>
        <p className="font-serif text-4xl font-semibold leading-none text-neutral-900">{time}</p>
      </div>
    </div>
  );
}

function ManualCard({ title, icon, children }: { title: string; icon?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-4">
      <p className="flex items-center gap-2 text-base font-semibold text-neutral-900">
        {icon && <span className="text-maia-strong">{<Icon name={icon} />}</span>}
        {title}
      </p>
      <p className="mt-1 text-sm text-neutral-600">{children}</p>
    </div>
  );
}

function LinkBtn({ href, children, small, className = "" }: { href: string; children: React.ReactNode; small?: boolean; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`inline-block rounded-lg bg-neutral-900 font-semibold text-white transition hover:bg-neutral-700 ${small ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"} ${className}`}>
      {children}
    </a>
  );
}
