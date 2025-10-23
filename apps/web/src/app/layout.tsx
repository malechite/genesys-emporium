import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Genesys Emporium",
  description: "Character manager for Genesys RPG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
