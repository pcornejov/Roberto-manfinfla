"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const secciones = [
  { href: "/", label: "Inicio" },
  { href: "/episodios/", label: "Episodios" },
  { href: "/personajes/", label: "Personajes" },
  { href: "/lore/", label: "Lore" },
  { href: "/fanart/", label: "Fanart" },
  { href: "/creditos/", label: "Créditos" },
];

function esActivo(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href.replace(/\/$/, ""));
}

export function Nav() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-accent-green bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-display text-xl text-foreground">
          MANFINFL<span className="text-accent-red">A</span>
        </Link>

        <nav aria-label="Principal" className="hidden gap-1 md:flex">
          {secciones.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1 text-sm uppercase tracking-widest ${
                esActivo(pathname, href)
                  ? "bg-surface text-accent-yellow underline decoration-accent-yellow decoration-[3px] underline-offset-4"
                  : "text-foreground hover:text-accent-green hover:underline hover:decoration-accent-yellow hover:decoration-[3px] hover:underline-offset-4"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setAbierto(true)}
          aria-label="Abrir menú"
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span className="h-1 w-7 bg-accent-green" />
          <span className="h-1 w-7 bg-accent-green" />
          <span className="h-1 w-7 bg-accent-green" />
        </button>
      </div>

      {abierto && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background px-6 py-4 md:hidden">
          <button
            type="button"
            onClick={() => setAbierto(false)}
            className="self-end font-display text-sm text-accent-red"
          >
            ✕ YA PO, CIERRA
          </button>
          <nav aria-label="Principal móvil" className="mt-8 flex flex-col gap-6">
            {secciones.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setAbierto(false)}
                className={`font-display text-3xl ${
                  esActivo(pathname, href)
                    ? "text-accent-yellow"
                    : "text-foreground"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
