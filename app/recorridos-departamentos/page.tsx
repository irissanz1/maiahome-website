import type { Metadata } from "next";
import TourGallery, { type Tour } from "@/components/TourGallery";

export const metadata: Metadata = {
  title: "Tours Virtuales",
  description:
    "Recorridos virtuales 3D de los departamentos amueblados de Maia Home en CDMX. Conoce cada espacio antes de reservar.",
  alternates: { canonical: "/recorridos-departamentos" },
};

const P = "&qs=1&ts=2&brand=0&play=1";
const TOURS: Tour[] = [
  { nombre: "Rivera", specs: "3 recámaras · 3 baños · hasta 9 huéspedes", url: `https://my.matterport.com/show/?m=VoXXX8jrRyw${P}` },
  { nombre: "Aurora — Hares", specs: "2 recámaras · 2 baños · hasta 5 huéspedes", url: `https://my.matterport.com/show/?m=fGbXDVcWNbe${P}` },
  { nombre: "Kahlo — Prosperidad", specs: "2 recámaras · 1.5 baños · hasta 5 huéspedes", url: `https://my.matterport.com/show/?m=9uAknyL9NoZ${P}` },
  { nombre: "Laila Casa 4", specs: "4 recámaras · 4.5 baños · hasta 12 huéspedes", url: `https://my.matterport.com/show/?m=2iXvwvrh9v3${P}` },
  { nombre: "Tamayo", specs: "3 recámaras · 2 baños · hasta 6 huéspedes", url: `https://my.matterport.com/show/?m=c2cEAaarUR9${P}` },
  { nombre: "Leonora", specs: "3 recámaras · 3 baños · hasta 10 huéspedes", url: `https://my.matterport.com/show/?m=qa8sWXc8o7q${P}` },
];

export default function Recorridos() {
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
