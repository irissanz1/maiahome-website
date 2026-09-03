import type { Metadata } from "next";
import TourGallery, { type Tour } from "@/components/TourGallery";
import { getProperties } from "@/lib/data";
import { img } from "@/lib/format";

export const metadata: Metadata = {
  title: "Virtual tours",
  description: "3D virtual tours of Maia Home's furnished apartments in Mexico City. Explore every space before you book.",
  alternates: { canonical: "/en/virtual-tours", languages: { es: "/recorridos-departamentos", en: "/en/virtual-tours" } },
};

const P = "&qs=1&ts=2&brand=0&play=1";
const mp = (id: string) => `https://my.matterport.com/show/?m=${id}${P}`;
const TOURS_RAW = [
  { nombre: "Leonora 2", specs: "4 bedrooms · 3.5 baths · up to 8 guests", id: "m7gmXThXLfE", slug: "polanco-leonora-2" },
  { nombre: "Velasco", specs: "3 bedrooms · 2 baths · up to 8 guests", id: "KEb5Tff3qaW", slug: "polanco-velasco" },
  { nombre: "Cordelia", specs: "3 bedrooms · 3 baths · up to 6 guests", id: "jyqhFFVF2Rk", slug: "polanco-cordelia" },
  { nombre: "Tamayo", specs: "3 bedrooms · 2 baths · up to 6 guests", id: "c2cEAaarUR9", slug: "polanco-tamayo" },
  { nombre: "Aurora", specs: "2 bedrooms · 2 baths · up to 5 guests", id: "ENJc19G1n7X", slug: "polanco-aurora" },
  { nombre: "Kahlo", specs: "2 bedrooms · 1.5 baths · up to 7 guests", id: "9uAknyL9NoZ", slug: "condesa-kahlo" },
  { nombre: "Laila Casa 4", specs: "4 bedrooms · 4.5 baths · up to 12 guests", id: "CnnE69kAYSa", slug: "polanco-laila-c4" },
  { nombre: "Laila Casa 3", specs: "3 bedrooms · 3.5 baths · up to 9 guests", id: "ccchH4ysu2P", slug: "polanco-laila-c3" },
  { nombre: "Luz María 6", specs: "1 bedroom · 1 bath · up to 4 guests", id: "WaKxtYmk9G7", slug: "polanco-luz-maria-6" },
  { nombre: "Luz María 9", specs: "1 bedroom · 1 bath · up to 4 guests", id: "aGGehXJWaED", slug: "polanco-luz-maria-9" },
  { nombre: "Luz María 5", specs: "Studio · 1 bath · up to 3 guests", id: "uWDrgQZnLTM", slug: "polanco-luz-maria-5" },
  { nombre: "Luz María 10", specs: "Studio · 1 bath · up to 2 guests", id: "eSc6QfPSPH4", slug: "polanco-luz-maria-10" },
  { nombre: "Horacio 1&2", specs: "3 bedrooms · 3 baths · up to 9 guests", id: "tA4z5uDyDcT", slug: "polanco-horacio-1-2" },
];

export default async function VirtualTours() {
  const props = await getProperties();
  const coverBySlug = new Map(props.map((p) => [p.slug, img(p.images[0], 800)]));
  const TOURS: Tour[] = TOURS_RAW.map((t) => ({ nombre: t.nombre, specs: t.specs, url: mp(t.id), image: coverBySlug.get(t.slug) ?? null }));

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">Virtual tours</p>
      <h1 className="mt-3 font-serif text-4xl text-neutral-900 md:text-5xl">Walk through every apartment in 3D</h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600">
        Explore our spaces with 360° virtual tours: walk through every room and get to know the apartment in detail before you book.
      </p>
      <div className="mt-10">
        <TourGallery tours={TOURS} lang="en" />
      </div>
    </div>
  );
}
