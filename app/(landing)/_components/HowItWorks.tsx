import Image from "next/image";
import { CircleCheck, Search, Swords } from "lucide-react";
import { MOVIES, tmdbPoster } from "./types";
import { Poster } from "./Poster";

export function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "search & add",
      copy: "find any film from the tmdb catalog. drop it into your watched list or a watchlist to come back to.",
      icon: <Search size={22} />,
      visual: (
        <div className="relative rounded-xl border hairline bg-[#0f0f12] p-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/70 border hairline">
            <Search size={14} className="text-zinc-500" />
            <span className="text-sm text-zinc-300 font-mono">{MOVIES[0].title.toLowerCase()}</span>
            <span className="ml-auto text-[10px] text-zinc-600 font-mono">↵</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {MOVIES.slice(0, 3).map((m, idx) => (
              <div
                key={m.id}
                className={`rounded-md overflow-hidden ${idx === 0 ? "" : "blur-sm opacity-50"}`}
              >
                <Poster movie={m} />
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      n: "02",
      title: "this or that",
      copy: "moup picks two of your films and asks which you preferred. tap one. tap it again to confirm. that's it.",
      icon: <Swords size={22} />,
      visual: (
        <div className="relative rounded-xl border hairline bg-[#0f0f12] p-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-md overflow-hidden border-2 border-zinc-100">
              <Poster movie={MOVIES[0]} />
            </div>
            <div className="rounded-md overflow-hidden border hairline opacity-70">
              <Poster movie={MOVIES[3]} />
            </div>
          </div>
          <div className="mt-3 h-6 flex items-center justify-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">vs.</span>
          </div>
        </div>
      ),
    },
    {
      n: "03",
      title: "see your ranking",
      copy: "a glicko-2 rating engine works behind every tap, reshuffling your list in real time into a true, honest order.",
      icon: <CircleCheck size={22} />,
      visual: (
        <div className="relative rounded-xl border hairline bg-[#0f0f12] p-3 space-y-1.5">
          {MOVIES.slice(0, 4).map((m, i) => {
            const thumb = tmdbPoster(m.poster_path);
            return (
              <div key={m.id} className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-zinc-500 w-5">#{i + 1}</span>
                <div className="relative w-5 h-7 rounded-sm overflow-hidden bg-zinc-800 shrink-0">
                  {thumb && (
                    <Image
                      src={thumb}
                      alt={m.title}
                      fill
                      className="object-cover"
                      sizes="20px"
                      unoptimized
                    />
                  )}
                </div>
                <span className="text-xs text-zinc-200 truncate flex-1">{m.title}</span>
                <span className="text-[10px] font-mono text-zinc-400 tabular-nums">{2400 - i * 47}</span>
              </div>
            );
          })}
        </div>
      ),
    },
  ];

  return (
    <section id="how" className="border-t hairline">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <div>
            <div className="font-mono text-[13px] uppercase tracking-[0.25em] text-zinc-500 mb-3">
              02 / how it works
            </div>
            <h2 className="font-syne font-extrabold text-5xl leading-[0.95] tracking-tight text-zinc-100">
              only a few clicks to a <br />
              <span className="text-zinc-100 underline decoration-zinc-500 decoration-[3px] underline-offset-[8px]">
                perfect list.
              </span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-sm">
            no sliders, no stars, no overthinking. your gut knows which one you liked better — moup just listens.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border hairline bg-[#0d0d10] p-6 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[11px] text-zinc-500">{s.n}</span>
                <div className="w-9 h-9 rounded-lg bg-zinc-900 border hairline text-zinc-300 flex items-center justify-center">
                  {s.icon}
                </div>
              </div>
              <h3 className="font-syne font-extrabold text-2xl text-zinc-100">{s.title}</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{s.copy}</p>
              <div className="mt-6">{s.visual}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
