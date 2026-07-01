import type { Classification, RawUpload, Serie } from "./types";

const SERIES_VALIDAS: Serie[] = ["original", "especiales", "originales", "c-men"];

function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** Clasificación de respaldo cuando no hay API key o el modelo falla. */
export function fallbackClassification(raw: RawUpload): Classification {
  const t = raw.title.toLowerCase();
  const epMatch = t.match(/s(\d+)e(\d+)/);
  let series: Serie = "especiales";
  if (t.includes("c men") || t.includes("c-men")) series = "c-men";
  else if (epMatch) series = "original";

  return {
    series,
    season: epMatch ? Number(epMatch[1]) : null,
    episodeNumber: epMatch ? Number(epMatch[2]) : null,
    slug: slugify(raw.title),
    description: raw.description.split("\n").slice(0, 3).join(" ").slice(0, 280),
  };
}

/**
 * Clasifica un video nuevo con Claude: serie, número de episodio y una
 * descripción breve con el tono del sitio. Si ANTHROPIC_API_KEY no está
 * o la respuesta no valida, cae al fallback determinístico.
 */
export async function classifyWithClaude(
  raw: RawUpload,
): Promise<Classification> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return fallbackClassification(raw);

  const prompt = `Eres el curador del sitio de fans de Roberto Manfinfla (serie Flash chilena de Alegale! Team). Clasifica este video nuevo del canal Vimeo oficial.

Título: ${raw.title}
Descripción original: ${raw.description.slice(0, 500)}

Series posibles:
- "original": episodios de "Las Aventuras de Roberto Manfinfla" (formato SxxEyy)
- "especiales": especiales, teasers, mediometrajes de Manfinfla
- "originales": cortos sueltos de Alegale (Mastertá, Navaja Rusa, etc.)
- "c-men": la subserie C men

Responde SOLO un objeto JSON con estas claves:
{"series": "...", "season": number|null, "episodeNumber": number|null, "slug": "kebab-case-corto", "description": "1-2 frases en español chileno con humor, sin garabatos fuertes, máx 200 caracteres"}`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) throw new Error(`API respondió ${res.status}`);
    const data = (await res.json()) as {
      content: { type: string; text?: string }[];
    };
    const text = data.content.find((b) => b.type === "text")?.text ?? "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("sin JSON en la respuesta");
    const parsed = JSON.parse(jsonMatch[0]) as Classification;

    if (!SERIES_VALIDAS.includes(parsed.series)) throw new Error("serie inválida");
    if (!parsed.slug || !/^[a-z0-9-]+$/.test(parsed.slug))
      throw new Error("slug inválido");

    return {
      series: parsed.series,
      season: typeof parsed.season === "number" ? parsed.season : null,
      episodeNumber:
        typeof parsed.episodeNumber === "number" ? parsed.episodeNumber : null,
      slug: parsed.slug,
      description: String(parsed.description ?? "").slice(0, 280),
    };
  } catch (err) {
    console.warn(`  clasificación LLM falló (${String(err)}), usando fallback`);
    return fallbackClassification(raw);
  }
}
