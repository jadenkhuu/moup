import type { Metadata } from "next";
import { Syne } from "next/font/google"; // Keep font imports here
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const syne = Syne({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "moup",
  description: "Movie tracking app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* We add the font variable to the body so it's available everywhere.
        We also keep the dark mode background here.
      */}
      <body className={`antialiased bg-zinc-950 overflow-hidden ${syne.variable}`}>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}