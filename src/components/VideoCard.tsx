import Link from "next/link";
import type { VideoEntry } from "@/lib/types";
import { SerieBadge } from "./SerieBadge";

const bordePorSerie: Record<VideoEntry["series"], string> = {
  original: "hover:border-accent-green",
  especiales: "hover:border-accent-yellow",
  originales: "hover:border-accent-red",
  "c-men": "hover:border-foreground",
};

export function VideoCard({ video }: { video: VideoEntry }) {
  return (
    <Link
      href={`/episodios/${video.slug}/`}
      className={`block border-[3px] border-foreground bg-surface [box-shadow:6px_6px_0_#000] hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:10px_10px_0_#000] ${bordePorSerie[video.series]}`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-background">
        {/* eslint-disable-next-line @next/next/no-img-element -- thumbnail remoto de Vimeo, export estático sin optimizador */}
        <img
          src={video.thumbnail}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute left-2 top-2">
          <SerieBadge serie={video.series} />
        </div>
      </div>
      <div className="p-3">
        {video.episodeNumber !== null && (
          <p className="text-xs font-bold uppercase tracking-widest text-accent-yellow">
            Ep. {String(video.episodeNumber).padStart(2, "0")}
          </p>
        )}
        <p className="mt-1 line-clamp-2 font-display text-sm text-foreground">
          {video.title}
        </p>
      </div>
    </Link>
  );
}
