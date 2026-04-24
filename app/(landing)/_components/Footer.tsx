import { Swords } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t hairline">
      <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-900 flex items-center justify-center">
            <Swords size={16} strokeWidth={2.5} />
          </div>
          <span className="font-syne font-extrabold text-xl text-zinc-200">moup</span>
          <span className="text-zinc-600 text-xs font-mono ml-3">pairwise movie rankings</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-zinc-500 font-mono uppercase tracking-wider">
          <a href="#how" className="hover:text-zinc-200">how it works</a>
          <a href="#features" className="hover:text-zinc-200">features</a>
          <a href="https://github.com/jadenkhuu/moup" className="hover:text-zinc-200">github</a>
          <span className="text-zinc-700">·</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
