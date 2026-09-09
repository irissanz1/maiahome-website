// Guías del huésped (post-reserva, privadas, noindex). Datos migrados desde la
// app base44 de book.maiahome.mx (snapshot en data/guides.json), desacoplados.
import guidesData from "@/data/guides.json";

type BL = { es: string; en: string };

export interface GuidePOI {
  name: BL;
  description: BL;
  category: "attraction" | "restaurant" | "mall" | string;
  mapsUrl: string | null;
  wazeUrl: string | null;
  imageUrl: string | null;
  lat: number | null;
  lng: number | null;
}

export interface GuideAmenity {
  title: BL;
  description: BL;
  imageUrl: string | null;
  order: number;
}

export interface Guide {
  slug: string;
  title: string;
  code?: string; // código interno del edificio (ej. "Hares" para Aurora) — uso del equipo
  neighborhood: string;
  address: string;
  lat: number | null;
  lng: number | null;
  checkInTime: string;
  maps: string | null;
  waze: string | null;
  heroImg: string | null;
  welcome: BL;
  // Llegada: texto (a pie / en auto) + Street View de Google de la entrada.
  arrival: { noCar: BL; byCar: BL; streetNoCar?: string | null; streetByCar?: string | null };
  access: { video: string | null; toApt: BL; instructions: BL; security: BL; trash: BL };
  cleaning: BL;
  kit: BL; // HTML
  amenities: GuideAmenity[];
  pois: GuidePOI[];
  // Check-out específico por unidad (opcional; si falta se usa el genérico).
  checkout?: { time: string; note: BL; items: { title: BL; desc: BL }[] };
  // Enriquecido del FAQ v56 (nivel edificio): WiFi, clima, reglas/seguridad, horarios.
  wifi?: BL;
  climate?: BL;
  amenityRules?: BL;
  schedule?: { checkOut: string; checkIn: string; earlyCheckIn: BL; lateCheckOut: BL; luggage: BL };
}

const GUIDES = guidesData as unknown as Guide[];

export function getGuides(): Guide[] {
  return GUIDES;
}

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
