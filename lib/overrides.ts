// Overrides de disponibilidad: correcciones puntuales (por depto+fecha) que el
// webhook de Beds24 escribe al recibir una reserva/cancelación. El sitio los
// sobrepone a la cache base para reflejar cambios casi en tiempo real, sin
// resincronizar todo.
//
// Se guardan en un solo hash Redis `overrides`, campo `<roomId>:<YYYY-MM-DD>`,
// valor JSON { available, numAvail, minStay, price, ts }.
// Al leer, se ignoran los overrides más viejos que la cache base (ts < generatedAt):
// ya quedaron incorporados por el último sync completo → auto-limpieza.
import { kvCommand, kvEnabled } from "./kv";
import type { CalendarDay } from "./types";

const KEY = "overrides";

export type OverridesByRoom = Record<string, Record<string, CalendarDay>>;

/** Lee todos los overrides vigentes (más nuevos que la cache base). */
export async function getAllOverrides(baseGeneratedAt?: string): Promise<OverridesByRoom> {
  if (!kvEnabled()) return {};
  const flat = await kvCommand(["HGETALL", KEY]);
  if (!Array.isArray(flat)) return {};
  const cutoff = baseGeneratedAt ? Date.parse(baseGeneratedAt) : 0;
  const out: OverridesByRoom = {};
  for (let i = 0; i + 1 < flat.length; i += 2) {
    const field = flat[i];
    const raw = flat[i + 1];
    if (typeof field !== "string" || typeof raw !== "string") continue;
    const sep = field.indexOf(":");
    if (sep < 0) continue;
    const roomId = field.slice(0, sep);
    const date = field.slice(sep + 1);
    let v: any;
    try {
      v = JSON.parse(raw);
    } catch {
      continue;
    }
    if (cutoff && Number(v?.ts || 0) < cutoff) continue; // ya reflejado por el sync base
    (out[roomId] ??= {})[date] = {
      available: !!v.available,
      numAvail: v.numAvail,
      minStay: v.minStay ?? 1,
      price: v.price ?? null,
    };
  }
  return out;
}

/** Escribe/actualiza los overrides de un depto (marca ts=ahora). */
export async function setRoomOverrides(
  roomId: string,
  byDate: Record<string, CalendarDay>
): Promise<boolean> {
  if (!kvEnabled()) return false;
  const dates = Object.keys(byDate);
  if (dates.length === 0) return true;
  const ts = Date.now();
  const args: (string | number)[] = ["HSET", KEY];
  for (const date of dates) {
    args.push(`${roomId}:${date}`, JSON.stringify({ ...byDate[date], ts }));
  }
  const r = await kvCommand(args);
  return r !== null;
}
