"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { langFromPath } from "@/lib/i18n";
import { WHATSAPP_NUMBER } from "@/lib/contact";
import { track } from "@/lib/analytics";

const OL = {
  es: { name: "Nombre completo *", email: "Correo electrónico *", phone: "Teléfono / WhatsApp", zone: "Zona / colonia del depto", beds: "Recámaras", select: "Selecciona…", studio: "Estudio / loft", msg: "Cuéntanos sobre tu propiedad", submit: "Solicitar evaluación gratuita", note: "Al enviar aceptas ser contactado por Maia Home. No compartimos tus datos con terceros.",
    wa: (f: Record<string, string>) => `Hola Maia Home, quiero una evaluación para administrar mi departamento.\n\nNombre: ${f.nombre}\nCorreo: ${f.email}\nTeléfono/WhatsApp: ${f.telefono}\nZona / colonia: ${f.zona}\nRecámaras: ${f.recamaras}\n` + (f.mensaje ? `Sobre la propiedad: ${f.mensaje}\n` : "") },
  en: { name: "Full name *", email: "Email *", phone: "Phone / WhatsApp", zone: "Area / neighborhood", beds: "Bedrooms", select: "Select…", studio: "Studio / loft", msg: "Tell us about your property", submit: "Request a free assessment", note: "By submitting you agree to be contacted by Maia Home. We don't share your data with third parties.",
    wa: (f: Record<string, string>) => `Hi Maia Home, I'd like an assessment to manage my apartment.\n\nName: ${f.nombre}\nEmail: ${f.email}\nPhone/WhatsApp: ${f.telefono}\nArea: ${f.zona}\nBedrooms: ${f.recamaras}\n` + (f.mensaje ? `About the property: ${f.mensaje}\n` : "") },
} as const;

export default function OwnerLeadForm() {
  const ol = OL[langFromPath(usePathname())];
  const [f, setF] = useState({
    nombre: "",
    email: "",
    telefono: "",
    zona: "",
    recamaras: "",
    mensaje: "",
  });

  const field =
    "w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800 outline-none focus:border-maia-strong";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const msg = ol.wa(f);
    track("owner_lead", { via: "whatsapp" });
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{ol.name}</span>
          <input required value={f.nombre} onChange={(e) => setF({ ...f, nombre: e.target.value })} className={field} />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{ol.email}</span>
          <input required type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className={field} />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{ol.phone}</span>
          <input value={f.telefono} onChange={(e) => setF({ ...f, telefono: e.target.value })} className={field} />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{ol.zone}</span>
          <input value={f.zona} onChange={(e) => setF({ ...f, zona: e.target.value })} className={field} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{ol.beds}</span>
        <select value={f.recamaras} onChange={(e) => setF({ ...f, recamaras: e.target.value })} className={field}>
          <option value="">{ol.select}</option>
          <option>{ol.studio}</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4+</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{ol.msg}</span>
        <textarea rows={3} value={f.mensaje} onChange={(e) => setF({ ...f, mensaje: e.target.value })} className={field} />
      </label>
      <button type="submit" className="w-full rounded-xl bg-maia-yellow py-3 text-sm font-bold text-black transition hover:bg-maia-strong">
        {ol.submit}
      </button>
      <p className="text-center text-xs text-neutral-400">
        {ol.note}
      </p>
    </form>
  );
}
