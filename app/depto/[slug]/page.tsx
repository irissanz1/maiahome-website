import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Placeholder from "@/components/Placeholder";
import Gallery from "@/components/Gallery";
import ReserveButton from "@/components/ReserveButton";
import StayDateForm from "@/components/StayDateForm";
import { getBySlug, getProperties } from "@/lib/data";
import { evaluate, statusLabel, type SearchInput } from "@/lib/availability";
import { formatMoney, img } from "@/lib/format";

type SP = Record<string, string | string[] | undefined>;
const str = (v: string | string[] | undefined) => (typeof v === "string" ? v : undefined);

export async function generateStaticParams() {
  return (await getProperties()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getBySlug(slug);
  if (!p) return {};
  const title = `${p.nombre} — ${p.tipo || "Departamento"} en ${p.zonaNombre}`;
  const ogImage = img(p.images[0], 1200);
  return {
    title,
    description: p.headline.es || p.descripcion.es?.slice(0, 150),
    alternates: { canonical: `/depto/${p.slug}` },
    openGraph: { title, description: p.headline.es, images: ogImage ? [ogImage] : [] },
  };
}

export default async function StayDetail({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SP>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const p = await getBySlug(slug);
  if (!p) notFound();

  const cur = p.currency;
  const search: SearchInput = {
    checkin: str(sp.checkin),
    checkout: str(sp.checkout),
    guests: str(sp.guests) ? Number(str(sp.guests)) : undefined,
  };
  const r = evaluate(p, search);
  const gallery = p.images.slice(0, 5);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Apartment",
    name: p.nombre,
    description: p.descripcion.es,
    numberOfBedrooms: p.recamaras,
    numberOfBathroomsTotal: p.banos,
    occupancy: { "@type": "QuantitativeValue", maxValue: p.capacidad },
    image: gallery.map((u) => img(u, 1200)).filter(Boolean),
    address: { "@type": "PostalAddress", addressLocality: p.zonaNombre, addressCountry: p.pais },
  };

  // Deep-link a Beds24. Con fechas → salta directo al paso final (page=book3);
  // sin fechas → cae en la selección de fechas del depto.
  const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function bd(iso: string) {
    const d = new Date(iso + "T00:00:00Z");
    return {
      disp: `${DOW[d.getUTCDay()]} ${d.getUTCDate()} ${MON[d.getUTCMonth()]} ${d.getUTCFullYear()}`,
      hide: `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`,
    };
  }
  let beds24Url: string;
  if (search.checkin && search.checkout && p.beds24PropertyId) {
    const ci = bd(search.checkin);
    const co = bd(search.checkout);
    const nights = Math.round((Date.parse(search.checkout) - Date.parse(search.checkin)) / 86400000);
    const q = new URLSearchParams();
    q.set("propid", String(p.beds24PropertyId));
    q.set("roomid", p.beds24RoomId);
    q.set("width", "960");
    q.set("page", "book3");
    q.set("limitstart", "0");
    q.set("checkin", ci.disp);
    q.set("checkin_hide", ci.hide);
    q.set("checkout", co.disp);
    q.set("checkout_hide", co.hide);
    q.set("numnight", String(nights));
    q.set("numadult", String(search.guests || 2));
    q.set("numchild", "0");
    q.set(`br1-${p.beds24RoomId}`, "Book");
    beds24Url = `https://beds24.com/booking.php?${q.toString()}`;
  } else {
    const q = new URLSearchParams({ roomid: p.beds24RoomId });
    if (p.beds24PropertyId) q.set("propid", String(p.beds24PropertyId));
    beds24Url = `https://beds24.com/booking.php?${q.toString()}`;
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 pb-24 md:pb-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="mb-4 text-sm text-neutral-500">
        <Link href="/departamentos" className="hover:text-neutral-900">Departamentos</Link>
        <span className="mx-2">/</span>
        <Link href={`/${p.zona}`} className="hover:text-neutral-900">{p.zonaNombre}</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-700">{p.nombre}</span>
      </nav>

      {/* Galería */}
      {p.images.length > 0 ? (
        <Gallery images={p.images} nombre={p.nombre} />
      ) : (
        <Placeholder seed={p.beds24RoomId} label={p.nombre} className="h-72 w-full rounded-2xl" />
      )}

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-maia-strong">
            {p.zonaNombre} · {p.pais === "MX" ? "Ciudad de México" : "Houston, TX"}
          </p>
          <h1 className="mt-2 font-serif text-4xl text-neutral-900">{p.nombre}</h1>
          <p className="mt-1 text-neutral-500">
            {[p.tipo, p.recamaras != null ? `${p.recamaras} rec` : null, p.banos ? `${p.banos} baño${p.banos !== 1 ? "s" : ""}` : null].filter(Boolean).join(" · ")}
          </p>
          {p.capacidad != null && (
            <p className="mt-3 inline-flex flex-wrap items-center gap-x-2 rounded-lg bg-neutral-50 px-3 py-2 text-sm text-neutral-700">
              <span aria-hidden="true">🛏️</span>
              <span>Hasta <b className="text-neutral-900">{p.capacidad} huéspedes</b></span>
              {p.capacidadCamas != null && (
                <span className="text-neutral-500">
                  · {p.capacidadCamas} en camas
                  {p.capacidad - p.capacidadCamas > 0 ? ` + ${p.capacidad - p.capacidadCamas} en sofá cama` : ""}
                </span>
              )}
            </p>
          )}
          {p.headline.es && !p.descripcion.es.startsWith(p.headline.es.slice(0, 40)) && (
            <p className="mt-5 text-lg text-neutral-700">{p.headline.es}</p>
          )}
          {p.descripcion.es && <p className="mt-3 whitespace-pre-line leading-relaxed text-neutral-600">{p.descripcion.es}</p>}
          {gallery.length > 1 && (
            <p className="mt-6 text-sm text-neutral-400">{p.images.length} fotos en total</p>
          )}

          {p.rating != null && (
            <section className="mt-10">
              <h2 className="font-serif text-2xl text-neutral-900">
                <span className="text-amber-500">★</span> {p.rating.toFixed(1)}
                <span className="text-neutral-400"> · {p.reviewCount} reseñas</span>
              </h2>
              {p.reviews.length > 0 && (
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {p.reviews.slice(0, 6).map((rv, i) => (
                    <div key={i} className="rounded-2xl border border-neutral-200 p-4">
                      <div className="flex items-center gap-2.5">
                        {rv.avatar ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={rv.avatar} alt={rv.name} className="h-9 w-9 rounded-full object-cover" />
                        ) : (
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-200 text-sm font-semibold text-neutral-600">
                            {rv.name.charAt(0)}
                          </span>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-neutral-800">{rv.name}</p>
                          {rv.date && <p className="text-xs text-neutral-400">{rv.date}</p>}
                        </div>
                        {rv.rating != null && (
                          <span className="ml-auto text-sm text-amber-500">{"★".repeat(Math.round(rv.rating))}</span>
                        )}
                      </div>
                      <p className="mt-2 line-clamp-5 text-sm leading-relaxed text-neutral-600">{rv.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>

        <aside className="h-fit rounded-2xl border border-neutral-200 p-5 shadow-sm lg:sticky lg:top-24">
          {p.precioDesde != null ? (
            <p className="text-2xl font-semibold text-neutral-900">
              {formatMoney(p.precioDesde, cur)}
              <span className="text-base font-normal text-neutral-500"> / noche</span>
            </p>
          ) : (
            <p className="text-lg text-neutral-500">Consultar tarifa</p>
          )}

          <StayDateForm slug={p.slug} checkin={search.checkin} checkout={search.checkout} guests={search.guests} />

          <div className="mt-4 rounded-xl bg-neutral-50 p-3 text-sm">
            <p className="font-medium text-neutral-700">
              {statusLabel(r.status)}
              {r.status === "estancia-minima" && r.minStayRequerido ? ` · mínimo ${r.minStayRequerido} noches` : ""}
            </p>
            {r.status === "disponible" && r.total != null && (
              <p className="mt-1 text-neutral-600">{formatMoney(r.total, cur)} por {r.nights} noches</p>
            )}
            {r.status === "sin-fechas" && <p className="mt-1 text-neutral-500">Elige fechas en el buscador para ver el total.</p>}
          </div>

          <ReserveButton
            href={beds24Url}
            roomId={p.beds24RoomId}
            nombre={p.nombre}
            className={`mt-4 block rounded-xl px-4 py-3 text-center text-sm font-semibold transition ${
              r.status === "disponible" || r.status === "sin-fechas"
                ? "bg-maia-yellow text-black hover:bg-maia-strong"
                : "cursor-not-allowed bg-neutral-200 text-neutral-500"
            }`}
          >
            Reservar
          </ReserveButton>
          <p className="mt-2 text-center text-xs text-neutral-400">El cobro se procesa en Beds24 (checkout seguro)</p>
        </aside>
      </div>

      {/* Barra fija de reserva (móvil) */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-neutral-200 bg-white/95 py-3 pl-4 pr-24 backdrop-blur md:hidden">
        <div className="text-sm leading-tight">
          {r.status === "disponible" && r.total != null ? (
            <>
              <span className="font-semibold text-neutral-900">{formatMoney(r.total, cur)}</span>
              <span className="text-neutral-500"> · {r.nights} noches</span>
            </>
          ) : p.precioDesde != null ? (
            <>
              <span className="font-semibold text-neutral-900">{formatMoney(p.precioDesde, cur)}</span>
              <span className="text-neutral-500"> / noche</span>
            </>
          ) : (
            <span className="text-neutral-500">Consultar tarifa</span>
          )}
        </div>
        <ReserveButton
          href={beds24Url}
          roomId={p.beds24RoomId}
          nombre={p.nombre}
          className="shrink-0 rounded-xl bg-maia-yellow px-6 py-3 text-sm font-semibold text-black"
        >
          Reservar
        </ReserveButton>
      </div>
    </div>
  );
}
