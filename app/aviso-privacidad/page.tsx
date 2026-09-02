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
    <LegalPage title="Aviso de Privacidad" updated="7 de julio de 2026">
      <h2>Aviso de Privacidad Integral</h2>
      <p>
        En Maia Luxury Apartments and services Mexico, SA de CV (“MaiaHome”), con domicilio en Jorge
        Bernard Shaw 34-101, Col. Polanco, Miguel Hidalgo, C.P. 11530, somos responsables del
        tratamiento y protección de tus datos personales conforme a la Ley Federal de Protección de
        Datos Personales en Posesión de los Particulares (LFPDPPP), su Reglamento y demás normativa
        aplicable.
      </p>

      <h2>1. Datos personales que recabamos</h2>
      <p>
        Recabamos únicamente los datos que nos proporcionas al registrarte en nuestra red WiFi:
        nombre, número de teléfono y correo electrónico. Por motivos técnicos y de seguridad, el
        sistema también puede registrar la dirección MAC de tu dispositivo y la fecha y hora de
        conexión. No recabamos datos personales sensibles.
      </p>

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
        Para operar estos servicios podemos apoyarnos en proveedores que actúan como encargados (por
        ejemplo, nuestra plataforma de CRM y correo), quienes tratan los datos únicamente por cuenta
        de MaiaHome y conforme a este aviso. No transferimos tus datos a terceros para sus propios
        fines sin tu consentimiento, salvo las excepciones previstas por la ley.
      </p>

      <h2>5. Cookies y tecnologías de sesión</h2>
      <p>
        Nuestro portal utiliza cookies de sesión estrictamente necesarias para gestionar tu proceso
        de conexión. No se utilizan para publicidad ni para seguimiento de terceros.
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
