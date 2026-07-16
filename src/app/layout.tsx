import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "FedEx – Suivi de Colis International",
  description:
    "Plateforme de suivi de colis FedEx International – Suivez vos envois en temps réel",
  icons: { icon: "/images/fedex-logo.png" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
