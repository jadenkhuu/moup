import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-4 dark:bg-black">
      {/* Tablet-style Container (fixed aspect ratio) */}
      <main className="relative flex aspect-[3/4] h-[80vh] w-full max-w-md flex-col overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
        
        {/* Top Header & Search Section */}
        <div className="flex flex-col gap-4 p-8 pb-4">
          <header className="flex flex-col gap-1">
            {/* Swapped: Primary Title */}
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              MOUP
            </h1>
            {/* Swapped: Secondary Label */}
            <p className="text-[10px] font-semibold tracking-widest uppercase text-zinc-400">
              Browse Movies
            </p>
          </header>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input 
              placeholder="Search for a movie..." 
              className="pl-10 rounded-xl bg-zinc-50 border-none ring-1 ring-zinc-200 focus-visible:ring-zinc-400 dark:bg-zinc-800 dark:ring-zinc-700"
            />
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-8 py-4">
          <div className="flex flex-col gap-4">
            {/* Placeholders for future movie data */}
            <div className="h-32 w-full rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-dashed border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-400 text-sm">
              Movie content will load here
            </div>
            <div className="h-32 w-full rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-dashed border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-400 text-sm">
              Movie content will load here
            </div>
          </div>
        </div>

        {/* Floating Bottom Nav Bar */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center px-8">
          <nav className="flex h-14 w-full items-center justify-around rounded-2xl border border-zinc-200 bg-white/80 px-4 shadow-lg backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
            <button className="flex flex-col items-center gap-1 text-zinc-900 dark:text-zinc-50">
              <div className="h-1.5 w-1.5 rounded-full bg-current mb-0.5" />
              <span className="text-[10px] font-medium uppercase tracking-tighter">Home</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-zinc-400 hover:text-zinc-600 transition-colors">
              <span className="text-[10px] font-medium uppercase tracking-tighter">Rank</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-zinc-400 hover:text-zinc-600 transition-colors">
              <span className="text-[10px] font-medium uppercase tracking-tighter">Profile</span>
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
}