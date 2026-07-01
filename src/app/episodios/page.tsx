import type { Metadata } from "next";
import { getVideos } from "@/lib/content";
import { SERIES_LABELS, SERIES_ORDER } from "@/lib/types";
import { VideoCard } from "@/components/VideoCard";

export const metadata: Metadata = {
  title: "Episodios",
  description:
    "Todos los capítulos de Roberto Manfinfla, embebidos desde el Vimeo oficial de Alegale! Team.",
};

const barraPorSerie: Record<string, string> = {
  original: "border-accent-green",
  especiales: "border-accent-yellow",
  originales: "border-accent-red",
  "c-men": "border-foreground",
};

export default function EpisodiosPage() {
  const videos = getVideos();

  return (
    <main className="mx-auto max-w-5xl flex-1 px-4 py-16">
      <h1 className="font-display text-4xl text-foreground [text-shadow:4px_4px_0_var(--accent-red)]">
        Los capítulos, po
      </h1>
      <p className="mt-4 max-w-xl text-foreground/80">
        Toda la mugre de Roberto Manfinfla en un solo lugar. Elige, dale play y
        no reclames después.
      </p>

      {SERIES_ORDER.map((serie) => {
        const deLaSerie = videos.filter((v) => v.series === serie);
        return (
          <section key={serie} className="mt-14">
            <h2
              className={`-rotate-1 border-l-8 pl-3 font-display text-2xl text-foreground ${barraPorSerie[serie]}`}
            >
              {SERIES_LABELS[serie]}{" "}
              <span className="text-base text-foreground/50">
                ({deLaSerie.length}{" "}
                {deLaSerie.length === 1 ? "capítulo" : "capítulos"})
              </span>
            </h2>

            {deLaSerie.length === 0 ? (
              <p className="mt-6 text-sm text-foreground/60">
                Aquí no hay na&apos; todavía, tranquilo. Estamos subiendo los
                capítulos de a poco, no seai ansioso.
              </p>
            ) : (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {deLaSerie.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </main>
  );
}
