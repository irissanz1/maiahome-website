import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Aviso de Privacidad",
  description:
    "Aviso de Privacidad Integral de Maia Luxury Apartments and Services Mexico, SA de CV (MaiaHome).",
  alternates: { canonical: "/aviso-privacidad" },
};

export default function AvisoPrivacidad() {
  return (
    <LegalPage title="Aviso de Privacidad" updated="2 de septiembre de 2026">
      <div className="mb-8 rounded-xl border border-maia-strong/40 bg-[#FDF9EC] p-4 text-sm text-neutral-700">
        <p className="font-semibold text-neutral-900">En pocas palabras</p>
        <p className="mt-1">
          Cuidamos tus datos: solo pedimos lo necesario para atenderte, no los vendemos, y puedes
          acceder, corregir o borrar tu información cuando quieras escribiendo a{" "}
          <a href="mailto:privacidad@maiahome.mx">privacidad@maiahome.mx</a>.
        </p>
      </div>
      <h2>Aviso de Privacidad Integral</h2>
      <p>
        En Maia Luxury Apartments and services Mexico, SA de CV (“MaiaHome”), con domicilio en Jorge
        Bernard Shaw 34-101, Col. Polanco, Miguel Hidalgo, C.P. 11530, somos responsables del
        tratamiento y protección de tus datos personales conforme a la Ley Federal de Protección de
        Datos Personales en Posesión de los Particulares (LFPDPPP), su Reglamento y demás normativa
        aplicable.
      </p>

      <h2>1. Datos personales que recabamos</h2>
      <h3>En nuestra red WiFi</h3>
      <p>
        Al registrarte en nuestra red WiFi recabamos: nombre, número de teléfono y correo
        electrónico. Por motivos técnicos y de seguridad, el sistema también puede registrar la
        dirección MAC de tu dispositivo y la fecha y hora de conexión.
      </p>
      <h3>En el sitio web (maiahome.mx) y al contactarnos</h3>
      <p>
        Cuando usas nuestro sitio, llenas un formulario (por ejemplo, el de administración de
        propiedades), nos escribes por WhatsApp o correo, o inicias una reserva, podemos recabar:
        nombre, correo electrónico, teléfono, los datos de tu propiedad o solicitud, y las fechas y
        detalles de tu reserva. Además, por medios automáticos, podemos recabar datos de navegación
        (páginas vistas, tipo de dispositivo y dirección IP aproximada) mediante cookies y tecnologías
        de medición (ver la sección 5).
      </p>
      <p>No recabamos datos personales sensibles.</p>

      <h2>2. Finalidades primarias (necesarias)</h2>
      <p>
        Estas finalidades son necesarias para brindarte el servicio y no requieren tu consentimiento
        adicional:
      </p>
      <ul>
        <li>Proporcionar y administrar el acceso a la red WiFi del inmueble.</li>
        <li>Verificar tu acceso mediante el envío de un código a tu correo.</li>
        <li>Garantizar la seguridad y el buen funcionamiento de la red.</li>
        <li>Atender solicitudes de soporte durante tu estancia.</li>
        <li>Gestionar y dar seguimiento a tus solicitudes de contacto y de administración de propiedades.</li>
        <li>Procesar y administrar tus reservas y tu estancia.</li>
        <li>Cumplir con las obligaciones legales aplicables.</li>
      </ul>

      <h2>3. Finalidades secundarias (requieren tu consentimiento)</h2>
      <p>
        Solo si otorgas tu consentimiento marcando la casilla correspondiente en el formulario,
        trataremos tus datos para:
      </p>
      <ul>
        <li>Enviarte la guía de la zona, recomendaciones locales y contenido de bienvenida.</li>
        <li>Enviarte promociones, ofertas de reserva directa y comunicaciones de fidelización.</li>
        <li>Realizar encuestas de satisfacción y solicitarte reseñas.</li>
      </ul>
      <p>
        Negarte a las finalidades secundarias no afecta tu acceso a internet ni la calidad del
        servicio. Puedes retirar tu consentimiento en cualquier momento (ver la sección de Derechos
        ARCO).
      </p>

      <h2>4. Transferencias y encargados</h2>
      <p>
        Para operar el sitio, las reservas y la comunicación contigo nos apoyamos en proveedores que
        actúan como encargados y tratan los datos únicamente por cuenta de MaiaHome y conforme a este
        aviso, entre ellos: <strong>Beds24</strong> (motor de disponibilidad, reservas y cobro), el
        procesador de pagos correspondiente, <strong>Google</strong> (analítica),{" "}
        <strong>Meta/WhatsApp</strong> (contacto y medición) y nuestra plataforma de CRM y correo. No
        transferimos tus datos a terceros para sus propios fines sin tu consentimiento, salvo las
        excepciones previstas por la ley.
      </p>

      <h2>5. Cookies y tecnologías de medición</h2>
      <p>
        El sitio utiliza cookies necesarias para su funcionamiento y para gestionar tu sesión.
        Asimismo, podemos utilizar herramientas de analítica y marketing —como Google Analytics y
        Meta (Pixel)— para medir el uso del sitio y mostrar publicidad relevante; estas pueden
        recopilar identificadores de dispositivo y actividad de navegación. Puedes desactivarlas desde
        la configuración de tu navegador o con complementos de exclusión (por ejemplo, el de Google
        Analytics). Rechazarlas no afecta tu capacidad de reservar.
      </p>

      <h2>6. Medios para limitar el uso o divulgación de tus datos</h2>
      <p>
        Puedes limitar el uso o divulgación de tus datos negándote a las finalidades secundarias
        (dejando sin marcar la casilla de consentimiento) o escribiendo a{" "}
        <a href="mailto:privacidad@maiahome.mx">privacidad@maiahome.mx</a>.
      </p>

      <h2>7. Derechos ARCO y revocación del consentimiento</h2>
      <p>
        Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte (derechos ARCO) al tratamiento de
        tus datos, así como a revocar tu consentimiento o limitar su uso y divulgación. Para
        ejercerlos, envía tu solicitud a{" "}
        <a href="mailto:privacidad@maiahome.mx">privacidad@maiahome.mx</a> indicando tu nombre, el
        derecho que deseas ejercer y un medio de contacto. Responderemos en los plazos que marca la
        LFPDPPP.
      </p>
      <p>
        También puedes darte de baja de nuestras comunicaciones de marketing en cualquier momento con
        el enlace de cancelación incluido en cada correo.
      </p>

      <h2>8. Cambios al aviso de privacidad</h2>
      <p>
        Cualquier modificación a este aviso se publicará en esta misma página. Te recomendamos
        consultarla periódicamente.
      </p>
    </LegalPage>
  );
}
