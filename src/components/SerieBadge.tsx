import type { Serie } from "@/lib/types";
import { SERIES_LABELS } from "@/lib/types";

const estilos: Record<Serie, string> = {
  original: "bg-accent-green text-background",
  especiales: "bg-accent-yellow text-background",
  originales: "bg-accent-red text-foreground",
  "c-men": "bg-foreground text-background",
};

export function SerieBadge({ serie }: { serie: Serie }) {
  return (
    <span
      className={`inline-block -rotate-3 px-2 py-0.5 font-display text-xs ${estilos[serie]}`}
    >
      {SERIES_LABELS[serie]}
    </span>
  );
}
