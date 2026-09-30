"use client";

import { useEffect, useState } from "react";
import type { Guide } from "@/lib/guides";
import { whatsappUrl } from "@/lib/contact";

// Barrio de la guía → zona en explore.maiahome.mx (fuente única de recomendaciones).
const EXPLORE_ZONE: Record<string, string> = { Polanco: "zone-polanco", Condesa: "zone-condesa", Houston: "zone-houston" };

type Lang = "es" | "en";
const pick = (l: Lang, f?: { es: string; en: string } | null) => (f ? (l === "en" ? f.en || f.es : f.es || f.en) : "");

const T = {
  es: {
    arrival: "Cómo llegar", house: "Manual de la casa", explore: "Explora la zona", checkout: "Salida",
    guideLabel: "Guía del huésped",
    accessSection: "Cómo entrar", accessCta: "Cómo entrar al depto",
    petsLabel: "Mascotas", petsNone: "Este departamento no admite mascotas.",
    petsOk: (f: string) => `Son bienvenidas: ${f} por estancia, hasta 2.`,
    petsUndeclared: "Solo te pedimos declararla antes de llegar. Si llega una mascota sin declarar, se cobra un cargo de limpieza de USD 150 **adicional** a esa tarifa.",
    checkoutCare: "Déjalo más o menos como lo encontraste y listo: de la limpieza estándar nos encargamos nosotros.",
    coWindows: "Ventanas", coWindowsD: "Ciérralas todas antes de salir.",
    coLights: "Luces y aparatos", coLightsD: "Apaga luces, ventiladores y calentadores.",
    coDoor: "Puerta", coDoorD: "Asegúrate de que quede bien cerrada al salir.",
    coTrash: "Basura",
    coClean: "Limpieza", coCleanD: "Tu reserva incluye la limpieza estándar al salir.",
    coCleanFeeAny: [
      "No hace falta que dejes nada impecable.",
      "Solo te pedimos cuidar los blancos: el maquillaje, el autobronceador, el vino o el tinte casi nunca salen del lavado.",
      "Si se mancha algo, escríbenos en el momento y lo tratamos a tiempo; así casi siempre se salva.",
      "Si una pieza ya no se puede recuperar, se cobra la limpieza adicional o su reposición; el monto depende del departamento: elígelo arriba para verlo.",
    ],
    petsFeeAny: "La tarifa por mascota depende del departamento: elígelo arriba para verla.",
    neighborsEd: "Son departamentos en edificios donde vive gente todo el año, así que el horario de silencio —de 9 pm a 9 am— importa de verdad. Si esperas visitas o una reunión, escríbenos y vemos cómo acomodarlo.",
    neighborsCasa: "Es una casa en una zona residencial, con vecinos que viven ahí todo el año, así que el horario de silencio —de 9 pm a 9 am— importa de verdad. Si esperas visitas o una reunión, escríbenos y vemos cómo acomodarlo.",
    neighborsFee: "No se puede fumar dentro ni hacer fiestas. Si alguna de las dos se rompe, aplica un cargo de 400 USD, como indica el [acuerdo de estancia](https://maiahome.mx/stay-agreement).",
    coCleanFee: (f: string) => [
      "No hace falta que dejes nada impecable.",
      "Solo te pedimos cuidar los blancos: el maquillaje, el autobronceador, el vino o el tinte casi nunca salen del lavado.",
      "Si se mancha algo, escríbenos en el momento y lo tratamos a tiempo; así casi siempre se salva.",
      `Si una pieza ya no se puede recuperar, se cobra la limpieza adicional de ${f} o su reposición.`,
    ],
    regTitle: "¿Ya enviaste tu registro?", regBody: "Sin él no podemos activar tu código: ninguna puerta abre hasta que lo validamos.", regCta: "Completar registro", accessLead: "El punto donde más se traba la llegada. Tómate un minuto aquí antes de salir.",
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
    beforeArrival: "Antes de llegar", stepByStep: "Llegada paso a paso", troubleshoot: "¿Algo no funciona?",
    stuckBtn: "Estoy afuera y no puedo entrar · WhatsApp",
    protoBanner: "Prototipo interno — no enviar a huéspedes.", protoHint: "Lo marcado con ✎ lo debe completar el equipo.",
    whichUnit: "¿Cuál departamento reservaste?", whichUnitHint: "Elígelo para ver tu puerta, horarios flexibles y costos.",
    yourUnit: "Tu departamento", changeUnit: "Cambiar", closePicker: "Cerrar", pickUnit: "Elige tu departamento",
    variesByUnit: "Varía por departamento: elige el tuyo en «¿Cuál departamento reservaste?», al inicio de la guía.",
  },
  en: {
    arrival: "Getting here", house: "House manual", explore: "Explore the area", checkout: "Check-out",
    guideLabel: "Guest guide",
    accessSection: "Getting in", accessCta: "How to get in",
    petsLabel: "Pets", petsNone: "This apartment doesn't allow pets.",
    petsOk: (f: string) => `They're welcome: ${f} per stay, up to 2.`,
    petsUndeclared: "We just ask that you let us know before you arrive. An undeclared pet carries a USD 150 cleaning charge **on top of** that fee.",
    checkoutCare: "Leave it roughly as you found it and that's it: the standard cleaning is on us.",
    coWindows: "Windows", coWindowsD: "Close them all before you leave.",
    coLights: "Lights & appliances", coLightsD: "Switch off lights, fans and heaters.",
    coDoor: "Front door", coDoorD: "Make sure it closes properly on your way out.",
    coTrash: "Trash",
    coClean: "Cleaning", coCleanD: "Your booking includes the standard cleaning when you leave.",
    coCleanFeeAny: [
      "There's no need to leave anything spotless.",
      "We only ask that you look after the linens: makeup, self-tanner, wine and hair dye rarely wash out.",
      "If something gets stained, message us right away so we can treat it in time; that usually saves it.",
      "If an item can't be recovered, either the extra cleaning or its replacement is charged; the amount depends on the apartment: pick yours above to see it.",
    ],
    petsFeeAny: "The pet fee depends on the apartment: pick yours above to see it.",
    neighborsEd: "These are apartments in buildings where people live year-round, so quiet hours —9 pm to 9 am— really matter. If you're expecting visitors or planning a get-together, message us and we'll work it out.",
    neighborsCasa: "This is a house in a residential neighborhood, with neighbors who live there year-round, so quiet hours —9 pm to 9 am— really matter. If you're expecting visitors or planning a get-together, message us and we'll work it out.",
    neighborsFee: "Smoking indoors and parties are not allowed. If either happens, a USD 400 charge applies, as stated in the [stay agreement](https://maiahome.mx/en/stay-agreement).",
    coCleanFee: (f: string) => [
      "There's no need to leave anything spotless.",
      "We only ask that you look after the linens: makeup, self-tanner, wine and hair dye rarely wash out.",
      "If something gets stained, message us right away so we can treat it in time; that usually saves it.",
      `If an item can't be recovered, either the extra cleaning of ${f} or its replacement is charged.`,
    ],
    regTitle: "Have you sent your registration?", regBody: "Without it we can't activate your code: no door opens until we validate it.", regCta: "Complete registration", accessLead: "This is where arrivals usually get stuck. Take a minute here before you head over.",
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
    beforeArrival: "Before you arrive", stepByStep: "Step-by-step arrival", troubleshoot: "Something not working?",
    stuckBtn: "I'm outside and can't get in · WhatsApp",
    protoBanner: "Internal prototype — do not send to guests.", protoHint: "Items marked ✎ must be completed by the team.",
    whichUnit: "Which apartment did you book?", whichUnitHint: "Pick it to see your door, flexible hours and fees.",
    yourUnit: "Your apartment", changeUnit: "Change", closePicker: "Close", pickUnit: "Choose your apartment",
    variesByUnit: "Varies by apartment: pick yours under “Which apartment did you book?” at the top of the guide.",
  },
};

const SECTIONS = ["arrival", "access", "house", "explore", "checkout"] as const;
const SECTION_ICON: Record<string, string> = { arrival: "pin", access: "key", house: "home", explore: "compass", checkout: "door" };

// El idioma viene por URL (/g = ES, /en/g = EN), consistente con el resto del
// sitio; el cambio se hace con el toggle del header.
export default function GuideView({ guide, lang }: { guide: Guide; lang: Lang }) {
  const [arrivalMode, setArrivalMode] = useState<"noCar" | "byCar">("noCar");
  const t = T[lang];

  // Selector de unidad: una guía sirve a varias publicaciones. Se preselecciona con
  // ?unidad=<id> (útil en los mensajes) o con la última elección en este navegador.
  const units = guide.arrivalPlus?.units ?? [];
  const unitAware = units.length > 0;
  const singleUnit = units.length === 1; // guía de una sola publicación: sin selector
  const [unitId, setUnitId] = useState<string | null>(null);
  useEffect(() => {
    const list = guide.arrivalPlus?.units ?? [];
    if (!list.length) return;
    if (list.length === 1) { setUnitId(list[0].id); return; }
    const fromUrl = new URLSearchParams(window.location.search).get("unidad");
    let saved: string | null = null;
    try { saved = localStorage.getItem(`maia-guide-unit:${guide.slug}`); } catch {}
    const chosen = [fromUrl, saved].find((x) => x && list.some((u) => u.id === x));
    if (chosen) setUnitId(chosen);
  }, [guide.slug, guide.arrivalPlus]);
  // Con muchas publicaciones (Coco 12, Luz María 12) la reja ocupaba media
  // pantalla. Si ya sabemos cuál es, se muestra plegada; y de 7 en adelante
  // la lista es una caja de selección, no tarjetas.
  const [pickerOpen, setPickerOpen] = useState(false);
  const manyUnits = units.length > 6;
  const chooseUnit = (id: string) => {
    setPickerOpen(false);
    setUnitId(id);
    try { localStorage.setItem(`maia-guide-unit:${guide.slug}`, id); } catch {}
  };
  // Con una sola publicación se resuelve ya en el servidor (sin esperar al efecto).
  const unit = units.find((u) => u.id === unitId) ?? (singleUnit ? units[0] : undefined);

  // Línea práctica de la portada: calle y horarios, sin repetir el nombre.
  const checkIn = guide.schedule?.checkIn || guide.checkInTime;
  const checkOut = guide.checkout?.time || guide.schedule?.checkOut || "";
  const heroFacts = [
    guide.address ? guide.address.split(",")[0].trim() : "",
    checkIn ? `${t.checkInLabel} ${checkIn}` : "",
    checkOut ? `${t.checkoutTimeLabel} ${checkOut}` : "",
  ].filter(Boolean);

  const exploreZone = EXPLORE_ZONE[guide.neighborhood];
  const navItems = SECTIONS.filter((s) => s !== "explore" || !!exploreZone);

  // Un enlace como /g/coco#access debe caer en la sección: al cargar, el navegador
  // aún no tiene la altura final (imágenes), así que reponemos el salto.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView(), 80);
    return () => clearTimeout(t);
  }, []);

  // Marca la opción de la sección que se está leyendo.
  const [activeSection, setActiveSection] = useState<string>(navItems[0]);
  useEffect(() => {
    const els = navItems.map((s) => document.getElementById(s)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-130px 0px -60% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [navItems.join()]);

  return (
    <div id="top" className="mx-auto max-w-3xl px-5 pb-24">
      {/* Encabezado sticky */}
      <div className="sticky top-[64px] z-30 -mx-5 mb-2 flex items-center gap-3 border-b border-neutral-200 bg-white/95 px-5 py-2.5 backdrop-blur">
        <a href="#top" className="max-w-[32%] shrink-0 truncate font-serif text-base leading-none text-neutral-900 sm:max-w-none">{guide.title}</a>
        <span className="h-5 w-px shrink-0 bg-neutral-200" />
        <nav className="-mr-5 flex flex-1 gap-2 overflow-x-auto pb-0.5 pr-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((s) => {
            const on = activeSection === s;
            return (
              <a key={s} href={`#${s}`} aria-current={on ? "true" : undefined}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition ${
                  on ? "border-maia-strong bg-maia-yellow font-semibold text-black" : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-500 hover:text-neutral-900"
                }`}>
                <Icon name={SECTION_ICON[s]} className="h-3.5 w-3.5" />
                {s === "access" ? t.accessSection : t[s]}
              </a>
            );
          })}
        </nav>
      </div>

      {guide.arrivalPlus?.prototype && (
        <div className="mt-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm text-amber-900">
          <b>{t.protoBanner}</b> {t.protoHint}
        </div>
      )}

      {/* Bienvenida */}
      <header className="mt-4 overflow-hidden rounded-3xl border border-neutral-200 bg-white">
        <div className="grid md:grid-cols-2">
          <div className="order-2 flex flex-col justify-center px-6 py-7 md:order-1 md:px-8 md:py-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-maia-strong">
              {t.guideLabel}{guide.neighborhood ? ` · ${guide.neighborhood}` : ""}
            </p>
            <h1 className="mt-2 font-serif text-3xl leading-tight text-neutral-900 md:text-4xl">{guide.title}</h1>
            <span className="mt-3.5 block h-px w-12 bg-maia-yellow" />
            <p className="mt-3.5 text-neutral-600">{pick(lang, guide.welcome)}</p>
            {heroFacts.length > 0 && (
              <p className="mt-3 text-[13px] leading-relaxed text-neutral-500">{heroFacts.join("  ·  ")}</p>
            )}
            <a href="#access" className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700">
              <Icon name="key" className="h-4 w-4 text-maia-yellow" />
              {t.accessCta}
            </a>
          </div>
          {guide.heroImg && (
            <div className="order-1 md:order-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={guide.heroImg} alt="" className="h-52 w-full object-cover sm:h-64 md:h-full md:min-h-[340px]" />
            </div>
          )}
        </div>
      </header>

      {/* Llegada */}
      <section id="arrival" className="scroll-mt-32 pt-10">
        <SectionTitle icon="pin">{t.arrival}</SectionTitle>
        {guide.arrivalPlus ? (
          <div className="mt-3 grid max-w-md grid-cols-2 gap-2">
            <TimeTile icon="clock" label={t.checkInLabel} time={guide.schedule?.checkIn || guide.checkInTime} />
            <TimeTile icon="door" label={t.checkoutTimeLabel} time={guide.checkout?.time || guide.schedule?.checkOut || ""} />
          </div>
        ) : (
          <TimeCallout icon="clock" label={t.checkInLabel} time={guide.schedule?.checkIn || guide.checkInTime} />
        )}
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
        {unitAware ? (
          <div className="mt-4 rounded-2xl border-2 border-maia-yellow p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-neutral-900">
                <Icon name="door" className="h-4 w-4 text-maia-strong" />
                {singleUnit || (unit && !pickerOpen) ? t.yourUnit : t.whichUnit}
                {unit && !pickerOpen && !singleUnit && (
                  <span className="font-serif text-base font-normal text-neutral-700">· {unit.name}</span>
                )}
              </p>
              {!singleUnit && unit && (
                <button type="button" onClick={() => setPickerOpen((v) => !v)}
                  className="rounded-full border border-neutral-300 px-3 py-1 text-xs font-semibold text-neutral-600 transition hover:border-neutral-500 hover:text-neutral-900">
                  {pickerOpen ? t.closePicker : t.changeUnit}
                </button>
              )}
            </div>
            {!singleUnit && (!unit || pickerOpen) && (
              <>
                <p className="mt-0.5 text-xs text-neutral-500">{t.whichUnitHint}</p>
                {manyUnits ? (
                  <select aria-label={t.whichUnit} value={unitId ?? ""} onChange={(e) => chooseUnit(e.target.value)}
                    className="mt-3 w-full rounded-xl border-2 border-neutral-300 bg-white px-3 py-2.5 text-base text-neutral-900 focus:border-maia-strong focus:outline-none">
                    <option value="" disabled>{t.pickUnit}</option>
                    {units.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} — {u.door}{pick(lang, u.note) ? ` · ${pick(lang, u.note)}` : ""}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className={`mt-3 grid gap-2 sm:grid-cols-3 ${units.length > 4 ? "grid-cols-2" : ""}`} role="radiogroup" aria-label={t.whichUnit}>
                    {units.map((u) => {
                      const on = u.id === unitId;
                      return (
                        <button key={u.id} type="button" role="radio" aria-checked={on} onClick={() => chooseUnit(u.id)}
                          className={`rounded-xl border-2 px-3 py-2.5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-maia-strong ${on ? "border-maia-strong bg-[#FBF7EC]" : "border-neutral-200 bg-white hover:border-neutral-400"}`}>
                          <span className="flex items-center justify-between text-xs text-neutral-500">{u.name}{on && <span className="font-semibold text-maia-strong">✓</span>}</span>
                          <span className="block font-serif text-2xl font-semibold leading-tight text-neutral-900">{u.door}</span>
                          {pick(lang, u.note) && <span className="block text-xs text-neutral-600">{pick(lang, u.note)}</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </>
            )}
            {unit?.details?.length ? (
              <dl className={`grid gap-x-4 gap-y-2.5 text-sm sm:grid-cols-2 ${singleUnit || (unit && !pickerOpen) ? "mt-3" : "mt-3 border-t border-neutral-200 pt-3"}`}>
                {unit.details.map((d, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 text-maia-strong"><Icon name={d.icon || "info"} className="h-4 w-4" /></span>
                    <div>
                      <dt className="text-xs text-neutral-500">{pick(lang, d.label)}</dt>
                      <dd className="text-neutral-800">{rich(pick(lang, d.value))}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        ) : null}
        {guide.arrivalPlus?.beforeArrival?.length ? (
          <div className="mt-4 rounded-2xl bg-neutral-50 p-4">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-neutral-900"><Icon name="info" className="h-4 w-4 text-maia-strong" />{t.beforeArrival}</p>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-neutral-700">
              {guide.arrivalPlus.beforeArrival.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-maia-strong">✓</span>
                  <span>
                    {rich(pick(lang, b.text))}
                    {b.maps && (guide.maps || guide.waze) && (
                      <span className="mt-1.5 flex flex-wrap gap-2">
                        {guide.maps && <LinkBtn small href={guide.maps}>{t.maps}</LinkBtn>}
                        {guide.waze && <LinkBtn small href={guide.waze}>{t.waze}</LinkBtn>}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {(() => {
          const street = (m: "noCar" | "byCar") => (m === "noCar" ? guide.arrival.streetNoCar : guide.arrival.streetByCar);
          const hasMode = (m: "noCar" | "byCar") => !!pick(lang, guide.arrival[m]) || !!street(m);
          const renderMode = (m: "noCar" | "byCar") => (
            <>
              {pick(lang, guide.arrival[m]) && (
                <p className="mt-3 whitespace-pre-line leading-relaxed text-neutral-700">{rich(pick(lang, guide.arrival[m]))}</p>
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
        {guide.schedule && ((!unitAware && pick(lang, guide.schedule.earlyCheckIn)) || pick(lang, guide.schedule.luggage)) && (
          <div className="mt-4 rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-600">
            <p className="flex items-center gap-1.5 font-semibold text-neutral-900"><Icon name="luggage" className="h-4 w-4 text-maia-strong" />{t.flexLabel}</p>
            {!unitAware && pick(lang, guide.schedule.earlyCheckIn) && <p className="mt-1">{pick(lang, guide.schedule.earlyCheckIn)}</p>}
            {pick(lang, guide.schedule.luggage) && <p className="mt-1">{pick(lang, guide.schedule.luggage)}</p>}
          </div>
        )}
      </section>

      {/* Entrar al depto: sale de "Cómo llegar" y tiene sección propia — es el
          punto de fricción nº1 en las reseñas. */}
      <section id="access" className="scroll-mt-32 pt-10">
        <SectionTitle icon="key">{t.accessSection}</SectionTitle>
        <p className="mt-2 text-sm text-neutral-500">{t.accessLead}</p>
        {/* El registro es la causa nº1 de "mi código no funciona": se recuerda aquí,
            no solo en "Antes de llegar". */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-900 bg-neutral-900 px-4 py-3 text-white">
          <p className="text-sm">
            <b>{t.regTitle}</b> <span className="text-neutral-300">{t.regBody}</span>
          </p>
          <a href={`${lang === "en" ? "/en/check-in" : "/check-in"}?g=${guide.slug}`}
            className="shrink-0 rounded-full bg-maia-yellow px-4 py-2 text-sm font-bold text-black transition hover:bg-maia-strong">
            {t.regCta}
          </a>
        </div>
        {/* Acceso al depto: paso a paso (si la guía lo trae) o bloque de siempre */}
        {guide.arrivalPlus?.steps?.length ? (
          <div className="mt-4 rounded-2xl border-l-4 border-maia-yellow bg-[#FBF7EC] p-4">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-neutral-900"><Icon name="key" className="h-4 w-4 text-maia-strong" />{t.stepByStep}</p>
            <ol className="mt-3 space-y-3">
              {guide.arrivalPlus.steps.map((st, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">{i + 1}</span>
                  <div>
                    <p className="font-semibold text-neutral-900">{rich(pick(lang, st.title))}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-neutral-700">{rich(pick(lang, st.body))}</p>
                  </div>
                </li>
              ))}
            </ol>
            {guide.access.video && (
              <figure className="mt-3 overflow-hidden rounded-xl border border-neutral-200 bg-black">
                <video controls preload="metadata" className="aspect-video w-full" src={guide.access.video} />
                <figcaption className="bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-neutral-500">{t.accessVideo}</figcaption>
              </figure>
            )}
          </div>
        ) : (
          (pick(lang, guide.access.toApt) || pick(lang, guide.access.instructions)) && (
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
        )
        )}
        {guide.arrivalPlus?.troubleshoot?.length ? (
          <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 p-4">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-neutral-900"><Icon name="alert" className="h-4 w-4 text-amber-600" />{t.troubleshoot}</p>
            <div className="mt-2 divide-y divide-amber-200">
              {guide.arrivalPlus.troubleshoot.map((it, i) => (
                <details key={i} className="group py-2.5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-neutral-900">
                    {pick(lang, it.q)}
                    <span className="shrink-0 text-amber-600 transition group-open:rotate-45">＋</span>
                  </summary>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-700">{rich(pick(lang, it.a))}</p>
                </details>
              ))}
            </div>
            <a href={whatsappUrl(pick(lang, guide.arrivalPlus.helpMessage))} target="_blank" rel="noopener noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1FAF55] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-95">
              {t.stuckBtn}
            </a>
          </div>
        ) : null}
        {pick(lang, guide.access.security) && (
          <p className="mt-3 text-sm text-neutral-500"><b className="text-neutral-700">{t.security}:</b> {pick(lang, guide.access.security)}</p>
        )}
      </section>

      {/* Manual de la casa */}
      {(guide.amenities.length > 0 || pick(lang, guide.kit) || pick(lang, guide.cleaning) || guide.wifi || guide.climate || guide.amenityRules) && (
        <section id="house" className="scroll-mt-32 pt-10">
          <SectionTitle icon="home">{t.house}</SectionTitle>
          {(guide.wifi || guide.climate || guide.amenityRules) && (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {guide.wifi && <ManualCard title={t.wifiLabel} icon="wifi">{bold(pick(lang, guide.wifi))}</ManualCard>}
              {guide.climate && <ManualCard title={t.climateLabel} icon="temp">{pick(lang, guide.climate)}</ManualCard>}
              {guide.amenityRules && (
                <ManualCard title={t.rulesLabel} icon="shield">
                  {pick(lang, guide.amenityRules)}
                  <span className="mt-2 block">{guide.slug === "augustine" ? t.neighborsCasa : t.neighborsEd}</span>
                  <span className="mt-2 block">{rich(t.neighborsFee)}</span>
                </ManualCard>
              )}
              {unitAware && (
                <ManualCard title={t.petsLabel} icon="paw">
                  {unit
                    ? unit.petFee
                      ? rich(`${t.petsOk(pick(lang, unit.petFee))} ${t.petsUndeclared}`)
                      : t.petsNone
                    : rich(`${t.petsFeeAny} ${t.petsUndeclared}`)}
                </ManualCard>
              )}
            </div>
          )}
          {guide.amenities.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {guide.amenities.filter((a) => !(unitAware && /^(mascotas|pets)$/i.test(a.title.es.trim()))).map((a, i) => (
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
          {(pick(lang, guide.cleaning) || unitAware) && (
            <div className="mt-4 rounded-2xl bg-neutral-50 p-4">
              <p className="text-sm font-semibold text-neutral-900">{t.cleaning}</p>
              <p className="mt-1 whitespace-pre-line text-sm text-neutral-600">
                {unitAware ? (unit ? pick(lang, unit.cleaning) || pick(lang, guide.cleaning) : t.variesByUnit) : pick(lang, guide.cleaning)}
              </p>
              <div className="mt-3 border-t border-neutral-200 pt-3">
                <CleanPolicy lead={t.coCleanD} items={unit?.cleaningFee ? t.coCleanFee(pick(lang, unit.cleaningFee)) : t.coCleanFeeAny} />
              </div>
            </div>
          )}
        </section>
      )}

      {/* Explora la zona → guía de barrio en explore.maiahome.mx (fuente única) */}
      {exploreZone && (
        <section id="explore" className="scroll-mt-32 pt-10">
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
      <section id="checkout" className="scroll-mt-32 pt-10">
        <SectionTitle icon="door">{t.checkoutTitle}</SectionTitle>
        <TimeCallout icon="door" label={t.checkoutTimeLabel} time={guide.checkout?.time || guide.schedule?.checkOut || ""} />
        {guide.checkout && pick(lang, guide.checkout.note) && (
          <p className="mt-4 leading-relaxed text-neutral-700">{pick(lang, guide.checkout.note)}</p>
        )}
        {/* Todo en tarjetas con icono: antes solo Augustine las tenia y el resto
            veia un parrafo plano. La limpieza va aqui, que es cuando aplica. */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(guide.checkout?.items?.length
            ? guide.checkout.items.map((it) => ({
                icon: checkoutIcon(it.title.es),
                title: pick(lang, it.title),
                desc: pick(lang, it.desc),
              }))
            : [
                { icon: "window", title: t.coWindows, desc: t.coWindowsD },
                { icon: "bulb", title: t.coLights, desc: t.coLightsD },
                { icon: "door", title: t.coDoor, desc: t.coDoorD },
                ...(pick(lang, guide.access.trash)
                  ? [{ icon: "trash", title: t.coTrash, desc: pick(lang, guide.access.trash) }]
                  : []),
              ]
          ).map((c, i) => (
            <div key={i} className="rounded-2xl border border-neutral-200 p-4">
              <p className="flex items-center gap-2 text-base font-semibold text-neutral-900">
                <span className="text-maia-strong"><Icon name={c.icon} /></span>
                {c.title}
              </p>
              <p className="mt-1 text-sm text-neutral-600">{c.desc}</p>
            </div>
          ))}
          <div className="rounded-2xl border-2 border-maia-yellow bg-[#FBF7EC] p-4 sm:col-span-2">
            <p className="flex items-center gap-2 text-base font-semibold text-neutral-900">
              <span className="text-maia-strong"><Icon name="droplet" /></span>
              {t.coClean}
            </p>
            <div className="mt-1">
              {unitAware ? (
                <CleanPolicy lead={t.coCleanD} items={unit?.cleaningFee ? t.coCleanFee(pick(lang, unit.cleaningFee)) : t.coCleanFeeAny} />
              ) : (
                <p className="text-sm font-semibold text-neutral-900">{t.coCleanD}</p>
              )}
            </div>
          </div>
        </div>
        <p className="mt-4 rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-600">{t.checkoutCare}</p>
        {unitAware ? (
          <p className="mt-3 text-sm text-neutral-500">{unit ? pick(lang, unit.lateCheckOut) || pick(lang, guide.schedule?.lateCheckOut) : t.variesByUnit}</p>
        ) : (
          guide.schedule && pick(lang, guide.schedule.lateCheckOut) && (
            <p className="mt-3 text-sm text-neutral-500">{pick(lang, guide.schedule.lateCheckOut)}</p>
          )
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

// Texto con **negritas**, [enlaces](url) y [[marcas por completar]] (resaltadas
// para el equipo; solo aparecen en prototipos).
function rich(text: string) {
  if (!text) return null;
  return text.split(/(\[\[[^\]]+\]\]|\[[^\]]+\]\([^)]+\))/g).map((seg, i) => {
    if (seg.startsWith("[[")) {
      return <mark key={i} className="rounded bg-amber-200 px-1 py-0.5 text-[0.85em] font-semibold text-amber-900">✎ {seg.slice(2, -2)}</mark>;
    }
    const link = seg.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer" className="font-semibold text-maia-strong underline">{link[1]}</a>;
    }
    return <span key={i}>{bold(seg)}</span>;
  });
}

// Versión compacta para mostrar entrada y salida lado a lado.
function CleanPolicy({ lead, items }: { lead: string; items: string[] }) {
  return (
    <>
      <p className="text-sm font-semibold text-neutral-900">{lead}</p>
      <ul className="mt-1.5 space-y-1 text-sm text-neutral-700">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-maia-strong" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function TimeTile({ icon, label, time }: { icon: string; label: string; time: string }) {
  if (!time) return null;
  return (
    <div className="flex items-center gap-2.5 rounded-2xl bg-[#FBF7EC] px-3.5 py-3">
      <span className="text-maia-strong"><Icon name={icon} className="h-6 w-6" /></span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">{label}</p>
        <p className="font-serif text-3xl font-semibold leading-none text-neutral-900">{time}</p>
      </div>
    </div>
  );
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
