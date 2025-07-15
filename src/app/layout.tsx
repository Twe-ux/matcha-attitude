import NavbarPremium from "@/components/navbar-premium";
import Providers from "@/components/providers";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../styles/premium.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Matcha - Boutique en ligne",
  description: "Boutique en ligne de produits de qualité pour votre bien-être",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={playfair.variable}>
      <body
        className={`${inter.className} antialiased bg-gradient-to-br from-neutral-50 via-white to-matcha-50`}
      >
        <Providers>
          <div className="min-h-screen">
            <NavbarPremium />
            <main className="pt-16">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
