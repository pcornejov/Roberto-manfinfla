import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCharacterBySlug, getCharacters } from "@/lib/content";
import { CharacterAvatar } from "@/components/CharacterAvatar";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getCharacters().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const personaje = getCharacterBySlug(slug);
  if (!personaje) return {};
  return { title: personaje.name, description: personaje.shortBio };
}

export default async function PersonajePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const personaje = getCharacterBySlug(slug);
  if (!personaje) notFound();

  const index = getCharacters().findIndex((c) => c.slug === slug);

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-16">
      <Link
        href="/personajes/"
        className="inline-block border-[3px] border-foreground bg-surface px-3 py-1 font-display text-sm text-foreground [box-shadow:4px_4px_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
      >
        ← Volver, ah
      </Link>

      <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <CharacterAvatar name={personaje.name} index={index} size="lg" />
        <div className="text-center sm:text-left">
          <h1 className="font-display text-4xl text-foreground [text-shadow:4px_4px_0_var(--accent-red)]">
            {personaje.name}
          </h1>
          <p className="mt-3 inline-block -rotate-3 bg-accent-green px-2 py-0.5 text-xs font-bold uppercase text-background">
            {personaje.role}
          </p>
        </div>
      </div>

      <div className="mt-10 border-[3px] border-foreground bg-surface p-6 [box-shadow:6px_6px_0_#000]">
        <p className="leading-relaxed text-foreground/90">{personaje.bio}</p>
      </div>
    </main>
  );
}
