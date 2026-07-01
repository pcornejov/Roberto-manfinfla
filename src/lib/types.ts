export type Serie = "original" | "especiales" | "originales" | "c-men";

export interface VideoEntry {
  id: string;
  platform: "vimeo" | "youtube";
  videoId: string;
  slug: string;
  title: string;
  series: Serie;
  season: number | null;
  episodeNumber: number | null;
  description: string;
  thumbnail: string;
  publishedAt: string;
  sourceUrl: string;
  addedBy: "agent" | "manual";
  addedAt: string;
}

export interface VideosFile {
  $schemaVersion: number;
  lastUpdated: string;
  videos: VideoEntry[];
}

export const SERIES_LABELS: Record<Serie, string> = {
  original: "Las Aventuras",
  especiales: "Especiales",
  originales: "Originales",
  "c-men": "C men",
};

export const SERIES_ORDER: Serie[] = [
  "original",
  "especiales",
  "originales",
  "c-men",
];
