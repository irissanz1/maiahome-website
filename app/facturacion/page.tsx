import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facturación",
  description:
    "Solicita tu factura fiscal (CFDI) de tu estancia con Maia Home. Llena el formulario con tus datos fiscales y recíbela por correo.",
  alternates: { canonical: "/facturacion" },
};

const CASES = [
  { t: "Reservé directo con Maia Home", d: "Llena el formulario de esta página con tus datos fiscales." },
  { t: "Reservé por Airbnb, Booking o Vrbo", d: "También te facturamos nosotros: llena el formulario con tus datos fiscales y adjunta tu comprobante de pago." },
  { t: "Necesito factura para una empresa", d: "Indica la razón social y datos fiscales de la empresa en el formulario." },
];

const HAVE_READY = [
  "RFC y razón social",
  "Constancia de situación fiscal",
  "Uso de CFDI",
  "Correo para recibir la factura",
  "Imagen de tu comprobante de pago",
];

function InvoiceIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <rect x="24" y="14" width="72" height="92" rx="6" fill="#fff" stroke="#242323" strokeWidth="2.5" />
      <path d="M24 26h72" stroke="#242323" strokeWidth="2.5" />
      <circle cx="34" cy="20" r="2" fill="#FDDB51" />
      <circle cx="42" cy="20" r="2" fill="#FDDB51" />
      <rect x="34" y="38" width="34" height="5" rx="2.5" fill="#242323" />
      <rect x="34" y="50" width="52" height="4" rx="2" fill="#CCCCCC" />
      <rect x="34" y="60" width="52" height="4" rx="2" fill="#CCCCCC" />
      <rect x="34" y="70" width="40" height="4" rx="2" fill="#CCCCCC" />
      <circle cx="86" cy="88" r="16" fill="#FDDB51" />
      <path d="M79 88l5 5 9-10" stroke="#242323" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Facturacion() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      {/* Encabezado */}
      <div className="flex items-center gap-4">
        <InvoiceIllustration className="hidden h-28 w-28 shrink-0 md:block" />
        <InvoiceIllustration className="h-12 w-12 shrink-0 md:hidden" />
        <div>
          <h1 className="font-serif text-4xl text-neutral-900">Solicita tu factura</h1>
          <p className="mt-2 max-w-xl text-neutral-600">
            Genera tu factura fiscal (CFDI) de tu estancia con Maia Home. Llena el formulario y la
            recibirás por correo.
          </p>
        </div>
      </div>

      {/* Casos */}
      <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
        {CASES.map((c) => (
          <div key={c.t} className="rounded-xl border border-neutral-200 p-4">
            <p className="text-sm font-semibold text-neutral-900">{c.t}</p>
            <p className="mt-1 text-sm text-neutral-600">{c.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        {/* Formulario Zoho */}
        <div className="order-2 lg:order-1">
          <h2 className="mb-3 font-serif text-2xl text-neutral-900">Formulario de facturación</h2>
          <div className="overflow-hidden rounded-2xl border border-neutral-200">
            <iframe
              title="Formulario de facturación Maia Home"
              src="https://zfrmz.com/gmPyMEhv7MaLZFgTj6UR"
              className="h-[900px] w-full"
            />
          </div>
        </div>

        {/* Lateral */}
        <aside className="order-1 space-y-6 lg:order-2">
          <div className="rounded-2xl bg-neutral-50 p-5">
            <h3 className="font-semibold text-neutral-900">Ten a la mano</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              {HAVE_READY.map((h) => (
                <li key={h} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-maia-strong" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            <p className="font-semibold">Plazo</p>
            <p className="mt-1">
              Solicita tu factura dentro del <b>mes en curso</b> de tu pago. Emitimos en un plazo de
              <b> 1 a 3 días hábiles</b>.
            </p>
          </div>
        </aside>
      </div>

      {/* FAQ */}
      <div className="mt-14">
        <h2 className="font-serif text-2xl text-neutral-900">Preguntas frecuentes</h2>
        <div className="mt-4 space-y-3">
          <details className="rounded-xl border border-neutral-200 p-4">
            <summary className="cursor-pointer font-medium text-neutral-900">
              ¿Puedo facturar de un mes anterior?
            </summary>
            <p className="mt-2 text-sm text-neutral-600">
              Por disposición fiscal, la factura debe emitirse en el mismo mes del pago. Escríbenos
              lo antes posible si tienes dudas.
            </p>
          </details>
          <details className="rounded-xl border border-neutral-200 p-4">
            <summary className="cursor-pointer font-medium text-neutral-900">
              Reservé por Airbnb, ¿me facturan ustedes?
            </summary>
            <p className="mt-2 text-sm text-neutral-600">
              Sí. Aunque hayas reservado por Airbnb, Booking o Vrbo, nosotros emitimos tu factura
              fiscal (CFDI). Llena el formulario con tus datos fiscales y adjunta el comprobante de tu
              reserva o pago.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
