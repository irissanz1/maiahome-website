// Base de internacionalización. Español en la raíz (/), inglés bajo /en.
// Activar cuando las páginas /en estén construidas (enciende el switch de idioma).
import { BLOG_SLUG_ES_TO_EN, BLOG_SLUG_EN_TO_ES } from "./blogSlugs";

export const LANG_SWITCH_ENABLED = true;

export type Lang = "es" | "en";

export function langFromPath(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

// Mapa de rutas ES ↔ EN (slugs traducidos, opción B). Rutas estáticas:
const PATHMAP: Array<[string, string]> = [
  ["/", "/en"],
  ["/departamentos", "/en/apartments"],
  ["/mensuales", "/en/monthly-stays"],
  ["/corporativo", "/en/corporate-housing"],
  ["/administramos-tu-depto", "/en/manage-your-apartment"],
  ["/nosotros", "/en/about"],
  ["/formas-de-pago", "/en/payment-options"],
  ["/recorridos-departamentos", "/en/virtual-tours"],
  ["/facturacion", "/en/invoicing"],
  ["/aviso-privacidad", "/en/privacy-notice"],
  ["/terminos-y-condiciones", "/en/terms-and-conditions"],
  ["/terminos-uso", "/en/terms-of-use"],
  ["/stay-agreement", "/en/stay-agreement"],
  ["/polanco", "/en/polanco"],
  ["/condesa", "/en/condesa"],
  ["/houston", "/en/houston"],
];
// Prefijos con segmento dinámico (ficha, reserva):
const DYNMAP: Array<[string, string]> = [
  ["/depto/", "/en/stay/"],
  ["/reservar/", "/en/book/"],
];

// Traduce un path ES a su equivalente en el idioma dado.
export function withLang(lang: Lang, esPath: string): string {
  if (lang === "es") return esPath;
  const exact = PATHMAP.find(([es]) => es === esPath);
  if (exact) return exact[1];
  const dyn = DYNMAP.find(([es]) => esPath.startsWith(es));
  if (dyn) return dyn[1] + esPath.slice(dyn[0].length);
  // Blog (slugs traducidos): /blog, /blog/categoria/<c>, /blog/<esSlug>
  if (esPath === "/blog") return "/en/blog";
  if (esPath.startsWith("/blog/categoria/")) return `/en/blog/category/${esPath.slice("/blog/categoria/".length)}`;
  if (esPath.startsWith("/blog/")) {
    const es = esPath.slice("/blog/".length);
    return `/en/blog/${BLOG_SLUG_ES_TO_EN[es] || es}`;
  }
  return esPath === "/" ? "/en" : `/en${esPath}`;
}

// Devuelve el equivalente ES de un path EN (para el switch y hreflang).
export function toEs(enPath: string): string {
  const exact = PATHMAP.find(([, en]) => en === enPath);
  if (exact) return exact[0];
  const dyn = DYNMAP.find(([, en]) => enPath.startsWith(en));
  if (dyn) return dyn[0] + enPath.slice(dyn[1].length);
  // Blog EN → ES
  if (enPath === "/en/blog") return "/blog";
  if (enPath.startsWith("/en/blog/category/")) return `/blog/categoria/${enPath.slice("/en/blog/category/".length)}`;
  if (enPath.startsWith("/en/blog/")) {
    const en = enPath.slice("/en/blog/".length);
    return `/blog/${BLOG_SLUG_EN_TO_ES[en] || en}`;
  }
  return enPath.replace(/^\/en/, "") || "/";
}

// Cambia el idioma de la ruta actual conservando la página (slugs traducidos).
export function switchLangPath(pathname: string, to: Lang): string {
  const esPath = langFromPath(pathname) === "en" ? toEs(pathname) : pathname;
  return to === "es" ? esPath : withLang("en", esPath);
}

// Elige el valor del idioma de un campo bilingüe { es, en } (con fallback a es).
export function pick(lang: Lang, field?: { es?: string; en?: string } | null): string {
  if (!field) return "";
  return (lang === "en" ? field.en || field.es : field.es || field.en) || "";
}

export const DICT = {
  es: {
    nav: {
      nightly: "Por noche",
      monthly: "Estancias mensuales",
      corporate: "Vivienda corporativa",
      about: "Nosotros",
      billing: "Facturación",
    },
    common: {
      viewAll: "Ver todo",
      seeApartments: "Ver departamentos",
      book: "Reservar",
      viewAvailability: "Ver disponibilidad",
      notAvailable: "No disponible",
      from: "desde",
      night: "noche",
      month: "mes",
      guests: "huéspedes",
      properties: "propiedades",
      property: "propiedad",
      list: "Lista",
      map: "Mapa",
      filters: "Filtros avanzados",
      whatsappHelp: "Escríbenos por WhatsApp",
    },
    footer: {
      tagline: "Departamentos amueblados en CDMX (Polanco, Condesa) y Houston. Reserva directo, sin intermediarios.",
      explore: "Explorar",
      company: "Maia Home",
      legal: "Legal",
      rights: "Todos los derechos reservados.",
    },
  },
  en: {
    nav: {
      nightly: "Nightly",
      monthly: "Monthly stays",
      corporate: "Corporate housing",
      about: "About us",
      billing: "Invoicing",
    },
    common: {
      viewAll: "View all",
      seeApartments: "View apartments",
      book: "Book",
      viewAvailability: "Check availability",
      notAvailable: "Not available",
      from: "from",
      night: "night",
      month: "month",
      guests: "guests",
      properties: "properties",
      property: "property",
      list: "List",
      map: "Map",
      filters: "Advanced filters",
      whatsappHelp: "Message us on WhatsApp",
    },
    footer: {
      tagline: "Furnished apartments in Mexico City (Polanco, Condesa) and Houston. Book directly, no middlemen.",
      explore: "Explore",
      company: "Maia Home",
      legal: "Legal",
      rights: "All rights reserved.",
    },
  },
};

export type Dict = typeof DICT.es;

export function getDict(lang: Lang): Dict {
  return DICT[lang] as Dict;
}
