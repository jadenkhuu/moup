'use client';

import { useState, useEffect, useRef } from 'react';
import { Loader2, SkipForward } from 'lucide-react';
import { PairMovieCard } from '@/components/PairMovieCard';
import { getMatchupQueue, resolveMatch, MatchupPair } from './actions';

export default function PairPage() {
  const [matchQueue, setMatchQueue] = useState<MatchupPair[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const isReplenishingRef = useRef(false);

  useEffect(() => {
    getMatchupQueue(3).then((result) => {
      if ('error' in result) {
        setErrorMsg(result.error);
      } else {
        setMatchQueue(result);
      }
      setIsLoading(false);
    });
  }, []);

  // Silently top off the queue when it gets low
  useEffect(() => {
    if (isLoading || matchQueue.length > 1 || errorMsg) return;
    if (isReplenishingRef.current) return;

    isReplenishingRef.current = true;
    getMatchupQueue(3).then((result) => {
      if (!('error' in result) && result.length > 0) {
        setMatchQueue((prev) => [...prev, ...result]);
      }
      isReplenishingRef.current = false;
    });
  }, [matchQueue.length, isLoading, errorMsg]);

  const handleConfirm = (winnerId: number, loserId: number) => {
    // Instantly advance to the next pair — no loading state
    setMatchQueue((prev) => prev.slice(1));
    setSelected(null);

    // Fire-and-forget: process the vote in the background
    resolveMatch(winnerId, loserId);
  };

  const handleCardClick = (clickedId: number) => {
    if (isLoading) return;

    const current = matchQueue[0];
    if (!current) return;

    if (selected === clickedId) {
      const otherId = clickedId === current.target.id ? current.opponent.id : current.target.id;
      handleConfirm(clickedId, otherId);
    } else {
      setSelected(clickedId);
    }
  };

  const current = matchQueue[0];

  return (
    <div
      className="flex-1 flex flex-col overflow-hidden relative pt-14 sm:pt-20"
      onClick={() => setSelected(null)}
    >
      <div className="z-40 bg-zinc-900/80 backdrop-blur-md px-4 py-2 sm:py-3 border-b border-zinc-800">
        <h1 className="pl-2 font-[family-name:var(--font-syne)] text-zinc-200 font-extrabold text-xl sm:text-2xl tracking-tight">
          pairwise
        </h1>
      </div>

      <div
        className="flex-1 flex flex-col items-center px-6 gap-6 pt-10 sm:pt-8 sm:px-15 sm:pb-15 lg:pt-5"
        onClick={() => setSelected(null)}
      >
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="animate-spin text-zinc-400" size={32} />
          </div>
        ) : errorMsg ? (
          <div className="flex-1 flex flex-col items-center gap-3 text-center">
            {/* <p className="text-zinc-300 font-semibold">Not enough movies yet</p> */}
            <p className="flex justify-center text-zinc-400 mt-10">
              add at least 2 movies to your watched list to start ranking them against each other.
            </p>
          </div>
        ) : current ? (
          <>
            <p className="text-zinc-400 text-sm font-medium tracking-wide uppercase">
              choose one option from below:
            </p>

            <div
              className="flex flex-col items-center gap-3 w-full max-w-sm sm:max-w-l lg:max-w-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex gap-4 w-full">
                <div className="flex-1">
                  <PairMovieCard
                    movie={current.target}
                    isSelected={selected === current.target.id}
                    onClick={() => handleCardClick(current.target.id)}
                  />
                </div>
                <div className="flex-1">
                  <PairMovieCard
                    movie={current.opponent}
                    isSelected={selected === current.opponent.id}
                    onClick={() => handleCardClick(current.opponent.id)}
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  setMatchQueue((prev) => prev.slice(1));
                  setSelected(null);
                }}
                className="w-full py-2 text-sm font-medium text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-600 rounded-lg bg-transparent hover:bg-zinc-800/40 transition-all duration-200 tracking-wide"
              >
                skip
                <SkipForward size={14} className="inline-block mx-1.5 -mt-0.5" />
              </button>

              <p
                className={`text-zinc-400 text-sm font-medium tracking-wide transition-all duration-300 ${
                  selected !== null
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-1 pointer-events-none'
                }`}
              >
                click it again to confirm the selection
              </p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
