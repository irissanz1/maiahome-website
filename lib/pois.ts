// Puntos de interés (contexto de ubicación) — CDMX, foco Polanco + parques de Condesa.
// Coordenadas aproximadas, solo para orientar al huésped.
export type Poi = { name: string; emoji: string; lat: number; lng: number };

export const POIS: Poi[] = [
  // Museos y cultura
  { name: "Museo Soumaya", emoji: "🏛️", lat: 19.4406, lng: -99.2049 },
  { name: "Museo Jumex", emoji: "🏛️", lat: 19.4417, lng: -99.2056 },
  { name: "Museo Nacional de Antropología", emoji: "🏛️", lat: 19.426, lng: -99.1863 },
  { name: "Auditorio Nacional", emoji: "🎭", lat: 19.4249, lng: -99.1935 },
  // Compras
  { name: "Antara Fashion Hall", emoji: "🛍️", lat: 19.4405, lng: -99.2016 },
  { name: "Plaza Carso", emoji: "🛍️", lat: 19.4419, lng: -99.2043 },
  { name: "Av. Presidente Masaryk", emoji: "🛍️", lat: 19.4322, lng: -99.1949 },
  // Parques
  { name: "Parque Lincoln", emoji: "🌳", lat: 19.4319, lng: -99.2009 },
  { name: "Parque América", emoji: "🌳", lat: 19.4288, lng: -99.1966 },
  { name: "Bosque de Chapultepec", emoji: "🌳", lat: 19.4205, lng: -99.1817 },
  { name: "Parque México (Condesa)", emoji: "🌳", lat: 19.4114, lng: -99.1709 },
  { name: "Parque España (Condesa)", emoji: "🌳", lat: 19.4147, lng: -99.1737 },
  // Vida y gastronomía
  { name: "Polanquito (Emilio Castelar)", emoji: "🍽️", lat: 19.433, lng: -99.1966 },
];
