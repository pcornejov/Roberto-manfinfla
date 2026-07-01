import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fanart",
  description:
    "Manda tu fanart de Roberto Manfinfla vía Instagram oficial de Alegale o por Pull Request al repo del sitio.",
};

const REPO_URL = "https://github.com/pcornejov/Roberto-manfinfla";

export default function FanartPage() {
  return (
    <main className="mx-auto max-w-5xl flex-1 px-4 py-16">
      <h1 className="font-display text-4xl text-foreground [text-shadow:4px_4px_0_var(--accent-red)]">
        Fanart
      </h1>
      <p className="mt-3 inline-block -rotate-3 bg-accent-yellow px-2 py-0.5 font-display text-xs text-background">
        SE BUSCA TALENTO MUGRIENTO
      </p>
      <p className="mt-4 max-w-xl text-foreground/80">
        ¿Dibujaste al Roberto? ¿Hiciste una obra maestra o una cagá con patas?
        Da lo mismo, queremos verla igual, oh.
      </p>

      <h2 className="mt-14 -rotate-1 border-l-8 border-accent-green pl-3 font-display text-2xl text-foreground">
        Mándanos tu mugre
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="border-[3px] border-accent-green bg-surface p-6 [box-shadow:6px_6px_0_#000]">
          <p className="font-display text-lg text-foreground">
            📸 Por Instagram
          </p>
          <p className="mt-3 text-sm text-foreground/85">
            Etiqueta o mándale tu fanart al Instagram oficial del Alegale!
            Team. Ellos ya destacan fanart en su perfil, así que ahí llega
            directo a los creadores, po.
          </p>
          <a
            href="https://instagram.com/alegaleteam"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-accent-green px-4 py-2 font-display text-sm text-background hover:-translate-y-0.5"
          >
            IR A @ALEGALETEAM →
          </a>
        </div>

        <div className="border-[3px] border-accent-yellow bg-surface p-6 [box-shadow:6px_6px_0_#000]">
          <p className="font-display text-lg text-foreground">
            🔧 Por Pull Request
          </p>
          <p className="mt-3 text-sm text-foreground/85">
            ¿Eri de los que dibuja Y programa? Abre un PR en el repo del sitio
            con tu imagen y tus datos. Si pasa el review, queda inmortalizado
            aquí, garantizao.
          </p>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-accent-yellow px-4 py-2 font-display text-sm text-background hover:-translate-y-0.5"
          >
            ABRIR PR EN GITHUB →
          </a>
          <p className="mt-3 text-xs text-foreground/50">
            Solo obras tuyas. Nada robado, que el Roberto ya roba suficiente.
          </p>
        </div>
      </div>

      <div className="mt-14 flex flex-col items-center border-[3px] border-dashed border-foreground/40 bg-surface px-6 py-16 text-center">
        <span aria-hidden className="text-5xl">
          🖼️
        </span>
        <p className="mt-4 font-display text-xl text-foreground">
          Aquí no hay ná todavía
        </p>
        <p className="mt-2 max-w-sm text-sm text-foreground/70">
          Esta galería está más vacía que la billetera del Roberto. Manda tu
          fanart y estrénala.
        </p>
        <p className="mt-4 inline-block -rotate-3 bg-accent-red px-2 py-0.5 font-display text-xs text-foreground">
          PODRÍAS SER EL PRIMERO
        </p>
      </div>
    </main>
  );
}
