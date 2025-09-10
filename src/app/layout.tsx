import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QueryProvider } from "@/providers/QueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Infotravel",
  description:
    "Encontre hotéis de forma rápida e fácil. Compare opções, veja detalhes dos quartos e finalize sua reserva em poucos cliques.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <div className="flex flex-col min-h-screen min-w-full">
          <Header />

          <div className="flex-1 flex flex-col max-w-360 w-full mx-auto px-16">
            <QueryProvider>{children}</QueryProvider>
          </div>

          <Footer />
        </div>
      </body>
    </html>
  );
}
