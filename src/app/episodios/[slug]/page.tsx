import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVideoBySlug, getVideos } from "@/lib/content";
import { VideoEmbed } from "@/components/VideoEmbed";
import { SerieBadge } from "@/components/SerieBadge";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getVideos().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const video = getVideoBySlug(slug);
  if (!video) return {};
  return { title: video.title, description: video.description };
}

export default async function EpisodioPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const video = getVideoBySlug(slug);
  if (!video) notFound();

  const videos = getVideos();
  const idx = videos.findIndex((v) => v.id === video.id);
  const prev = idx > 0 ? videos[idx - 1] : null;
  const next = idx < videos.length - 1 ? videos[idx + 1] : null;

  const fecha = new Date(video.publishedAt).toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
  });

  return (
    <main className="mx-auto max-w-4xl flex-1 px-4 py-16">
      <div className="border-[3px] border-black bg-accent-red px-4 py-3 text-sm text-foreground">
        <strong>OJO, WEÓN:</strong> esto es humor negro, garabatos y mal gusto
        premeditado. Si te ofende fácil, esta no es tu casa. Si cachai el
        chiste, bienvenido, compadre.
      </div>

      <div className="mt-8">
        <VideoEmbed
          platform={video.platform}
          videoId={video.videoId}
          title={video.title}
        />
      </div>

      <h1 className="mt-8 font-display text-3xl text-foreground">
        {video.title}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-foreground/70">
        <SerieBadge serie={video.series} />
        {video.episodeNumber !== null && (
          <span>Episodio {video.episodeNumber}</span>
        )}
        <span>{fecha}</span>
      </div>

      {video.description && (
        <p className="mt-6 max-w-[65ch] whitespace-pre-line text-foreground/90">
          {video.description}
        </p>
      )}

      <a
        href={video.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block text-sm text-foreground underline decoration-accent-yellow decoration-[3px] underline-offset-4 hover:text-accent-green"
      >
        Ver en Vimeo (respeto al que lo subió) →
      </a>

      <nav aria-label="Episodios" className="mt-12 grid gap-4 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/episodios/${prev.slug}/`}
            className="border-[3px] border-foreground bg-surface p-4 [box-shadow:4px_4px_0_#000] hover:-translate-y-0.5"
          >
            <p className="font-display text-sm text-accent-yellow">
              ← Anterior
            </p>
            <p className="mt-1 text-sm text-foreground/80">{prev.title}</p>
          </Link>
        ) : (
          <div className="border-[3px] border-foreground/40 bg-surface p-4 opacity-40">
            <p className="font-display text-sm">← Anterior</p>
            <p className="mt-1 text-sm">no hay más, ¿qué querís?</p>
          </div>
        )}
        {next ? (
          <Link
            href={`/episodios/${next.slug}/`}
            className="border-[3px] border-foreground bg-surface p-4 text-right [box-shadow:4px_4px_0_#000] hover:-translate-y-0.5"
          >
            <p className="font-display text-sm text-accent-yellow">
              Siguiente →
            </p>
            <p className="mt-1 text-sm text-foreground/80">{next.title}</p>
          </Link>
        ) : (
          <div className="border-[3px] border-foreground/40 bg-surface p-4 text-right opacity-40">
            <p className="font-display text-sm">Siguiente →</p>
            <p className="mt-1 text-sm">no hay más, ¿qué querís?</p>
          </div>
        )}
      </nav>
    </main>
  );
}
