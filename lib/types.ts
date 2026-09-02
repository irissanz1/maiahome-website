// Tipos del sitio. El contenido viene de Sanity y la disponibilidad de la caché de Beds24;
// la capa lib/data.ts los une por beds24RoomId.

export type Country = "MX" | "US";
export type Segment = "nightly" | "monthly" | "corporate";
export type Currency = "MXN" | "USD";

export interface CalendarDay {
  available: boolean;
  numAvail?: number;
  minStay: number;
  price: number | null;
}

export interface Property {
  beds24RoomId: string;
  beds24PropertyId: string | number | null;
  slug: string;
  nombre: string;
  pais: Country;
  zona: string; // slug de zona
  zonaNombre: string;
  tipo?: string;
  recamaras?: number;
  banos?: number;
  capacidad?: number; // total (camas + sofá cama) — usado para el filtro de huéspedes
  capacidadCamas?: number; // huéspedes en camas fijas
  amenidades: string[]; // amenidades para filtros (Terraza, Alberca, Gimnasio, …)
  segmentos: Segment[];
  headline: { es: string; en: string };
  descripcion: { es: string; en: string };
  images: string[]; // URLs base del CDN de Sanity, en orden (0 = portada)
  prioridad: number;
  currency: Currency;
  precioDesde: number | null;
  precioMes: number | null; // precio mensual real (30 noches, con descuento) — de Beds24 offers
  calendar: Record<string, CalendarDay>;
  rating: number | null;
  reviewCount: number;
  reviews: Review[];
  availNext45: number; // noches disponibles en los próximos 45 días (para escasez)
}

export interface Review {
  name: string;
  text: string;
  rating: number | null;
  date: string;
  avatar: string | null;
}
