import { QueryProvider } from "@/providers/QueryProvider";
import { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/favicon.ico" />
        <title>Frontend Tes Kartala 2025 - Fajar Fadillah Agustian</title>
      </head>

      <body className={`font-archivo antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
