import fs from "node:fs";
import path from "node:path";
import type { VideoEntry, VideosFile } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getVideos(): VideoEntry[] {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "videos.json"), "utf8");
  const parsed = JSON.parse(raw) as VideosFile;
  return [...parsed.videos].sort((a, b) => {
    if (a.series !== b.series) return 0;
    return (a.episodeNumber ?? 0) - (b.episodeNumber ?? 0);
  });
}

export function getVideoBySlug(slug: string): VideoEntry | undefined {
  return getVideos().find((v) => v.slug === slug);
}
