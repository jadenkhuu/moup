import {
  ArrowRight,
  CircleCheck,
  Film,
  ListPlus,
  Search,
  Sparkles,
  Swords,
  User,
} from "lucide-react";
import { MOVIES } from "./types";
import { Poster } from "./Poster";
import { GithubIcon } from "./GithubIcon";

export function Features() {
  const navIcons = [Search, ListPlus, null, CircleCheck, User] as const;

  return (
    <section id="features" className="border-t hairline bg-[#0b0b0d]">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="mb-14">
          <div className="font-mono text-[13px] uppercase tracking-[0.25em] text-zinc-500 mb-3">04 / features</div>
          <h2 className="font-syne font-extrabold text-5xl leading-[0.95] tracking-tight text-zinc-100">
            built for{" "}
            <span className="text-zinc-100 underline decoration-zinc-500 decoration-[3px] underline-offset-[8px]">
              film nerds.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-6 gap-5 auto-rows-[minmax(220px,auto)]">
          <div className="md:col-span-4 rounded-2xl border hairline bg-[#111114] p-8 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-zinc-300" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">rating engine</span>
            </div>
            <h3 className="font-syne font-extrabold text-3xl text-zinc-100">glicko-2 under the hood</h3>
            <p className="mt-3 text-zinc-400">
              the same rating system used for competitive chess. every comparison updates a 
              confidence interval, so your
              top 10 stabilizes fast — but stays responsive to new takes.
            </p>

            <div className="mt-8 relative h-24">
              <div className="absolute inset-x-0 bottom-0 top-auto spark" />
              <svg
                viewBox="0 0 400 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
              >
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#f4f4f5" stopOpacity=".5" />
                    <stop offset="100%" stopColor="#f4f4f5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,70 C40,60 60,40 100,45 C140,50 160,25 200,20 C240,15 260,35 300,30 C340,26 360,10 400,15 L400,100 L0,100 Z"
                  fill="url(#g1)"
                />
                <path
                  d="M0,70 C40,60 60,40 100,45 C140,50 160,25 200,20 C240,15 260,35 300,30 C340,26 360,10 400,15"
                  stroke="#f4f4f5"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
              <div className="absolute inset-x-0 bottom-[-18px] flex justify-between font-mono text-[9px] text-zinc-600">
                <span>t=0</span>
                <span>t=10</span>
                <span>t=25</span>
                <span>t=50</span>
                <span>t=100</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 rounded-2xl border hairline bg-[#111114] p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <ListPlus size={16} className="text-zinc-300" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">watchlist</span>
            </div>
            <h3 className="font-syne font-extrabold text-2xl text-zinc-100">keep a watchlist</h3>
            <p className="mt-2 text-sm text-zinc-400">
              save what you want to watch next. one tap to promote a film into your watched ranking.
            </p>
            <div className="mt-auto grid grid-cols-3 gap-1.5 pt-6">
              {MOVIES.slice(3, 9).map((m) => (
                <div key={m.id} className="rounded-sm overflow-hidden">
                  <Poster movie={m} />
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 rounded-2xl border hairline bg-[#111114] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Film size={16} className="text-zinc-300" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">catalog</span>
            </div>
            <h3 className="font-syne font-extrabold text-2xl text-zinc-100">
              Powered by{" "}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-zinc-500 decoration-2 underline-offset-[4px] hover:decoration-zinc-100 transition-colors"
              >
                TMDB
              </a>
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              every film ever released is searchable. posters, years, metadata — handled.
            </p>
            <div className="mt-6 font-mono text-xs text-zinc-500 space-y-1">
              <div className="flex justify-between">
                <span>/search</span>
                <span className="text-zinc-300">1.1M titles</span>
              </div>
              <div className="flex justify-between">
                <span>/genre</span>
                <span className="text-zinc-300">19</span>
              </div>
              <div className="flex justify-between">
                <span>/updated</span>
                <span className="text-zinc-300">daily</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 rounded-2xl border hairline bg-[#111114] p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <GithubIcon size={16} className="text-zinc-300" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">open source</span>
            </div>
            <h3 className="font-syne font-extrabold text-2xl text-zinc-100">yours to fork</h3>
            <p className="mt-2 text-sm text-zinc-400">next.js · supabase · tailwind · shadcn/ui. dockerized and MIT-licensed.</p>
            <a
              href="https://github.com/jadenkhuu/moup"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 text-sm text-zinc-200 font-medium pt-6"
            >
              jadenkhuu/moup <ArrowRight size={14} />
            </a>
          </div>

          <div className="md:col-span-2 rounded-2xl border hairline bg-[#111114] p-6 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <Swords size={16} className="text-zinc-300" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">mobile-first</span>
            </div>
            <h3 className="font-syne font-extrabold text-2xl text-zinc-100">built like an app</h3>
            <p className="mt-2 text-sm text-zinc-400">
              a 1000px centered shell, soft backdrop-blurs, a floating bottom nav. feels native on phone and desktop.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="bottomnav flex items-center gap-1 p-1.5 rounded-2xl">
                {navIcons.map((Ico, i) =>
                  i === 2 ? (
                    <div
                      key={i}
                      className="w-10 h-10 bg-zinc-100 text-zinc-900 rounded-xl flex items-center justify-center mx-0.5"
                    >
                      <Swords size={18} strokeWidth={2.2} />
                    </div>
                  ) : (
                    <div key={i} className="w-10 h-10 text-zinc-500 flex items-center justify-center">
                      {Ico && <Ico size={18} />}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
