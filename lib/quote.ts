// Módulo server-only: cotización EXACTA del checkout de Beds24 para unas fechas.
// No importar desde componentes cliente.
//
// Por qué así: el calendario (price1) es la tarifa BASE, antes del descuento de
// reserva directa (−10/18/22% según noches), y sin impuestos ni limpieza. Las
// reglas reales del checkout no se pueden replicar con la API: p. ej. en Coco la
// limpieza obligatoria no se cobra en estancias de 7 noches y el 5% de hospedaje
// se calcula sobre alojamiento + IVA, mientras que en Aurora el 5% va sobre el
// alojamiento solo. Así que leemos la MISMA página de checkout que verá el
// huésped (booking.php page=book3, la que el sitio embebe en /reservar) y
// tomamos sus renglones ya calculados. Comprobamos que la suma cuadre con su
// "Grand Total"; si algo no cuadra o falla, devolvemos null y la ficha cae a la
// vista sin desglose (nunca mostramos un total que no coincida con el checkout).

export interface QuoteLine {
  label: { es: string; en: string };
  amount: number;
}

export interface Quote {
  nights: number;
  /** Suma de tarifas base del calendario (antes del descuento directo). */
  listRoom: number;
  /** Alojamiento con el descuento directo aplicado (lo que cobra Beds24). */
  room: number;
  /** % de descuento directo redondeado (0 si no hay). */
  discountPct: number;
  /** Cargos obligatorios que no son impuesto (limpieza). */
  fees: QuoteLine[];
  taxes: QuoteLine[];
  /** Alojamiento con descuento + cargos (limpieza): precio "antes de impuestos", como Airbnb. */
  preTax: number;
  total: number;
}

// Beds24 solo tiene los nombres en inglés; traducción para la vista en español.
const ES: [RegExp, string][] = [
  [/^VAT\b/i, "IVA"],
  [/^Lodging tax\b/i, "Impuesto de hospedaje"],
  [/^Hotel Occupancy Tax\b/i, "Impuesto de hospedaje"],
  [/^Cleaning\b/i, "Limpieza"],
];

const round2 = (n: number) => Math.round(n * 100) / 100;
const num = (s: string) => Number(s.replace(/,/g, ""));
const clean = (s: string) =>
  s
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .replace(/(\d) %/g, "$1%")
    .trim();

function label(en: string): { es: string; en: string } {
  let es = en;
  for (const [re, rep] of ES) if (re.test(en)) { es = en.replace(re, rep); break; }
  return { es, en };
}

/** Lee los renglones del checkout de Beds24. Exportada para pruebas. */
export function parseCheckout(html: string) {
  const room = html.match(/id="x1drprice"[^>]*>([\d,.]+)</);
  const total = html.match(/id="totaldispprice"[^>]*>([\d,.]+)</);
  if (!room || !total) return null;
  const lines: { name: string; amount: number; tax: boolean }[] = [];
  const rowRe = /<div id="zupsellrow(\d+)">([\s\S]*?)<div class="clearfix"><\/div>(<input type='hidden' id='x\1(oblig|obligpercenttax)'[^>]*>)?/g;
  for (const m of html.matchAll(rowRe)) {
    const [, , body, , kind] = m;
    if (!kind) continue; // opcional (no seleccionado) → no se cobra
    const amt = body.match(/class="bookingpageamount">([\d,.]+)</);
    const nm = body.match(/class="b24-upsellname">([\s\S]*?)<\/div>/);
    if (!amt || !nm) return null;
    const amount = num(amt[1]);
    if (!Number.isFinite(amount)) return null;
    if (amount === 0) continue;
    lines.push({ name: clean(nm[1]), amount, tax: kind === "obligpercenttax" });
  }
  return { room: num(room[1]), total: num(total[1]), lines };
}

export async function liveQuote(args: {
  roomId: string;
  propertyId: string | number | null | undefined;
  checkin: string;
  checkout: string;
  guests?: number;
  nights: number;
  listRoom: number;
}): Promise<Quote | null> {
  if (!args.propertyId) return null;
  const q = new URLSearchParams({
    propid: String(args.propertyId),
    roomid: args.roomId,
    width: "960",
    page: "book3",
    limitstart: "0",
    checkin_hide: args.checkin,
    checkout_hide: args.checkout,
    numnight: String(args.nights),
    numadult: String(args.guests && args.guests > 0 ? args.guests : 2),
    numchild: "0",
    lang: "en",
  });
  q.set(`br1-${args.roomId}`, "Book");

  let html: string;
  try {
    const res = await fetch(`https://beds24.com/booking.php?${q.toString()}`, {
      headers: { accept: "text/html" },
      // Igual que la verificación de disponibilidad: fresco a ~2 min.
      next: { revalidate: 120 },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return null;
    html = await res.text();
  } catch {
    return null;
  }

  const parsed = parseCheckout(html);
  if (!parsed || !(parsed.room > 0)) return null;
  const sum = parsed.room + parsed.lines.reduce((s, l) => s + l.amount, 0);
  if (Math.abs(sum - parsed.total) > 0.02) return null; // no cuadra → sin desglose

  const fees = parsed.lines.filter((l) => !l.tax).map((l) => ({ label: label(l.name), amount: l.amount }));
  const taxes = parsed.lines.filter((l) => l.tax).map((l) => ({ label: label(l.name), amount: l.amount }));
  const preTax = round2(parsed.room + fees.reduce((s, f) => s + f.amount, 0));
  const discountPct = args.listRoom > parsed.room ? Math.round((1 - parsed.room / args.listRoom) * 100) : 0;
  return {
    nights: args.nights,
    listRoom: args.listRoom,
    room: parsed.room,
    discountPct,
    fees,
    taxes,
    preTax,
    total: parsed.total,
  };
}
