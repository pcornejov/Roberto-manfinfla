import type { Metadata } from "next";
import { PaginaEnObra } from "@/components/PaginaEnObra";

export const metadata: Metadata = { title: "Fanart" };

export default function FanartPage() {
  return (
    <PaginaEnObra
      titulo="Fanart"
      detalle="La galería del pueblo se está montando. Prepara tus lápices."
    />
  );
}
