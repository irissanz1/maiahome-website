// Helpers de fecha para los selectores (YYYY-MM-DD, en hora local del navegador).

export function isoLocal(d: Date): string {
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 10);
}

// Rango permitido: desde hoy hasta un año adelante.
export function dateBounds(): { min: string; max: string } {
  const now = new Date();
  const max = new Date(now);
  max.setFullYear(max.getFullYear() + 1);
  return { min: isoLocal(now), max: isoLocal(max) };
}

// El día siguiente a una fecha YYYY-MM-DD (para el mínimo de la salida).
export function nextDay(s: string): string {
  const d = new Date(s + "T00:00:00");
  d.setDate(d.getDate() + 1);
  return isoLocal(d);
}
