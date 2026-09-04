import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Markdown from "@/components/Markdown";
import { getBlogPost, getBlogPosts } from "@/lib/data";
import { categoryLabel } from "@/lib/blog";

export async function generateStaticParams() {
  return (await getBlogPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getBlogPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt || undefined,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      title: p.title,
      description: p.excerpt || undefined,
      images: p.coverUrl ? [p.coverUrl] : [],
      type: "article",
    },
  };
}

// Fecha legible en español (evita desfase de zona usando UTC).
function formatFecha(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(d);
}

// CTA/enlace consciente de la zona del post.
function zoneCta(zona?: string | null): { href: string; label: string } {
  const z = (zona || "").toLowerCase();
  if (z.includes("polanco")) return { href: "/polanco", label: "departamentos en Polanco" };
  if (z.includes("condesa")) return { href: "/condesa", label: "departamentos en la Condesa" };
  if (z.includes("houston")) return { href: "/houston", label: "departamentos en Houston" };
  return { href: "/departamentos", label: "departamentos Maia Home" };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getBlogPost(slug);
  if (!p) notFound();

  // Evita duplicar la portada: si la primera imagen del cuerpo es la misma de la
  // portada (coverUrl), la quitamos del cuerpo (ya se muestra arriba como hero).
  let bodyWithoutCover = p.body || "";
  if (p.coverUrl) {
    const coverBase = p.coverUrl.split("?")[0];
    bodyWithoutCover = bodyWithoutCover.replace(
      /!\[[^\]]*\]\(([^)]+)\)\s*/,
      (m, url) => (String(url).split("?")[0] === coverBase ? "" : m)
    );
  }

  const fecha = formatFecha(p.fecha);
  const cta = zoneCta(p.zona);

  // Posts relacionados: misma categoría, excluye el actual (máx. 3).
  const all = await getBlogPosts();
  const related = all
    .filter((r) => r.slug !== p.slug && p.categoria && r.categoria === p.categoria)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt || undefined,
    image: p.coverUrl ? [p.coverUrl] : undefined,
    datePublished: p.fecha || undefined,
    dateModified: p.fecha || undefined,
    inLanguage: "es-MX",
    author: { "@type": "Organization", name: "Maia Home", url: "https://maiahome.mx" },
    publisher: {
      "@type": "Organization",
      name: "Maia Home",
      logo: { "@type": "ImageObject", url: "https://maiahome.mx/maia-logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://maiahome.mx/blog/${p.slug}` },
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-10 md:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="mb-6 text-sm text-neutral-500">
        <Link href="/blog" className="hover:text-neutral-900">Guía de la ciudad</Link>
        <span className="mx-2">/</span>
        {p.categoria && categoryLabel(p.categoria) ? (
          <Link href={`/blog/categoria/${p.categoria}`} className="hover:text-neutral-900">{categoryLabel(p.categoria)}</Link>
        ) : (
          <span className="text-neutral-700">{p.zona || "CDMX"}</span>
        )}
      </nav>

      {(categoryLabel(p.categoria) || p.zona) && (
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-strong">
          {categoryLabel(p.categoria) || p.zona}
        </p>
      )}
      <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">
        {p.title}
      </h1>
      {fecha && <p className="mt-3 text-sm text-neutral-400">{fecha}</p>}
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

      {/* CTA */}
      <div className="mt-12 rounded-2xl bg-maia-dark px-6 py-8 text-center text-white">
        <h2 className="font-serif text-2xl">¿Listo para vivir la ciudad?</h2>
        <p className="mt-2 text-sm text-neutral-300">Hospédate en un departamento Maia Home en la mejor zona.</p>
        <Link href={cta.href} className="mt-5 inline-block rounded-full bg-maia-yellow px-6 py-3 text-sm font-semibold text-black transition hover:bg-maia-strong">
          Ver {cta.label}
        </Link>
      </div>

      {/* Posts relacionados */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif text-2xl text-neutral-900">Sigue leyendo</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:shadow-lg">
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
        <Link href="/blog" className="text-sm font-semibold text-maia-strong">← Volver a la guía</Link>
      </div>
    </article>
  );
}
