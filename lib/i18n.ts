// Base de internacionalización. Español en la raíz (/), inglés bajo /en.
// Activar cuando las páginas /en estén construidas (enciende el switch de idioma).
export const LANG_SWITCH_ENABLED = false;

export type Lang = "es" | "en";

export function langFromPath(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

// Construye un href respetando el idioma (en → prefijo /en).
export function withLang(lang: Lang, path: string): string {
  if (lang === "es") return path;
  if (path === "/") return "/en";
  return `/en${path}`;
}

// Cambia el prefijo de idioma de una ruta actual (para el switch ES/EN).
export function switchLangPath(pathname: string, to: Lang): string {
  const bare = pathname === "/en" ? "/" : pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
  return to === "es" ? bare : withLang("en", bare);
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
