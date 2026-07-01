type VideoEmbedProps = {
  platform: "vimeo" | "youtube";
  videoId: string;
  title: string;
};

export function VideoEmbed({ platform, videoId, title }: VideoEmbedProps) {
  const src =
    platform === "vimeo"
      ? `https://player.vimeo.com/video/${videoId}`
      : `https://www.youtube-nocookie.com/embed/${videoId}`;

  return (
    <div className="aspect-video w-full border-4 border-foreground [box-shadow:8px_8px_0_#000]">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="h-full w-full"
      />
    </div>
  );
}
