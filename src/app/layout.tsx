import type { Metadata } from "next";
import { Bungee, Space_Grotesk } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const bungee = Bungee({
  variable: "--font-bungee",
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pcornejov.github.io/Roberto-manfinfla"),
  title: {
    default: "Roberto Manfinfla",
    template: "%s · Roberto Manfinfla",
  },
  description:
    "El sitio de fans dedicado a Roberto Manfinfla, la serie Flash más grotesca que parió Viña del Mar.",
  openGraph: {
    title: "Roberto Manfinfla",
    description:
      "Todos los episodios de la serie Flash chilena de culto, embebidos desde el canal oficial de Alegale! Team.",
    type: "website",
    locale: "es_CL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bungee.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
