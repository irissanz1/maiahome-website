// Puntos de interés curados — tomados de explore.maiahome.mx (#map-data por zona).
// Se excluyen las propiedades Maia (tienen su propio pin) y categorías utilitarias.
export type PoiCat = "comer" | "cafe" | "beber" | "compras" | "cultura" | "parques" | "nocturna";
export type Poi = { name: string; cat: PoiCat; lat: number; lng: number };

// Grupos mostrados en el mapa (con toggle). onByDefault = visibles al abrir.
export const POI_GROUPS: { key: string; label: string; labelEn: string; emoji: string; cats: PoiCat[]; onByDefault: boolean }[] = [
  { key: "cultura", label: "Museos y cultura", labelEn: "Museums & culture", emoji: "🏛️", cats: ["cultura"], onByDefault: true },
  { key: "compras", label: "Compras", labelEn: "Shopping", emoji: "🛍️", cats: ["compras"], onByDefault: true },
  { key: "parques", label: "Parques", labelEn: "Parks", emoji: "🌳", cats: ["parques"], onByDefault: true },
  { key: "comer", label: "Restaurantes", labelEn: "Restaurants", emoji: "🍽️", cats: ["comer"], onByDefault: false },
  { key: "cafebar", label: "Cafés y bares", labelEn: "Cafés & bars", emoji: "☕", cats: ["cafe", "beber", "nocturna"], onByDefault: false },
];

export const CAT_EMOJI: Record<PoiCat, string> = {
  comer: "🍽️", cafe: "☕", beber: "🍸", compras: "🛍️", cultura: "🏛️", parques: "🌳", nocturna: "🎶",
};

export const POIS: Poi[] = [
  {"name":"Pujol","cat":"comer","lat":19.42823,"lng":-99.19545},
  {"name":"Quintonil","cat":"comer","lat":19.43082,"lng":-99.19183},
  {"name":"Guzina Oaxaca","cat":"comer","lat":19.43245,"lng":-99.20358},
  {"name":"Lampuga","cat":"comer","lat":19.4326,"lng":-99.1974},
  {"name":"Testal","cat":"comer","lat":19.42731,"lng":-99.19672},
  {"name":"El Bajío","cat":"comer","lat":19.42739,"lng":-99.19631},
  {"name":"Tierra Garat","cat":"cafe","lat":19.43122,"lng":-99.18475},
  {"name":"Ojo de Agua","cat":"cafe","lat":19.43328,"lng":-99.1898},
  {"name":"Maque Polanco","cat":"cafe","lat":19.42917,"lng":-99.19295},
  {"name":"Blend Station","cat":"cafe","lat":19.43344,"lng":-99.18376},
  {"name":"Jules Basement","cat":"beber","lat":19.4307,"lng":-99.1962},
  {"name":"Avenida Presidente Masaryk","cat":"compras","lat":19.43214,"lng":-99.19809},
  {"name":"Antara Fashion Hall","cat":"compras","lat":19.44,"lng":-99.2034},
  {"name":"Museo Soumaya","cat":"cultura","lat":19.44055,"lng":-99.20364},
  {"name":"Museo Jumex","cat":"cultura","lat":19.44135,"lng":-99.20445},
  {"name":"Museo Tamayo","cat":"cultura","lat":19.42615,"lng":-99.18665},
  {"name":"Museo Nacional de Antropología","cat":"cultura","lat":19.42613,"lng":-99.18695},
  {"name":"Parque Lincoln","cat":"parques","lat":19.42953,"lng":-99.19708},
  {"name":"Parque América","cat":"parques","lat":19.43391,"lng":-99.19658},
  {"name":"Gin Gin","cat":"nocturna","lat":19.4308,"lng":-99.19933},
  {"name":"Scotch","cat":"nocturna","lat":19.42846,"lng":-99.19744},
  {"name":"Cabrera","cat":"comer","lat":19.41139,"lng":-99.17133},
  {"name":"La Bipolar","cat":"comer","lat":19.41125,"lng":-99.17367},
  {"name":"El Farolito 2","cat":"comer","lat":19.40545,"lng":-99.17134},
  {"name":"La Capital","cat":"comer","lat":19.40953,"lng":-99.17284},
  {"name":"Contramar","cat":"comer","lat":19.41961,"lng":-99.16723},
  {"name":"Buna","cat":"cafe","lat":19.41186,"lng":-99.17344},
  {"name":"Panadería Rosetta","cat":"cafe","lat":19.41688,"lng":-99.17259},
  {"name":"Departamento Condesa","cat":"beber","lat":19.4162,"lng":-99.1707},
  {"name":"La Nacional","cat":"beber","lat":19.41143,"lng":-99.17635},
  {"name":"Onora","cat":"compras","lat":19.40951,"lng":-99.17012},
  {"name":"Karen Huber","cat":"cultura","lat":19.41153,"lng":-99.15869},
  {"name":"Cine Tonalá","cat":"cultura","lat":19.40893,"lng":-99.16043},
  {"name":"Corredor Cultural Álvaro Obregón","cat":"cultura","lat":19.4168,"lng":-99.1677},
  {"name":"Parque México","cat":"parques","lat":19.4116,"lng":-99.1705},
  {"name":"Parque España","cat":"parques","lat":19.41493,"lng":-99.17141},
  {"name":"Terraza Condesa DF","cat":"nocturna","lat":19.41624,"lng":-99.17201},
  {"name":"Black Horse","cat":"nocturna","lat":19.41013,"lng":-99.17579},
  {"name":"Lago Alberto","cat":"comer","lat":19.4393,"lng":-99.1801},
  {"name":"Parques Polanco","cat":"compras","lat":19.44083,"lng":-99.18516},
  {"name":"Parques Plaza Nuevo Polanco","cat":"compras","lat":19.43875,"lng":-99.17912},
  {"name":"Aroma Curry","cat":"comer","lat":19.4385,"lng":-99.1758},
  {"name":"Haruko Sushi","cat":"comer","lat":19.43856,"lng":-99.17588},
  {"name":"Delicatto Coffee & Bakery","cat":"cafe","lat":19.43858,"lng":-99.17888},
];

// POIs de Houston (Museum District / Medical Center / cerca de Augustine y NRG).
// Aparte de POIS para no meter marcadores lejanos en el mapa de propiedades de CDMX.
export const HOUSTON_POIS: Poi[] = [
  {"name":"Museum of Fine Arts, Houston","cat":"cultura","lat":29.7259,"lng":-95.3905},
  {"name":"Houston Museum of Natural Science","cat":"cultura","lat":29.7221,"lng":-95.3893},
  {"name":"The Menil Collection","cat":"cultura","lat":29.7376,"lng":-95.3985},
  {"name":"Houston Zoo","cat":"cultura","lat":29.7148,"lng":-95.3903},
  {"name":"NRG Stadium","cat":"cultura","lat":29.6847,"lng":-95.4107},
  {"name":"Hermann Park","cat":"parques","lat":29.7176,"lng":-95.3903},
  {"name":"Buffalo Bayou Park","cat":"parques","lat":29.7607,"lng":-95.3929},
  {"name":"Discovery Green","cat":"parques","lat":29.7534,"lng":-95.3595},
  {"name":"The Galleria","cat":"compras","lat":29.7398,"lng":-95.4618},
  {"name":"Rice Village","cat":"compras","lat":29.7157,"lng":-95.4148},
  {"name":"Lucille's","cat":"comer","lat":29.7385,"lng":-95.3862},
  {"name":"Coppa Osteria","cat":"comer","lat":29.7157,"lng":-95.4155},
  {"name":"Pinkerton's Barbecue","cat":"comer","lat":29.7752,"lng":-95.4022},
  {"name":"Blacksmith","cat":"cafe","lat":29.7443,"lng":-95.3946},
];

function _hav(aLat: number, aLng: number, bLat: number, bLng: number) {
  const R = 6371, d = (x: number) => (x * Math.PI) / 180;
  const s =
    Math.sin(d(bLat - aLat) / 2) ** 2 +
    Math.cos(d(aLat)) * Math.cos(d(bLat)) * Math.sin(d(bLng - aLng) / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(s));
}

export type NearbyItem = { name: string; cat: PoiCat; dist: number; mapsUrl: string; wazeUrl: string };
export type NearbyGroup = { key: string; label: string; labelEn: string; emoji: string; items: NearbyItem[] };

// POIs cercanos a una coordenada, agrupados (para la sección "Explora la zona" de
// las guías). Distancia real → sirve para cualquier zona (Polanco, Condesa, Houston)
// sin mezclar geografías: las de otra ciudad quedan fuera del radio.
export function nearbyPois(
  lat: number,
  lng: number,
  opts?: { maxKm?: number; perGroup?: number }
): NearbyGroup[] {
  const maxKm = opts?.maxKm ?? 12;
  const perGroup = opts?.perGroup ?? 6;
  const all = [...POIS, ...HOUSTON_POIS].map((p) => ({ ...p, dist: _hav(lat, lng, p.lat, p.lng) }));
  return POI_GROUPS.map((g) => ({
    key: g.key,
    label: g.label,
    labelEn: g.labelEn,
    emoji: g.emoji,
    items: all
      .filter((p) => p.dist <= maxKm && g.cats.includes(p.cat))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, perGroup)
      .map((p) => ({
        name: p.name,
        cat: p.cat,
        dist: p.dist,
        mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name)}`,
        wazeUrl: `https://waze.com/ul?ll=${p.lat},${p.lng}&navigate=yes`,
      })),
  })).filter((g) => g.items.length > 0);
}
