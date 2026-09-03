import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 bg-maia-dark text-white">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/maia-logo-white.png" alt="Maia Home" className="h-14 w-auto" />
            <p className="mt-4 text-sm text-neutral-400">
              Departamentos amueblados en CDMX (Polanco, Condesa) y Houston. Reserva directo,
              sin intermediarios.
            </p>
          </div>
          <div className="flex gap-12 text-sm">
            <div>
              <h3 className="mb-3 font-semibold text-maia-yellow">Explorar</h3>
              <ul className="space-y-2 text-neutral-400">
                <li><Link href="/departamentos" className="hover:text-maia-yellow">Departamentos</Link></li>
                <li><Link href="/polanco" className="hover:text-maia-yellow">Polanco</Link></li>
                <li><Link href="/condesa" className="hover:text-maia-yellow">Condesa</Link></li>
                <li><Link href="/houston" className="hover:text-maia-yellow">Houston</Link></li>
                <li><Link href="/recorridos-departamentos" className="hover:text-maia-yellow">Tours virtuales</Link></li>
                <li><Link href="/blog" className="hover:text-maia-yellow">Guía de la ciudad</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-semibold text-maia-yellow">Legal</h3>
              <ul className="space-y-2 text-neutral-400">
                <li><Link href="/aviso-privacidad" className="hover:text-maia-yellow">Aviso de Privacidad</Link></li>
                <li><Link href="/terminos-y-condiciones" className="hover:text-maia-yellow">Términos y Condiciones</Link></li>
                <li><Link href="/terminos-uso" className="hover:text-maia-yellow">Términos de Uso</Link></li>
                <li><Link href="/stay-agreement" className="hover:text-maia-yellow">Acuerdo de Estadía</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-semibold text-maia-yellow">Maia Home</h3>
              <ul className="space-y-2 text-neutral-400">
                <li><Link href="/mensuales" className="hover:text-maia-yellow">Estancias mensuales</Link></li>
                <li><Link href="/corporativo" className="hover:text-maia-yellow">Vivienda corporativa</Link></li>
                <li><Link href="/administramos-tu-depto" className="hover:text-maia-yellow">Administra tu depto</Link></li>
                <li><Link href="/nosotros" className="hover:text-maia-yellow">Nosotros</Link></li>
                <li><Link href="/formas-de-pago" className="hover:text-maia-yellow">Formas de pago</Link></li>
                <li><Link href="/facturacion" className="hover:text-maia-yellow">Facturación</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-neutral-700 pt-6 text-xs text-neutral-500">
          <p>© 2026 Maia Luxury Apartments and Services Mexico S.A. de C.V. · Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
