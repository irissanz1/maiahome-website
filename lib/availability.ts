import type { Property } from "./types";

export interface SearchInput {
  checkin?: string;
  checkout?: string;
  guests?: number;
}

export type AvailStatus = "sin-fechas" | "disponible" | "no-disponible" | "estancia-minima" | "capacidad";

export interface AvailResult {
  status: AvailStatus;
  nights: number | null;
  total: number | null;
  minStayRequerido?: number;
}

function daysBetween(a: string, b: string): number {
  return Math.round(
    (new Date(b + "T00:00:00Z").getTime() - new Date(a + "T00:00:00Z").getTime()) / 86400000
  );
}

/**
 * Evalúa una propiedad usando el calendario real de Beds24 (por fecha).
 * Mínimo efectivo = max(minStay de cada fecha del rango) — sin fallback "|| 1" tramposo.
 * Fechas fuera del rango sincronizado se asumen disponibles (POC de 3 meses).
 */
export function evaluate(property: Property, input: SearchInput): AvailResult {
  const { checkin, checkout, guests } = input;

  if (typeof guests === "number" && property.capacidad && guests > property.capacidad) {
    return { status: "capacidad", nights: null, total: null };
  }
  if (!checkin || !checkout) return { status: "sin-fechas", nights: null, total: null };

  const nights = daysBetween(checkin, checkout);
  if (nights <= 0) return { status: "sin-fechas", nights: null, total: null };

  const minStays: number[] = [];
  let total = 0;
  let d = new Date(checkin + "T00:00:00Z");
  const end = new Date(checkout + "T00:00:00Z");
  while (d < end) {
    const date = d.toISOString().slice(0, 10);
    const entry = property.calendar[date];
    if (entry) {
      if (!entry.available) return { status: "no-disponible", nights, total: null };
      minStays.push(entry.minStay || 1);
      total += entry.price ?? property.precioDesde ?? 0;
    } else {
      // fuera del rango sincronizado → optimista
      minStays.push(1);
      total += property.precioDesde ?? 0;
    }
    d = new Date(d.getTime() + 86400000);
  }

  const eff = Math.max(1, ...minStays);
  if (eff > nights) return { status: "estancia-minima", nights, total: null, minStayRequerido: eff };

  return { status: "disponible", nights, total };
}

export function statusLabel(status: AvailStatus, lang: "es" | "en" = "es"): string {
  const map: Record<AvailStatus, { es: string; en: string }> = {
    "sin-fechas": { es: "Ver disponibilidad", en: "Check availability" },
    disponible: { es: "Disponible", en: "Available" },
    "no-disponible": { es: "No disponible", en: "Not available" },
    "estancia-minima": { es: "Estancia mínima", en: "Minimum stay" },
    capacidad: { es: "Excede capacidad", en: "Over capacity" },
  };
  return map[status][lang];
}
