const proximasSecciones = [
  "Episodios",
  "Personajes",
  "Lore",
  "Fanart",
  "Créditos",
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <span className="rounded-full bg-accent-red px-4 py-1 text-sm font-bold uppercase tracking-wide text-foreground">
        Próximamente — cachai, todavía estamos animando esta wea
      </span>

      <h1 className="font-display text-4xl leading-tight text-accent-yellow drop-shadow-[3px_3px_0_rgba(0,0,0,0.6)] sm:text-6xl">
        Roberto Manfinfla
      </h1>

      <p className="max-w-xl text-lg text-foreground/90">
        Roberto Manfinfla vuelve a cargar... como en el 2003, esto también se
        está demorando la raja.
      </p>

      <p className="max-w-md text-sm text-foreground/60">
        El sitio no oficial (pero con harto cariño) de la serie Flash más
        grotesca que parió Viña del Mar.
      </p>

      <nav
        aria-label="Secciones próximamente disponibles"
        className="mt-6 flex flex-wrap justify-center gap-3"
      >
        {proximasSecciones.map((seccion) => (
          <span
            key={seccion}
            title="todavía no, hueón"
            className="cursor-not-allowed rounded-full border border-surface bg-surface px-4 py-2 text-sm text-foreground/50"
          >
            {seccion}
          </span>
        ))}
      </nav>
    </main>
  );
}
