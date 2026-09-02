import { cache } from "react";
import { sanity } from "./sanity";
import { MARKETS, type MarketId } from "./market";
import { liveCalendarsForRooms } from "./beds24-live";
import type { Property } from "./types";
// Snapshot de la caché de Beds24 (empaquetado con la app para poder desplegar).
// Se actualiza corriendo: npm run refresh-cache
import cacheJson from "@/data/beds24-cache.json";
import reviewsJson from "@/data/reviews.json";

const ROOMS: Record<string, any> = (cacheJson as any).rooms || {};
const REVIEWS: Record<string, any> = (reviewsJson as any).byRoom || {};

const QUERY = `*[_type=="property" && defined(slug.current) && defined(nombre)]{
  beds24RoomId,
  "slug": slug.current,
  nombre,
  pais,
  "zona": zona->slug.current,
  "zonaNombre": zona->nombre,
  tipo, recamaras, banos, capacidad, capacidadCamas, precioMesBase, segmentos,
  headlineEs, headlineEn, descripcionEs, descripcionEn, prioridad,
  "images": galeria[].asset->url
}`;

function countAvailNext(calendar: Record<string, any>, days = 45): number {
  let c = 0;
  const today = Date.now();
  for (let i = 0; i < days; i++) {
    const date = new Date(today + i * 86400000).toISOString().slice(0, 10);
    if (calendar[date]?.available) c++;
  }
  return c;
}

function build(d: any, room: any): Property {
  const rev = REVIEWS[String(d.beds24RoomId)];
  const calendar = room?.calendar || {};
  const prices = Object.values(calendar)
    .map((x: any) => x.price)
    .filter((p: any) => typeof p === "number");
  const precioDesde = prices.length ? Math.min(...(prices as number[])) : null;
  return {
    beds24RoomId: String(d.beds24RoomId),
    beds24PropertyId: room?.beds24PropertyId ?? null,
    slug: d.slug,
    nombre: d.nombre,
    pais: d.pais || "MX",
    zona: d.zona || "",
    zonaNombre: d.zonaNombre || "",
    tipo: d.tipo,
    recamaras: d.recamaras,
    banos: d.banos,
    capacidad: d.capacidad,
    capacidadCamas: d.capacidadCamas,
    segmentos: d.segmentos || [],
    headline: { es: d.headlineEs || "", en: d.headlineEn || "" },
    descripcion: { es: d.descripcionEs || "", en: d.descripcionEn || "" },
    images: (d.images || []).filter(Boolean),
    prioridad: typeof d.prioridad === "number" ? d.prioridad : 999,
    currency: room?.currency || "USD",
    precioDesde,
    // Precio mensual = base definida por Iris (fuente de verdad). Vacío/"na" → sin mensual.
    precioMes: typeof d.precioMesBase === "number" ? d.precioMesBase : null,
    calendar,
    rating: rev?.rating ?? null,
    reviewCount: rev?.count ?? 0,
    reviews: rev?.reviews ?? [],
    availNext45: countAvailNext(calendar),
  };
}

export function getFeaturedReviews() {
  return ((reviewsJson as any).featured || []) as Array<{
    name: string; text: string; rating: number | null; date: string; avatar: string | null; property: string;
  }>;
}

export const getProperties = cache(async (): Promise<Property[]> => {
  const docs = (await sanity.fetch(QUERY)) as any[];
  const props = docs.map((d) => build(d, ROOMS[String(d.beds24RoomId)]));
  props.sort((a, b) => a.prioridad - b.prioridad || a.nombre.localeCompare(b.nombre));
  return props;
});

function isoPlusDays(n: number): string {
  return new Date(Date.now() + n * 86400000).toISOString().slice(0, 10);
}

/**
 * Sobrepone disponibilidad y precios EN VIVO desde Beds24 (una sola llamada para
 * TODOS los deptos, ~1 crédito, cacheada 90s). Fuente única, sin triangular.
 * `checkout` opcional extiende la ventana para cubrir la búsqueda; si Beds24 no
 * responde, se conserva la cache base empaquetada como respaldo.
 */
export async function withLiveAvailability(
  props: Property[],
  checkout?: string
): Promise<Property[]> {
  if (props.length === 0) return props;
  const start = isoPlusDays(0);
  const base = isoPlusDays(45); // cubre la escasez "próx. 45 días"
  const end = checkout && checkout > base ? checkout : base;
  const live = await liveCalendarsForRooms(
    props.map((p) => p.beds24RoomId),
    start,
    end
  );
  if (!live) return props; // respaldo: cache base
  return props.map((p) => {
    const m = live[p.beds24RoomId];
    if (!m || Object.keys(m).length === 0) return p;
    const calendar = { ...p.calendar, ...m };
    const prices = Object.values(calendar)
      .map((x: any) => x.price)
      .filter((v: any) => typeof v === "number");
    return {
      ...p,
      calendar,
      precioDesde: prices.length ? Math.min(...(prices as number[])) : p.precioDesde,
      availNext45: countAvailNext(calendar),
    };
  });
}

export async function getByMarket(market: MarketId): Promise<Property[]> {
  const zonas = MARKETS[market].zonas;
  return (await getProperties()).filter((p) => zonas.includes(p.zona));
}

export async function getByZona(zonaSlug: string): Promise<Property[]> {
  return (await getProperties()).filter((p) => p.zona === zonaSlug);
}

export async function getBySlug(slug: string): Promise<Property | undefined> {
  return (await getProperties()).find((p) => p.slug === slug);
}
