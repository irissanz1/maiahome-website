"use client";

import { useState } from "react";
import { WHATSAPP_NUMBER } from "@/lib/contact";
import { track } from "@/lib/analytics";

export default function OwnerLeadForm() {
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
    const msg =
      `Hola Maia Home, quiero una evaluación para administrar mi departamento.\n\n` +
      `Nombre: ${f.nombre}\n` +
      `Correo: ${f.email}\n` +
      `Teléfono/WhatsApp: ${f.telefono}\n` +
      `Zona / colonia: ${f.zona}\n` +
      `Recámaras: ${f.recamaras}\n` +
      (f.mensaje ? `Sobre la propiedad: ${f.mensaje}\n` : "");
    track("owner_lead", { via: "whatsapp" });
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Nombre completo *</span>
          <input required value={f.nombre} onChange={(e) => setF({ ...f, nombre: e.target.value })} className={field} />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Correo electrónico *</span>
          <input required type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className={field} />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Teléfono / WhatsApp</span>
          <input value={f.telefono} onChange={(e) => setF({ ...f, telefono: e.target.value })} className={field} />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Zona / colonia del depto</span>
          <input value={f.zona} onChange={(e) => setF({ ...f, zona: e.target.value })} className={field} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Recámaras</span>
        <select value={f.recamaras} onChange={(e) => setF({ ...f, recamaras: e.target.value })} className={field}>
          <option value="">Selecciona…</option>
          <option>Estudio / loft</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4+</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Cuéntanos sobre tu propiedad</span>
        <textarea rows={3} value={f.mensaje} onChange={(e) => setF({ ...f, mensaje: e.target.value })} className={field} />
      </label>
      <button type="submit" className="w-full rounded-xl bg-maia-yellow py-3 text-sm font-bold text-black transition hover:bg-maia-strong">
        Solicitar evaluación gratuita
      </button>
      <p className="text-center text-xs text-neutral-400">
        Al enviar aceptas ser contactado por Maia Home. No compartimos tus datos con terceros.
      </p>
    </form>
  );
}
