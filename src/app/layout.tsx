import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

// ✅ Importando as fontes padrão do template Next.js
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadados atualizados
export const metadata: Metadata = {
  title: "Click&Go",
  description: "Sistema de agendamento inteligente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Envolvendo a aplicação com o contexto de autenticação */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
