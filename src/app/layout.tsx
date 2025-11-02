// src/app/layout.tsx
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Click&Go",
  description: "App de agendamento",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
