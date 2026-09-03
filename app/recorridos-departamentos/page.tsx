import type { Metadata } from "next";
import TourGallery, { type Tour } from "@/components/TourGallery";

export const metadata: Metadata = {
  title: "Tours Virtuales",
  description:
    "Recorridos virtuales 3D de los departamentos amueblados de Maia Home en CDMX. Conoce cada espacio antes de reservar.",
  alternates: { canonical: "/recorridos-departamentos" },
};

const P = "&qs=1&ts=2&brand=0&play=1";
const tour = (nombre: string, specs: string, id: string): Tour => ({
  nombre,
  specs,
  url: `https://my.matterport.com/show/?m=${id}${P}`,
});

// IDs reales de la carpeta "MaiaHome" en Matterport; specs del catálogo.
// Solo se incluyen los espacios con compartir público activado (embebibles).
// Pendientes de activar en Matterport: Leonora 3, Leonora 1, Emilia.
const TOURS: Tour[] = [
  tour("Leonora 2", "4 recámaras · 3.5 baños · hasta 8 huéspedes", "m7gmXThXLfE"),
  tour("Velasco", "3 recámaras · 2 baños · hasta 8 huéspedes", "KEb5Tff3qaW"),
  tour("Cordelia", "3 recámaras · 3 baños · hasta 6 huéspedes", "jyqhFFVF2Rk"),
  tour("Tamayo", "3 recámaras · 2 baños · hasta 6 huéspedes", "c2cEAaarUR9"),
  tour("Aurora", "2 recámaras · 2 baños · hasta 5 huéspedes", "ENJc19G1n7X"),
  tour("Kahlo", "2 recámaras · 1.5 baños · hasta 7 huéspedes", "9uAknyL9NoZ"),
  tour("Laila Casa 4", "4 recámaras · 4.5 baños · hasta 12 huéspedes", "CnnE69kAYSa"),
  tour("Laila Casa 3", "3 recámaras · 3.5 baños · hasta 9 huéspedes", "ccchH4ysu2P"),
  tour("Luz María 6", "1 recámara · 1 baño · hasta 4 huéspedes", "WaKxtYmk9G7"),
  tour("Luz María 9", "1 recámara · 1 baño · hasta 4 huéspedes", "aGGehXJWaED"),
  tour("Luz María 5", "Estudio · 1 baño · hasta 3 huéspedes", "uWDrgQZnLTM"),
  tour("Luz María 10", "Estudio · 1 baño · hasta 2 huéspedes", "eSc6QfPSPH4"),
  tour("Rivera", "3 recámaras · 3 baños · hasta 9 huéspedes", "tA4z5uDyDcT"),
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
