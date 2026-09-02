import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Acuerdo de Estadía",
  description:
    "Acuerdo de Estancia de Maia Home: términos bajo los cuales se proporciona alojamiento temporal al huésped.",
  alternates: { canonical: "/stay-agreement" },
};

export default function StayAgreement() {
  return (
    <LegalPage title="Acuerdo de Estadía" updated="2 de septiembre de 2026">
      <div className="mb-8 rounded-xl border border-maia-strong/40 bg-[#FDF9EC] p-4 text-sm text-neutral-700">
        <p className="font-semibold text-neutral-900">En pocas palabras</p>
        <p className="mt-1">
          Lo esencial para una gran estancia: solo se hospedan las personas registradas, nada de
          fiestas, silencio de 10 p. m. a 8 a. m., no fumar y cuida el departamento. Cualquier duda,
          escríbenos: estamos para ayudarte.
        </p>
      </div>
      <p>
        El presente Acuerdo de Estancia establece los términos bajo los cuales MaiaHome (el
        “Anfitrión”) proporciona alojamiento temporal al huésped registrado (el “Huésped”).
      </p>
      <p>
        Al completar el formulario de check-in y acceder a la propiedad, el Huésped acepta lo
        siguiente:
      </p>

      <h2>1. Reserva y Ocupación</h2>
      <ul>
        <li>
          La propiedad solo podrá ser ocupada por los huéspedes registrados en la reservación y en el
          formulario de check-in.
        </li>
        <li>No se deberá exceder la capacidad máxima indicada en el anuncio.</li>
        <li>
          La presencia de huéspedes no autorizados podrá resultar en la cancelación inmediata de la
          estancia sin reembolso.
        </li>
      </ul>

      <h2>2. Uso de la Propiedad</h2>
      <ul>
        <li>La propiedad se proporciona exclusivamente para alojamiento residencial temporal.</li>
        <li>
          No se permiten fiestas, eventos ni actividades comerciales sin autorización previa por
          escrito.
        </li>
        <li>
          El Huésped se compromete a cumplir con los reglamentos del edificio (cuando aplique) y con
          las normas de convivencia locales.
        </li>
      </ul>

      <h2>3. Horarios de Silencio y Ruido</h2>
      <ul>
        <li>El horario de silencio es de 10:00 PM a 8:00 AM.</li>
        <li>
          El ruido excesivo durante este horario podrá generar penalidades conforme a lo indicado en
          el anuncio y podrá resultar en la terminación anticipada de la estancia.
        </li>
        <li>
          En caso de existir dispositivos de monitoreo de ruido, estos únicamente miden niveles de
          decibeles y no graban audio.
        </li>
      </ul>

      <h2>4. Política de No Fumar</h2>
      <ul>
        <li>Está estrictamente prohibido fumar dentro de la propiedad y en áreas no designadas.</li>
        <li>El incumplimiento podrá generar cargos adicionales por limpieza especializada.</li>
      </ul>

      <h2>5. Daños y Responsabilidad</h2>
      <ul>
        <li>
          El Huésped es responsable de mantener la propiedad en buen estado durante su estancia.
        </li>
        <li>
          Cualquier daño que exceda el desgaste normal podrá generar cargos por reparación o
          reposición.
        </li>
        <li>
          El Huésped es responsable del cuidado de sus pertenencias personales en todo momento.
        </li>
      </ul>

      <h2>6. Verificación de Identidad y Acceso</h2>
      <ul>
        <li>
          En propiedades con auto check-in, se requiere verificación de identidad antes de la
          llegada.
        </li>
        <li>
          En ciertos edificios, la administración puede requerir identificación de los huéspedes para
          autorizar el acceso.
        </li>
        <li>
          Los códigos de acceso estarán activos únicamente durante las fechas confirmadas de la
          reservación.
        </li>
      </ul>

      <h2>7. Cumplimiento con la Plataforma de Reserva</h2>
      <ul>
        <li>
          Este Acuerdo complementa, pero no reemplaza, las políticas y términos de la plataforma de
          reservación (Airbnb, Booking.com, etc.).
        </li>
        <li>
          En caso de conflicto, prevalecerán los términos y procedimientos de la plataforma
          utilizada.
        </li>
        <li>
          Cuando reserves <strong>directamente con Maia Home</strong> (sin plataforma), aplican estos
          términos junto con la política de cancelación de Maia Home vigente para tu reserva.
        </li>
      </ul>

      <h2>8. Terminación Anticipada</h2>
      <p>El Anfitrión podrá dar por terminada la estancia sin reembolso en caso de:</p>
      <ul>
        <li>Violación grave de las reglas de la casa</li>
        <li>Actividades ilegales</li>
        <li>Conductas que pongan en riesgo la seguridad</li>
        <li>Disturbios excesivos que afecten a vecinos</li>
      </ul>

      <h2>9. Limitación de Responsabilidad</h2>
      <p>
        El Anfitrión no será responsable por accidentes, lesiones o pérdidas de pertenencias
        personales ocurridas durante la estancia, salvo en los casos previstos por la ley aplicable.
      </p>

      <h2>10. Cumplimiento Legal</h2>
      <p>
        El Huésped se compromete a cumplir con todas las leyes y reglamentos locales aplicables
        durante su estancia.
      </p>

      <p className="mt-6 font-medium text-neutral-800">
        Al proceder con el check-in y acceder a la propiedad, el Huésped reconoce haber leído y
        aceptado el presente Acuerdo de Estancia.
      </p>
    </LegalPage>
  );
}
