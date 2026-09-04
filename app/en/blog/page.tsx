import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPostsEn } from "@/lib/data";
import { BLOG_CATEGORIES, categoryLabel } from "@/lib/blog";

export const metadata: Metadata = {
  title: "City guide",
  description:
    "Maia Home's guide to living Mexico City: neighborhoods, museums, markets, restaurants and the best of Polanco and Condesa.",
  alternates: { canonical: "/en/blog", languages: { es: "/blog", en: "/en/blog" } },
};

type SP = Record<string, string | string[] | undefined>;

export default async function BlogEn({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const cat = typeof sp.cat === "string" ? sp.cat : undefined;
  const all = await getBlogPostsEn();
  const posts = cat ? all.filter((p) => p.categoria === cat) : all;

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm transition ${
      active ? "border-maia-strong bg-maia-yellow/40 font-semibold text-neutral-900" : "border-neutral-300 text-neutral-600 hover:bg-neutral-50"
    }`;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-strong">City guide</p>
      <h1 className="mt-3 font-serif text-4xl font-bold text-neutral-900 md:text-5xl">Live Mexico City like a local</h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600">
        Museums, markets, neighborhoods and the best corners of the city — honest recommendations from
        the Maia Home team.
      </p>

      {/* Category filter */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Link href="/en/blog" className={chip(!cat)}>All</Link>
        {BLOG_CATEGORIES.map((c) => (
          <Link key={c.slug} href={`/en/blog?cat=${c.slug}`} className={chip(cat === c.slug)}>{c.labelEn}</Link>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="mt-16 text-center text-neutral-500">No articles in this category yet.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/en/blog/${p.slug}`} className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:shadow-lg">
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-maia-yellow/40 to-neutral-200">
                {p.coverUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.coverUrl} alt={p.title} className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
                )}
                {categoryLabel(p.categoria, "en") && (
                  <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                    {categoryLabel(p.categoria, "en")}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h2 className="font-serif text-lg leading-snug text-neutral-900 group-hover:text-maia-strong">{p.title}</h2>
                {p.excerpt && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-600">{p.excerpt}</p>}
                <span className="mt-3 inline-block text-sm font-semibold text-maia-strong">Read more →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
