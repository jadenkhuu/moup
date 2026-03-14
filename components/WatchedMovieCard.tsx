'use client';

import { useState, useTransition } from 'react';
import { Movie } from '@/types/tmdb';
import { Calendar, BookmarkPlus, BookmarkCheck, Info, CirclePlus } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { addToWatchlist, removeFromWatchlist } from '@/app/(main)/watchlist/actions';

interface WatchedMovieCardProps {
  movie: Movie;
  rank: number;
  isInWatchlist?: boolean;
}

function rankColor(rank: number) {
  // if (rank === 1) return 'text-amber-400';
  // if (rank === 2) return 'text-zinc-400';
  // if (rank === 3) return 'text-amber-700';
  return 'text-zinc-400';
}

export const WatchedMovieCard = ({ movie, rank, isInWatchlist = false }: WatchedMovieCardProps) => {
  const [inWatchlist, setInWatchlist] = useState(isInWatchlist);
  const [isPending, startTransition] = useTransition();

  const handleWatchlistToggle = () => {
    const newState = !inWatchlist;
    setInWatchlist(newState);

    startTransition(async () => {
      const result = newState
        ? await addToWatchlist(movie)
        : await removeFromWatchlist(movie.id);

      if (result?.error) {
        setInWatchlist(!newState);
      }
    });
  };

  return (
    <div className="flex items-center gap-5">
      <span className={`font-bold text-xl w-8 text-right shrink-0 tabular-nums ${rankColor(rank)}`}>
        {rank}
      </span>

      <Card className="flex-1 flex flex-row overflow-hidden bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 hover:border-zinc-700 transition-all group gap-0 p-0">

        {/* Poster — 2:3 ratio at h-20 (80px) ≈ 54px wide */}
        <div className="relative w-[54px] min-h-[81px] shrink-0 bg-zinc-800 border-r border-zinc-800/50">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="54px"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600 text-[10px]">
              No Poster
            </div>
          )}
        </div>

        {/* Title + buttons */}
        <div className="flex items-center flex-1 min-w-0 px-3 gap-3">
          <div className="flex flex-col flex-1 min-w-0">
            <p title={movie.title} className="text-zinc-100 font-semibold text-sm leading-snug group-hover:text-white transition-colors">
              {movie.title}
            </p>
            {movie.release_date && (
              <div className="flex items-center gap-1 text-zinc-500">
                <Calendar size={10} />
                <span className="text-[11px]">{new Date(movie.release_date).getFullYear()}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={`https://www.themoviedb.org/movie/${movie.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-7 w-7 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 border border-zinc-700/50"
                  >
                    <Info size={14} strokeWidth={2.5} />
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>View more on TMDB</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  disabled={isPending}
                  onClick={handleWatchlistToggle}
                  className={
                    inWatchlist
                      ? "h-7 w-7 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-colors"
                      : "h-7 w-7 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 border border-zinc-700/50"
                  }
                >
                  {inWatchlist
                    ? <BookmarkCheck size={14} strokeWidth={2.5} />
                    : <BookmarkPlus size={14} strokeWidth={2.5} />
                  }
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-7 w-7 rounded-lg bg-zinc-800 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-400/10 border border-zinc-700/50"
                >
                  <CirclePlus size={14} strokeWidth={2.5} />
                </Button>
              </TooltipTrigger>
              <TooltipContent><p>Mark as Watched</p></TooltipContent>
            </Tooltip>
          </div>
        </div>
      </Card>
    </div>
  );
};
