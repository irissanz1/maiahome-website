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
