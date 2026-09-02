import { getFeaturedReviews } from "@/lib/data";

export default async function FeaturedReviews() {
  const reviews = (await getFeaturedReviews()).filter((r) => r.text).slice(0, 6);
  if (reviews.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Reseñas reales</p>
        <h2 className="mt-2 font-serif text-3xl text-neutral-900">Lo que dicen los huéspedes</h2>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {reviews.map((r, i) => (
          <div key={i} className="rounded-2xl border border-neutral-200 bg-white p-5">
            <div className="flex items-center gap-2.5">
              {r.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.avatar} alt={r.name} className="h-10 w-10 rounded-full object-cover" />
              ) : (
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-sm font-semibold text-neutral-600">
                  {r.name.charAt(0)}
                </span>
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-neutral-800">{r.name}</p>
                {r.property && <p className="truncate text-xs text-neutral-400">{r.property}</p>}
              </div>
              {r.rating != null && (
                <span className="ml-auto text-sm text-amber-500">{"★".repeat(Math.round(r.rating))}</span>
              )}
            </div>
            <p className="mt-3 line-clamp-5 text-sm leading-relaxed text-neutral-600">{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
