import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 🔹 Configuração das fontes Google com variáveis CSS
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // melhora performance e evita flashes de texto
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// 🔹 Metadados globais
export const metadata: Metadata = {
  title: "Click - Sistema de Agendamentos",
  description: "Plataforma moderna para agendar e gerir atendimentos.",
};

// 🔹 Layout raiz da aplicação
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

