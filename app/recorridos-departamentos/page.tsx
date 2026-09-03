import type { Metadata } from "next";
import TourGallery, { type Tour } from "@/components/TourGallery";
import { getProperties } from "@/lib/data";
import { img } from "@/lib/format";

export const metadata: Metadata = {
  title: "Tours Virtuales",
  description:
    "Recorridos virtuales 3D de los departamentos amueblados de Maia Home en CDMX. Conoce cada espacio antes de reservar.",
  alternates: { canonical: "/recorridos-departamentos" },
};

const P = "&qs=1&ts=2&brand=0&play=1";
const mp = (id: string) => `https://my.matterport.com/show/?m=${id}${P}`;

// IDs reales de la carpeta "MaiaHome" en Matterport; specs del catálogo.
// Solo se incluyen los espacios con compartir público activado (embebibles).
// slug = propiedad en el catálogo (para usar su portada). Pendientes de
// activar en Matterport: Leonora 3, Leonora 1, Emilia.
const TOURS_RAW = [
  { nombre: "Leonora 2", specs: "4 recámaras · 3.5 baños · hasta 8 huéspedes", id: "m7gmXThXLfE", slug: "polanco-leonora-2" },
  { nombre: "Velasco", specs: "3 recámaras · 2 baños · hasta 8 huéspedes", id: "KEb5Tff3qaW", slug: "polanco-velasco" },
  { nombre: "Cordelia", specs: "3 recámaras · 3 baños · hasta 6 huéspedes", id: "jyqhFFVF2Rk", slug: "polanco-cordelia" },
  { nombre: "Tamayo", specs: "3 recámaras · 2 baños · hasta 6 huéspedes", id: "c2cEAaarUR9", slug: "polanco-tamayo" },
  { nombre: "Aurora", specs: "2 recámaras · 2 baños · hasta 5 huéspedes", id: "ENJc19G1n7X", slug: "polanco-aurora" },
  { nombre: "Kahlo", specs: "2 recámaras · 1.5 baños · hasta 7 huéspedes", id: "9uAknyL9NoZ", slug: "condesa-kahlo" },
  { nombre: "Laila Casa 4", specs: "4 recámaras · 4.5 baños · hasta 12 huéspedes", id: "CnnE69kAYSa", slug: "polanco-laila-c4" },
  { nombre: "Laila Casa 3", specs: "3 recámaras · 3.5 baños · hasta 9 huéspedes", id: "ccchH4ysu2P", slug: "polanco-laila-c3" },
  { nombre: "Luz María 6", specs: "1 recámara · 1 baño · hasta 4 huéspedes", id: "WaKxtYmk9G7", slug: "polanco-luz-maria-6" },
  { nombre: "Luz María 9", specs: "1 recámara · 1 baño · hasta 4 huéspedes", id: "aGGehXJWaED", slug: "polanco-luz-maria-9" },
  { nombre: "Luz María 5", specs: "Estudio · 1 baño · hasta 3 huéspedes", id: "uWDrgQZnLTM", slug: "polanco-luz-maria-5" },
  { nombre: "Luz María 10", specs: "Estudio · 1 baño · hasta 2 huéspedes", id: "eSc6QfPSPH4", slug: "polanco-luz-maria-10" },
  { nombre: "Rivera", specs: "3 recámaras · 3 baños · hasta 9 huéspedes", id: "tA4z5uDyDcT", slug: undefined },
];

export default async function Recorridos() {
  // Portada de Sanity por slug para usarla como fondo de cada tarjeta.
  const props = await getProperties();
  const coverBySlug = new Map(props.map((p) => [p.slug, img(p.images[0], 800)]));
  const TOURS: Tour[] = TOURS_RAW.map((t) => ({
    nombre: t.nombre,
    specs: t.specs,
    url: mp(t.id),
    image: t.slug ? coverBySlug.get(t.slug) ?? null : null,
  }));

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Tours virtuales</p>
      <h1 className="mt-3 font-serif text-4xl text-neutral-900 md:text-5xl">
        Recorre cada departamento en 3D
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600">
        Explora nuestros espacios con recorridos virtuales 360°: camina por cada habitación y conoce
        el departamento a detalle antes de reservar.
      </p>

      <div className="mt-10">
        <TourGallery tours={TOURS} />
      </div>
    </div>
  );
}
