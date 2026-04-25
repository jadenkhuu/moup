"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Minus,
  RotateCcw,
  SkipForward,
  Sparkles,
  Star,
} from "lucide-react";
import glicko2 from "glicko2-lite";
import { MOVIES, Movie, STAR_TO_RATING, getYear, tmdbPoster } from "./types";
import { Poster } from "./Poster";

type Ranked = Movie & {
  rating: number;
  rd: number;
  vol: number;
  matches: number;
  delta: number;
  lastChangedRound: number;
};

const FALLBACK_RATING = 1500;
const INITIAL_RD = 350;
const INITIAL_VOL = 0.06;

const buildInitial = (): Ranked[] =>
  MOVIES.map((m) => ({
    ...m,
    rating: STAR_TO_RATING[m.stars] ?? FALLBACK_RATING,
    rd: INITIAL_RD,
    vol: INITIAL_VOL,
    matches: 0,
    delta: 0,
    lastChangedRound: -1,
  }));

// Mirror the real app: pick the highest-RD movie as the target, then
// the opponent whose rating is closest to the target's.
function pickPair(items: Ranked[], blocked: Set<number>): [Ranked, Ranked] {
  const pool = items.filter((m) => !blocked.has(m.id));
  const candidates = pool.length >= 2 ? pool : items;
  const [target] = [...candidates].sort((a, b) => b.rd - a.rd);
  const rest = candidates.filter((m) => m.id !== target.id);
  const opponent = rest.reduce((best, m) =>
    Math.abs(m.rating - target.rating) < Math.abs(best.rating - target.rating)
      ? m
      : best
  );
  return [target, opponent];
}

export function Demo() {
  const [items, setItems] = useState<Ranked[]>(buildInitial);
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const blockedRef = useRef<Set<number>>(new Set());

  const [a, b] = useMemo(
    () => pickPair(items, blockedRef.current),
    [items, round]
  );

  const confirm = (winnerId: number) => {
    const loserId = winnerId === a.id ? b.id : a.id;

    setItems((prev) => {
      const winner = prev.find((m) => m.id === winnerId)!;
      const loser = prev.find((m) => m.id === loserId)!;

      const nw = glicko2(winner.rating, winner.rd, winner.vol, [
        [loser.rating, loser.rd, 1],
      ]);
      const nl = glicko2(loser.rating, loser.rd, loser.vol, [
        [winner.rating, winner.rd, 0],
      ]);

      const prevOrder = [...prev].sort((x, y) => y.rating - x.rating);
      const prevPos = new Map(prevOrder.map((m, i) => [m.id, i]));

      const updated = prev.map((m) => {
        if (m.id === winnerId) {
          return {
            ...m,
            rating: nw.rating,
            rd: nw.rd,
            vol: nw.vol,
            matches: m.matches + 1,
            lastChangedRound: round + 1,
          };
        }
        if (m.id === loserId) {
          return {
            ...m,
            rating: nl.rating,
            rd: nl.rd,
            vol: nl.vol,
            matches: m.matches + 1,
            lastChangedRound: round + 1,
          };
        }
        return m;
      });

      const nextOrder = [...updated].sort((x, y) => y.rating - x.rating);
      const nextPos = new Map(nextOrder.map((m, i) => [m.id, i]));

      return updated.map((m) => {
        if (m.id !== winnerId && m.id !== loserId) return m;
        const old = prevPos.get(m.id) ?? 0;
        const curr = nextPos.get(m.id) ?? 0;
        return { ...m, delta: old - curr };
      });
    });

    blockedRef.current = new Set([winnerId, loserId]);
    setRound((r) => r + 1);
    setSelected(null);
  };

  const pick = (id: number) => {
    if (selected === id) confirm(id);
    else setSelected(id);
  };

  const skip = () => {
    blockedRef.current = new Set([a.id, b.id]);
    setSelected(null);
    setRound((r) => r + 1);
  };

  const reset = () => {
    setItems(buildInitial());
    setRound(0);
    setSelected(null);
    blockedRef.current = new Set();
  };

  const ranked = useMemo(
    () => [...items].sort((x, y) => y.rating - x.rating),
    [items]
  );

  const { minRating, ratingRange } = useMemo(() => {
    const ratings = items.map((m) => m.rating);
    const min = Math.min(...ratings);
    const max = Math.max(...ratings);
    return { minRating: min, ratingRange: Math.max(1, max - min) };
  }, [items]);

  return (
    <section id="demo" className="border-t hairline">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <div>
              <div className="font-mono text-[13px] uppercase tracking-[0.25em] text-zinc-500 mb-3">
                03 / try it out
              </div>
              <h2 className="font-syne font-extrabold text-4xl leading-[0.95] tracking-tight text-zinc-100 select-none">
                don't think too hard. <br />
                <span className="text-zinc-100 underline decoration-zinc-500 decoration-[3px] underline-offset-[8px]">
                  just pick.
                </span>
              </h2>
              <p className="mt-5 text-base text-zinc-400 leading-relaxed max-w-md">
                when you log a movie, a quick 1–5 rating ranks it roughly — comparisons take it
                from there.
              </p>
            </div>

            <div className="rounded-2xl border hairline bg-[#111114] p-6 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                  round {String(round + 1).padStart(2, "0")}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                  <Sparkles size={11} /> {round} match{round === 1 ? "" : "es"} played
                </span>
              </div>

              <p className="text-center text-xs text-zinc-500 font-medium tracking-[0.2em] uppercase mb-4">
                choose one of these two movies
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[a, b].map((m) => {
                  const isSel = selected === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => pick(m.id)}
                      className={`lift rounded-xl overflow-hidden bg-zinc-900/50 border text-left group ${
                        isSel
                          ? "border-white ring-select -translate-y-0.5"
                          : "border-zinc-800/60 hover:border-zinc-700 hover:-translate-y-0.5"
                      }`}
                    >
                      <Poster movie={m} />
                      <div className="px-3 py-2.5">
                        <div className="text-zinc-100 font-bold text-sm leading-tight line-clamp-2">
                          {m.title}
                        </div>
                        <div className="flex items-center gap-1 text-zinc-500 mt-1">
                          <Calendar size={11} />
                          <span className="text-[11px]">{getYear(m.release_date)}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3">
                <button
                  onClick={skip}
                  className="w-full py-2 text-xs font-medium text-zinc-500 hover:text-zinc-300 border hairline hover:border-zinc-600 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  skip <SkipForward size={12} />
                </button>
              </div>

              <div
                className={`mt-3 text-center text-xs text-zinc-400 transition-opacity ${
                  selected ? "opacity-100" : "opacity-0"
                }`}
              >
                click it again to confirm your pick
              </div>
            </div>
          </div>

          <div className="rounded-2xl border hairline bg-[#111114] p-6 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                your live ranking
              </span>
              <button
                onClick={reset}
                disabled={round === 0}
                className="px-2.5 py-1 text-[11px] font-medium text-zinc-500 hover:text-zinc-300 border hairline hover:border-zinc-600 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:hover:text-zinc-500 disabled:hover:border-zinc-800 disabled:cursor-not-allowed"
              >
                reset <RotateCcw size={11} />
              </button>
            </div>

            <div className="relative flex-1 min-h-0">
              <ol className="space-y-1 h-full overflow-y-auto pr-1 moup-scroll">
                {ranked.map((m, i) => {
                  const thumb = tmdbPoster(m.poster_path);
                  const justMoved = m.lastChangedRound === round && round > 0;
                  const delta = justMoved ? m.delta : 0;

                  return (
                    <li
                      key={m.id}
                      className={`relative flex items-center gap-3 rounded-lg p-1.5 transition-colors ${
                        justMoved
                          ? "bg-zinc-900/70 ring-1 ring-zinc-100/10"
                          : "hover:bg-zinc-900/40"
                      }`}
                    >
                      <span className="font-mono text-[11px] text-zinc-500 w-6 tabular-nums">
                        #{String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="relative w-8 h-12 rounded-sm overflow-hidden bg-zinc-800 shrink-0">
                        {thumb && (
                          <Image
                            src={thumb}
                            alt={m.title}
                            fill
                            className="object-cover"
                            sizes="32px"
                            unoptimized
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-zinc-100 truncate">
                          {m.title}
                        </div>
                        <div
                          className="mt-0.5 flex items-center gap-0.5"
                          aria-label={`${m.stars} out of 5 stars`}
                        >
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={10}
                              strokeWidth={1.5}
                              className={
                                s <= m.stars
                                  ? "fill-zinc-300 text-zinc-300"
                                  : "fill-transparent text-zinc-700"
                              }
                            />
                          ))}
                        </div>
                        <div
                          className="mt-1.5 h-px w-full bg-zinc-800/70 overflow-hidden rounded-full"
                          aria-hidden
                        >
                          <div
                            className="h-full bg-zinc-500/60 transition-[width] duration-500 ease-out"
                            style={{
                              width: `${Math.max(
                                3,
                                ((m.rating - minRating) / ratingRange) * 100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 min-w-[66px] justify-end">
                        {justMoved && delta > 0 && (
                          <span className="flex items-center gap-0.5 text-[10px] font-mono text-emerald-300">
                            <ArrowUp size={10} strokeWidth={2.5} />
                            {delta}
                          </span>
                        )}
                        {justMoved && delta < 0 && (
                          <span className="flex items-center gap-0.5 text-[10px] font-mono text-red-300/80">
                            <ArrowDown size={10} strokeWidth={2.5} />
                            {-delta}
                          </span>
                        )}
                        {justMoved && delta === 0 && (
                          <span className="flex items-center text-[10px] font-mono text-zinc-500">
                            <Minus size={10} strokeWidth={2.5} />
                          </span>
                        )}
                        <span className="font-mono text-[11px] text-zinc-300 tabular-nums">
                          {Math.round(m.rating)}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ol>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#111114] to-transparent"
              />
            </div>

            <p className="mt-5 text-sm text-zinc-500">
              {round === 0
                ? "At first, the star rating ranks them into a rough order. Pair comparisons refine them into a precise ranking."
                : `${round} comparison${
                    round === 1 ? "" : "s"
                  } in — the spread grows, the list gets truer.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
