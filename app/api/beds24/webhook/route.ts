import { NextResponse } from "next/server";
import { liveCalendarMap } from "@/lib/beds24-live";
import { setRoomOverrides } from "@/lib/overrides";
import { kvEnabled } from "@/lib/kv";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Beds24 puede mandar los campos con nombres distintos según la configuración.
function pick(obj: any, keys: string[]): string | undefined {
  for (const k of keys) {
    const v = obj?.[k];
    if (v != null && v !== "") return String(v);
  }
  return undefined;
}

function extract(source: any) {
  const b = source?.booking ?? source ?? {};
  return {
    roomId: pick(b, ["roomId", "roomid", "room_id"]) ?? pick(source, ["roomId", "roomid"]),
    arrival: pick(b, ["arrival", "firstNight", "checkIn", "checkin"]) ?? pick(source, ["arrival", "checkin"]),
    departure: pick(b, ["departure", "checkOut", "checkout"]) ?? pick(source, ["departure", "checkout"]),
  };
}

async function handle(req: Request): Promise<NextResponse> {
  const url = new URL(req.url);

  // Autenticación por secreto compartido (query ?key= o header x-webhook-secret).
  const secret = process.env.BEDS24_WEBHOOK_SECRET;
  if (secret) {
    const key = url.searchParams.get("key") || req.headers.get("x-webhook-secret");
    if (key !== secret) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
  }

  // Los datos pueden venir en el body (JSON) o en el query string.
  let body: any = null;
  try {
    body = await req.json();
  } catch {
    /* sin body JSON */
  }
  const fromQuery = Object.fromEntries(url.searchParams.entries());
  const { roomId, arrival, departure } = extract(body ?? fromQuery);
  const rid = roomId ?? fromQuery.roomId ?? fromQuery.roomid;
  const arr = arrival ?? fromQuery.arrival;
  const dep = departure ?? fromQuery.departure;

  if (!rid || !arr || !dep) {
    // 200 a propósito: si faltan datos, no queremos que Beds24 reintente en bucle.
    return NextResponse.json(
      { ok: false, error: "missing roomId/arrival/departure", got: { rid, arr, dep } },
      { status: 200 }
    );
  }

  if (!kvEnabled()) {
    return NextResponse.json(
      { ok: false, error: "store no configurado (KV_REST_API_URL/TOKEN)" },
      { status: 200 }
    );
  }

  // Fetch dirigido de la verdad EN VIVO para ese depto+rango (1 sola llamada).
  // Sirve igual para reservas (queda ocupado) y cancelaciones (vuelve a liberarse).
  const map = await liveCalendarMap(String(rid), arr, dep);
  if (!map) {
    return NextResponse.json({ ok: false, error: "live fetch fallo" }, { status: 200 });
  }
  const wrote = await setRoomOverrides(String(rid), map);
  return NextResponse.json({ ok: wrote, roomId: rid, days: Object.keys(map).length });
}

export async function POST(req: Request) {
  return handle(req);
}

// Beds24 permite probar con GET; lo aceptamos también.
export async function GET(req: Request) {
  return handle(req);
}
