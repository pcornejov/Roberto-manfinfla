import type { RawUpload } from "./types";

const OFFICIAL_AUTHOR_URL = "https://vimeo.com/alegaleteam";
const RSS_URL = "https://vimeo.com/alegaleteam/videos/rss";

interface OEmbedResponse {
  title: string;
  author_url: string;
  description?: string;
  thumbnail_url: string;
  upload_date?: string;
  video_id: number;
  html: string;
}

/** Extrae los IDs de video del feed RSS público del canal oficial. */
export async function fetchFeedVideoIds(): Promise<string[]> {
  const res = await fetch(RSS_URL);
  if (!res.ok) throw new Error(`RSS de Vimeo respondió ${res.status}`);
  const xml = await res.text();
  const ids = [...xml.matchAll(/<link>https:\/\/vimeo\.com\/(\d+)<\/link>/g)];
  return [...new Set(ids.map((m) => m[1]))];
}

/**
 * Verifica un video vía oEmbed. Devuelve null si no existe, no es
 * embebible o su autor NO es el canal oficial de Alegale — nunca se
 * agrega contenido de terceros.
 */
export async function verifyVideo(videoId: string): Promise<RawUpload | null> {
  const url = `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = (await res.json()) as OEmbedResponse;

  if (data.author_url !== OFFICIAL_AUTHOR_URL) return null;
  if (!data.html) return null;

  const upload = data.upload_date ?? "";
  return {
    videoId: String(data.video_id),
    title: data.title,
    description: data.description ?? "",
    thumbnail: data.thumbnail_url.split("?")[0],
    publishedAt: upload ? `${upload.replace(" ", "T")}Z` : new Date().toISOString(),
    sourceUrl: `https://vimeo.com/${videoId}`,
  };
}
