import type { Metadata } from "next";
import { Bungee, Space_Grotesk } from "next/font/google";
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
  title: "Roberto Manfinfla",
  description:
    "El sitio de fans dedicado a Roberto Manfinfla, la serie Flash más grotesca que parió Viña del Mar.",
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
        {children}
        <footer className="border-t border-surface px-6 py-4 text-center text-xs text-foreground/50">
          {new Date().getFullYear()} · Fan site no oficial · Serie original de
          Sucio y Alegale! Team
        </footer>
      </body>
    </html>
  );
}
