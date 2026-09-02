// Datos de contacto reales de Maia Home (del sitio maiahome.mx).
export const WHATSAPP_NUMBER = "525528236633";
export const WHATSAPP_DISPLAY = "+52 55 2823 6633";
export const PHONE_NUMBER = "525588547173";
export const PHONE_DISPLAY = "+52 55 8854 7173";
export const SUPPORT_EMAIL = "reservaciones@maiahome.mx";

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
