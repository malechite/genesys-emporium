import type { Metadata } from "next";
import { ReduxProvider } from "./ReduxProvider";
import { ClientGlobalStyles } from "./ClientGlobalStyles";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "sw-rpg-icons/css/sw-rpg-icons.min.css";
import "sw-rpg-icons/css/sw-rpg-colors.min.css";
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
        <ClientGlobalStyles />
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
