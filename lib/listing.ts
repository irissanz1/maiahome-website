import { evaluate, type SearchInput } from "./availability";
import type { Property } from "./types";

export type SP = Record<string, string | string[] | undefined>;
export const str = (v: string | string[] | undefined) => (typeof v === "string" ? v : undefined);

// Amenidades disponibles como filtro (deben coincidir con las etiquetas en Sanity).
export const AMENITY_FILTERS = [
  "Terraza",
  "Balcón",
  "Alberca",
  "Gimnasio",
  "Jacuzzi",
  "Elevador",
  "Aire acondicionado",
  "Lavadora",
  "Estacionamiento",
  "Pet friendly",
];

// Traducción EN de amenidades para mostrar (el valor en español se mantiene para el match).
export const AMENITY_EN: Record<string, string> = {
  "Terraza": "Terrace", "Balcón": "Balcony", "Alberca": "Pool", "Gimnasio": "Gym", "Jacuzzi": "Jacuzzi",
  "Elevador": "Elevator", "Aire acondicionado": "Air conditioning", "Lavadora": "Washer",
  "Estacionamiento": "Parking", "Pet friendly": "Pet friendly", "Cocina equipada": "Equipped kitchen",
  "WiFi": "WiFi", "Smart TV": "Smart TV", "Escritorio": "Desk", "Vista": "View", "Roof garden": "Roof garden",
};
export const amenityLabel = (a: string, lang: "es" | "en") => (lang === "en" ? AMENITY_EN[a] ?? a : a);

/**
 * Filtros avanzados (recámaras mín., plazas en cama mín., baños mín., amenidades).
 * Amenidades = AND (el depto debe tener TODAS las seleccionadas).
 */
export function advancedFilter(list: Property[], sp: SP): Property[] {
  const rec = str(sp.rec) ? Number(str(sp.rec)) : undefined;
  const plazas = str(sp.plazas) ? Number(str(sp.plazas)) : undefined; // huéspedes en camas fijas (capacidadCamas)
  const camas = str(sp.camas) ? Number(str(sp.camas)) : undefined; // número de camas (conteo literal)
  const ban = str(sp.ban) ? Number(str(sp.ban)) : undefined;
  const amen = (str(sp.amen) || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const m2 = str(sp.m2) ? Number(str(sp.m2)) : undefined;
  const precio = str(sp.precio); // "min-max" en USD/noche (max vacío = abierto)

  let out = list;
  if (rec != null && !Number.isNaN(rec)) out = out.filter((p) => (p.recamaras ?? 0) >= rec);
  if (plazas != null && !Number.isNaN(plazas)) out = out.filter((p) => (p.capacidadCamas ?? 0) >= plazas);
  if (camas != null && !Number.isNaN(camas)) out = out.filter((p) => (p.camas ?? 0) >= camas);
  if (ban != null && !Number.isNaN(ban)) out = out.filter((p) => (p.banos ?? 0) >= ban);
  if (m2 != null && !Number.isNaN(m2)) out = out.filter((p) => (p.m2 ?? 0) >= m2);
  if (precio) {
    const [mnS, mxS] = precio.split("-");
    const min = mnS ? Number(mnS) : 0;
    const max = mxS ? Number(mxS) : Infinity;
    out = out.filter((p) => p.precioDesde != null && p.precioDesde >= min && p.precioDesde <= max);
  }
  if (amen.length) out = out.filter((p) => amen.every((a) => p.amenidades.includes(a)));
  return out;
}

/**
 * Calcula conteos de disponibles/no disponibles y filtra la lista según ?disp=si|no.
 * Con fechas → disponibilidad exacta; sin fechas → según calendario.
 */
export function applyAvailability(
  list: Property[],
  sp: SP,
  opts?: { priceField?: "precioDesde" | "precioMes" }
) {
  const search: SearchInput = {
    checkin: str(sp.checkin),
    checkout: str(sp.checkout),
    guests: str(sp.guests) ? Number(str(sp.guests)) : undefined,
  };
  const hasDates = Boolean(search.checkin && search.checkout);
  const disp = str(sp.disp);
  const orden = str(sp.orden); // "precio-asc" | "precio-desc" | undefined (relevancia)
  const priceField = opts?.priceField ?? "precioDesde";
  const priceOf = (p: Property) =>
    (priceField === "precioMes" ? p.precioMes : p.precioDesde) ?? Number.POSITIVE_INFINITY;

  // Filtro por capacidad (criterio de búsqueda): si piden N huéspedes, solo caben los de capacidad >= N.
  let base = list;
  if (typeof search.guests === "number" && search.guests > 0) {
    base = base.filter((p) => p.capacidad == null || p.capacidad >= search.guests!);
  }

  const isAvail = (p: Property) =>
    hasDates
      ? evaluate(p, search).status === "disponible"
      : Object.values(p.calendar).some((d) => d.available);

  // Rango de disponibilidad: disponibles primero, estancia mínima, luego no disponibles.
  const rank = (p: Property) => {
    if (hasDates) {
      const s = evaluate(p, search).status;
      if (s === "disponible") return 0;
      if (s === "estancia-minima") return 1;
      return 2;
    }
    return Object.values(p.calendar).some((d) => d.available) ? 0 : 1;
  };

  const totalCount = base.length;
  const availableCount = base.filter(isAvail).length;
  const unavailableCount = totalCount - availableCount;

  let subset: Property[];
  if (disp === "si") subset = base.filter(isAvail);
  else if (disp === "no") subset = base.filter((p) => !isAvail(p));
  else subset = base.slice();

  // Orden: siempre disponibles primero; dentro del mismo rango, por precio si se pidió,
  // o el orden original (prioridad) como relevancia por defecto.
  const dir = orden === "precio-desc" ? -1 : 1;
  const filtered = subset
    .map((p, i) => ({ p, i, r: rank(p), price: priceOf(p) }))
    .sort((x, y) => {
      if (x.r !== y.r) return x.r - y.r;
      if (orden === "precio-asc" || orden === "precio-desc") {
        if (x.price !== y.price) return (x.price - y.price) * dir;
      }
      return x.i - y.i; // estable: conserva prioridad
    })
    .map((x) => x.p);

  return { search, hasDates, disp, orden, totalCount, availableCount, unavailableCount, filtered };
}
