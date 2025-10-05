import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GameProvider } from "./providers";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { LanguageSwitcher } from "@/components/language-switcher";

// Inter - Fuente principal para la interfaz
// Optimizada para legibilidad en pantallas digitales
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// JetBrains Mono - Fuente monoespaciada para código y datos
// Perfecta para coordenadas, valores numéricos y código
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NASA Space Challenge - Agricultura",
  description:
    "Juego educativo sobre agricultura con datos satelitales de NASA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <LanguageProvider>
          <GameProvider>{children}</GameProvider>
          <LanguageSwitcher />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
