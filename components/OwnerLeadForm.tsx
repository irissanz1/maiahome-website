"use client";

import { useState } from "react";
import { WHATSAPP_NUMBER } from "@/lib/contact";
import { track } from "@/lib/analytics";

export default function OwnerLeadForm() {
  const [f, setF] = useState({ nombre: "", email: "", direccion: "", telefono: "", mensaje: "" });

  const field =
    "w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800 outline-none focus:border-maia-strong";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const msg =
      `Hola Maia Home, quiero información para administrar mi propiedad.\n\n` +
      `Nombre: ${f.nombre}\n` +
      `Email: ${f.email}\n` +
      `Dirección de la propiedad: ${f.direccion}\n` +
      `Teléfono: ${f.telefono}\n` +
      (f.mensaje ? `Mensaje: ${f.mensaje}\n` : "");
    track("owner_lead", { via: "whatsapp" });
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Nombre completo</span>
          <input required value={f.nombre} onChange={(e) => setF({ ...f, nombre: e.target.value })} className={field} />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">E-mail</span>
          <input required type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className={field} />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Dirección de la propiedad</span>
          <input required value={f.direccion} onChange={(e) => setF({ ...f, direccion: e.target.value })} className={field} />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Teléfono</span>
          <input required value={f.telefono} onChange={(e) => setF({ ...f, telefono: e.target.value })} className={field} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Mensaje (opcional)</span>
        <textarea rows={3} value={f.mensaje} onChange={(e) => setF({ ...f, mensaje: e.target.value })} className={field} />
      </label>
      <button
        type="submit"
        className="w-full rounded-xl bg-maia-yellow py-3 text-sm font-bold text-black transition hover:bg-maia-strong"
      >
        Enviar por WhatsApp
      </button>
      <p className="text-center text-xs text-neutral-400">Te contactamos para evaluar tu propiedad, sin compromiso.</p>
    </form>
  );
}
