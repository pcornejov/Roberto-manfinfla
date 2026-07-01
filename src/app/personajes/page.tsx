import type { Metadata } from "next";
import Link from "next/link";
import { getCharacters } from "@/lib/content";
import { CharacterAvatar } from "@/components/CharacterAvatar";

export const metadata: Metadata = {
  title: "Personajes",
  description:
    "La fauna completa de Roberto Manfinfla: protagonista, familia y la barra de amigos.",
};

export default function PersonajesPage() {
  const personajes = getCharacters();

  return (
    <main className="mx-auto max-w-5xl flex-1 px-4 py-16">
      <h1 className="font-display text-4xl text-foreground [text-shadow:4px_4px_0_var(--accent-red)]">
        Los weones de la serie
      </h1>
      <p className="mt-4 max-w-xl text-foreground/80">
        Conócelos bien, porque después no hay tiempo pa&apos; explicarte quién
        es quién, saco e&apos; weas.
      </p>

      <div className="mt-16 grid gap-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {personajes.map((personaje, i) => (
          <Link
            key={personaje.slug}
            href={`/personajes/${personaje.slug}/`}
            className="block border-[3px] border-foreground bg-surface p-4 pt-0 [box-shadow:6px_6px_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:[box-shadow:8px_8px_0_#000]"
          >
            <div className="-mt-8 mb-3">
              <CharacterAvatar name={personaje.name} index={i} />
            </div>
            <p className="font-display text-xl text-foreground">
              {personaje.name}
            </p>
            <p className="mt-2 inline-block -rotate-3 bg-accent-green px-2 py-0.5 text-xs font-bold uppercase text-background">
              {personaje.role}
            </p>
            <p className="mt-3 line-clamp-2 text-sm text-foreground/80">
              {personaje.shortBio}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
