import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import navbarConfig from "@/data/navbarConfig";
import { AlertAndLoadingProvider } from "@/components/helper/contexts/AlertAndLoadingContext";
import { useEffect } from "react";
import { usePathname } from "../../node_modules/next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fill That Gap",
  description: "Solving student renting one gap at a time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar navConfig={navbarConfig} />
        <main className="relative top-14 min-h-screen px-5 py-5">
          <AlertAndLoadingProvider>{children}</AlertAndLoadingProvider>
        </main>
      </body>
    </html>
  );
}
