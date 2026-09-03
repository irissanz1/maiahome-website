import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Markdown from "@/components/Markdown";
import { getBlogPost, getBlogPosts } from "@/lib/data";

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

  return (
    <article className="mx-auto max-w-3xl px-5 py-10 md:py-14">
      <nav className="mb-6 text-sm text-neutral-500">
        <Link href="/blog" className="hover:text-neutral-900">Guía de la ciudad</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-700">{p.zona || "CDMX"}</span>
      </nav>

      {p.zona && (
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-maia-strong">{p.zona}</p>
      )}
      <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">
        {p.title}
      </h1>
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
        <Link href="/departamentos" className="mt-5 inline-block rounded-full bg-maia-yellow px-6 py-3 text-sm font-semibold text-black transition hover:bg-maia-strong">
          Ver departamentos
        </Link>
      </div>

      <div className="mt-8">
        <Link href="/blog" className="text-sm font-semibold text-maia-strong">← Volver a la guía</Link>
      </div>
    </article>
  );
}
