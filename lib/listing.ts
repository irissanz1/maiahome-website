import { evaluate, type SearchInput } from "./availability";
import type { Property } from "./types";

export type SP = Record<string, string | string[] | undefined>;
export const str = (v: string | string[] | undefined) => (typeof v === "string" ? v : undefined);

/**
 * Calcula conteos de disponibles/no disponibles y filtra la lista según ?disp=si|no.
 * Con fechas → disponibilidad exacta; sin fechas → según calendario.
 */
export function applyAvailability(list: Property[], sp: SP) {
  const search: SearchInput = {
    checkin: str(sp.checkin),
    checkout: str(sp.checkout),
    guests: str(sp.guests) ? Number(str(sp.guests)) : undefined,
  };
  const hasDates = Boolean(search.checkin && search.checkout);
  const disp = str(sp.disp);

  // Filtro por capacidad (criterio de búsqueda): si piden N huéspedes, solo caben los de capacidad >= N.
  let base = list;
  if (typeof search.guests === "number" && search.guests > 0) {
    base = base.filter((p) => p.capacidad == null || p.capacidad >= search.guests!);
  }

  const isAvail = (p: Property) =>
    hasDates
      ? evaluate(p, search).status === "disponible"
      : Object.values(p.calendar).some((d) => d.available);

  const totalCount = base.length;
  const availableCount = base.filter(isAvail).length;
  const unavailableCount = totalCount - availableCount;

  let filtered: Property[];
  if (disp === "si") {
    filtered = base.filter(isAvail);
  } else if (disp === "no") {
    filtered = base.filter((p) => !isAvail(p));
  } else {
    // "Todos": ordena en 3 niveles → disponibles, estancia mínima, no disponibles.
    // (Con fechas usa el estado real; sin fechas, disponibles según calendario primero.)
    const rank = (p: Property) => {
      if (hasDates) {
        const s = evaluate(p, search).status;
        if (s === "disponible") return 0;
        if (s === "estancia-minima") return 1;
        return 2; // no-disponible / capacidad
      }
      return Object.values(p.calendar).some((d) => d.available) ? 0 : 1;
    };
    filtered = base
      .map((p) => ({ p, r: rank(p) }))
      .sort((x, y) => x.r - y.r)
      .map((x) => x.p);
  }

  return { search, hasDates, disp, totalCount, availableCount, unavailableCount, filtered };
}
