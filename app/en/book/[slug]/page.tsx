import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getBySlug, getProperties } from "@/lib/data";
import { whatsappUrl, WHATSAPP_DISPLAY } from "@/lib/contact";
import { img } from "@/lib/format";
import TrackCheckout from "@/components/TrackCheckout";

export const metadata: Metadata = {
  title: "Complete your booking",
  robots: { index: false, follow: false },
};

export async function generateStaticParams() {
  return (await getProperties()).map((p) => ({ slug: p.slug }));
}

type SP = Record<string, string | string[] | undefined>;
const s = (v: SP[string]) => (typeof v === "string" ? v : undefined);
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function fmtDates(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return { disp: `${DOW[d.getUTCDay()]} ${d.getUTCDate()} ${MON[d.getUTCMonth()]} ${d.getUTCFullYear()}`, hide: `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}` };
}

const TRUST: [string, string][] = [
  ["100% secure payment", "SSL-encrypted processing. Your data is never stored on our servers."],
  ["Accepted methods", "Visa · Mastercard · American Express."],
  ["Guaranteed booking", "Instant email confirmation once payment is complete."],
  ["Cancellation policy", "Tiered refund based on how early you cancel (see terms)."],
];

export default async function BookEn({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<SP> }) {
  const { slug } = await params;
  const sp = await searchParams;
  const p = await getBySlug(slug);
  if (!p) notFound();

  const checkin = s(sp.checkin);
  const checkout = s(sp.checkout);
  const guests = s(sp.guests) || "2";
  if (!checkin || !checkout) redirect(`/en/stay/${slug}`);

  const nights = Math.round((Date.parse(checkout) - Date.parse(checkin)) / 86400000);
  const ci = fmtDates(checkin);
  const co = fmtDates(checkout);
  const cover = img(p.images[0], 800);

  const q = new URLSearchParams();
  if (p.beds24PropertyId != null) q.set("propid", String(p.beds24PropertyId));
  if (p.beds24RoomId != null) q.set("roomid", String(p.beds24RoomId));
  q.set("width", "960"); q.set("page", "book3"); q.set("limitstart", "0");
  q.set("checkin", ci.disp); q.set("checkin_hide", ci.hide);
  q.set("checkout", co.disp); q.set("checkout_hide", co.hide);
  q.set("numnight", String(nights)); q.set("numadult", guests); q.set("numchild", "0");
  q.set(`br1-${p.beds24RoomId}`, "Book");
  const beds24Src = `https://beds24.com/booking.php?${q.toString()}`;

  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      <TrackCheckout />
      <div className="flex items-center justify-between gap-4">
        <Link href={`/en/stay/${slug}`} className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900">
          <span aria-hidden="true">←</span> Back to the property
        </Link>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          Secure connection · SSL
        </span>
      </div>

      <h1 className="mt-4 font-serif text-3xl font-bold text-neutral-900 md:text-4xl">Complete your booking</h1>
      <p className="mt-1 text-sm text-neutral-500">
        {p.nombre} · {checkin} → {checkout} · {nights} {nights === 1 ? "night" : "nights"} · {guests} guests
      </p>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <iframe src={beds24Src} title={`Booking for ${p.nombre}`} className="h-[1280px] w-full" allow="payment" />
        </div>

        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          {cover && (
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cover} alt={p.nombre} className="h-44 w-full object-cover" />
              <div className="px-4 py-3">
                <p className="text-sm font-semibold text-neutral-900">{p.nombre}</p>
                <p className="text-xs text-neutral-500">{p.zonaNombre}</p>
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-neutral-200 p-5">
            <h2 className="font-serif text-lg text-neutral-900">Book with confidence</h2>
            <ul className="mt-4 space-y-4">
              {TRUST.map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-maia-yellow text-black">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{t}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <a href={whatsappUrl(`Hi, I need help with my booking for ${p.nombre}.`)} target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-neutral-200 p-5 transition hover:border-maia-strong">
            <p className="text-sm font-semibold text-neutral-900">Need help?</p>
            <p className="mt-0.5 text-xs text-neutral-500">Message us on WhatsApp {WHATSAPP_DISPLAY} and we'll assist you.</p>
          </a>
        </aside>
      </div>

      {p.reviews.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif text-2xl text-neutral-900">
            What our guests say
            {p.rating != null && <span className="text-neutral-400"> · <span className="text-amber-500">★</span> {p.rating.toFixed(1)}</span>}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.reviews.slice(0, 6).map((rv, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 p-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-200 text-sm font-semibold text-neutral-600">{rv.name.charAt(0)}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-neutral-800">{rv.name}</p>
                    {rv.date && <p className="text-xs text-neutral-400">{rv.date}</p>}
                  </div>
                  {rv.rating != null && <span className="ml-auto text-sm text-amber-500">{"★".repeat(Math.round(rv.rating))}</span>}
                </div>
                <p className="mt-2 line-clamp-5 text-sm leading-relaxed text-neutral-600">{rv.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
