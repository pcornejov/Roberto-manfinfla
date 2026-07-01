import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Créditos",
  description:
    "Créditos a Sucio, Culeco y el Alegale! Team, los creadores de Roberto Manfinfla. Sitio de fans no oficial.",
};

const REPO_URL = "https://github.com/pcornejov/Roberto-manfinfla";

const creadores = [
  { nombre: "Sucio", rol: "El creador" },
  { nombre: "Culeco", rol: "Cómplice de la mugre" },
  {
    nombre: "Alegale! Team",
    rol: "Eskiso, Bizarro y Waffle: los que hacen que esto exista",
  },
];

const linksOficiales = [
  { href: "https://robertomanfinfla.cl", label: "robertomanfinfla.cl" },
  { href: "https://alegale.cl", label: "Tienda alegale.cl" },
  { href: "https://alegale.cl/donar", label: "Donar: alegale.cl/donar" },
  { href: "https://paypal.me/alegaleteam", label: "PayPal: paypal.me/alegaleteam" },
  { href: "https://vimeo.com/alegaleteam", label: "Vimeo" },
  { href: "https://instagram.com/alegaleteam", label: "Instagram" },
  { href: "https://facebook.com/alegaleteam", label: "Facebook" },
];

export default function CreditosPage() {
  return (
    <main className="mx-auto max-w-5xl flex-1 px-4 py-16">
      <h1 className="font-display text-4xl text-foreground [text-shadow:4px_4px_0_var(--accent-red)]">
        Créditos
      </h1>
      <p className="mt-4 max-w-xl text-foreground/80">
        Todo el mérito es de otros. Nosotros solo somos fans copiones.
      </p>

      <h2 className="mt-14 -rotate-1 border-l-8 border-accent-green pl-3 font-display text-2xl text-foreground">
        Los creadores
      </h2>
      <p className="mt-4 text-sm text-foreground/80">
        Roberto Manfinfla es criatura de Sucio y del Alegale! Team. Nosotros
        no inventamos ná.
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {creadores.map(({ nombre, rol }) => (
          <div
            key={nombre}
            className="border-[3px] border-foreground bg-surface p-5 [box-shadow:6px_6px_0_#000]"
          >
            <p className="font-display text-lg text-foreground">{nombre}</p>
            <p className="mt-2 text-sm text-foreground/70">{rol}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 -rotate-1 border-l-8 border-accent-yellow pl-3 font-display text-2xl text-foreground">
        Apoya la mugre oficial
      </h2>
      <div className="mt-6 border-[3px] border-accent-yellow bg-surface p-6 [box-shadow:6px_6px_0_#000]">
        <p className="text-foreground/90">
          Si te gusta el Roberto, pásale plata a los de verdad, no seai
          manfinfla tú también.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {linksOficiales.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-foreground bg-background px-3 py-1.5 text-sm text-foreground hover:border-accent-green hover:text-accent-green"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <h2 className="mt-14 -rotate-1 border-l-8 border-accent-red pl-3 font-display text-2xl text-foreground">
        Este sitio
      </h2>
      <div className="mt-6 border-[3px] border-accent-red bg-surface p-6 [box-shadow:6px_6px_0_#000]">
        <p className="inline-block -rotate-3 bg-accent-red px-2 py-0.5 font-display text-xs text-foreground">
          OJO ⚠
        </p>
        <p className="mt-3 text-foreground/90">
          Este es un sitio de fans NO oficial, hecho con cariño y cero
          permiso… digo, con mucho respeto. Todos los personajes, videos y la
          mugre pertenecen a sus creadores. Si algún creador quiere que
          bajemos algo, se baja al tiro, sin alegar.
        </p>
      </div>
      <div className="mt-6 border-[3px] border-foreground bg-surface p-6 [box-shadow:6px_6px_0_#000]">
        <p className="text-foreground/90">
          Este sitio lo construyen agentes de IA (sí, en serio) con Next.js, y
          vive gratis en GitHub Pages. Ni un peso invertido: puro amor y
          robots.
        </p>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-foreground px-4 py-2 font-display text-sm text-background hover:-translate-y-0.5"
        >
          VER EL CÓDIGO EN GITHUB →
        </a>
      </div>
    </main>
  );
}
