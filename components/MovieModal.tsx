'use client';

import { useState, useEffect } from 'react';
import { Movie, MovieDetails } from '@/types/tmdb';
import { fetchMovieById } from '@/app/API';
import { Calendar, Clock, Star, BookmarkPlus, Eye, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface MovieModalProps {
  movie: Movie;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MovieModal = ({ movie, isOpen, onOpenChange }: MovieModalProps) => {
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && !details) {
      setIsLoading(true);
      fetchMovieById(movie.id).then((data) => {
        setDetails(data);
        setIsLoading(false);
      });
    }
  }, [isOpen, movie.id, details]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-950 border-zinc-800 text-zinc-100 max-w-[800px] sm:max-w-5xl md:max-w-6xl h-[85vh] p-0 flex flex-col overflow-hidden rounded-xl">
        <DialogTitle className="sr-only">{movie.title} Details</DialogTitle>
        <DialogDescription className="sr-only">Detailed information about {movie.title}</DialogDescription>
        
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          </div>
        ) : details ? (
          <div className="flex flex-col sm:flex-row h-full w-full overflow-hidden">
            <div className="w-full sm:w-2/5 md:w-1/3 p-6 flex flex-col gap-5 overflow-y-auto minimal-scrollbar border-r border-zinc-800/50 bg-zinc-900/20 shrink-0">
              
              {/* Main Poster */}
              {/* {details.poster_path ? (
                <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden border border-zinc-800 shadow-lg shrink-0">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                    alt={`${details.title} Poster`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-full aspect-[2/3] flex items-center justify-center bg-zinc-800 text-zinc-600 rounded-lg shrink-0 border border-zinc-700">
                  No Poster
                </div>
              )} */}

              {/* {details.backdrop_path && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-zinc-800 shadow-lg shrink-0">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${details.backdrop_path}`}
                    alt={`${details.title} Backdrop`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                </div>
              )} */}
            </div>

            {/* 2. RIGHT COLUMN: Details & Blurb Box */}
            <div className="flex flex-col flex-1 overflow-hidden p-6 bg-zinc-950">
              
              {/* Top Meta Info (Fixed) */}
              <div className="shrink-0 space-y-4 mb-6">
                <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-zinc-50">
                  {details.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 font-medium">
                  {details.release_date && (
                    <div className="flex items-center gap-1.5 bg-zinc-900/50 px-2.5 py-1 rounded-md border border-zinc-800">
                      <Calendar size={14} className="text-zinc-300" />
                      {new Date(details.release_date).getFullYear()}
                    </div>
                  )}
                  {details.runtime > 0 && (
                    <div className="flex items-center gap-1.5 bg-zinc-900/50 px-2.5 py-1 rounded-md border border-zinc-800">
                      <Clock size={14} className="text-zinc-300" />
                      {details.runtime} min
                    </div>
                  )}
                  {details.vote_average > 0 && (
                    <div className="flex items-center gap-1.5 bg-zinc-900/50 text-zinc-300 px-2.5 py-1 rounded-md border border-zinc-800">
                      <Star size={14} fill="currentColor" />
                      {details.vote_average.toFixed(1)}/10
                    </div>
                  )}
                </div>

                {details.genres && details.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {details.genres.map(genre => (
                      <span key={genre.id} className="px-3 py-1.5 rounded-full bg-zinc-800/80 text-xs font-medium text-zinc-200 border border-zinc-700/50">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Large Blurb Box (Scrollable) 
                  flex-1 makes it stretch to fill all remaining empty vertical space 
              */}
              <div className="flex-1 overflow-y-auto minimal-scrollbar bg-zinc-900/30 border border-zinc-800/60 rounded-xl p-5 shadow-inner">
                <h3 className="text-zinc-100 font-semibold mb-3 text-lg flex items-center gap-2">
                  Overview
                </h3>
                <p className="text-base text-zinc-300 leading-relaxed">
                  {details.overview || "No overview available."}
                </p>
              </div>

              {/* Action Buttons (Fixed to bottom) */}
              <div className="shrink-0 flex justify-end gap-3 mt-6 pt-4 border-t border-zinc-800/50">
                <Button variant="secondary" className="bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 border border-zinc-700/50 gap-2 px-5">
                  <BookmarkPlus size={18} />
                  Watchlist
                </Button>

                <Button variant="secondary" className="bg-zinc-800 text-zinc-300 hover:text-emerald-400 hover:bg-emerald-400/10 border border-zinc-700/50 gap-2 px-5">
                  <Eye size={18} />
                  Watched
                </Button>
              </div>

            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-500">Failed to load details.</div>
        )}
      </DialogContent>
    </Dialog>
  );
};