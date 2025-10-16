import type { Metadata } from "next";
// Impor font dari Google Fonts melalui next/font
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

// Konfigurasi font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "Aroma Coffee Co.", // Ganti dengan nama coffee shop-mu
  description: "Experience the finest handcrafted coffee in town.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Gabungkan variabel font ke body */}
      <body className={`${inter.variable} ${playfair.variable}`}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}