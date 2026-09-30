import Link from "next/link";

// Preguntas de ANTES de reservar: resuelven la objeción que frena la reserva
// directa. Las operativas (horarios, wifi, limpieza) viven en /preguntas-frecuentes,
// que es la página que debe posicionar; aquí no se repite su marcado.
type QA = { q: string; a: React.ReactNode };

const ES: QA[] = [
  {
    q: "¿Conviene reservar directo en vez de una plataforma?",
    a: (
      <>
        Sí. La tarifa que ves aquí ya incluye el descuento por número de noches y no lleva comisión
        de intermediario. Además tratas directo con nosotros para cualquier ajuste de tu estancia.
      </>
    ),
  },
  {
    q: "¿Emiten factura fiscal (CFDI)?",
    a: (
      <>
        Sí, a personas físicas y morales, incluso extranjeras. La emitimos unas 48 horas después de
        confirmar el pago; los datos y el formato están en{" "}
        <Link href="/facturacion" className="font-semibold text-neutral-900 underline underline-offset-2">Facturación</Link>.
      </>
    ),
  },
  {
    q: "¿Puedo quedarme un mes o más?",
    a: (
      <>
        Sí. Varios departamentos tienen tarifa mensual, pensada para estancias de trabajo o
        mudanzas. Puedes verlos en{" "}
        <Link href="/mensuales" className="font-semibold text-neutral-900 underline underline-offset-2">Estancias mensuales</Link>.
      </>
    ),
  },
  {
    q: "¿Es un departamento completo o comparto el espacio?",
    a: (
      <>
        Completo. Cada reserva es de un departamento entero, con cocina, baño propio y wifi de alta
        velocidad. No compartes con nadie.
      </>
    ),
  },
  {
    q: "¿Aceptan mascotas?",
    a: (
      <>
        Sí, en la mayoría de los departamentos. Aplica un cargo único por estancia, de 30 a 60 USD
        según la unidad, para hasta dos mascotas. Solo te pedimos declararla al reservar.
      </>
    ),
  },
  {
    q: "¿Cómo se paga?",
    a: (
      <>
        Con tarjeta Visa, Mastercard o American Express mediante una liga de pago segura de Stripe, o
        por transferencia bancaria. Los detalles están en{" "}
        <Link href="/formas-de-pago" className="font-semibold text-neutral-900 underline underline-offset-2">Formas de pago</Link>.
      </>
    ),
  },
];

const EN: QA[] = [
  {
    q: "Is it better to book direct than through a platform?",
    a: (
      <>
        Yes. The rate you see here already includes the length-of-stay discount and carries no
        intermediary fees. You also deal with us directly for anything you need during your stay.
      </>
    ),
  },
  {
    q: "Do you issue a Mexican tax invoice (CFDI)?",
    a: (
      <>
        Yes, for individuals and companies, including foreign ones. We issue it about 48 hours after
        payment is confirmed; the details and the request form are on{" "}
        <Link href="/en/invoicing" className="font-semibold text-neutral-900 underline underline-offset-2">Invoicing</Link>.
      </>
    ),
  },
  {
    q: "Can I stay a month or longer?",
    a: (
      <>
        Yes. Several apartments have a monthly rate, meant for work stays or relocations. You'll find
        them under{" "}
        <Link href="/en/monthly-stays" className="font-semibold text-neutral-900 underline underline-offset-2">Monthly stays</Link>.
      </>
    ),
  },
  {
    q: "Is it a whole apartment or do I share the space?",
    a: (
      <>
        The whole apartment. Every booking is an entire unit, with its own kitchen, bathroom and
        high-speed Wi-Fi. You don't share with anyone.
      </>
    ),
  },
  {
    q: "Are pets allowed?",
    a: (
      <>
        Yes, in most apartments. A single per-stay fee applies, from 30 to 60 USD depending on the
        unit, for up to two pets. We just ask that you declare it when booking.
      </>
    ),
  },
  {
    q: "How do I pay?",
    a: (
      <>
        By Visa, Mastercard or American Express through a secure Stripe payment link, or by bank
        transfer. The details are on{" "}
        <Link href="/en/payment-options" className="font-semibold text-neutral-900 underline underline-offset-2">Payment options</Link>.
      </>
    ),
  },
];

export default function HomeFaq({ lang = "es" }: { lang?: "es" | "en" }) {
  const en = lang === "en";
  const items = en ? EN : ES;
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <h2 className="font-serif text-3xl text-neutral-900 md:text-4xl">
        {en ? "Before you book" : "Antes de reservar"}
      </h2>
      <p className="mt-2 max-w-2xl text-neutral-600">
        {en
          ? "The questions we get most often from guests booking with us for the first time."
          : "Las dudas más frecuentes de quienes reservan con nosotros por primera vez."}
      </p>
      {/* <details> nativo: el texto queda en el HTML aunque esté plegado, así que
          sigue sirviendo para buscadores y para quien navega sin JavaScript. */}
      <div className="mt-8 max-w-3xl divide-y divide-neutral-200 border-y border-neutral-200">
        {items.map((it) => (
          <details key={it.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-neutral-900">
              {it.q}
              <span className="shrink-0 text-xl leading-none text-maia-strong transition group-open:rotate-45">＋</span>
            </summary>
            <p className="mt-2 max-w-2xl leading-relaxed text-neutral-600">{it.a}</p>
          </details>
        ))}
      </div>
      <Link
        href={en ? "/en/faq" : "/preguntas-frecuentes"}
        className="mt-8 inline-block rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-800 transition hover:bg-[#FBF7EC]"
      >
        {en ? "See all questions →" : "Ver todas las preguntas →"}
      </Link>
    </section>
  );
}
