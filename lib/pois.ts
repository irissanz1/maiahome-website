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
