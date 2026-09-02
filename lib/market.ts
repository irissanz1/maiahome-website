import type { Country, Currency } from "./types";

export type MarketId = "mx" | "us";

export interface Market {
  id: MarketId;
  label: string;
  pais: Country;
  currency: Currency;
  zonas: string[]; // slugs de zona visibles en este mercado
}

// Nota: todo cotiza en USD en Beds24 → moneda USD en ambos mercados.
export const MARKETS: Record<MarketId, Market> = {
  mx: { id: "mx", label: "México", pais: "MX", currency: "USD", zonas: ["polanco", "condesa"] },
  us: { id: "us", label: "Houston", pais: "US", currency: "USD", zonas: ["houston"] },
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
  descripcion: { es: string; en: string };
}

export const ZONAS: Record<string, Zona> = {
  polanco: {
    slug: "polanco", nombre: "Polanco", pais: "MX", market: "mx",
    descripcion: {
      es: "El barrio más exclusivo de la Ciudad de México: embajadas, alta gastronomía, museos y las mejores tiendas.",
      en: "Mexico City's most exclusive district: embassies, fine dining, museums and the best shopping.",
    },
  },
  condesa: {
    slug: "condesa", nombre: "Condesa", pais: "MX", market: "mx",
    descripcion: {
      es: "Arte, cafés y parques arbolados en el corazón bohemio de la CDMX.",
      en: "Art, cafés and tree-lined parks in Mexico City's bohemian heart.",
    },
  },
  houston: {
    slug: "houston", nombre: "Houston", pais: "US", market: "us",
    descripcion: {
      es: "Estancias amuebladas en Houston, Texas: cerca del Medical Center y las principales zonas de negocio.",
      en: "Furnished stays in Houston, Texas: close to the Medical Center and main business areas.",
    },
  },
};
