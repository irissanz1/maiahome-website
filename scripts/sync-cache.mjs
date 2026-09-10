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

// --- Reservas para reconstruir "hoy" y cruzar combos ------------------------
// Beds24 OMITE el día de HOY en /inventory/rooms/calendar al pasar la medianoche
// UTC (México es UTC-6, así que desde ~18:00 hora MX el "hoy" mexicano ya es
// pasado en UTC y desaparece del calendario). Además, una reserva de un COMBO
// (p.ej. "Coco 4&5") NO bloquea siempre sus unidades individuales en el
// calendario, y viceversa. Por eso superponemos el endpoint de reservas
// (autoritativo) sobre el calendario: reconstruye "hoy" y bloquea combos.

// combo roomId -> [roomIds individuales que lo componen]. Verificado contra los
// nombres de Beds24 (2026-09-09). Un combo nunca es miembro de otro combo.
const COMBO_MEMBERS = {
  704198: [626201, 625019],                                           // CondC1&2 = Coco 1 + 2
  704200: [626202, 625022],                                           // CondC4&5 = Coco 4 + 5
  704201: [625024, 625023],                                           // CondC7&8 = Coco 7 + 8
  715030: [626201, 625019, 626203, 626202, 625022, 626206, 625024, 625023], // Coco 1 a 8
  418928: [418927, 418926],                                           // H3 = Horacio 1 + 2
  489020: [469041, 472123],                                           // La56 = LM5 + LM6
  506198: [506118, 506119],                                           // La78 = LM7 + LM8
  506193: [506106, 506100],                                           // La910 = LM9 + LM10
  489637: [461199, 469041],                                           // LaC45 = Laila Casa 4 + LM5
  489638: [461199, 472123],                                           // LaC46 = Laila Casa 4 + LM6
  489635: [461199, 469041, 472123],                                   // LaC456 = Laila Casa 4 + LM5 + LM6
};

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

  // --- Overlay de reservas: reconstruye "hoy" y cruza combos -----------------
  // Solo DEGRADA disponibilidad (nunca inventa "disponible" salvo al reconstruir
  // un día que Beds24 dejó de devolver). Si falla, se conserva el calendario tal
  // cual y evaluate() (fail-closed) protege el día ausente. No rompe el sync.
  try {
    // "hoy" en hora de México (UTC-6) — el día que Beds24 suele soltar.
    const mxNow = new Date(Date.now() - 6 * 3600 * 1000);
    const todayMx = iso(mxNow);
    const bkHorizon = iso(addMonths(mxNow, SYNC_MONTHS));

    // Aviso si el mapa de combos apunta a un roomId que ya no existe (unidad
    // renombrada/eliminada) — hay que actualizar COMBO_MEMBERS.
    const known = new Set(Object.keys(cache.rooms).map(Number));
    for (const [combo, members] of Object.entries(COMBO_MEMBERS)) {
      for (const id of [Number(combo), ...members])
        if (!known.has(id)) console.warn(`  ⚠ COMBO_MEMBERS referencia room ${id} inexistente (revisa el mapa)`);
    }

    const bookings = await fetchBookings(todayMx, bkHorizon);
    console.log(`\n  Reservas activas (confirmadas/nuevas) recibidas: ${bookings.length}`);

    // baseOccupied[roomId] = Set de fechas ocupadas por reserva DIRECTA en ese room.
    const baseOccupied = {};
    for (const b of bookings) {
      if (!b.roomId || !b.arrival || !b.departure) continue;
      const rid = Number(b.roomId);
      (baseOccupied[rid] ??= new Set());
      // [arrival, departure): el día de salida queda libre para un nuevo check-in.
      for (const d of eachDate(b.arrival, b.departure)) if (d < b.departure) baseOccupied[rid].add(d);
    }
    const combosOf = {}; // individual -> [combos que lo contienen]
    for (const [combo, members] of Object.entries(COMBO_MEMBERS))
      for (const m of members) (combosOf[m] ??= []).push(Number(combo));

    const occ = (rid, date) => baseOccupied[rid]?.has(date) ?? false;
    const constituentOccupied = (rid, date) =>
      occ(rid, date) || (combosOf[rid] || []).some((c) => occ(c, date));
    const comboOccupied = (cid, date) =>
      occ(cid, date) || COMBO_MEMBERS[cid].some((m) => constituentOccupied(m, date));
    const finalOccupied = (rid, date) =>
      rid in COMBO_MEMBERS ? comboOccupied(rid, date) : constituentOccupied(rid, date);

    // Ventana de reconstrucción de días ausentes (el "hoy" soltado). Pequeña a
    // propósito: solo hoy suele faltar; los futuros ya vienen en el calendario.
    const reconstructWindow = new Set(eachDate(todayMx, iso(addDays(mxNow, 1))));
    const horizonDate = bkHorizon;

    let overridden = 0, reconstructed = 0;
    for (const [idStr, room] of Object.entries(cache.rooms)) {
      const rid = Number(idStr);
      const cal = room.calendar || (room.calendar = {});
      // 1) Override full-horizon: si hay reserva que lo ocupa, NO disponible.
      for (const date of Object.keys(cal)) {
        if (date >= todayMx && date <= horizonDate && cal[date].available && finalOccupied(rid, date)) {
          cal[date] = { ...cal[date], available: false, numAvail: 0 };
          overridden++;
        }
      }
      // 2) Reconstrucción: días de la ventana que Beds24 soltó (ausentes).
      for (const date of reconstructWindow) {
        if (cal[date]) continue; // Beds24 sí lo devolvió; no tocar.
        const busy = finalOccupied(rid, date);
        cal[date] = { available: !busy, numAvail: busy ? 0 : 1, minStay: 1, price: null };
        reconstructed++;
      }
      room.days = Object.keys(cal).length;
    }
    cache.bookingsOverlay = { appliedAt: new Date().toISOString(), bookings: bookings.length, overridden, reconstructed };
    console.log(`  Overlay aplicado: ${overridden} fecha(s) bloqueada(s) por reserva, ${reconstructed} reconstruida(s).`);
  } catch (err) {
    console.warn(`  ⚠ Overlay de reservas omitido (${err.message}). El calendario queda sin cruzar; fail-closed protege "hoy".`);
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
