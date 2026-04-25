"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, Calendar, SkipForward } from "lucide-react";
import { MOVIES, getYear } from "./types";
import { Poster } from "./Poster";

export function Hero() {
  // A handcrafted sequence that mirrors how moup actually ranks movies:
  // each new movie gets compared against several already-seen ones, so the
  // same titles recur across rounds (A vs B, A vs C, B vs D, A vs D, ...).
  // Loops forever via `i % pairs.length` to communicate the infinite nature.
  const pairs = useMemo(() => {
    const idx: [number, number][] = [
      [0, 1], // A vs B
      [0, 2], // A vs C
      [1, 3], // B vs D
      [0, 3], // A vs D
      [2, 4], // C vs E
      [1, 4], // B vs E
      [3, 5], // D vs F
      [0, 5], // A vs F
      [4, 6], // E vs G
      [2, 6], // C vs G
      [5, 7], // F vs H
      [1, 7], // B vs H
      [6, 8], // G vs I
      [3, 8], // D vs I
      [7, 9], // H vs J
      [0, 9], // A vs J
      [4, 9], // E vs J
      [8, 2], // I vs C
      [5, 3], // F vs D
      [6, 1], // G vs B
    ];
    return idx.map(([a, b]) => [MOVIES[a], MOVIES[b]] as const);
  }, []);
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
          <h1 className="mt-8 font-syne font-extrabold text-[clamp(2rem,4.2vw,3.75rem)] leading-[0.95] tracking-tight text-zinc-100">
            stop rating movies.
            <br />
            <span className="text-zinc-100 underline decoration-zinc-500 decoration-[3px] underline-offset-[10px]">
              start comparing them.
            </span>
          </h1>

          <div className="mt-8 flex items-center gap-3">
            <span className="font-syne font-extrabold text-2xl text-zinc-100 tracking-tight">moup</span>
            <span className="h-5 w-px bg-zinc-700" />
            <span className="text-base text-zinc-500">
              <span className="text-zinc-200">m</span>ovies{" "}
              <span className="text-zinc-200">o</span>rdered{" "}
              <span className="text-zinc-200">u</span>sing{" "}
              <span className="text-zinc-200">p</span>airwise
            </span>
          </div>

          <p className="mt-6 text-lg text-zinc-400 max-w-xl leading-relaxed">
            moup replaces the broken 1–10 rating with a single question:
            <br />
            <span className="text-zinc-200">do you like this or that?</span>
            <br />
            <br />
            quick gut-feeling choices build a perfectly ordered list of your favorite films.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-900 rounded-xl px-5 py-3 text-sm font-semibold hover:bg-white transition-all active:scale-[.98]"
            >
              start ranking — it&apos;s free
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <a
              href="#why"
              className="inline-flex items-center gap-2 text-zinc-300 rounded-xl px-4 py-3 text-sm font-medium border hairline hover:border-zinc-600 hover:text-zinc-100 transition-colors"
            >
              the problem
              <ArrowDown size={14} />
            </a>
            {/* <a
              href="#how"
              className="inline-flex items-center gap-2 text-zinc-300 rounded-xl px-4 py-3 text-sm font-medium border hairline hover:border-zinc-600 hover:text-zinc-100 transition-colors"
            >
              how it works
              <ArrowDown size={14} />
            </a> */}
            {/* <a
              href="#demo"
              className="inline-flex items-center gap-2 text-zinc-300 rounded-xl px-4 py-3 text-sm font-medium border hairline hover:border-zinc-600 hover:text-zinc-100 transition-colors"
            >
              try it out
              <ArrowDown size={14} />
            </a> */}
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
              <div className="font-mono text-[10px] text-zinc-500 tabular-nums tracking-widest">
                <span className="text-zinc-300">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-zinc-700 mx-1">/</span>
                <span className="text-zinc-600">∞</span>
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
                    className={`lift card-enter rounded-xl overflow-hidden bg-zinc-900/50 border text-left group
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
              click it again to confirm your pick
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <a
              href="#demo"
              className="inline-flex items-center gap-2 text-zinc-300 rounded-xl px-4 py-3 text-sm font-medium border hairline hover:border-zinc-600 hover:text-zinc-100 transition-colors"
            >
              try out the real demo
              <ArrowDown size={14} />
            </a>
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
