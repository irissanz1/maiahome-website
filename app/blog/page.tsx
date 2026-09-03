import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Guía de la ciudad",
  description:
    "Guía de Maia Home para vivir la Ciudad de México: barrios, museos, mercados, restaurantes y lo mejor de Polanco y la Condesa.",
  alternates: { canonical: "/blog" },
};

export default async function Blog() {
  const posts = await getBlogPosts();
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-strong">Guía de la ciudad</p>
      <h1 className="mt-3 font-serif text-4xl font-bold text-neutral-900 md:text-5xl">
        Vive la CDMX como un local
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600">
        Museos, mercados, barrios y los mejores rincones de la ciudad — recomendaciones honestas del
        equipo de Maia Home.
      </p>

      {posts.length === 0 ? (
        <p className="mt-16 text-center text-neutral-500">Pronto publicaremos nuestras guías.</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-maia-yellow/40 to-neutral-200">
                {p.coverUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.coverUrl} alt={p.title} className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
                )}
                {p.zona && (
                  <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                    {p.zona}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h2 className="font-serif text-lg leading-snug text-neutral-900 group-hover:text-maia-strong">
                  {p.title}
                </h2>
                {p.excerpt && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-600">{p.excerpt}</p>}
                <span className="mt-3 inline-block text-sm font-semibold text-maia-strong">Leer más →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
