import { getProperties } from "@/lib/data";

// Cifra de marca (ajústala): total aproximado de estancias hospedadas.
const ESTANCIAS = "+5K";

export default async function StatsBar() {
  const props = await getProperties();
  const rated = props.filter((p) => p.rating != null);
  const avg = rated.length ? rated.reduce((s, p) => s + (p.rating || 0), 0) / rated.length : null;
  const reviews = props.reduce((s, p) => s + (p.reviewCount || 0), 0);
  const reviewsLabel = reviews >= 1000 ? "1,000+" : String(reviews);

  return (
    <div className="mx-auto max-w-6xl px-5">
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 rounded-2xl border border-neutral-100 bg-white px-6 py-4 text-neutral-500 shadow-sm">
        <span>
          <b className="text-neutral-900">{ESTANCIAS}</b> estancias
        </span>
        {avg != null && (
          <span>
            <span className="text-amber-500">★</span> <b className="text-neutral-900">{avg.toFixed(1)}</b> · {reviewsLabel} reseñas
          </span>
        )}
        <span>
          <b className="text-neutral-900">{props.length}</b> propiedades
        </span>
      </div>
    </div>
  );
}
