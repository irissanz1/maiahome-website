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
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.instagram.com/maiahomemx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Maia Home"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 text-neutral-300 transition hover:border-maia-yellow hover:text-maia-yellow"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.8.07 1.2.06 1.8.25 2.2.42.6.22 1 .48 1.4.9.42.4.68.8.9 1.4.17.4.36 1 .42 2.2.06 1.2.07 1.6.07 4.8s0 3.6-.07 4.8c-.06 1.2-.25 1.8-.42 2.2-.22.6-.48 1-.9 1.4-.4.42-.8.68-1.4.9-.4.17-1 .36-2.2.42-1.2.06-1.6.07-4.8.07s-3.6 0-4.8-.07c-1.2-.06-1.8-.25-2.2-.42-.6-.22-1-.48-1.4-.9-.42-.4-.68-.8-.9-1.4-.17-.4-.36-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.8c.06-1.2.25-1.8.42-2.2.22-.6.48-1 .9-1.4.4-.42.8-.68 1.4-.9.4-.17 1-.36 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.5 0-4.74.07-.9.04-1.38.2-1.7.32-.43.17-.74.37-1.06.7-.32.32-.52.63-.7 1.06-.12.32-.28.8-.32 1.7C3.2 8.5 3.2 8.86 3.2 12s0 3.5.07 4.74c.04.9.2 1.38.32 1.7.17.43.37.74.7 1.06.32.32.63.52 1.06.7.32.12.8.28 1.7.32 1.24.06 1.6.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.38-.2 1.7-.32.43-.17.74-.37 1.06-.7.32-.32.52-.63.7-1.06.12-.32.28-.8.32-1.7.06-1.24.07-1.6.07-4.74s0-3.5-.07-4.74c-.04-.9-.2-1.38-.32-1.7a2.85 2.85 0 0 0-.7-1.06 2.85 2.85 0 0 0-1.06-.7c-.32-.12-.8-.28-1.7-.32C15.5 4 15.14 4 12 4Zm0 3.05A4.95 4.95 0 1 1 12 17a4.95 4.95 0 0 1 0-9.9Zm0 1.8a3.15 3.15 0 1 0 0 6.3 3.15 3.15 0 0 0 0-6.3Zm5.15-.9a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" /></svg>
              </a>
              <a
                href="https://www.tiktok.com/@maiahomemx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok de Maia Home"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 text-neutral-300 transition hover:border-maia-yellow hover:text-maia-yellow"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 5.8a4.3 4.3 0 0 1-1-2.8h-3v11.4a2.5 2.5 0 1 1-2.5-2.5c.26 0 .5.04.75.11V8.9a5.6 5.6 0 0 0-.75-.05 5.5 5.5 0 1 0 5.5 5.5V8.9a7.2 7.2 0 0 0 4.2 1.35V7.2a4.3 4.3 0 0 1-3.2-1.4Z" /></svg>
              </a>
            </div>
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
