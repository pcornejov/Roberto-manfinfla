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
  excluded?: { videoId: string; reason: string }[];
  videos: VideoEntry[];
}

export interface RawUpload {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  sourceUrl: string;
}

export interface Classification {
  series: Serie;
  season: number | null;
  episodeNumber: number | null;
  slug: string;
  description: string;
}
