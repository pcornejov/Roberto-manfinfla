import type { Metadata } from "next";
import { PaginaEnObra } from "@/components/PaginaEnObra";

export const metadata: Metadata = { title: "Personajes" };

export default function PersonajesPage() {
  return (
    <PaginaEnObra
      titulo="Personajes"
      detalle="La fauna completa viene en camino. Están en la peluquería."
    />
  );
}
