import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google"; // 1. Import Syne
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const syne = Syne({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "moup",
  description: "Movie tracking app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-zinc-950 overflow-hidden">
        {/* Main Viewport Wrapper */}
        <div className="h-screen w-screen flex justify-center relative">
          
          {/* Main Interface Shell (1000px wide) */}
          <div className="relative h-full w-full max-w-[1000px] bg-zinc-900 shadow-2xl border-x border-zinc-800 flex flex-col">
            
            {/* GLOBAL HEADER */}
            <div className="absolute top-0 left-0 right-0 z-50 h-20 flex items-center px-6 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 pointer-events-none">
              <span className={`${syne.className} text-zinc-200 font-extrabold md:text-3xl text-2xl tracking-tight`}>
                moup
              </span>
            </div>
            
            {/* Page Content */}
            {children}

            {/* Persistent Navbar */}
            <BottomNav />
          </div>

        </div>
      </body>
    </html>
  );
}