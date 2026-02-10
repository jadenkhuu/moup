'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Star, Calendar } from 'lucide-react';
import Image from 'next/image';
import { fetchMovies } from '@/app/API';
import { Movie } from '@/types/tmdb';

interface MovieGridProps {
  initialMovies: Movie[];
}

export default function MovieGrid({ initialMovies }: MovieGridProps) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      loadMoreMovies();
    }
  }, [inView]);

  const loadMoreMovies = async () => {
    const nextPage = page + 1;
    const newMovies = await fetchMovies(nextPage);
    
    if (newMovies?.length > 0) {
      setMovies((prev) => {
        // Prevent duplicate IDs from being added to the state
        const existingIds = new Set(prev.map(m => m.id));
        const uniqueNewMovies = newMovies.filter(m => !existingIds.has(m.id));
        return [...prev, ...uniqueNewMovies];
      });
      setPage(nextPage);
    }
  };

  return (
    <div className="p-5 pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className="h-60 bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 overflow-hidden flex group hover:border-zinc-700/50 transition-all"
          >
            {/* Left: Portrait Poster */}
            <div className="relative w-40 shrink-0 bg-zinc-800">
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                //   sizes="120px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600 text-xs">
                  No Poster
                </div>
              )}
            </div>
            
            {/* Right: Movie Info */}
            <div className="flex-1 p-4 flex flex-col min-w-0 justify-between">
              <div>
                <h3 className="text-white font-bold text-lg line-clamp-2 leading-tight group-hover:text-white transition-colors">
                  {movie.title}
                </h3>
                
                <div className="flex items-center gap-3 mt-2">
                  {/* Rating */}
                  {/* <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-md">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-bold">{movie.vote_average.toFixed(1)}</span>
                  </div> */}
                  
                  {/* Date */}
                  {movie.release_date && (
                    <div className="flex items-center gap-1 text-zinc-500">
                      <Calendar size={14} />
                      <span className="text-sm">
                        {new Date(movie.release_date).getFullYear()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer text or Category */}
              {/* <div className="text-zinc-600 text-[10px] uppercase tracking-widest font-bold">
                Movie
              </div> */}
            </div>
          </div>
        ))}
      </div>
      
      {/* Infinite Scroll Loading Trigger */}
      <div ref={ref} className="h-20 w-full flex justify-center items-center mt-4">
        <div className="w-6 h-6 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}