# Maia Home — POC (Next.js)

Prueba de concepto de la arquitectura acordada para el sitio nuevo de reservas:

```
Next.js (SSR) + Sanity  →  Backend propio (sync + caché Beds24)  →  Beds24
   (contenido/SEO)          (disponibilidad · precio · min-stay)     (reservas · cobro)
```

En este POC el **contenido** y la **disponibilidad** están simulados en `data/catalog.ts`
(imitando la salida de Beds24 + Sanity). Las **fotos son placeholders** hasta consolidar las reales.

## Qué demuestra
- **SSR + SEO**: HTML renderizado en servidor, `generateMetadata` por página, **OG + JSON-LD por
  propiedad**, `sitemap.xml` y `robots.txt` dinámicos, canonicals.
- **Selector México / Houston** en el header → fija mercado (moneda MXN/USD) y zonas visibles,
  sobre un **catálogo único filtrable**.
- **Lógica de min-stay ya corregida** (`lib/availability.ts`): mínimo efectivo por rango sin el
  fallback `|| 1` que causa el bug en base44. Ver "Cordelia" (min 15 noches).
- **Landings por zona** (`/polanco`, `/condesa`, `/houston`) para SEO.
- **Handoff de checkout a Beds24** (URL simulada en la ficha).

## Correr en local
```bash
npm install
npm run dev
# http://localhost:3000
```

## Estructura
- `app/` — páginas (Home, `/departamentos`, `/depto/[slug]`, `/[zona]`, sitemap, robots)
- `components/` — Header (con selector), SearchStrip, PropertyCard, Placeholder, Footer
- `data/catalog.ts` — sample (en prod: Beds24 caché + Sanity)
- `lib/` — mercados/zonas, disponibilidad (min-stay), formato de moneda
