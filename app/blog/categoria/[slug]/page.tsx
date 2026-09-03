import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPosts } from "@/lib/data";
import { BLOG_CATEGORIES, categoryLabel } from "@/lib/blog";

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const label = categoryLabel(slug);
  if (!label) return {};
  return {
    title: `${label} · Guía CDMX`,
    description: `${label} en la Ciudad de México: guías y recomendaciones de Maia Home para vivir la ciudad como un local.`,
    alternates: { canonical: `/blog/categoria/${slug}` },
  };
}

export default async function Categoria({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const label = categoryLabel(slug);
  if (!label) notFound();
  const posts = (await getBlogPosts()).filter((p) => p.categoria === slug);

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm transition ${
      active ? "border-maia-strong bg-maia-yellow/40 font-semibold text-neutral-900" : "border-neutral-300 text-neutral-600 hover:bg-neutral-50"
    }`;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <nav className="mb-3 text-sm text-neutral-500">
        <Link href="/blog" className="hover:text-neutral-900">Guía de la ciudad</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-700">{label}</span>
      </nav>
      <h1 className="font-serif text-4xl font-bold text-neutral-900 md:text-5xl">{label} en la CDMX</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link href="/blog" className={chip(false)}>Todas</Link>
        {BLOG_CATEGORIES.map((c) => (
          <Link key={c.slug} href={`/blog/categoria/${c.slug}`} className={chip(c.slug === slug)}>{c.label}</Link>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="mt-16 text-center text-neutral-500">Pronto publicaremos más en esta categoría.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:shadow-lg">
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-maia-yellow/40 to-neutral-200">
                {p.coverUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.coverUrl} alt={p.title} className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
                )}
              </div>
              <div className="p-5">
                <h2 className="font-serif text-lg leading-snug text-neutral-900 group-hover:text-maia-strong">{p.title}</h2>
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
