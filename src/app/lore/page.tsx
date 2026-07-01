import type { Metadata } from "next";
import { getTimeline } from "@/lib/content";

export const metadata: Metadata = {
  title: "Lore",
  description:
    "La historia de Roberto Manfinfla y Alegale! Team: del 2001 al Mamón Xpress.",
};

const coloresNodo = [
  "text-accent-green border-accent-green bg-accent-green",
  "text-accent-yellow border-accent-yellow bg-accent-yellow",
  "text-accent-red border-accent-red bg-accent-red",
  "text-foreground border-foreground bg-foreground",
];

export default function LorePage() {
  const timeline = getTimeline();

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-16">
      <h1 className="font-display text-4xl text-foreground [text-shadow:4px_4px_0_var(--accent-red)]">
        La historia, po
      </h1>
      <p className="mt-4 max-w-xl text-foreground/80">
        Del 2001 al Mamón Xpress: todo el lore de Roberto Manfinfla pa&apos;
        que no andís preguntando leseras.
      </p>

      <div className="relative mt-16 border-l-[3px] border-foreground pl-8">
        {timeline.map((nodo, i) => {
          const [texto, , fondo] = coloresNodo[i % coloresNodo.length].split(" ");

          if (nodo.pause) {
            return (
              <div key={nodo.year} className="relative mb-12 opacity-50">
                <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-[3px] border-black bg-surface" />
                <p className="font-display text-lg text-foreground/70">
                  {nodo.year}
                </p>
                <p className="mt-1 italic">{nodo.body}</p>
              </div>
            );
          }

          return (
            <div key={nodo.year} className="relative mb-12">
              <span
                className={`absolute -left-[41px] top-1 h-5 w-5 rounded-full border-[3px] border-black ${fondo}`}
              />
              <p
                className={`-rotate-1 font-display ${
                  nodo.highlight ? "text-4xl" : "text-3xl"
                } ${texto}`}
              >
                {nodo.year}
              </p>
              <div
                className={`mt-3 border-[3px] bg-surface p-4 ${
                  nodo.highlight
                    ? "border-accent-yellow [box-shadow:8px_8px_0_var(--accent-red)]"
                    : "border-foreground [box-shadow:6px_6px_0_#000]"
                }`}
              >
                {nodo.highlight && (
                  <span className="mb-2 inline-block -rotate-3 bg-accent-yellow px-2 py-0.5 font-display text-xs text-background">
                    EL ORIGEN
                  </span>
                )}
                <p className="font-display text-lg text-foreground">
                  {nodo.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                  {nodo.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
