import type { Metadata } from "next";
import { PaginaEnObra } from "@/components/PaginaEnObra";

export const metadata: Metadata = { title: "Créditos" };

export default function CreditosPage() {
  return (
    <PaginaEnObra
      titulo="Créditos"
      detalle="Los culpables de todo esto serán debidamente identificados. Paciencia."
    />
  );
}
