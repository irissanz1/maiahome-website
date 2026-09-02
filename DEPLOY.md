# Deploy — Maia Home (Next.js) a Vercel

La app ya compila para producción (`npm run build` ✓, 54 páginas). Es autocontenida:
la caché de Beds24 va empaquetada en `data/beds24-cache.json`.

## Variables de entorno (configúralas en Vercel)
| Variable | Qué es |
|---|---|
| `SANITY_API_TOKEN` | Token de lectura de Sanity (para leer el contenido). |
| `NEXT_PUBLIC_GA_ID` | (opcional) GA4 Measurement ID `G-XXXX`. |
| `NEXT_PUBLIC_META_PIXEL_ID` | (opcional) Meta Pixel ID. |

> Nota: hoy el sitio lee **borradores** de Sanity (`perspective: 'drafts'` en `lib/sanity.ts`).
> Antes del lanzamiento real, cámbialo a `'published'` y publica el contenido en el Studio.

## Opción A — Vercel Dashboard (recomendada)
1. Sube esta carpeta (`maia-next-poc`) a un repo de GitHub.
2. En vercel.com → **Add New → Project → Import** ese repo.
3. Framework: **Next.js** (autodetectado). Root: la carpeta del proyecto.
4. **Environment Variables**: agrega las de arriba.
5. **Deploy**. Vercel te da una URL (`*.vercel.app`).
6. Para el dominio: en el proyecto → **Domains** → agrega `book.maiahome.mx` y apunta el DNS (cuando decidas el cutover).

## Opción B — Vercel CLI
```bash
npm i -g vercel
cd maia-next-poc
vercel            # inicia sesión en el navegador y crea el proyecto
# agrega las variables de entorno cuando lo pida (o en el dashboard)
vercel --prod     # despliegue de producción
```

## Actualizar disponibilidad/precios después
La disponibilidad viene del snapshot `data/beds24-cache.json`. Para refrescarlo:
```bash
cd ../maia-beds24-sync && npm run sync           # actualiza la caché desde Beds24
cd ../maia-next-poc && npm run refresh-cache     # copia el snapshot a la app
git commit -am "refresh cache" && git push       # Vercel redepliega
```
(En una fase siguiente esto se automatiza con un cron; por ahora es manual.)

## Checklist antes del cutover a book.maiahome.mx
- [ ] Publicar contenido en Sanity + cambiar `perspective` a `'published'`.
- [ ] Poner IDs de analítica.
- [ ] Revisar textos (headline/descripción) por depto.
- [ ] Confirmar redirects (ya incluidos en `next.config.mjs`).
- [ ] Apuntar el DNS de `book.maiahome.mx` a Vercel.
