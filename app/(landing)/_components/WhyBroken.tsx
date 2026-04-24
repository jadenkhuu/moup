import Image from "next/image";
import { Calendar, Check, X } from "lucide-react";
import { MOVIES, getYear, tmdbPoster } from "./types";

export function WhyBroken() {
  return (
    <section id="why" className="border-t hairline bg-[#0b0b0d]">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500 mb-4">
              § 01 / why pairwise
            </div>
            <h2 className="font-syne font-extrabold text-5xl leading-[0.95] tracking-tight text-zinc-100">
              the 1–10 scale <br />
              <span className="text-zinc-100 underline decoration-zinc-500 decoration-[3px] underline-offset-[8px]">
                was never honest.
              </span>
            </h2>
            <p className="mt-6 text-zinc-400 leading-relaxed max-w-md">
              if you rate a restaurant a 6/10, everyone assumes something went wrong.
            </p>
            <p className="mt-6 text-zinc-400 leading-relaxed max-w-md">
              7/10 is socially &quot;average,&quot; you&apos;re realistically ranking everything you like on just three numbers: 8, 9, 10.
            </p>
            <p className="mt-4 text-zinc-400 leading-relaxed max-w-md">
              and if you try to manually sort 20+ movies, it feels like spreadsheet work. moup makes the ordering a game.
            </p>
          </div>
          <div className="space-y-10">
            <div className="rounded-2xl border hairline bg-[#111114] p-6">
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                  the traditional way
                </span>
                <span className="flex items-center gap-1.5 text-xs text-red-300/80">
                  <X size={12} /> broken
                </span>
              </div>

              <div className="flex items-center justify-between py-6">
                {Array.from({ length: 10 }).map((_, i) => {
                  const n = i + 1;
                  const used = n >= 8;
                  return (
                    <span
                      key={n}
                      className={`font-mono text-2xl tabular-nums ${
                        used
                          ? "text-zinc-100 font-medium"
                          : "text-zinc-700 line-through decoration-zinc-700 decoration-2"
                      }`}
                    >
                      {n}
                    </span>
                  );
                })}
              </div>

              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-600 mb-4">
                <span>never actually used</span>
                <span className="text-zinc-400">the only real options</span>
              </div>

              <p className="text-sm text-zinc-400">
                realistically only these ratings get used — 7 becomes &quot;fine.&quot; and anything below becomes &quot;bad.&quot;
              </p>
            </div>

            <div className="rounded-2xl border hairline bg-[#111114] p-6 relative">
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">the moup way</span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-300/80">
                  <Check size={12} /> honest
                </span>
              </div>
              <div className="relative">
                <div className="h-[400px] overflow-y-auto pr-1 space-y-2 moup-scroll">
                  {MOVIES.map((m, i) => {
                    const thumb = tmdbPoster(m.poster_path);
                    return (
                      <div key={m.id} className="flex items-center gap-3 rounded-lg hover:bg-zinc-900/40 p-1.5">
                        <span className="font-mono text-[11px] text-zinc-500 w-6">#{String(i + 1).padStart(2, "0")}</span>
                        <div className="relative w-9 h-14 rounded-sm overflow-hidden bg-zinc-800 shrink-0">
                          {thumb && (
                            <Image
                              src={thumb}
                              alt={m.title}
                              fill
                              className="object-cover"
                              sizes="36px"
                              unoptimized
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-zinc-100 truncate">{m.title}</div>
                          <div className="flex items-center gap-1 text-zinc-500">
                            <Calendar size={10} />
                            <span className="text-[10px] font-mono">{getYear(m.release_date)}</span>
                          </div>
                        </div>
                        <div className="font-mono text-[11px] text-zinc-400 tabular-nums">
                          {(2400 - i * 47 - i * i * 3).toString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#111114] to-transparent"
                />
              </div>
              <p className="mt-5 text-sm text-zinc-400">every film gets a distinct position. no ties, no fake averages.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
