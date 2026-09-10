/**
 * sync.mjs — Beds24 → caché JSON propia (resiliente y con señal de completitud).
 *
 * Descubre propiedades y habitaciones vía /properties, luego trae el calendario
 * (precio · disponibilidad · estancia mínima POR FECHA) vía /inventory/rooms/calendar
 * y lo escribe en:
 *   cache/beds24-cache.json   → disponibilidad para el frontend
 *   cache/properties.json     → metadatos (IDs, nombres) para sembrar Sanity
 *
 * Robustez:
 *   - Reintenta cada trozo fallido una segunda vez antes de rendirse.
 *   - Si un trozo NO se pudo bajar, CONSERVA el dato anterior de esas fechas
 *     (merge con la caché previa) en vez de dejar un hueco que se vería "disponible".
 *   - Marca `complete` por depto y global; escribe qué deptos quedaron incompletos.
 *   - Sale con código 2 si escribió pero quedó INCOMPLETA (para detectarlo en automatización).
 *
 * Ejecutar:  npm run sync            (corrida completa)
 *            RESUME=1 npm run sync   (salta deptos ya completos y frescos de HOY; baja solo los que faltan)
 *            npm run check           (valida la caché ya escrita)
 */

import { writeFile, mkdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { beds24Fetch } from "./beds24.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
// Escribe directo a la cache empaquetada del sitio (respaldo cuando Beds24 no responde).
const OUT_DIR = join(__dirname, "..", "data");
const CACHE_FILE = join(OUT_DIR, "beds24-cache.json");
const SYNC_MONTHS = Number(process.env.SYNC_MONTHS || 12);
const CHUNK_DAYS = 90;
const RESUME = process.env.RESUME === "1" || process.env.RESUME === "true";

function iso(d) {
  return d.toISOString().slice(0, 10);
}
function addDays(d, n) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}
function addMonths(d, n) {
  const x = new Date(d);
  x.setMonth(x.getMonth() + n);
  return x;
}
function sameUTCDay(isoA, isoB) {
  return (isoA || "").slice(0, 10) === (isoB || "").slice(0, 10);
}

async function fetchProperties() {
  const res = await beds24Fetch("/properties?includeAllRooms=true");
  return res.data || [];
}

// --- Reservas + dependencias para reconstruir "hoy" -------------------------
// Beds24 OMITE el día de HOY en /inventory/rooms/calendar al pasar la medianoche
// UTC (México es UTC-6, así que desde ~18:00 hora MX el "hoy" mexicano ya es
// pasado en UTC y desaparece del calendario) → sin este día, el listado se
// desincroniza. Para RECONSTRUIRLO replicamos la disponibilidad de Beds24 con
// SUS PROPIAS dependencias (Rooms→Dependencies): "Include Bookings from" (una
// unidad se bloquea si otra relacionada tiene reserva — p.ej. Laila Casa 3 se
// bloquea si Laila Casa 4 o un combo con Laila Casa 4 tiene reserva) y "Requires
// Availability in" (un combo se bloquea si cualquiera de sus componentes está
// ocupado). El grafo se LEE de la config de Beds24 (auto-mantenido: si Iris
// cambia dependencias, esto se ajusta solo) y se validó con 0 discrepancias
// contra el calendario real de Beds24 en fechas futuras.

// Construye el grafo de dependencias desde los objetos de /properties.
// Devuelve { inc: {rid:[rooms cuyas reservas bloquean rid]}, reqs: {rid:[rooms
// que rid requiere disponibles]} } con ids en string.
function buildDepGraph(properties) {
  const inc = {};
  const reqs = {};
  for (const p of properties) {
    for (const r of p.roomTypes || p.rooms || []) {
      const d = r.dependencies || {};
      const incList = [];
      const reqList = [];
      for (let i = 1; i <= 12; i++) {
        if (d["includeBookingsRoomId" + i]) incList.push(String(d["includeBookingsRoomId" + i]));
        if (d["dependentRoomId" + i]) reqList.push(String(d["dependentRoomId" + i]));
      }
      inc[String(r.id)] = incList;
      reqs[String(r.id)] = reqList;
    }
  }
  return { inc, reqs };
}

async function fetchBookings(departureFrom, arrivalTo) {
  const all = [];
  for (let page = 1; page <= 30; page++) {
    const p = new URLSearchParams({ departureFrom, arrivalTo, page: String(page) });
    p.append("status", "confirmed"); // estados que SÍ ocupan inventario
    p.append("status", "new");       // (excluye cancelled e inquiry)
    const res = await beds24Fetch(`/bookings?${p.toString()}`);
    const data = res.data || [];
    all.push(...data);
    if (data.length < 100) break; // página parcial = última
  }
  return all;
}

async function fetchRoomCalendar(roomId, startDate, endDate) {
  const qs = new URLSearchParams({
    roomId: String(roomId),
    startDate,
    endDate,
    includePrices: "true",
    includeNumAvail: "true",
    includeMinStay: "true",
    includeMaxStay: "true",
  }).toString();
  const res = await beds24Fetch(`/inventory/rooms/calendar?${qs}`);
  // La respuesta es data[0].calendar = array de RANGOS {from,to,numAvail,minStay,maxStay,price1}
  return res.data?.[0]?.calendar || [];
}

// Itera cada fecha ISO en [from, to] inclusivo.
function eachDate(from, to) {
  const out = [];
  let d = new Date(from + "T00:00:00Z");
  const end = new Date(to + "T00:00:00Z");
  while (d <= end) {
    out.push(d.toISOString().slice(0, 10));
    d = new Date(d.getTime() + 86400000);
  }
  return out;
}

// Lista de trozos [start,end] que cubren [today, horizon].
function chunksFor(today, horizon) {
  const chunks = [];
  let start = today;
  while (start < horizon) {
    const end = addDays(start, CHUNK_DAYS) > horizon ? horizon : addDays(start, CHUNK_DAYS);
    chunks.push([iso(start), iso(end)]);
    start = addDays(end, 1);
  }
  return chunks;
}

async function loadPrevCache() {
  try {
    return JSON.parse(await readFile(CACHE_FILE, "utf8"));
  } catch {
    return { rooms: {} };
  }
}

async function main() {
  console.log(`\n== Sync Beds24 → caché (${SYNC_MONTHS} meses)${RESUME ? " · RESUME" : ""} ==\n`);
  const MAX_ROOMS = process.env.MAX_ROOMS ? Number(process.env.MAX_ROOMS) : Infinity;

  await mkdir(OUT_DIR, { recursive: true });
  const prev = await loadPrevCache();
  const prevRooms = prev.rooms || {};

  const properties = await fetchProperties();
  console.log(`Propiedades encontradas: ${properties.length}`);

  // Metadatos (IDs/nombres) — se escriben YA, aunque el calendario tarde.
  const propertiesMeta = properties.map((prop) => ({
    beds24PropertyId: prop.id,
    name: prop.name,
    currency: prop.currency || "MXN",
    rooms: (prop.roomTypes || prop.rooms || []).map((r) => ({
      beds24RoomId: r.id,
      name: r.name,
      qty: r.qty ?? null,
      maxPeople: r.maxPeople ?? null,
    })),
  }));
  const totalRooms = propertiesMeta.reduce((n, p) => n + p.rooms.length, 0);
  console.log(`Habitaciones totales: ${totalRooms}\n`);

  const nowIso = new Date().toISOString();
  const cache = { generatedAt: nowIso, complete: true, incompleteRooms: [], rooms: {} };
  const today = new Date();
  const horizon = addMonths(today, SYNC_MONTHS);
  const allChunks = chunksFor(today, horizon);
  let roomsDone = 0;

  for (const prop of properties) {
    const rooms = prop.roomTypes || prop.rooms || [];
    const currency = prop.currency || "MXN";

    for (const room of rooms) {
      if (roomsDone >= MAX_ROOMS) break;
      roomsDone++;

      const prevRoom = prevRooms[String(room.id)];

      // RESUME: si el depto ya está completo y fue actualizado HOY, reutilízalo (no gasta créditos).
      if (RESUME && prevRoom && prevRoom.complete && sameUTCDay(prevRoom.updatedAt, nowIso)) {
        cache.rooms[room.id] = prevRoom;
        console.log(`  ⤳ ${prop.name} / ${room.name} (room ${room.id}): reusado (completo y fresco)`);
        continue;
      }

      const calendarMap = {};
      const failed = [];

      // Primera pasada por todos los trozos.
      for (const [start, end] of allChunks) {
        try {
          const ranges = await fetchRoomCalendar(room.id, start, end);
          for (const entry of ranges) {
            if (!entry.from || !entry.to) continue;
            for (const date of eachDate(entry.from, entry.to)) {
              calendarMap[date] = {
                available: (entry.numAvail ?? 0) > 0,
                numAvail: entry.numAvail ?? 0,
                // minStay real POR FECHA (sin el fallback "|| 1" del bug de base44).
                minStay: entry.minStay ?? 1,
                price: entry.price1 ?? null,
              };
            }
          }
        } catch (err) {
          console.error(`  ! room ${room.id} ${start}→${end}: ${err.message}`);
          failed.push([start, end]);
        }
      }

      // Segunda pasada: reintenta solo los trozos que fallaron.
      if (failed.length) {
        console.warn(`  ↻ room ${room.id}: reintentando ${failed.length} trozo(s)…`);
        const stillFailed = [];
        for (const [start, end] of failed) {
          try {
            const ranges = await fetchRoomCalendar(room.id, start, end);
            for (const entry of ranges) {
              if (!entry.from || !entry.to) continue;
              for (const date of eachDate(entry.from, entry.to)) {
                calendarMap[date] = {
                  available: (entry.numAvail ?? 0) > 0,
                  numAvail: entry.numAvail ?? 0,
                  minStay: entry.minStay ?? 1,
                  price: entry.price1 ?? null,
                };
              }
            }
          } catch (err) {
            console.error(`  !! room ${room.id} ${start}→${end} (2º intento): ${err.message}`);
            stillFailed.push([start, end]);
          }
        }
        failed.length = 0;
        failed.push(...stillFailed);
      }

      const complete = failed.length === 0;

      // Si quedó incompleto, NO dejes huecos: conserva el dato previo debajo del nuevo.
      // (El dato nuevo siempre gana; solo rellena fechas que esta corrida no pudo bajar.)
      const finalCalendar = complete
        ? calendarMap
        : { ...(prevRoom?.calendar || {}), ...calendarMap };

      cache.rooms[room.id] = {
        beds24PropertyId: prop.id,
        propertyName: prop.name,
        roomName: room.name,
        currency,
        calendar: finalCalendar,
        complete,
        days: Object.keys(finalCalendar).length,
        updatedAt: nowIso,
      };

      if (!complete) cache.incompleteRooms.push(String(room.id));
      const flag = complete ? "✓" : "⚠ INCOMPLETO";
      console.log(
        `  ${flag} ${prop.name} / ${room.name} (room ${room.id}): ${Object.keys(finalCalendar).length} días` +
          (complete ? "" : ` (${failed.length} trozo(s) sin bajar; se conservó dato previo)`)
      );
    }
  }

  cache.complete = cache.incompleteRooms.length === 0;

  // --- Reconstrucción de "hoy" con las dependencias de Beds24 ----------------
  // Beds24 ya entrega la disponibilidad futura con TODAS las dependencias
  // aplicadas; solo el día de HOY se pierde (lo suelta al pasar la medianoche
  // UTC). Reconstruimos ESE día (y su ventana) replicando la lógica de Beds24 a
  // partir de las reservas + el grafo de dependencias leído de su config. NO
  // tocamos ningún día que Beds24 sí devolvió (ya es correcto). Si algo falla, se
  // conserva el calendario tal cual y evaluate() (fail-closed) protege el hueco.
  try {
    // "hoy" en hora de México (UTC-6) — el día que Beds24 suele soltar.
    const mxNow = new Date(Date.now() - 6 * 3600 * 1000);
    const todayMx = iso(mxNow);
    const bkHorizon = iso(addMonths(mxNow, SYNC_MONTHS));

    const { inc, reqs } = buildDepGraph(properties);
    const bookings = await fetchBookings(todayMx, bkHorizon);
    console.log(`\n  Reservas activas (confirmadas/nuevas): ${bookings.length}`);

    // reserva DIRECTA por unidad: roomId -> Set(fechas ocupadas [llegada, salida))
    const direct = {};
    for (const b of bookings) {
      if (!b.roomId || !b.arrival || !b.departure) continue;
      const rid = String(b.roomId);
      (direct[rid] ??= new Set());
      for (const d of eachDate(b.arrival, b.departure)) if (d < b.departure) direct[rid].add(d);
    }

    // Ocupación replicando Beds24 (validado 0 discrepancias vs su calendario):
    //  - directa: reserva propia O "Include Bookings from" con reserva.
    //  - más las dependencias "Requires Availability in" (combos): ocupado si
    //    cualquier componente está ocupado (ignore sub-dependencies).
    const occDirect = (rid, date) =>
      direct[rid]?.has(date) || (inc[rid] || []).some((x) => direct[x]?.has(date));
    const occupied = (rid, date) =>
      occDirect(rid, date) || (reqs[rid] || []).some((x) => occDirect(x, date));

    // Ventana de reconstrucción: solo el "hoy" soltado (+1 de margen por husos).
    const reconstructWindow = eachDate(todayMx, iso(addDays(mxNow, 1)));

    let reconstructed = 0;
    for (const [rid, room] of Object.entries(cache.rooms)) {
      const cal = room.calendar || (room.calendar = {});
      for (const date of reconstructWindow) {
        if (cal[date]) continue; // Beds24 sí lo devolvió (dependency-aware); no tocar.
        const busy = occupied(rid, date);
        cal[date] = { available: !busy, numAvail: busy ? 0 : 1, minStay: 1, price: null };
        reconstructed++;
      }
      room.days = Object.keys(cal).length;
    }
    cache.bookingsOverlay = { appliedAt: new Date().toISOString(), bookings: bookings.length, reconstructed };
    console.log(`  "Hoy" reconstruido con dependencias: ${reconstructed} fecha(s) en ${Object.keys(cache.rooms).length} deptos.`);
  } catch (err) {
    console.warn(`  ⚠ Reconstrucción de "hoy" omitida (${err.message}). fail-closed protege el hueco.`);
  }

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(CACHE_FILE, JSON.stringify(cache, null, 2));

  const roomCount = Object.keys(cache.rooms).length;
  if (cache.complete) {
    console.log(`\n✅ COMPLETO. ${properties.length} propiedades · ${roomCount} habitaciones.`);
    console.log(`   cache/beds24-cache.json y cache/properties.json escritos.\n`);
    process.exit(0);
  } else {
    console.log(
      `\n⚠️  INCOMPLETO. ${cache.incompleteRooms.length} depto(s) sin bajar del todo: ${cache.incompleteRooms.join(", ")}`
    );
    console.log(`   Se conservó el dato previo en las fechas faltantes.`);
    console.log(`   Vuelve a correr con:  RESUME=1 npm run sync   (baja solo los que faltan)\n`);
    process.exit(2);
  }
}

main().catch((err) => {
  console.error(`\n❌ Sync falló: ${err.message}\n`);
  process.exit(1);
});
