import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideView from "@/components/guide/GuideView";
import { getGuide, getGuides } from "@/lib/guides";

export function generateStaticParams() {
  return getGuides().map((g) => ({ slug: g.slug }));
}

// Guías privadas post-reserva: NUNCA indexar.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  // `code` es solo para el índice interno: no lo pasamos a la guía del huésped
  // (así tampoco queda en el HTML fuente de la página del huésped).
  const { code: _code, ...guideForGuest } = guide;
  return (
    <div className="py-6">
      <GuideView guide={guideForGuest} />
    </div>
  );
}
