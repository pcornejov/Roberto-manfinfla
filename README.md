# Roberto Manfinfla — sitio de fans

Sitio no oficial dedicado a Roberto Manfinfla, la serie de animación Flash chilena creada en 2001 por Sucio y el equipo Alegale! Team. Construido con Next.js (export estático), desplegado en GitHub Pages y mantenido por un agente de IA que detecta videos nuevos en el canal oficial.

**Sitio en vivo:** https://pcornejov.github.io/Roberto-manfinfla/

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

Genera el sitio en `out/`. En CI, `GITHUB_PAGES_BASE_PATH` se setea automáticamente al nombre del repo para que las rutas funcionen bajo `https://<usuario>.github.io/<repo>/`.

## Contenido

Todo el contenido vive versionado en `content/`:

- `videos.json` — catálogo de videos (fuente única de verdad). Solo contiene videos del canal Vimeo oficial de Alegale (`vimeo.com/alegaleteam`), verificados vía oEmbed. Incluye una lista `excluded` para contenido descartado editorialmente.
- `characters.json` — fichas de personajes.
- `lore.json` — cronología de la serie.
- `agent-log.json` — historial de ejecuciones del agente (se crea en la primera corrida real).

## Agente de contenido

`scripts/agent/update-content.ts` revisa el RSS público del canal Vimeo oficial, hace diff idempotente contra el catálogo, verifica cada video nuevo (autor oficial + embebible) y lo clasifica con Claude (fallback determinístico si no hay API key).

```bash
# corrida local sin escribir nada
npx tsx scripts/agent/update-content.ts --dry-run

# corrida real (escribe content/videos.json y content/agent-log.json)
ANTHROPIC_API_KEY=sk-... npx tsx scripts/agent/update-content.ts
```

En CI corre a diario vía `.github/workflows/agent-update-content.yml` (cron 06:00 UTC + `workflow_dispatch`). Si hay contenido nuevo, commitea y despacha el workflow de deploy.

### Secrets de GitHub Actions

- `ANTHROPIC_API_KEY` (opcional): habilita la clasificación con Claude. Sin él, el agente usa la clasificación de respaldo basada en el título.

## Workflows

- `deploy.yml` — build estático + deploy a GitHub Pages en cada push a `main` (y a la rama de desarrollo mientras dure la construcción). Requiere Settings → Pages → Source = "GitHub Actions".
- `agent-update-content.yml` — el agente de contenido (cron diario).

## Nota sobre videos y copyright

Solo se embebe contenido del canal Vimeo oficial de Alegale! Team. No se usan resubidas de terceros (Alegale las ha dado de baja históricamente) ni assets gráficos oficiales sin licencia. Si algún creador quiere que se retire algo, se retira.

## Extensión futura (fuera de alcance actual)

Un chatbot en vivo con la personalidad del personaje requeriría backend real (Vercel Functions, Cloudflare Workers, etc.); GitHub Pages solo sirve contenido estático.
