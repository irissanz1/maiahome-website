import type { Country, Currency } from "./types";

export type MarketId = "mx" | "us";

export interface Market {
  id: MarketId;
  label: string; // etiqueta corta del toggle (México / Houston)
  geo: string; // rótulo geográfico específico para títulos y SEO/GEO
  pais: Country;
  currency: Currency;
  zonas: string[]; // slugs de zona visibles en este mercado
}

// Nota: todo cotiza en USD en Beds24 → moneda USD en ambos mercados.
export const MARKETS: Record<MarketId, Market> = {
  mx: { id: "mx", label: "México", geo: "Ciudad de México", pais: "MX", currency: "USD", zonas: ["polanco", "condesa"] },
  us: { id: "us", label: "Houston", geo: "Houston", pais: "US", currency: "USD", zonas: ["houston"] },
};

export const DEFAULT_MARKET: MarketId = "mx";

export function resolveMarket(value?: string | null): Market {
  if (value === "mx" || value === "us") return MARKETS[value];
  return MARKETS[DEFAULT_MARKET];
}

export interface Zona {
  slug: string;
  nombre: string;
  pais: Country;
  market: MarketId;
  descripcion: { es: string; en: string }; // texto largo aspiracional (en pantalla)
  seo: { es: string; en: string }; // versión corta para meta description (~150 car.)
}

export const ZONAS: Record<string, Zona> = {
  polanco: {
    slug: "polanco", nombre: "Polanco", pais: "MX", market: "mx",
    descripcion: {
      es: "Despierta entre embajadas y jacarandas, desayuna en una terraza y termina el día en Masaryk, la avenida más elegante de México. Museos de clase mundial, alta gastronomía y boutiques de lujo a un paso de tu puerta. Aquí la ciudad se siente serena, sofisticada y tuya.",
      en: "Wake up among embassies and jacaranda trees, have brunch on a terrace and end your day on Masaryk, Mexico's most elegant avenue. World-class museums, fine dining and luxury boutiques just steps from your door. Here the city feels calm, sophisticated and yours.",
    },
    seo: {
      es: "Departamentos amueblados en Polanco, CDMX. Ubicación premium cerca de Masaryk, museos y alta gastronomía. Reserva directo con Maia Home.",
      en: "Furnished apartments in Polanco, Mexico City. Premium location near Masaryk, museums and fine dining. Book directly with Maia Home.",
    },
  },
  condesa: {
    slug: "condesa", nombre: "Condesa", pais: "MX", market: "mx",
    descripcion: {
      es: "El alma bohemia de la Ciudad de México: calles arboladas, edificios Art Déco y parques donde el tiempo va más lento. Cafés de especialidad, librerías, terrazas y una vida nocturna con carácter. La Condesa se camina, se saborea y se vive como un local.",
      en: "Mexico City's bohemian soul: leafy streets, Art Déco architecture and parks where time slows down. Specialty coffee, bookshops, terraces and nightlife with character. Condesa is made to be walked, savored and lived like a local.",
    },
    seo: {
      es: "Departamentos amueblados en la Condesa, CDMX: barrio bohemio, arbolado y lleno de cafés. Reserva directo con Maia Home, sin intermediarios.",
      en: "Furnished apartments in Condesa, Mexico City: leafy, bohemian and full of cafés. Book directly with Maia Home, no middlemen.",
    },
  },
  houston: {
    slug: "houston", nombre: "Houston", pais: "US", market: "us",
    descripcion: {
      es: "Tu base en Houston con la calidez de un hogar y la practicidad de una ciudad global. A minutos del Texas Medical Center, los distritos de negocio y los mejores restaurantes y museos. Ideal para estancias médicas, proyectos de trabajo o descubrir Texas a tu ritmo.",
      en: "Your base in Houston with the warmth of home and the ease of a global city. Minutes from the Texas Medical Center, the business districts and the best restaurants and museums. Perfect for medical stays, work projects or discovering Texas at your own pace.",
    },
    seo: {
      es: "Departamentos amueblados en Houston, TX, cerca del Texas Medical Center y las zonas de negocio. Estancias flexibles con Maia Home.",
      en: "Furnished apartments in Houston, TX, near the Texas Medical Center and business districts. Flexible stays with Maia Home.",
    },
  },
};
