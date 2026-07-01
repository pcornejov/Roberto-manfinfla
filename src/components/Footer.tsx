import Link from "next/link";

const secciones = [
  { href: "/", label: "Inicio" },
  { href: "/episodios/", label: "Episodios" },
  { href: "/personajes/", label: "Personajes" },
  { href: "/lore/", label: "Lore" },
  { href: "/fanart/", label: "Fanart" },
  { href: "/creditos/", label: "Créditos" },
];

const redes = [
  { href: "https://robertomanfinfla.cl", label: "robertomanfinfla.cl" },
  { href: "https://vimeo.com/alegaleteam", label: "Vimeo" },
  { href: "https://instagram.com/alegaleteam", label: "Instagram" },
  { href: "https://facebook.com/alegaleteam", label: "Facebook" },
];

export function Footer() {
  return (
    <footer className="border-t-[3px] border-accent-red bg-surface">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="font-display text-lg text-foreground">
            Roberto Manfinfla
          </p>
          <p className="mt-2 text-sm text-foreground/70">
            Hecho a pulso desde el 2001, cuando internet sonaba a módem.
          </p>
        </div>

        <nav aria-label="Secciones" className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-widest text-accent-green">
            Secciones
          </p>
          {secciones.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-foreground hover:text-accent-green"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-widest text-accent-green">
            El barrio
          </p>
          {redes.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground hover:text-accent-green"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <p className="border-t border-background px-4 py-4 text-center text-xs text-foreground/50">
        Sitio de fans, no oficial. Roberto Manfinfla es creación de Sucio y el
        Alegale! Team, Viña del Mar. Todo el cariño (y el mal gusto) es de
        ellos.
      </p>
    </footer>
  );
}
