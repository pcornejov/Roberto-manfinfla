type PaginaEnObraProps = {
  titulo: string;
  detalle: string;
};

export function PaginaEnObra({ titulo, detalle }: PaginaEnObraProps) {
  return (
    <main className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <h1 className="font-display text-4xl text-accent-yellow [text-shadow:4px_4px_0_var(--accent-red)]">
        {titulo}
      </h1>
      <span className="rounded-full bg-accent-red px-4 py-1 text-sm font-bold uppercase tracking-wide text-foreground">
        En obra — todavía no, hueón
      </span>
      <p className="max-w-md text-foreground/70">{detalle}</p>
    </main>
  );
}
