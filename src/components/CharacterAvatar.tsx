const colores = [
  "bg-accent-green",
  "bg-accent-yellow",
  "bg-accent-red",
  "bg-foreground",
];

type CharacterAvatarProps = {
  name: string;
  index: number;
  size?: "sm" | "lg";
};

export function CharacterAvatar({
  name,
  index,
  size = "sm",
}: CharacterAvatarProps) {
  const color = colores[index % colores.length];
  const dims =
    size === "lg" ? "h-40 w-40 text-8xl" : "h-24 w-24 text-6xl";

  return (
    <div
      aria-hidden
      className={`flex -rotate-3 items-center justify-center border-[3px] border-black font-display text-background [box-shadow:4px_4px_0_#000] transition-transform hover:rotate-0 ${color} ${dims}`}
    >
      {name.charAt(0)}
    </div>
  );
}

export function colorDePersonaje(index: number): string {
  return colores[index % colores.length];
}
