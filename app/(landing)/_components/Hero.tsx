"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, Calendar, SkipForward } from "lucide-react";
import { MOVIES, getYear } from "./types";
import { Poster } from "./Poster";

export function Hero() {
  const pairs = useMemo(
    () => [
      [MOVIES[0], MOVIES[1]],
      [MOVIES[2], MOVIES[3]],
      [MOVIES[4], MOVIES[5]],
      [MOVIES[6], MOVIES[7]],
      [MOVIES[8], MOVIES[9]],
    ],
    []
  );
  const [i, setI] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const current = pairs[i % pairs.length];

  const pick = (id: number) => {
    if (selected === id) {
      setI((p) => p + 1);
      setSelected(null);
    } else {
      setSelected(id);
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(closest-side, rgba(255,255,255,.06), transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pt-14 pb-28 grid lg:grid-cols-[1.05fr_1fr] gap-16 items-center relative">
        <div>
          <h1 className="mt-8 font-syne font-extrabold text-[clamp(2.25rem,4.8vw,4.25rem)] leading-[0.95] tracking-tight text-zinc-100">
            stop rating movies.
            <br />
            <span className="text-zinc-100 underline decoration-zinc-500 decoration-[3px] underline-offset-[10px]">
              start comparing them.
            </span>
          </h1>

          <p className="mt-8 text-lg text-zinc-400 max-w-xl leading-relaxed">
            moup replaces the broken 1–5 star scale with a single question:
            <br />
            <span className="text-zinc-200">do you like this one more than that one?</span>
            <br />
            <br /> quick gut-feeling picks build a perfectly ordered list of your favorite films.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-900 rounded-xl px-5 py-3 text-sm font-semibold hover:bg-white transition-all active:scale-[.98]"
            >
              start ranking — it&apos;s free
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            {/* <a
              href="#why"
              className="inline-flex items-center gap-2 text-zinc-300 rounded-xl px-4 py-3 text-sm font-medium border hairline hover:border-zinc-600 hover:text-zinc-100 transition-colors"
            >
              the problem
              <ArrowDown size={14} />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 text-zinc-300 rounded-xl px-4 py-3 text-sm font-medium border hairline hover:border-zinc-600 hover:text-zinc-100 transition-colors"
            >
              how it works
              <ArrowDown size={14} />
            </a> */}
            <a
              href="#demo"
              className="inline-flex items-center gap-2 text-zinc-300 rounded-xl px-4 py-3 text-sm font-medium border hairline hover:border-zinc-600 hover:text-zinc-100 transition-colors"
            >
              try it out
              <ArrowDown size={14} />
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 text-xs text-zinc-500 font-mono uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-zinc-500" />
              no ads
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-zinc-500" />
              no algorithm
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-zinc-500" />
              open source
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-3xl border hairline bg-[#111114] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="font-syne font-extrabold text-zinc-200">moup</span>
                <span className="text-zinc-600">/</span>
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">pairwise</span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
              </div>
            </div>

            <p className="text-center text-xs text-zinc-500 font-medium tracking-[0.2em] uppercase mb-5">
              choose one option from below
            </p>

            <div className="grid grid-cols-2 gap-4">
              {current.map((m) => {
                const isSel = selected === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => pick(m.id)}
                    className={`lift rounded-xl overflow-hidden bg-zinc-900/50 border text-left group
                      ${
                        isSel
                          ? "border-white ring-select -translate-y-2 scale-[1.03]"
                          : "border-zinc-800/60 hover:border-zinc-700 hover:-translate-y-0.5"
                      }`}
                  >
                    <Poster movie={m} />
                    <div className="px-3 py-2.5">
                      <div className="text-zinc-100 font-bold text-sm leading-tight line-clamp-2">{m.title}</div>
                      <div className="flex items-center gap-1 text-zinc-500 mt-1">
                        <Calendar size={11} />
                        <span className="text-[11px]">{getYear(m.release_date)}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                setI(i + 1);
                setSelected(null);
              }}
              className="mt-3 w-full py-2 text-xs font-medium text-zinc-500 hover:text-zinc-300 border hairline hover:border-zinc-600 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              skip <SkipForward size={12} />
            </button>

            <div
              className={`mt-3 text-center text-xs text-zinc-400 transition-opacity ${
                selected ? "opacity-100" : "opacity-0"
              }`}
            >
              click it again to confirm the selection
            </div>
          </div>

          <div className="hidden lg:flex absolute -left-8 top-1/2 -translate-y-1/2 items-center gap-2 -rotate-90 origin-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">live demo</span>
            <span className="w-8 h-px bg-zinc-800" />
          </div>
        </div>
      </div>
    </section>
  );
}
