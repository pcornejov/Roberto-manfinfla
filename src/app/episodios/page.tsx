import type { Metadata } from "next";
import { PaginaEnObra } from "@/components/PaginaEnObra";

export const metadata: Metadata = { title: "Episodios" };

export default function EpisodiosPage() {
  return (
    <PaginaEnObra
      titulo="Episodios"
      detalle="Aquí van a estar todos los capítulos, con video y todo. Estamos ordenando la videoteca."
    />
  );
}
