import { cache } from "react";
import { sanity } from "./sanity";
import { MARKETS, type MarketId } from "./market";
import { liveCalendarsForRooms } from "./beds24-live";
import type { Property, Review } from "./types";
// Snapshot de la caché de Beds24 (empaquetado con la app para poder desplegar).
// Se actualiza corriendo: npm run refresh-cache
import cacheJson from "@/data/beds24-cache.json";
import reviewsJson from "@/data/reviews.json";

const ROOMS: Record<string, any> = (cacheJson as any).rooms || {};
const REVIEWS: Record<string, any> = (reviewsJson as any).byRoom || {};

// Reseñas curables desde Sanity Studio (visible / destacada / orden).
const REVIEWS_QUERY = `*[_type=="review" && visible==true]{author,text,rating,date,avatar,beds24RoomId,orden}`;
const FEATURED_QUERY = `*[_type=="review" && visible==true && destacada==true]{author,text,rating,date,avatar,propertyName,orden} | order(orden asc, date desc)`;

function toReview(d: any): Review & { orden?: number } {
  return {
    name: d.author || "",
    text: d.text || "",
    rating: typeof d.rating === "number" ? d.rating : null,
    date: d.date || "",
    avatar: d.avatar || null,
    orden: typeof d.orden === "number" ? d.orden : undefined,
  };
}

function groupReviews(docs: any[]): Record<string, Review[]> {
  const by: Record<string, (Review & { orden?: number })[]> = {};
  for (const d of docs || []) {
    const k = String(d.beds24RoomId || "");
    if (!k) continue;
    (by[k] ??= []).push(toReview(d));
  }
  for (const k in by) {
    by[k].sort(
      (a, b) => (a.orden ?? 9999) - (b.orden ?? 9999) || (b.date || "").localeCompare(a.date || "")
    );
  }
  return by;
}

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

function build(d: any, room: any, sanityReviews?: Review[]): Property {
  const rev = REVIEWS[String(d.beds24RoomId)];
  // Tarjetas de reseña: de Sanity (curadas); si no hay, cae al snapshot.
  const reviews = sanityReviews && sanityReviews.length ? sanityReviews : rev?.reviews ?? [];
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
    reviews,
    availNext45: countAvailNext(calendar),
  };
}

export type FeaturedReview = {
  name: string; text: string; rating: number | null; date: string; avatar: string | null; property: string;
};

export const getFeaturedReviews = cache(async (): Promise<FeaturedReview[]> => {
  try {
    const docs = (await sanity.fetch(FEATURED_QUERY)) as any[];
    if (docs?.length) {
      return docs.map((d) => ({
        name: d.author || "",
        text: d.text || "",
        rating: typeof d.rating === "number" ? d.rating : null,
        date: d.date || "",
        avatar: d.avatar || null,
        property: d.propertyName || "",
      }));
    }
  } catch {
    // fallback al snapshot
  }
  return ((reviewsJson as any).featured || []) as FeaturedReview[];
});

export const getProperties = cache(async (): Promise<Property[]> => {
  const [docs, reviewDocs] = await Promise.all([
    sanity.fetch(QUERY) as Promise<any[]>,
    (sanity.fetch(REVIEWS_QUERY) as Promise<any[]>).catch(() => [] as any[]),
  ]);
  const byRoom = groupReviews(reviewDocs);
  const props = docs.map((d) => build(d, ROOMS[String(d.beds24RoomId)], byRoom[String(d.beds24RoomId)]));
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
