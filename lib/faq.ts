// Preguntas frecuentes públicas (guest-facing) para /preguntas-frecuentes y /en/faq.
// Curadas del FAQ interno v56: solo contenido para huéspedes, reescrito para el
// sitio de reserva DIRECTA (sin protocolos internos ni lenguaje específico de
// Airbnb) y sin precios por unidad (varían; se confirman al reservar).
export type FaqItem = { q: { es: string; en: string }; a: { es: string; en: string } };
export type FaqGroup = { cat: { es: string; en: string }; items: FaqItem[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    cat: { es: "Llegada y salida", en: "Arrival & departure" },
    items: [
      {
        q: { es: "¿A qué hora es el check-in y el check-out?", en: "What are the check-in and check-out times?" },
        a: {
          es: "En CDMX el check-in es a partir de las 15:00 y el check-out a las 12:00. En Houston el check-in es a partir de las 15:30 y el check-out a las 10:00. Si necesitas un horario flexible, avísanos con anticipación y con gusto lo revisamos según disponibilidad.",
          en: "In Mexico City check-in is from 3:00 PM and check-out is at 12:00 PM. In Houston check-in is from 3:30 PM and check-out is at 10:00 AM. If you need flexible timing, let us know in advance and we'll gladly check availability.",
        },
      },
      {
        q: { es: "¿El check-in es autónomo?", en: "Is check-in self-service?" },
        a: {
          es: "Sí. El acceso es autónomo: te enviamos por WhatsApp y correo la dirección exacta, los códigos y las instrucciones para entrar, sin filas ni entrega de llaves en persona. En algunos edificios el único contacto es el guardia de caseta, solo para registrar el vehículo.",
          en: "Yes. Access is self-service: we send you the exact address, codes and entry instructions by WhatsApp and email — no lines and no in-person key handover. In some buildings the only contact is the gate guard, just to register your vehicle.",
        },
      },
      {
        q: { es: "¿Puedo guardar el equipaje antes del check-in o después del check-out?", en: "Can I store luggage before check-in or after check-out?" },
        a: {
          es: "Sí, sin costo: antes del check-in generalmente desde las 12:00 si el departamento ya está listo, y después del check-out hasta cerca de las 14:00–14:30. No ofrecemos resguardo de equipaje por varios días; para eso te sugerimos lockers externos.",
          en: "Yes, free of charge: before check-in usually from 12:00 PM if the apartment is ready, and after check-out until around 2:00–2:30 PM. We don't offer multi-day luggage storage; for that we suggest external lockers.",
        },
      },
      {
        q: { es: "¿Qué hago si tengo problemas con el acceso?", en: "What if I have trouble getting in?" },
        a: {
          es: "Tienes un video que muestra el acceso paso a paso. Si la cerradura se bloquea tras varios intentos con código incorrecto, espera 3 minutos y vuelve a ingresar el código correcto. Ante cualquier duda, escríbenos por WhatsApp y te asistimos al momento.",
          en: "You'll have a video showing step-by-step access. If the lock blocks after several failed code attempts, wait 3 minutes and enter the correct code again. If you have any trouble, message us on WhatsApp and we'll help right away.",
        },
      },
    ],
  },
  {
    cat: { es: "Durante tu estancia", en: "During your stay" },
    items: [
      {
        q: { es: "¿El agua es potable?", en: "Is the water drinkable?" },
        a: {
          es: "El agua es potable en todas las propiedades. Para beber, te recomendamos usar el agua del filtro que encontrarás en la cocina.",
          en: "The water is potable in all properties. For drinking, we recommend using the filtered water you'll find in the kitchen.",
        },
      },
      {
        q: { es: "¿Incluye desayuno?", en: "Is breakfast included?" },
        a: {
          es: "Ofrecemos un kit de bienvenida (cereal, leche, jugo y agua) solo el primer día de tu estancia. No es un desayuno diario.",
          en: "We offer a welcome kit (cereal, milk, juice and water) on your first day only. It is not a daily breakfast.",
        },
      },
      {
        q: { es: "¿Incluye toallas y amenidades de baño?", en: "Are towels and bathroom amenities included?" },
        a: {
          es: "Sí. Las toallas y amenidades de baño están incluidas para todos los huéspedes registrados en tu reserva, y las camas se preparan antes de tu llegada.",
          en: "Yes. Towels and bathroom amenities are included for all guests registered in your booking, and the beds are freshly made before you arrive.",
        },
      },
      {
        q: { es: "¿Hay cuna disponible?", en: "Is a crib available?" },
        a: {
          es: "Sí, contamos con cuna sujeta a disponibilidad. Solicítala con anticipación para asegurarla para tu estancia.",
          en: "Yes, we have a crib subject to availability. Please request it in advance to secure it for your stay.",
        },
      },
      {
        q: { es: "¿Hay Wi-Fi y estacionamiento?", en: "Is there Wi-Fi and parking?" },
        a: {
          es: "Todas las unidades cuentan con Wi-Fi de alta velocidad. La mayoría tiene lugar de estacionamiento; avísanos con anticipación para hacer los trámites de acceso correspondientes.",
          en: "Every unit has high-speed Wi-Fi. Most have a parking space; let us know in advance so we can arrange access.",
        },
      },
      {
        q: { es: "¿Con qué frecuencia hay servicio de limpieza?", en: "How often is there cleaning service?" },
        a: {
          es: "En estancias de más de 4 días incluimos una limpieza de cortesía, agendable de lunes a sábado por la mañana (incluye camas, baños, cocina, pisos y basura). El cambio de blancos o una limpieza extra están disponibles bajo petición con costo adicional. Si tu estancia es menor a 7 días, puedes pedir que nadie entre durante tu estancia.",
          en: "For stays longer than 4 days we include a complimentary cleaning, schedulable Monday to Saturday in the morning (beds, bathrooms, kitchen, floors and trash). Linen changes or extra cleaning are available on request for an additional fee. For stays shorter than 7 days, you can ask that no one enters during your stay.",
        },
      },
    ],
  },
  {
    cat: { es: "Reglas de la casa", en: "House rules" },
    items: [
      {
        q: { es: "¿Aceptan mascotas?", en: "Are pets allowed?" },
        a: {
          es: "Sí, somos pet friendly. Aplica un cargo único por estancia (no por noche), con un máximo de 1 mascota por reserva; el monto se confirma al reservar según la propiedad. Toda mascota debe declararse y aprobarse antes de tu llegada.",
          en: "Yes, we're pet-friendly. A single per-stay fee applies (not per night), with a maximum of 1 pet per booking; the amount is confirmed at booking depending on the property. Every pet must be declared and approved before arrival.",
        },
      },
      {
        q: { es: "¿Se puede fumar?", en: "Is smoking allowed?" },
        a: {
          es: "No. Todas nuestras instalaciones son libres de humo.",
          en: "No. All our properties are smoke-free.",
        },
      },
      {
        q: { es: "¿Se permiten fiestas o eventos?", en: "Are parties or events allowed?" },
        a: {
          es: "No se permiten fiestas ni eventos. Solo pueden hospedarse las personas registradas en la reserva.",
          en: "Parties and events are not allowed. Only the guests registered in the booking may stay.",
        },
      },
      {
        q: { es: "¿Necesito registrar a todos los huéspedes?", en: "Do I need to register all guests?" },
        a: {
          es: "Sí. En nuestras propiedades de CDMX es obligatorio registrar la identificación de todos los huéspedes, incluidos los menores, como parte de nuestros protocolos de seguridad y del cumplimiento de la normativa aplicable en México para prevenir la trata de personas. Puedes cubrir los datos que consideres sensibles, siempre que se lean el nombre y la fotografía. En Houston es también un requisito normativo a partir de enero de 2026. Tus datos se tratan de forma confidencial y se usan solo para tu estancia.",
          en: "Yes. At our Mexico City properties it is mandatory to register the ID of all guests, including minors, as part of our security measures and compliance with Mexican regulations to prevent human trafficking. You may cover any sensitive details as long as the name and photo remain legible. In Houston it is also a regulatory requirement starting January 2026. Your information is handled confidentially and used only for your stay.",
        },
      },
      {
        q: { es: "¿Cuántas personas pueden hospedarse?", en: "How many people can stay?" },
        a: {
          es: "El número de huéspedes registrados en tu reserva, que es el máximo permitido para esa unidad. Los huéspedes adicionales que duerman en sofá cama pueden tener un cargo extra por la ropa de cama adicional.",
          en: "The number of guests registered in your booking, which is the maximum allowed for that unit. Additional guests sleeping on a sofa bed may incur an extra charge for the additional linens.",
        },
      },
    ],
  },
  {
    cat: { es: "Pagos y facturación", en: "Payments & invoicing" },
    items: [
      {
        q: { es: "¿Qué formas de pago aceptan?", en: "What payment methods do you accept?" },
        a: {
          es: "Aceptamos tarjeta bancaria (Visa, Mastercard y American Express) mediante una liga de pago segura con Stripe, y transferencia bancaria. Al reservar directo con Maia Home obtienes la mejor tarifa, sin comisiones de intermediarios.",
          en: "We accept credit/debit cards (Visa, Mastercard and American Express) through a secure Stripe payment link, and bank transfer. Booking directly with Maia Home gives you the best rate, with no intermediary fees.",
        },
      },
      {
        q: { es: "¿Emiten factura (CFDI)?", en: "Do you issue a Mexican tax invoice (CFDI)?" },
        a: {
          es: "Sí. Emitimos factura fiscal (CFDI) a personas físicas y morales, incluso extranjeras. Encuentra los datos y el formato de solicitud en maiahome.mx/facturacion; la factura se emite en aproximadamente 48 horas tras confirmar el pago.",
          en: "Yes. We issue a Mexican tax invoice (CFDI) to individuals and companies, including foreign ones. Find the details and request form at maiahome.mx/facturacion; the invoice is issued within about 48 hours of confirming payment.",
        },
      },
      {
        q: { es: "¿Hay descuento por estancia larga?", en: "Is there a discount for long stays?" },
        a: {
          es: "La tarifa publicada ya incluye el descuento por estancia: entre más noches reserves, mejor es la tarifa por noche. Consulta también nuestras estancias mensuales.",
          en: "The published rate already includes the length-of-stay discount: the more nights you book, the better the nightly rate. Check out our monthly stays as well.",
        },
      },
    ],
  },
];

// Lista plana para el schema FAQPage.
export const FAQ_FLAT: FaqItem[] = FAQ_GROUPS.flatMap((g) => g.items);
