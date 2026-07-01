import fs from "node:fs";
import path from "node:path";
import type { RawUpload, VideoEntry, VideosFile } from "./types";

const VIDEOS_PATH = path.join(process.cwd(), "content", "videos.json");
const LOG_PATH = path.join(process.cwd(), "content", "agent-log.json");

export function loadVideos(): VideosFile {
  return JSON.parse(fs.readFileSync(VIDEOS_PATH, "utf8")) as VideosFile;
}

/** Idempotencia: descarta ids ya catalogados o excluidos editorialmente. */
export function diffNew(file: VideosFile, candidates: string[]): string[] {
  const known = new Set(file.videos.map((v) => v.videoId));
  for (const e of file.excluded ?? []) known.add(e.videoId);
  return candidates.filter((id) => !known.has(id));
}

export function saveVideos(file: VideosFile, nuevos: VideoEntry[]): void {
  const updated: VideosFile = {
    ...file,
    lastUpdated: new Date().toISOString(),
    videos: [...file.videos, ...nuevos],
  };
  fs.writeFileSync(VIDEOS_PATH, JSON.stringify(updated, null, 2) + "\n");
}

interface AgentRun {
  runAt: string;
  feedVideos: number;
  newVideos: number;
  added: string[];
  skipped: string[];
  errors: string[];
}

export function appendLog(run: AgentRun): void {
  let log: { runs: AgentRun[] } = { runs: [] };
  if (fs.existsSync(LOG_PATH)) {
    log = JSON.parse(fs.readFileSync(LOG_PATH, "utf8"));
  }
  log.runs.push(run);
  // conserva solo las últimas 50 ejecuciones para que el archivo no crezca sin límite
  log.runs = log.runs.slice(-50);
  fs.writeFileSync(LOG_PATH, JSON.stringify(log, null, 2) + "\n");
}

export function toEntry(
  raw: RawUpload,
  classification: {
    series: VideoEntry["series"];
    season: number | null;
    episodeNumber: number | null;
    slug: string;
    description: string;
  },
): VideoEntry {
  return {
    id: `vi-${raw.videoId}`,
    platform: "vimeo",
    videoId: raw.videoId,
    slug: classification.slug,
    title: raw.title,
    series: classification.series,
    season: classification.season,
    episodeNumber: classification.episodeNumber,
    description: classification.description,
    thumbnail: raw.thumbnail,
    publishedAt: raw.publishedAt,
    sourceUrl: raw.sourceUrl,
    addedBy: "agent",
    addedAt: new Date().toISOString(),
  };
}
