import { NextResponse } from "next/server";
import { getProperties } from "@/lib/data";
import { liveQuote } from "@/lib/quote";

// Cotización para las tarjetas (búsqueda y "similares"): precio antes de
// impuestos (alojamiento con descuento directo + limpieza) y total, leídos del
// checkout de Beds24. Solo acepta deptos publicados en el sitio, así que no
// sirve de proxy abierto hacia Beds24.

export const runtime = "nodejs";

const ISO = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(req: Request) {
  const u = new URL(req.url);
  const roomId = u.searchParams.get("roomId") || "";
  const checkin = u.searchParams.get("checkin") || "";
  const checkout = u.searchParams.get("checkout") || "";
  const guests = Number(u.searchParams.get("guests") || "2");
  if (!/^\d+$/.test(roomId) || !ISO.test(checkin) || !ISO.test(checkout)) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  const nights = Math.round((Date.parse(checkout) - Date.parse(checkin)) / 86400000);
  if (!(nights >= 1 && nights <= 400) || !(guests >= 1 && guests <= 40)) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  const p = (await getProperties()).find((x) => x.beds24RoomId === roomId);
  if (!p) return NextResponse.json({ error: "not found" }, { status: 404 });

  const q = await liveQuote({
    roomId,
    propertyId: p.beds24PropertyId,
    checkin,
    checkout,
    guests,
    nights,
    listRoom: 0,
  });
  if (!q) return NextResponse.json({ quote: null }, { headers: { "cache-control": "no-store" } });
  return NextResponse.json(
    { quote: { nights: q.nights, preTax: q.preTax, total: q.total, cleaning: q.fees.length > 0 } },
    { headers: { "cache-control": "public, s-maxage=120, stale-while-revalidate=60" } }
  );
}
