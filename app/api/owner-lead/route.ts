import { NextResponse } from "next/server";

// Prospectos de administración de departamentos (/administramos-tu-depto).
// Se registran en Zoho (webhook de Zoho Flow -> Lead en CRM) y quedan en los
// logs del servidor como respaldo. Destino: ZOHO_OWNER_LEAD_URL.

export const runtime = "nodejs";

const ETIQUETAS: Record<string, Record<string, string>> = {
  zona: {
    polanco: "Polanco",
    condesa: "Condesa / Hipódromo",
    roma: "Roma",
    "cdmx-otra": "Otra zona de CDMX",
    houston: "Houston",
    "otra-ciudad": "Otra ciudad",
  },
  reglamento: { si: "Sí", no: "No", "no-se": "No lo sé" },
  amueblado: { si: "Sí, completo", parcial: "Parcialmente", no: "No" },
  recamaras: { estudio: "Estudio / loft", "1": "1", "2": "2", "3+": "3 o más" },
  disponible: {
    ya: "Ya está disponible",
    "1-3-meses": "En 1 a 3 meses",
    despues: "Más adelante",
    rentado: "Está rentado a largo plazo",
  },
  situacion: {
    vacio: "Vacío",
    "yo-airbnb": "Lo renta el propietario por Airbnb",
    "otra-admin": "Con otra administradora",
    "largo-plazo": "Rentado a largo plazo",
  },
  objetivo: {
    rentabilidad: "Máxima rentabilidad",
    estable: "Ingreso estable y predecible",
    "sin-problemas": "Que no le dé problemas",
    "no-se": "Aún no lo sabe",
  },
};

const PREGUNTAS = Object.keys(ETIQUETAS);

function limpiar(v: unknown, max = 500): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "json" }, { status: 400 });
  }

  const nombre = limpiar(body.nombre, 80);
  const apellidos = limpiar(body.apellidos, 80);
  const email = limpiar(body.email, 160);
  const whatsapp = limpiar(body.whatsapp, 40);
  if (!nombre || !apellidos || !email.includes("@") || !whatsapp) {
    return NextResponse.json({ error: "datos" }, { status: 400 });
  }
  // Las 7 preguntas de calificación deben venir con un valor conocido.
  for (const p of PREGUNTAS) {
    if (!ETIQUETAS[p][limpiar(body[p], 40)]) {
      return NextResponse.json({ error: p }, { status: 400 });
    }
  }

  const lead: Record<string, string> = {
    nombre,
    apellidos,
    whatsapp,
    email,
    zona: ETIQUETAS.zona[limpiar(body.zona, 40)],
    reglamento_estancias_cortas: ETIQUETAS.reglamento[limpiar(body.reglamento, 40)],
    amueblado: ETIQUETAS.amueblado[limpiar(body.amueblado, 40)],
    recamaras: ETIQUETAS.recamaras[limpiar(body.recamaras, 40)],
    disponible_desde: ETIQUETAS.disponible[limpiar(body.disponible, 40)],
    situacion_actual: ETIQUETAS.situacion[limpiar(body.situacion, 40)],
    objetivo: ETIQUETAS.objetivo[limpiar(body.objetivo, 40)],
    enlace_publicacion: limpiar(body.enlace, 300),
    mensaje: limpiar(body.mensaje, 1000),
    // "Español" / "Ingles" son los valores exactos del campo Idioma1 en Zoho CRM.
    idioma: limpiar(body.idioma, 5) === "en" ? "Ingles" : "Español",
    pagina: limpiar(body.pagina, 120),
    origen: "maiahome.mx - Administración de departamentos",
    fecha: new Date().toISOString(),
  };

  // Resumen legible: Zoho CRM no tiene campos propios para estas respuestas,
  // así que van juntas en la descripción del Lead.
  lead.resumen = [
    `Zona: ${lead.zona}`,
    `Reglamento permite estancias cortas: ${lead.reglamento_estancias_cortas}`,
    `Amueblado: ${lead.amueblado}`,
    `Recámaras: ${lead.recamaras}`,
    `Disponible desde: ${lead.disponible_desde}`,
    `Situación actual: ${lead.situacion_actual}`,
    `Qué busca: ${lead.objetivo}`,
    lead.enlace_publicacion ? `Publicación: ${lead.enlace_publicacion}` : "",
    lead.mensaje ? `Comentario: ${lead.mensaje}` : "",
    `Idioma: ${lead.idioma}`,
  ]
    .filter(Boolean)
    .join("\n");

  // Respaldo: siempre queda en los logs del servidor, aunque Zoho falle.
  console.log("[owner-lead]", JSON.stringify(lead));

  const destino = process.env.ZOHO_OWNER_LEAD_URL;
  if (!destino) {
    return NextResponse.json({ ok: true, registrado: false });
  }

  try {
    const res = await fetch(destino, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) {
      console.error("[owner-lead] zoho respondió", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ ok: true, registrado: false });
    }
  } catch (err) {
    console.error("[owner-lead] zoho falló", err);
    return NextResponse.json({ ok: true, registrado: false });
  }

  return NextResponse.json({ ok: true, registrado: true });
}
