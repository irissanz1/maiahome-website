// Carga Leaflet desde CDN una sola vez y devuelve window.L.
// Compartido por LocationMap (ficha) y PropertiesMap (listado).
declare global {
  interface Window {
    L?: any;
  }
}

export function loadLeaflet(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (window.L) return resolve(window.L);
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(link);
    }
    const existing = document.getElementById("leaflet-js") as HTMLScriptElement | null;
    if (existing) {
      if (window.L) resolve(window.L);
      else existing.addEventListener("load", () => resolve(window.L));
      existing.addEventListener("error", reject);
      return;
    }
    const s = document.createElement("script");
    s.id = "leaflet-js";
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    s.onload = () => resolve(window.L);
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

// Carga el plugin markercluster (agrupa pines cercanos / mismo edificio y los
// "spiderfy" al hacer clic). Requiere Leaflet ya cargado.
export function loadMarkerCluster(): Promise<any> {
  return loadLeaflet().then(
    (L) =>
      new Promise((resolve, reject) => {
        if (L.markerClusterGroup) return resolve(L);
        const css: [string, string][] = [
          ["mc-css", "https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/MarkerCluster.css"],
          ["mc-css-default", "https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/MarkerCluster.Default.css"],
        ];
        css.forEach(([id, href]) => {
          if (!document.getElementById(id)) {
            const l = document.createElement("link");
            l.id = id;
            l.rel = "stylesheet";
            l.href = href;
            document.head.appendChild(l);
          }
        });
        const existing = document.getElementById("mc-js") as HTMLScriptElement | null;
        if (existing) {
          if (L.markerClusterGroup) resolve(L);
          else existing.addEventListener("load", () => resolve(L));
          existing.addEventListener("error", reject);
          return;
        }
        const s = document.createElement("script");
        s.id = "mc-js";
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/leaflet.markercluster.min.js";
        s.onload = () => resolve(L);
        s.onerror = reject;
        document.head.appendChild(s);
      }),
  );
}
