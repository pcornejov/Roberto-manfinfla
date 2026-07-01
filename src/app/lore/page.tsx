import type { Metadata } from "next";
import { PaginaEnObra } from "@/components/PaginaEnObra";

export const metadata: Metadata = { title: "Lore" };

export default function LorePage() {
  return (
    <PaginaEnObra
      titulo="Lore"
      detalle="La historia detrás de la mugre, contada con datos. Estamos desempolvando los archivos."
    />
  );
}
