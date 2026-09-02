import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y Condiciones de Servicio de hospedaje de Maia Home: condiciones generales de la prestación del servicio.",
  alternates: { canonical: "/terminos-y-condiciones" },
};

export default function TerminosCondiciones() {
  return (
    <LegalPage title="Términos y Condiciones de Servicio" updated="13 de junio de 2022">
      <div className="mb-8 rounded-xl border border-maia-strong/40 bg-[#FDF9EC] p-4 text-sm text-neutral-700">
        <p className="font-semibold text-neutral-900">En pocas palabras</p>
        <p className="mt-1">
          Reserva de buena fe y cuida el espacio como si fuera tuyo. Lo esencial: el pago va por
          adelantado; respeta el número de huéspedes acordado; nada de fiestas, no fumar y silencio de
          10 p. m. a 8 a. m.; entrega el departamento como lo recibiste y avísanos de cualquier
          desperfecto. El texto de abajo es el contrato formal de hospedaje.
        </p>
      </div>
      <h3>Acerca de los Términos y Condiciones del Servicio</h3>
      <p>
        Los términos y condiciones de servicio son parte del contrato de prestación de servicios de
        Maia Home y contienen los términos y condiciones generales bajo los cuales la empresa se
        compromete a la prestación del servicio.
      </p>

      <h2>1. Condiciones para el servicio</h2>
      <p>
        “EL HOSPEDANTE” da en hospedaje a “EL HUESPED” “EL INMUEBLE” y éste toma en dicha calidad el
        inmueble que se describe en la ficha de registro.
      </p>
      <p>
        Las partes convienen voluntariamente y de común acuerdo que “EL HUESPED” pagará a “EL
        HOSPEDANTE” o a quien sus derechos representen, la retribución estipulada por concepto de
        contraprestación de servicio de hospedaje, que se estipula por el alojamiento en la ficha de
        registro.
      </p>
      <p>
        El pago del hospedaje será por adelantado y debe cubrir íntegra la cantidad correspondiente,
        aun cuando no usare “EL INMUEBLE” el tiempo completo.
      </p>
      <p>
        El importe se cubrirá en el portal digital de la aplicación de hospedaje de AIRBNB,
        BOOKING.COM entre otras, o bien en el domicilio de “EL INMUEBLE” o en la cuenta bancaria y
        empezará a cubrirse a partir de la fecha de inicio de la vigencia del contrato, siendo causa
        de rescisión de contrato el hecho de que se cubra extemporáneamente el pago, o de que éste no
        sea cubierto en su totalidad, en cuyo caso “EL HUESPED”, de conformidad con lo dispuesto por
        el artículo 2669 del Código Civil para la Ciudad de México, acepta que se le retengan en
        garantía de pago, equipajes, bienes muebles y cualquier objeto de los que introduzca en la
        localidad prestada en servicio de hospedaje y que declara desde hoy que son de su exclusiva
        propiedad. EL HUESPED acepta expresamente que la suma líquida de dinero que conste en la
        factura, tendrá el carácter de ejecutiva.
      </p>

      <h2>2. Servicios</h2>
      <p>
        “EL HOSPEDANTE” se obliga a cubrir los servicios de energía eléctrica, internet, gas, cable y
        luz, NO así el de alimentación, productos de lavado de ropa, así como productos de limpieza
        en general.
      </p>
      <p>
        “EL HOSPEDANTE” se obliga a entregar el inmueble con insumos de cortesía como: jabón de
        manos, papel higiénico, jabón de trastes y papel toalla en la cocina, si durante la vigencia
        de la estancia “EL HUESPED” termina con esos insumos será responsabilidad de “EL HUESPED”
        reabastecer los que requiera para su uso durante la estancia.
      </p>
      <p>
        “EL INMUEBLE” cuenta con bienes muebles suficientes para el funcionamiento y goce del mismo,
        si “EL HUESPED” requiere algún bien mueble adicional con el que no cuenta “EL INMUEBLE” tendrá
        que solicitarlo por escrito o vía telefónica, quedando al libre arbitrio de “EL HOSPEDANTE”
        la aceptación de dicha petición, además que tendrá un costo extra al pago del servicio que
        “EL HUESPED” tendrá que cubrir.
      </p>

      <h2>3. Personas adicionales</h2>
      <p>
        EL “HUESPED” en ningún caso podrá exceder el número máximo de huéspedes ya señalados y
        acordados en el Anexo 1 para uso del “INMUEBLE”. El “HUESPED” tendrá que informar el número de
        personas que se hospedarán en el “INMUEBLE”, así como de proveer copia de su identificación
        oficial como se indica en la cláusula II del presente instrumento jurídico. En caso de que
        “EL HUESPED” desee extender el servicio de hospedaje para personas adicionales NO pactadas en
        el siguiente instrumento jurídico, se obliga a notificar a “EL HOSPEDANTE” por escrito o bien
        vía telefónica, informando el número de personas adicionales y el tiempo de estancia de las
        mismas, quedando al libre arbitrio de “EL HOSPEDANTE” la aceptación de dicha petición. “El
        HOSPEDANTE” contestará por escrito si acepta o deniega dicha solicitud.
      </p>

      <h2>4. Obligaciones</h2>
      <p>“EL HUESPED”, además, se obliga:</p>
      <ul>
        <li>I. A no fumar dentro del departamento en ninguna de las áreas y áreas comunes del edificio.</li>
        <li>
          II. A servirse del apartamento dado en hospedaje sólo para alojamiento habitacional temporal
          por la vigencia que se señala en el presente instrumento jurídico;
        </li>
        <li>
          III. A no conceder el uso del mismo, en todo o parte, a otra u otras personas ajenas por las
          cuales se contrata el servicio de hospedaje.
        </li>
        <li>
          IV. A no hacer cambios en el mismo sin el consentimiento, previo y por escrito, de “EL
          HOSPEDANTE”.
        </li>
        <li>
          V. A dar aviso a “EL HOSPEDANTE” de toda novedad perjudicial para el apartamento, así como
          de las goteras y deterioros del mismo, siendo responsable de los daños y perjuicios que su
          omisión cause;
        </li>
        <li>
          VI. A conservar el apartamento en el buen estado en que lo recibió, y a devolverlo en ese
          mismo estado al terminar el contrato;
        </li>
        <li>VII. A no ingresar visitas a “EL INMUEBLE”.</li>
        <li>
          VIII. A desocupar “EL INMUEBLE” a más tardar el día de vencimiento del presente contrato en
          el horario prefijado de checkout.
        </li>
        <li>
          X. Respetar el reglamento que se adjunta como ANEXO 2 así como las restricciones o
          prohibiciones del edificio donde se ubica “EL INMUEBLE” así como a pagar las penalizaciones
          que el edificio imponga en caso de incumplimiento.
        </li>
        <li>
          XI. A hacer cumplimiento con todas las obligaciones que el Código Civil del Distrito Federal
          ahora Ciudad de México impone a los huéspedes.
        </li>
        <li>XII. A no ingresar a más de las personas autorizadas a “EL INMUEBLE”.</li>
      </ul>

      <h2>5. Reparaciones</h2>
      <p>
        “El HOSPEDANTE” se obliga a realizar toda clase de reparaciones que necesitare “EL INMUEBLE”,
        siempre y cuando dichas reparaciones no surjan a causa de algún daño ocasionado por el “El
        HUESPED”, en caso de que las reparaciones surjan por perjuicio de “EL HUESPED” éste se obliga
        a realizar y pagar dichas reparaciones, independientemente de la rescisión del presente
        contrato.
      </p>

      <h2>6. Sustancias peligrosas</h2>
      <p>
        Las partes acuerdan que queda prohibido almacenar sustancias peligrosas, inflamables,
        corrosivas, deletéreas o ilegales dentro del inmueble. En caso de siniestro, “EL HUESPED”
        deberá cubrir los daños ocasionados al “INMUEBLE”, a “EL HOSPEDANTE” y a los demás vecinos y
        sus propiedades que resulten afectados los daños y perjuicios que les ocasione.
      </p>

      <h2>7. Sustancias prohibidas</h2>
      <p>
        “EL HUESPED” y sus acompañantes autorizados, tienen estrictamente prohibido introducir,
        conservar, almacenar, usar y/o consumir toda clase de sustancias nocivas o drogas prohibidas
        por las leyes mexicanas, siendo causa inmediata de rescisión la violación a esta prohibición,
        por lo que dicho “HUESPED” y sus acompañantes autorizados, deberán de desalojar el “INMUEBLE”
        de inmediato, de conformidad con lo que para el caso se pacta más adelante.
      </p>

      <h2>8. Fuerza mayor</h2>
      <p>
        El “HOSPEDANTE” en ningún caso será responsable por el incumplimiento de alguna de sus
        obligaciones estipuladas en el mismo, si dicho incumplimiento es causado por un evento de
        “Fuerza Mayor”, por lo que dicha obligación será suspendida durante dicho evento.
      </p>

      <h2>9. Daños o faltantes</h2>
      <p>
        “EL HOSPEDANTE” no se hace responsable de cualquier tipo de daño o accidente que “El HUESPED”
        y sus visitantes pudieran sufrir dentro de “EL INMUEBLE” o en las áreas comunes del edificio
        de los daños o faltantes sufridos en vehículos, bienes inmuebles o patrimonio de “EL
        HUESPED”, durante la ocupación o desocupación del inmueble, ni durante el tiempo que dure su
        estancia en el mismo, ya que “EL HUESPED” y las personas que se señalan en este contrato para
        recibir el servicio de hospedaje, quedan a cargo de la seguridad de su persona y su propia
        localidad.
      </p>

      <h2>10. Cancelación o modificación</h2>
      <p>
        En caso de que “EL HUESPED” cancele su estancia o permanezca en el “EL INMUEBLE” menor tiempo
        al pactado, no aplica devolución alguna, por lo que, “EL HOSPEDANTE” NO está obligado a hacer
        algún tipo de devolución respecto a la cantidad pactada por la estancia.
      </p>
      <p>
        Si el “HUESPED” quisiera extender su reservación, podrá solicitar al “HOSPEDANTE” la extensión
        de la reserva. Si el “HOSPEDANTE” autoriza por escrito dicha extensión, el “HUESPED” deberá
        cubrir la cantidad comunicada por escrito y pagar la cantidad por dicha extensión antes de que
        termine la reserva original, en la cuenta que se estipula en el inciso b) que antecede. “EL
        HOSPEDANTE” le informará a “EL HUESPED” si éste deberá hacer la extensión de la reserva en la
        aplicación digital de hospedaje que haya utilizado para su reserva, solicitando la extensión
        de la misma, esperando la confirmación del “HOSPEDANTE” en la aplicación.
      </p>
      <p>
        En caso de que el “HOSPEDANTE” no acepte la extensión de dicha reserva, el “EL HUESPED” se
        obliga a desalojar el inmueble el día y hora de término de vigencia del presente instrumento
        jurídico.
      </p>
      <p>
        En caso de que el “HUESPED” no desalojara en tiempo y forma el inmueble acepta que se le
        embarguen bienes muebles u objetos de los que introduzca en la localidad prestada en servicio
        de hospedaje y que declara desde hoy son de exclusiva propiedad de “EL HOSPEDANTE”,
        independientemente de que se realice el desalojo apoyado de la fuerza pública.
      </p>

      <h2>11. Desocupación</h2>
      <p>
        Las partes acuerdan que si al término del presente contrato no hubiere renovación del mismo,
        “EL HUESPED” estará obligado a desocupar el inmueble en servicio de hospedaje a la fecha de su
        vencimiento a la hora de checkout, siendo esta las 12:00 horas, si por cualquier motivo no lo
        hiciere, deberá pagar por hora la cantidad de $1200.00 (MIL DOSCIENTOS PESOS CON 00/100 M.N.)
        y por cada día siguiente el doble del precio total de la estancia pactada y consecuentes días
        que siga ocupándolo hasta la total desocupación y entrega legal del inmueble materia del
        presente contrato, sin que esto implique renovación o prórroga del mismo y por lo tanto sin
        perjuicio de la acción jurídica o legal que “EL HOSPEDANTE” ejerza para exigir dicha
        desocupación. Por lo que “EL HUESPED” acepta que podrá ser desalojado con apoyo de la fuerza
        pública en caso de incumplimiento del presente instrumento jurídico.
      </p>
      <p>
        La cantidad incurrida por no desocupar en esta cláusula se dispone como pena por
        incumplimiento y no por hospedaje, y sólo podrá demostrar que ha desocupado la localidad con
        la constancia escrita que en tal caso “EL HOSPEDANTE” se obliga a extender y mediante el cual
        se tiene como material y jurídicamente recibido “EL INMUEBLE”.
      </p>

      <h2>12. Siniestros y clausuras</h2>
      <p>
        Los daños ocasionados al inmueble, así como a los colindantes, por siniestros originados por
        culpa o negligencia de “EL HUESPED” y/o de toda persona que lo visite por cualquier motivo el
        inmueble, serán de la exclusiva responsabilidad de los primeros, por lo que en caso de
        detectar algún equipo o instalación en mal estado desde el primer día de la ocupación del
        mismo, se deberá dar aviso por escrito a “EL HOSPEDANTE”, con acuse de recibo, para proceder a
        la reparación, por cuenta de “EL HOSPEDANTE”, siempre y cuando no sea imputable la falla a “EL
        HUESPED”.
      </p>
      <p>
        Cuando el inmueble materia del servicio de hospedaje sea clausurado o suspendido en su uso por
        disposición de la autoridad competente y/o por causas imputables a “EL HUESPED”, éste se
        obliga a llevar a cabo todas las gestiones y trámites ante las autoridades correspondientes
        así como pagar las multas, derechos, recargos o lo que imponga la autoridad para efectos de
        que levanten los sellos de clausura o suspensión, así como los daños o perjuicios ocasionados,
        obligándose a sacar en paz y a salvo a “EL HOSPEDANTE”.
      </p>
      <p>
        El incumplimiento de esta obligación originará el pago de una pena convencional a cargo de “EL
        HUESPED” por el equivalente al triple de la estancia pactada por cada día que “EL INMUEBLE”
        sea clausurado o suspendido en favor de “EL HOSPEDANTE”, independientemente del pago de los
        daños y perjuicios.
      </p>
      <p>
        En el caso de que el bien inmueble objeto del presente contrato sea clausurado o sea asegurado
        por cualquier autoridad, por causas imputables a “EL HUESPED” será causa de rescisión del
        presente contrato, obligándose a desalojar el departamento de inmediato.
      </p>

      <h2>13. De la extinción de dominio</h2>
      <p>
        En caso que “el HUESPED” o alguno de sus acompañantes autorizados destine, use o utilice “El
        INMUEBLE” a otro fin diferente al pactado en las cláusulas primera y sexta anteriores y con
        ello se dicte resolución ejecutoriada en donde se aplique a “el INMUEBLE” la ley de extinción
        de dominio, ya sea federal o local, se obliga dicho “HUESPED” a indemnizar al “HOSPEDANTE”,
        con la cantidad que resulte de aplicar el valor comercial de venta, según avalúo que en su
        caso se practique por valuador bancario, que tuviere la propiedad al momento de su extinción,
        debiendo de cubrir dicha indemnización a más tardar 15 días posteriores a que se dicte en
        donde quede ejecutoriada la sentencia de extinción de dominio.
      </p>

      <h2>14. Controversia y jurisdicción</h2>
      <p>
        Para el caso de controversia o jurisdicción voluntaria en cuanto a la interpretación,
        cumplimiento, rescisión, terminación, pago de pesos, pago de daños o perjuicios e
        incumplimiento, dicho procedimiento se llevará a cabo a elección de “EL HOSPEDANTE”, mediante
        un procedimiento de arbitraje o a través de un procedimiento judicial ante los tribunales
        competentes de Ciudad de México como mejor convenga a sus intereses, por lo que “EL HUESPED”
        desde este momento acepta dicha elección que haga “EL HOSPEDANTE”.
      </p>

      <h2>15. Buena fe</h2>
      <p>
        “EL HOSPEDANTE” concede de BUENA FÉ, el uso goce y disfrute de “EL INMUEBLE” materia del
        presente contrato a “EL HUESPED”, en el entendido de que la actividad o el uso que se le dé al
        Inmueble por parte de “EL HUESPED” es por hospedaje y este será de carácter lícito,
        deslindando en este acto “EL HUESPED” a “EL HOSPEDANTE” y a “EL INMUEBLE” de cualquier acción
        o responsabilidad civil, penal, administrativa o de cualquier otra rama del derecho, que se
        pudiera generar con motivo del mal uso o destino que le diere “EL HUESPED” a “EL INMUEBLE”,
        por lo que este último estará excluido de la Ley de Extinción de Dominio. Ambas partes
        acuerdan en que, la buena fe del servicio de hospedaje que se presume y se demuestra con la
        firma del presente Contrato de Hospedaje.
      </p>

      <h2>16. Pena convencional</h2>
      <p>
        En caso de incumplimiento de “EL HUESPED” a las obligaciones objeto del presente Contrato y de
        las reglas de estancia, se hará acreedor a la pena convencional equivalente al triple del
        precio total de la estancia, pagaderos en el domicilio de “EL INMUEBLE” o en la cuenta
        bancaria manifestada en la cláusula SEGUNDA inciso b, independientemente de la rescisión del
        contrato, independientemente de el pago de los daños y perjuicios.
      </p>

      <h2>17. Depósito</h2>
      <p>
        “EL HUESPED” otorgará a la firma del presente contrato un depósito en garantía por el importe
        descrito en el Anexo 1, dicho depósito será devuelto al término del presente contrato,
        siempre y cuando no existan daños físicos o materiales al inmueble, en estos casos se
        realizará la cotización y cuentas por adeudos, las cuales se deducirán del depósito otorgado
        por “EL HOSPEDANTE”. Asimismo, el “HUESPED” acepta que se le aplique a la tarjeta bancaria que
        señala en el Anexo 1, cualquier cargo que supere el importe del depósito aquí pactado,
        incluyendo desperfectos, daños o gastos originados por la violación de cualquiera de las
        cláusulas de este contrato.
      </p>
      <p>
        “El HOSPEDANTE” tiene un periodo máximo de 5 días para devolver el depósito, tiempo que
        utilizará para verificar que “EL INMUEBLE”, se encuentra en buen estado y no existan daños
        físicos o materiales.
      </p>

      <h2>18. Uso del inmueble</h2>
      <p>
        El uso que “EL HUESPED” y sus acompañantes autorizados darán a “EL INMUEBLE” será
        exclusivamente el de hospedaje, por lo que, si se le da un uso distinto al aquí señalado será
        causa suficiente para que “EL HOSPEDANTE” rescinda el presente contrato de servicio de
        hospedaje, sin necesidad de declaración judicial previa. En el supuesto caso de que “EL
        HUESPED” destine la propiedad a otro fin que el señalado, o en cualquier otro supuesto que
        determine la autoridad, y con esto se dicte resolución ejecutoriada en donde se aplique a la
        propiedad de la Ley Nacional de Extinción de Dominio, se obliga a “EL HUESPED” a indemnizar a
        “EL HOSPEDANTE”, mediante el pago de la cantidad que resulte de aplicar el valor de venta que
        tuviere “EL INMUEBLE”, al momento de su extinción, más el 50% (cincuenta por ciento) de dicho
        monto, debiendo de cubrir dicha indemnización, a más tardar 15 (quince) días posteriores a que
        se dicte acuerdo en donde quede ejecutoriada la sentencia de extinción de dominio.
      </p>

      <h2>19. Incumplimiento</h2>
      <p>
        Es causa de rescisión del presente contrato el incumplimiento de las cláusulas y violación a
        las disposiciones establecidas en el contrato, por parte de “EL HUESPED”, no requiriéndose
        declaración judicial alguna para la rescisión. “EL HUESPED” renuncia expresamente a
        interponerse judicialmente a la acción resolutoria inmediata de la rescisión.
      </p>
      <p>
        “EL HOSPEDANTE” se obliga a notificar por escrito vía mensaje telefónico o mensaje en la
        aplicación móvil de reserva de servicio de hospedaje, o verbalmente a “EL HUESPED” su voluntad
        de rescindir el contrato para la desocupación de “EL INMUEBLE” prestado en servicio de
        hospedaje, obligándose “EL HUESPED” a desocupar “EL INMUEBLE” el mismo día en que fuese
        notificado.
      </p>

      <h2>20. Terminación del contrato</h2>
      <p>El contrato de hospedaje terminará en los siguientes eventos:</p>
      <ul>
        <li>a) Por vencimiento del plazo pactado.</li>
        <li>
          b) Por incumplimiento de cualquiera de las obligaciones a cargo de las partes y puntualmente
          por el incumplimiento del pago del precio o canon a cargo del HUESPED o por incumplimiento
          del pago demás servicios complementarios que el HUESPED solicite con cargo a su cuenta
          personal.
        </li>
        <li>
          c) En los eventos en que, a juicio exclusivo de “EL HOSPEDANTE”, el comportamiento del
          HUESPED atente contra la tranquilidad y/o salubridad de los demás huéspedes o vecinos.
        </li>
        <li>
          d) Por fumar en el departamento o en cualquier otro espacio libre de humo del edificio,
          cuando se afecten otros huéspedes, vecinos o usuarios y sin perjuicio del pago que deberá
          hacer en los términos que se establecen más adelante. La terminación del contrato no exonera
          ni libera al HUESPED del pago de los saldos pendientes.
        </li>
      </ul>

      <h2>21. Efectos de la terminación</h2>
      <ul>
        <li>
          a) A la terminación del contrato “EL HOSPEDANTE” podrá disponer libremente del departamento.
        </li>
        <li>
          b) A la terminación del contrato y con independencia de la causa de terminación, “EL
          HOSPEDANTE” queda facultado para ingresar al departamento, elaborar y suscribir un inventario
          de los efectos y equipaje de EL HUESPED y retirarlos del departamento para dejarlos en
          depósito seguro y adecuado, sin responsabilidad del HOSPEDANTE y por cuenta y riesgo del
          HUESPED.
        </li>
        <li>
          c) Si el HUESPED no pagare la cuenta o parte de ella, el HOSPEDANTE podrá disponer y vender
          el equipaje y objetos del HUESPED en los términos del artículo 2669 del Código Civil vigente
          para la Ciudad de México, para cubrir con su producto las obligaciones pendientes. El
          excedente si lo hubiere, será puesto a disposición del HUESPED. En caso de déficit, el
          HOSPEDANTE podrá iniciar las acciones correspondientes para conseguir el pago total de la
          suma adeudada.
        </li>
      </ul>

      <h2>22. Misceláneos</h2>
      <p>
        <strong>a) Cargos por fumar en las habitaciones.</strong> Siendo consecuentes con el cuidado
        del medio ambiente y la salud, todos los departamentos son libres de humo. Fumar en el
        departamento o en cualquier otro espacio del edificio constituye un incumplimiento grave del
        contrato de hospedaje que da lugar a su terminación. Si el HUESPED fuma en el departamento,
        por cada día que lo haga deberá pagar (i) el costo en el que debe incurrir el HOSPEDANTE para
        desodorizar y limpiar el departamento, que se estima en una suma equivalente a 100 USD,
        liquidados a la tasa representativa del mercado del día del pago, y (ii) el valor de (2) noches
        a la tarifa correspondiente a su alojamiento, como quiera que el proceso de limpieza y
        desodorización implica que el HOSPEDANTE no pueda utilizar la habitación durante las
        siguientes dos (2) noches.
      </p>
      <p>
        <strong>b) Penalidad por ruido superior a 70 decibeles entre 10:00 pm y 8:00 am.</strong>{" "}
        Ambas partes convienen en que queda PROHIBIDO hacer fiestas o ruido, en el horario mencionado,
        en caso de que se supere este umbral se aplicará una multa de 250 USD por cada día que se
        supere este umbral y es causa de terminación de contrato. Aceptando que no aplica devolución
        alguna, por lo que, “EL HOSPEDANTE” NO está obligado a hacer algún tipo de devolución respecto
        a la cantidad pactada por la estancia.
      </p>
    </LegalPage>
  );
}
