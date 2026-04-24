import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GithubIcon } from "./GithubIcon";

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b hairline bg-[rgba(9,9,11,0.75)] backdrop-blur-xl">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="font-syne font-extrabold text-2xl tracking-tight text-zinc-100">moup</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          <a href="#how" className="hover:text-zinc-100 transition-colors">how it works</a>
          <a href="#why" className="hover:text-zinc-100 transition-colors">why pairwise</a>
          <a href="#features" className="hover:text-zinc-100 transition-colors">features</a>
          <a
            href="https://github.com/jadenkhuu/moup"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-100 transition-colors flex items-center gap-1.5"
          >
            <GithubIcon size={14} /> github
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden sm:inline-flex text-sm text-zinc-300 hover:text-zinc-100 px-3 py-1.5"
          >
            log in
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 text-sm font-medium bg-zinc-100 text-zinc-900 rounded-lg px-3.5 py-1.5 hover:bg-white transition-colors"
          >
            start ranking <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </header>
  );
}
