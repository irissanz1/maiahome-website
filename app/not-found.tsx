import Link from "next/link";
import { whatsappUrl } from "@/lib/contact";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 py-16 text-center">
      {/* Ilustración cálida */}
      <svg
        viewBox="0 0 280 210"
        className="h-44 w-auto md:h-52"
        role="img"
        aria-label="Ilustración: un edificio con una ventana iluminada y un marcador de mapa"
      >
        {/* resplandor cálido */}
        <circle cx="205" cy="55" r="46" fill="#FDDB51" opacity="0.25" />
        {/* suelo */}
        <line x1="24" y1="182" x2="256" y2="182" stroke="#171717" strokeWidth="3" strokeLinecap="round" />
        {/* edificio */}
        <rect x="70" y="66" width="104" height="116" rx="8" fill="#fff" stroke="#171717" strokeWidth="3.5" />
        {/* techo */}
        <path d="M64 66 L122 40 L180 66" fill="none" stroke="#171717" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
        {/* ventanas */}
        <rect x="86" y="82" width="26" height="26" rx="3" fill="#FDDB51" stroke="#171717" strokeWidth="2.5" />
        <rect x="132" y="82" width="26" height="26" rx="3" fill="#fff" stroke="#171717" strokeWidth="2.5" />
        <rect x="86" y="120" width="26" height="26" rx="3" fill="#fff" stroke="#171717" strokeWidth="2.5" />
        <rect x="132" y="120" width="26" height="26" rx="3" fill="#FDDB51" stroke="#171717" strokeWidth="2.5" />
        {/* puerta */}
        <path d="M108 182 v-24 a14 14 0 0 1 28 0 v24" fill="#fff" stroke="#171717" strokeWidth="3" strokeLinejoin="round" />
        {/* línea punteada hacia el pin (ubicación perdida) */}
        <path d="M176 92 q40 -6 44 26" fill="none" stroke="#171717" strokeWidth="2" strokeDasharray="3 6" strokeLinecap="round" />
        {/* marcador de mapa con signo de interrogación */}
        <path d="M220 74 c-13 0 -23 10 -23 23 c0 17 23 38 23 38 c0 0 23 -21 23 -38 c0 -13 -10 -23 -23 -23 z" fill="#F9D316" stroke="#171717" strokeWidth="3" strokeLinejoin="round" />
        <text x="220" y="104" textAnchor="middle" fontSize="24" fontWeight="700" fill="#171717" fontFamily="var(--font-montserrat), sans-serif">?</text>
      </svg>

      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.28em] text-maia-strong">Error 404</p>
      <h1 className="mt-3 font-serif text-3xl text-neutral-900 md:text-4xl">
        Esta página no existe (o cambió de lugar)
      </h1>
      <p className="mt-4 text-neutral-600">
        Puede que el enlace esté roto o que la página se haya movido. Te dejamos por dónde seguir:
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-maia-yellow px-6 py-3 text-sm font-bold text-black transition hover:bg-maia-strong"
        >
          Ir al inicio
        </Link>
        <Link
          href="/departamentos"
          className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
        >
          Ver departamentos
        </Link>
        <a
          href={whatsappUrl("Hola, tuve un problema al navegar el sitio de Maia Home.")}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
        >
          Escríbenos por WhatsApp
        </a>
      </div>

      <div className="mt-10 text-sm text-neutral-500">
        <p>También puedes explorar:</p>
        <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
          <Link href="/polanco" className="hover:text-maia-strong">Polanco</Link>
          <Link href="/condesa" className="hover:text-maia-strong">Condesa</Link>
          <Link href="/houston" className="hover:text-maia-strong">Houston</Link>
          <Link href="/mensuales" className="hover:text-maia-strong">Estancias mensuales</Link>
          <Link href="/blog" className="hover:text-maia-strong">Guía de la ciudad</Link>
        </div>
      </div>
    </div>
  );
}
