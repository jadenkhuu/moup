'use client';

import { useState, useTransition } from 'react';
import { Movie } from '@/types/tmdb';
import { Calendar, BookmarkPlus, BookmarkCheck, Info, CirclePlus, CircleCheck } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MovieModal } from './MovieModal';
import { RatingDialog } from './RatingDialog';
import { addToWatchlist, removeFromWatchlist } from '@/app/(main)/watchlist/actions';
import { addToWatched } from '@/app/(main)/watched/actions';

interface MovieCardProps {
  movie: Movie;
  isInWatchlist?: boolean;
  isWatched?: boolean;
  dateAdded?: string;
}

export const MovieCard = ({ movie, isInWatchlist = false, isWatched: initialIsWatched = false, dateAdded }: MovieCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(isInWatchlist);
  const [isWatched, setIsWatched] = useState(initialIsWatched);
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
    <>
      <Card className="h-44 sm:h-60 w-full flex flex-row overflow-hidden bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 hover:border-zinc-700 transition-all group gap-0 p-0">
        
        <div className="relative w-28 sm:w-40 shrink-0 bg-zinc-800 border-r border-zinc-800/50">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover duration-500"
              sizes="160px"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600 text-xs">
              No Poster
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <CardHeader className="p-3 pb-1 sm:p-4 sm:pb-2">
            <CardTitle title={movie.title} className="text-zinc-100 font-bold text-sm sm:text-lg leading-tight group-hover:text-white transition-colors">
              {movie.title}
            </CardTitle>
            
            <div className="flex items-center gap-2">
              {movie.release_date && (
                <div className="flex items-center gap-1 text-zinc-500">
                  <Calendar size={12} />
                  <span className="text-xs">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                </div>
              )}
              {dateAdded && (
                <div className="flex items-center gap-1 text-zinc-600">
                  <span className="text-xs">·</span>
                  <span className="text-xs">
                    Added {new Date(dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="px-3 py-1 sm:px-4 flex-1 min-h-0 overflow-hidden">
            <p className="text-zinc-400 text-xs line-clamp-3 sm:line-clamp-5 leading-relaxed">
              {movie.overview || "No overview available."}
            </p>
          </CardContent>

          <CardFooter className="p-3 pt-2 sm:p-4 sm:pt-4 flex justify-end gap-2 shrink-0">
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
                      className="h-8 w-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 border border-zinc-700/50"
                    >
                      <Info size={16} strokeWidth={2.5} />
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
                        ? "h-8 w-8 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-colors"
                        : "h-8 w-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 border border-zinc-700/50"
                    }
                  >
                    {inWatchlist
                      ? <BookmarkCheck size={16} strokeWidth={2.5} />
                      : <BookmarkPlus size={16} strokeWidth={2.5} />
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
                    onClick={() => setIsRatingOpen(true)}
                    className={
                      isWatched
                        ? "h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 transition-colors"
                        : "h-8 w-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-400/10 border border-zinc-700/50"
                    }
                  >
                    {isWatched
                      ? <CircleCheck size={16} strokeWidth={2.5} />
                      : <CirclePlus size={16} strokeWidth={2.5} />
                    }
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>{isWatched ? 'Watched' : 'Mark as Watched'}</p></TooltipContent>
              </Tooltip>
          </CardFooter>
        </div>
      </Card>

      <MovieModal 
        movie={movie} 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />

      <RatingDialog
        open={isRatingOpen}
        onOpenChange={setIsRatingOpen}
        movieTitle={movie.title}
        onConfirm={(rating) => {
          startTransition(async () => {
            const result = await addToWatched(movie, rating);
            if (!result?.error) setIsWatched(true);
          });
        }}
      />
    </>
  );
};
