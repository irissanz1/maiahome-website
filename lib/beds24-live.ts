// Módulo server-only: lee BEDS24_LONG_LIFE_TOKEN de env y solo se importa desde
// componentes de servidor. No importar desde componentes cliente.
import { evaluate, type AvailResult, type SearchInput } from "./availability";
import type { CalendarDay, Property } from "./types";

const BASE = "https://api.beds24.com/v2";

function addDaysISO(iso: string, n: number): string {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/**
 * Trae el calendario EN VIVO de Beds24 para un depto y rango, y lo expande a
 * un mapa por fecha { available, minStay, price }. Devuelve null si no se pudo
 * consultar (sin token, error de red, respuesta inesperada) → el llamador cae a la caché.
 */
async function liveCalendar(
  roomId: string,
  checkin: string,
  checkout: string
): Promise<Record<string, CalendarDay> | null> {
  const token = process.env.BEDS24_LONG_LIFE_TOKEN;
  if (!token) return null;

  const q = new URLSearchParams({
    roomId,
    startDate: checkin,
    endDate: addDaysISO(checkout, -1), // noches ocupadas = checkin .. checkout-1
    includeNumAvail: "true",
    includeMinStay: "true",
    includePrices: "true",
  });

  let res: Response;
  try {
    res = await fetch(`${BASE}/inventory/rooms/calendar?${q.toString()}`, {
      headers: { accept: "application/json", token },
      // Cachea la respuesta por fechas ~2 min: evita golpear créditos en recargas,
      // pero mantiene el estado fresco en el momento de reservar.
      next: { revalidate: 120 },
    });
  } catch {
    return null;
  }
  if (!res.ok) return null;

  const data = await res.json().catch(() => null);
  const ranges = data?.data?.[0]?.calendar;
  if (!Array.isArray(ranges)) return null;

  const map: Record<string, CalendarDay> = {};
  for (const rg of ranges) {
    const from: string | undefined = rg?.from;
    const to: string | undefined = rg?.to;
    if (!from || !to) continue;
    let d = from;
    for (let i = 0; i < 400 && d <= to; i++) {
      const numAvail = Number(rg.numAvail);
      map[d] = {
        available: numAvail > 0,
        numAvail,
        minStay: Number(rg.minStay) || 1,
        price: rg.price1 != null ? Number(rg.price1) : null,
      };
      d = addDaysISO(d, 1);
    }
  }
  return map;
}

/**
 * Evalúa disponibilidad EN VIVO para el momento de reservar. Usa el mismo motor
 * que la caché (evaluate) pero con el calendario fresco de Beds24 sobrepuesto,
 * así el estado y el bloqueo de "Reservar" reflejan reservas hechas hace minutos.
 * Devuelve null si no hay fechas o no se pudo consultar → el llamador usa la caché.
 */
export async function evaluateLive(
  property: Property,
  input: SearchInput
): Promise<AvailResult | null> {
  if (!input.checkin || !input.checkout) return null;
  const map = await liveCalendar(property.beds24RoomId, input.checkin, input.checkout);
  if (!map) return null;
  const merged: Property = { ...property, calendar: { ...property.calendar, ...map } };
  return evaluate(merged, input);
}
