import Link from "next/link";
import { whatsappUrl } from "@/lib/contact";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 py-20 text-center">
      <p className="font-serif text-6xl font-bold text-maia-strong md:text-7xl">404</p>
      <h1 className="mt-4 font-serif text-3xl text-neutral-900 md:text-4xl">
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
