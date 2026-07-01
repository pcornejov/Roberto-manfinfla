import Link from "next/link";

const accesos = [
  {
    href: "/episodios/",
    titulo: "Episodios",
    descripcion: "Todos los capítulos, del más decente al más terrible.",
  },
  {
    href: "/personajes/",
    titulo: "Personajes",
    descripcion: "La fauna completa: conócelos antes de que te muerdan.",
  },
  {
    href: "/lore/",
    titulo: "Lore",
    descripcion: "La historia detrás de la mugre, contada con datos.",
  },
  {
    href: "/fanart/",
    titulo: "Fanart",
    descripcion:
      "Lo que la gente ha dibujado. Algunos con talento, todos con amor.",
  },
  {
    href: "/creditos/",
    titulo: "Créditos",
    descripcion: "Los culpables de todo esto, con nombre y apellido.",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <section className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-24 text-center">
        <span className="absolute right-4 top-6 -rotate-6 border-2 border-accent-yellow px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-yellow">
          Desde el 2001 dándole
        </span>

        <h1 className="font-display text-5xl leading-tight text-foreground [text-shadow:6px_6px_0_var(--accent-red)] sm:text-7xl">
          Roberto Manfinfla
        </h1>

        <p className="max-w-xl text-lg text-foreground/90">
          Roberto Manfinfla vuelve a cargar... como en el 2003, esto también se
          está demorando la raja.
        </p>

        <Link
          href="/episodios/"
          className="bg-accent-green px-6 py-3 font-display text-background transition-transform hover:-translate-x-[3px] hover:-translate-y-[3px] hover:[box-shadow:3px_3px_0_var(--accent-yellow)]"
        >
          VER LOS EPISODIOS →
        </Link>
      </section>

      <div
        aria-hidden
        className="mx-auto h-2 max-w-5xl bg-[repeating-linear-gradient(90deg,var(--accent-green)_0_12px,transparent_12px_16px)]"
      />

      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="font-display text-2xl text-accent-green">
          ¿Y qué es esta cuestión?
        </h2>
        <div className="mt-6 space-y-4 text-foreground/90">
          <p>
            Roberto Manfinfla nació el 2001 en Viña del Mar, cuando Sucio y el
            Alegale! Team agarraron Flash y se pusieron a hacer monos sin
            pedirle permiso a nadie. El resultado: una de las series más
            sucias, más grotescas y más queridas del internet chileno de esa
            época.
          </p>
          <p>
            Esto no era Cartoon Network, po. Era humor negro del bueno,
            animación hecha con puro ñeque, y un protagonista que no le tenía
            miedo a nada — menos al buen gusto. Se compartía por MSN, se bajaba
            en cyber cafés y se veía a escondidas del papá.
          </p>
          <p>
            Este sitio es un homenaje de fans, hecho con el mismo cariño
            cochino de siempre. Pa&apos; que las nuevas generaciones cachen, y
            los viejos nos riamos de nuevo.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-24">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {accesos.map(({ href, titulo, descripcion }) => (
            <Link
              key={href}
              href={href}
              className="border-2 border-dashed border-accent-green bg-surface p-4 [box-shadow:4px_4px_0_#000] transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px] hover:border-solid hover:border-accent-yellow"
            >
              <p className="font-display text-base text-foreground">
                {titulo}
              </p>
              <p className="mt-2 text-xs text-foreground/70">{descripcion}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
