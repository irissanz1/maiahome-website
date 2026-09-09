import type { Metadata } from "next";
import Link from "next/link";
import { getGuides } from "@/lib/guides";
import { nearbyPois } from "@/lib/pois";

// Índice interno de guías (para el equipo). Privado: no indexar.
export const metadata: Metadata = { robots: { index: false, follow: false }, title: "Guías del huésped · índice interno" };

const ZONA_ORDER = ["Polanco", "Condesa", "Houston"];

function Chip({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${ok ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
      <span aria-hidden="true">{ok ? "✓" : "•"}</span>
      {children}
    </span>
  );
}

export default function GuidesIndex() {
  const guides = getGuides();
  // Agrupar por zona
  const byZona = new Map<string, typeof guides>();
  for (const g of guides) {
    const z = g.neighborhood || "Otros";
    if (!byZona.has(z)) byZona.set(z, []);
    byZona.get(z)!.push(g);
  }
  const zonas = [...byZona.keys()].sort(
    (a, b) => (ZONA_ORDER.indexOf(a) + 1 || 99) - (ZONA_ORDER.indexOf(b) + 1 || 99) || a.localeCompare(b)
  );

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Uso interno · Maia Home</p>
      <h1 className="mt-2 font-serif text-4xl text-neutral-900">Guías del huésped</h1>
      <p className="mt-3 max-w-2xl text-neutral-600">
        Índice de las {guides.length} guías publicadas en <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm">/g/&lt;slug&gt;</code>.
        Base para revisar cada una. Son páginas <strong>privadas</strong> (no indexadas): compártelas solo con el huésped de esa reserva.
      </p>

      <div className="mt-6 rounded-2xl border-l-4 border-maia-yellow bg-[#FBF7EC] p-4 text-sm text-neutral-700">
        Los indicadores muestran qué tiene cada guía para detectar pendientes: <b>Amenidades</b> (manual de casa),
        <b> POIs</b> (Explora la zona), <b>Video</b> de acceso, <b>Dirección</b> visible y <b>Check-out</b> propio o estándar.
      </div>

      {zonas.map((z) => {
        const list = byZona.get(z)!.slice().sort((a, b) => a.title.localeCompare(b.title, "es", { numeric: true }));
        return (
          <section key={z} className="mt-10">
            <h2 className="font-serif text-2xl text-neutral-900">{z} <span className="text-base font-normal text-neutral-400">· {list.length}</span></h2>
            <div className="mt-4 space-y-3">
              {list.map((g) => {
                const poiCount = g.lat != null && g.lng != null
                  ? nearbyPois(g.lat, g.lng).reduce((n, grp) => n + grp.items.length, 0) : 0;
                return (
                  <div key={g.slug} className="flex flex-col gap-3 rounded-2xl border border-neutral-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-neutral-900">{g.title}</span>
                        <code className="text-xs text-neutral-400">/g/{g.slug}</code>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <Chip ok={g.amenities.length > 0}>Amenidades {g.amenities.length}</Chip>
                        <Chip ok={poiCount > 0}>POIs {poiCount}</Chip>
                        <Chip ok={!!g.access.video}>Video</Chip>
                        <Chip ok={!!g.address}>Dirección</Chip>
                        <Chip ok={!!g.checkout}>{g.checkout ? "Check-out propio" : "Check-out estándar"}</Chip>
                      </div>
                    </div>
                    <Link href={`/g/${g.slug}`} className="shrink-0 self-start rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700 sm:self-center">
                      Abrir guía →
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
