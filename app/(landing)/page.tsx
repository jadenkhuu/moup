"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Calendar,
  Check,
  CircleCheck,
  Film,
  ListPlus,
  Search,
  SkipForward,
  Sparkles,
  Swords,
  User,
  X,
} from "lucide-react";
import demoMoviesData from "./demoMovies.json";

type Movie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
};

const MOVIES: Movie[] = demoMoviesData;

const getYear = (releaseDate: string) =>
  releaseDate ? new Date(releaseDate).getFullYear() : 0;

const tmdbPoster = (path: string | null, size: "w342" | "w500" = "w342") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

const GithubIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Poster = ({ movie }: { movie: Movie }) => {
  const src = tmdbPoster(movie.poster_path);
  return (
    <div className="poster relative w-full aspect-[2/3] overflow-hidden bg-zinc-900">
      {src ? (
        <Image
          src={src}
          alt={movie.title}
          fill
          className="object-cover select-none pointer-events-none"
          sizes="(max-width: 768px) 50vw, 342px"
          unoptimized
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
          No Poster
        </div>
      )}
    </div>
  );
};

function TopNav() {
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

function Hero() {
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

      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-28 grid lg:grid-cols-[1.05fr_1fr] gap-16 items-center relative">
        <div>
          <h1 className="mt-16 font-syne font-extrabold text-[clamp(2.25rem,4.8vw,4.25rem)] leading-[0.95] tracking-tight text-zinc-100">
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
            <a
              href="#how"
              className="inline-flex items-center gap-2 text-zinc-300 rounded-xl px-4 py-3 text-sm font-medium border hairline hover:border-zinc-600 hover:text-zinc-100 transition-colors"
            >
              see how it works
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

function WhyBroken() {
  return (
    <section id="why" className="border-t hairline bg-[#0b0b0d]">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500 mb-4">
              § 01 / why pairwise
            </div>
            <h2 className="font-syne font-extrabold text-5xl leading-[0.95] tracking-tight text-zinc-100">
              the 1–5 star scale <br />
              <span className="text-zinc-100 underline decoration-zinc-500 decoration-[3px] underline-offset-[8px]">
                was never honest.
              </span>
            </h2>
            <p className="mt-6 text-zinc-400 leading-relaxed max-w-md">
              if you give a restaurant a 6/10, everyone assumes something went wrong. since 7/10 is socially
              &quot;average,&quot; you&apos;re realistically ranking everything you like on just three numbers: 8, 9, 10.
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
              <div className="flex items-end justify-between h-28 gap-1 relative">
                {Array.from({ length: 10 }).map((_, i) => {
                  const n = i + 1;
                  const used = n >= 8;
                  return (
                    <div key={n} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className={`w-full rounded-sm ${used ? "bg-zinc-100" : "bg-zinc-800"}`}
                        style={{ height: used ? `${40 + (n - 7) * 22}%` : "18%" }}
                      />
                      <span className={`font-mono text-[10px] ${used ? "text-zinc-200" : "text-zinc-600"}`}>{n}</span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-5 text-xs text-zinc-500">
                realistically only 3 buckets get used — everything else is &quot;bad&quot; or &quot;fine.&quot;
              </p>
            </div>

            <div className="rounded-2xl border hairline bg-[#111114] p-6 relative">
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">the moup way</span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-300/80">
                  <Check size={12} /> honest
                </span>
              </div>
              <div className="space-y-2">
                {MOVIES.slice(0, 6).map((m, i) => {
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
              <p className="mt-5 text-xs text-zinc-500">every film gets a distinct position. no ties, no fake averages.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
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
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500 mb-3">
              § 02 / how it works
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

function Features() {
  const navIcons = [Search, ListPlus, null, CircleCheck, User] as const;

  return (
    <section id="features" className="border-t hairline bg-[#0b0b0d]">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="mb-14">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500 mb-3">§ 03 / features</div>
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
            <p className="mt-3 text-zinc-400 max-w-md">
              the same rating system used for competitive chess. every comparison updates a confidence interval, so your
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
            <h3 className="font-syne font-extrabold text-2xl text-zinc-100">keep a running list</h3>
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
            <h3 className="font-syne font-extrabold text-2xl text-zinc-100">Powered by TMDB</h3>
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

function CTA() {
  return (
    <section id="cta" className="border-t hairline">
      <div className="max-w-[1200px] mx-auto px-6 py-28 text-center relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(closest-side, rgba(255,255,255,.05), transparent 70%)",
            }}
          />
        </div>
        <div className="relative">
          <h2 className="font-syne font-extrabold text-[clamp(2rem,4vw,3.75rem)] leading-[1.05] tracking-tight text-zinc-100 max-w-3xl mx-auto">
            your true top 10
            <br />
            is{" "}
            <span className="text-zinc-100 underline decoration-zinc-500 decoration-[3px] underline-offset-[8px]">
              a few clicks away.
            </span>
          </h2>
          <p className="mt-6 text-zinc-400 max-w-lg mx-auto">
            sign up, add a handful of films you&apos;ve actually seen, and start picking. your real ranking builds itself.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-900 rounded-xl px-6 py-3.5 text-sm font-semibold hover:bg-white transition-all active:scale-[.98]"
            >
              start ranking — it&apos;s free
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <a
              href="https://github.com/jadenkhuu/moup"
              className="inline-flex items-center gap-2 text-zinc-300 rounded-xl px-5 py-3.5 text-sm font-medium border hairline hover:border-zinc-600 hover:text-zinc-100 transition-colors"
            >
              <GithubIcon size={14} /> star on github
            </a>
          </div>
          <div className="mt-8 font-mono text-[11px] text-zinc-600 uppercase tracking-[0.25em]">moup.app</div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
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

export default function LandingPage() {
  return (
    <>
      <TopNav />
      <Hero />
      <WhyBroken />
      <HowItWorks />
      <Features />
      <CTA />
      <Footer />
    </>
  );
}
