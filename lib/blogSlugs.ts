// Mapa de slugs de blog ES ↔ EN (opción B: slugs traducidos).
// Fuente de verdad para el toggle de idioma, hreflang y enlaces internos.
// El campo `slugEn` en Sanity debe coincidir con estos valores.
export const BLOG_SLUG_ES_TO_EN: Record<string, string> = {
  "por-que-amar-polanco-historia-y-encanto-del-barrio": "why-stay-in-polanco",
  "que-visitar-en-el-sur-de-la-cdmx-san-angel-coyoacan-y-xochimilco": "southern-mexico-city-san-angel-coyoacan-xochimilco",
  "antara-fashion-hall-el-centro-comercial-al-aire-libre-de-polanco": "antara-fashion-hall-polanco",
  "los-mejores-mercados-de-artesanias-en-la-cdmx": "best-craft-markets-mexico-city",
  "los-mercados-imperdibles-de-la-cdmx": "best-markets-mexico-city",
  "atractivos-culturales-y-turisticos-imperdibles-de-la-cdmx": "top-cultural-attractions-mexico-city",
  "cdmx-capital-mundial-de-los-museos-por-que-visitarla": "mexico-city-museum-capital",
  "los-10-palacios-historicos-imperdibles-de-la-cdmx": "historic-palaces-mexico-city",
  "los-mejores-museos-interactivos-de-la-cdmx-para-ninos-y-adultos": "interactive-museums-mexico-city",
  "museos-imperdibles-de-la-cdmx-de-la-casa-azul-al-soumaya": "must-see-museums-mexico-city",
  "museos-y-visitas-culturales-imperdibles-en-polanco": "museums-near-polanco",
  "sitios-patrimonio-de-la-humanidad-unesco-en-cdmx": "unesco-world-heritage-sites-mexico-city",
  "donde-pedir-comida-saludable-a-domicilio-en-cdmx": "healthy-food-delivery-mexico-city",
  "las-mejores-terrazas-con-vista-en-cdmx": "best-rooftop-terraces-mexico-city",
  "los-mejores-restaurantes-de-mariscos-en-polanco-cdmx": "best-seafood-restaurants-polanco",
  "restaurantes-cerca-del-parque-lincoln-en-polanco": "restaurants-near-parque-lincoln-polanco",
  "restaurantes-de-comida-mexicana-en-polanco-cdmx": "mexican-restaurants-polanco",
  "actividades-al-aire-libre-en-la-cdmx-parques-en-familia": "outdoor-activities-mexico-city-parks",
  "actividades-familiares-en-polanco-museos-parques-y-mas": "family-activities-polanco",
  "jacarandas-en-cdmx-por-que-la-ciudad-se-pinta-de-morado": "jacarandas-in-mexico-city",
  "los-mejores-lugares-para-pasear-y-caminar-en-cdmx": "best-places-to-walk-mexico-city",
  "los-miradores-mas-instagrameables-de-la-cdmx": "best-viewpoints-mexico-city",
  "los-rincones-mas-instagrameables-de-la-cdmx": "most-instagrammable-spots-mexico-city",
  "parque-ecologico-de-xochimilco-guia-del-renovado-pulmon-de-la-cdmx": "xochimilco-ecological-park",
  "que-hacer-en-xochimilco-trajineras-canales-y-chinampas-patrimonio-de-l": "things-to-do-in-xochimilco",
  "cdmx-el-destino-ideal-para-corporate-housing-y-viajes-de-negocios": "mexico-city-corporate-housing",
  "la-mejor-epoca-para-visitar-cdmx-clima-mes-a-mes": "best-time-to-visit-mexico-city",
  "por-que-visitar-la-cdmx-10-razones-para-enamorarte": "reasons-to-visit-mexico-city",
};

export const BLOG_SLUG_EN_TO_ES: Record<string, string> = Object.fromEntries(
  Object.entries(BLOG_SLUG_ES_TO_EN).map(([es, en]) => [en, es])
);
