import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Markdown from "@/components/Markdown";
import { getBlogPostEn, getBlogPostsEn } from "@/lib/data";
import { categoryLabel } from "@/lib/blog";
import { BLOG_SLUG_EN_TO_ES } from "@/lib/blogSlugs";

export async function generateStaticParams() {
  return (await getBlogPostsEn()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getBlogPostEn(slug);
  if (!p) return {};
  const esSlug = BLOG_SLUG_EN_TO_ES[slug];
  return {
    title: p.title,
    description: p.excerpt || undefined,
    alternates: {
      canonical: `/en/blog/${slug}`,
      languages: { en: `/en/blog/${slug}`, ...(esSlug ? { es: `/blog/${esSlug}` } : {}) },
    },
    openGraph: { title: p.title, description: p.excerpt || undefined, images: p.coverUrl ? [p.coverUrl] : [], type: "article" },
  };
}

function formatDate(iso?: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso.includes("T") ? iso : `${iso}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(d);
}

function zoneCta(zona?: string | null): { href: string; label: string; img: string; headline: string } {
  const z = (zona || "").toLowerCase();
  if (z.includes("polanco"))
    return { href: "/en/polanco", label: "apartments in Polanco", img: "/zonas/polanco.webp", headline: "Your base in Polanco awaits" };
  if (z.includes("condesa"))
    return { href: "/en/condesa", label: "apartments in Condesa", img: "/zonas/condesa.webp", headline: "Your base in Condesa awaits" };
  if (z.includes("houston"))
    return { href: "/en/houston", label: "apartments in Houston", img: "/zonas/houston.webp", headline: "Your base in Houston awaits" };
  return { href: "/en/apartments", label: "Maia Home apartments", img: "/departamentos/cdmx.jpg", headline: "Your home in Mexico City awaits" };
}

export default async function BlogPostEn({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getBlogPostEn(slug);
  if (!p) notFound();

  let bodyWithoutCover = p.body || "";
  if (p.coverUrl) {
    const coverBase = p.coverUrl.split("?")[0];
    bodyWithoutCover = bodyWithoutCover.replace(
      /!\[[^\]]*\]\(([^)]+)\)\s*/,
      (m, url) => (String(url).split("?")[0] === coverBase ? "" : m)
    );
  }

  const pub = formatDate(p.fecha);
  const upd = formatDate(p.updatedAt);
  const showUpd = Boolean(upd && upd !== pub);
  const cta = zoneCta(p.zona);

  const all = await getBlogPostsEn();
  const related = all.filter((r) => r.slug !== p.slug && p.categoria && r.categoria === p.categoria).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt || undefined,
    image: p.coverUrl ? [p.coverUrl] : undefined,
    datePublished: p.fecha || undefined,
    dateModified: p.updatedAt || p.fecha || undefined,
    inLanguage: "en",
    author: { "@type": "Organization", name: "Maia Home", url: "https://maiahome.mx" },
    publisher: { "@type": "Organization", name: "Maia Home", logo: { "@type": "ImageObject", url: "https://maiahome.mx/maia-logo.png" } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://maiahome.mx/en/blog/${p.slug}` },
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-10 md:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="mb-6 text-sm text-neutral-500">
        <Link href="/en/blog" className="hover:text-neutral-900">City guide</Link>
        <span className="mx-2">/</span>
        {p.categoria && categoryLabel(p.categoria, "en") ? (
          <Link href={`/en/blog/category/${p.categoria}`} className="hover:text-neutral-900">{categoryLabel(p.categoria, "en")}</Link>
        ) : (
          <span className="text-neutral-700">{p.zona || "Mexico City"}</span>
        )}
      </nav>

      {(categoryLabel(p.categoria, "en") || p.zona) && (
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-strong">
          {categoryLabel(p.categoria, "en") || p.zona}
        </p>
      )}
      <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">{p.title}</h1>
      {(pub || upd) && (
        <p className="mt-3 text-sm text-neutral-400">
          {showUpd ? (
            <>
              <span className="font-medium text-neutral-500">Updated {upd}</span>
              {pub && <span> · published {pub}</span>}
            </>
          ) : (
            <>Published {pub}</>
          )}
        </p>
      )}
      {p.excerpt && <p className="mt-4 text-lg leading-relaxed text-neutral-600">{p.excerpt}</p>}

      {p.coverUrl && (
        <div className="mt-6 overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.coverUrl} alt={p.title} className="w-full object-cover" />
        </div>
      )}

      <div className="mt-6 text-[15px]">
        <Markdown text={bodyWithoutCover} />
      </div>

      {/* CTA with zone image */}
      <section className="relative mt-12 overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cta.img} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
        <div className="relative max-w-xl px-6 py-10 md:px-10 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-yellow">Book direct</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-white md:text-4xl">{cta.headline}</h2>
          <p className="mt-3 text-white/85">
            Fully furnished apartments with everything included, ready for your arrival. Best direct rate,
            no middlemen and personal service.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-white/80">
            <span>✓ Best direct rate</span>
            <span>✓ No booking fees</span>
            <span>✓ Personal service</span>
          </div>
          <Link href={cta.href} className="mt-6 inline-block rounded-full bg-maia-yellow px-7 py-3.5 text-sm font-semibold text-black shadow-lg transition hover:bg-maia-strong">
            See {cta.label} →
          </Link>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif text-2xl text-neutral-900">Keep reading</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/en/blog/${r.slug}`} className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:shadow-lg">
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-maia-yellow/40 to-neutral-200">
                  {r.coverUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={r.coverUrl} alt={r.title} className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-base leading-snug text-neutral-900">{r.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-8">
        <Link href="/en/blog" className="text-sm font-semibold text-maia-strong">← Back to the guide</Link>
      </div>
    </article>
  );
}
