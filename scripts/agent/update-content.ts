/**
 * Agente de contenido: revisa el canal Vimeo oficial de Alegale! Team,
 * detecta videos nuevos que no estén en content/videos.json, los verifica
 * (autor oficial + embebible), los clasifica y los agrega al catálogo.
 *
 * Uso:
 *   npx tsx scripts/agent/update-content.ts [--dry-run]
 *
 * En CI corre desde .github/workflows/agent-update-content.yml; el commit
 * y push los hace el workflow, no este script.
 */
import { classifyWithClaude } from "./classify";
import { appendLog, diffNew, loadVideos, saveVideos, toEntry } from "./content-store";
import { fetchFeedVideoIds, verifyVideo } from "./vimeo";
import type { VideoEntry } from "./types";

const dryRun = process.argv.includes("--dry-run");

async function main() {
  console.log(`Agente de contenido Manfinfla ${dryRun ? "(dry-run)" : ""}`);

  const file = loadVideos();
  console.log(`Catálogo actual: ${file.videos.length} videos`);

  const feedIds = await fetchFeedVideoIds();
  console.log(`Feed RSS del canal oficial: ${feedIds.length} videos`);

  const nuevosIds = diffNew(file, feedIds);
  const errors: string[] = [];
  const skipped: string[] = [];
  const added: string[] = [];

  if (nuevosIds.length === 0) {
    console.log("Sin novedades: el catálogo está al día.");
  }

  const nuevasEntradas: VideoEntry[] = [];
  for (const id of nuevosIds) {
    const raw = await verifyVideo(id);
    if (!raw) {
      skipped.push(id);
      console.log(`- ${id}: descartado (no verificable o autor no oficial)`);
      continue;
    }
    const classification = await classifyWithClaude(raw);
    const entry = toEntry(raw, classification);
    nuevasEntradas.push(entry);
    added.push(`${entry.id} ${entry.title}`);
    console.log(`+ ${entry.id}: ${entry.title} → ${entry.series}`);
  }

  if (dryRun) {
    console.log(`\nDry-run: se habrían agregado ${nuevasEntradas.length} videos. No se escribió nada.`);
    return;
  }

  if (nuevasEntradas.length > 0) {
    saveVideos(file, nuevasEntradas);
    console.log(`\n${nuevasEntradas.length} videos agregados a content/videos.json`);
  }

  appendLog({
    runAt: new Date().toISOString(),
    feedVideos: feedIds.length,
    newVideos: nuevosIds.length,
    added,
    skipped,
    errors,
  });
}

main().catch((err) => {
  console.error("El agente falló:", err);
  process.exit(1);
});
