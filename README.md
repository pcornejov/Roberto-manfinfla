# Roberto Manfinfla — sitio de fans

Sitio no oficial dedicado a Roberto Manfinfla, la serie de animación Flash chilena creada en 2001 por Sucio y el equipo Alegale! Team. Construido con Next.js (export estático) y desplegado en GitHub Pages.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build estático

```bash
npm run build
```

Genera el sitio estático en `out/`. En CI, `GITHUB_PAGES_BASE_PATH` se setea automáticamente al nombre del repo para que las rutas funcionen bajo `https://<usuario>.github.io/<repo>/`.

## Estado del proyecto

El sitio se construye en iteraciones incrementales, cada una desplegada automáticamente a GitHub Pages vía `.github/workflows/deploy.yml` al hacer push a `main`.

Más documentación (agente de contenido, variables de entorno, etc.) se agrega en iteraciones posteriores.
