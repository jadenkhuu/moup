'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchMovies, searchMovies } from '@/app/API';
import { Movie } from '@/types/tmdb';
import { MovieCard } from './MovieCard'; 

interface MovieGridProps {
  initialMovies: Movie[];
  searchQuery?: string;
  watchlistIds?: number[];
  watchedIds?: number[];
}

export default function MovieGrid({ initialMovies, searchQuery = '', watchlistIds = [], watchedIds = [] }: MovieGridProps) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [page, setPage] = useState(1);
  const watchlistSet = new Set(watchlistIds);
  const watchedSet = new Set(watchedIds);

  const [hasMore, setHasMore] = useState(initialMovies.length === 20);

  const { ref, inView } = useInView();

  const initialMoviesRef = useRef(initialMovies);
  initialMoviesRef.current = initialMovies;

  useEffect(() => {
    setMovies(initialMoviesRef.current);
    setPage(1);
    setHasMore(initialMoviesRef.current.length === 20);
  // Only reset the list when the search query changes, not on every prop re-render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreMovies();
    }
  }, [inView, hasMore]);

  const loadMoreMovies = async () => {
    const nextPage = page + 1;
    const newMovies = searchQuery
      ? await searchMovies(searchQuery, nextPage)
      : await fetchMovies(nextPage);
    
    if (newMovies && newMovies.length > 0) {
      setMovies((prev) => {
        const existingIds = new Set(prev.map(m => m.id));
        const uniqueNewMovies = newMovies.filter(m => !existingIds.has(m.id));
        return [...prev, ...uniqueNewMovies];
      });
      setPage(nextPage);
    }
  };

  return (
    <div className="p-3 pr-2 sm:p-5 sm:pr-4 pb-32">
      {movies.length === 0 ? (
        <div className="flex justify-center text-zinc-400 mt-10">
          No results found for "{searchQuery}"
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} isInWatchlist={watchlistSet.has(movie.id)} isWatched={watchedSet.has(movie.id)} />
          ))}
        </div>
      )}
      
      {/* Loading Trigger */}
      {hasMore && movies.length > 0 && (
        <div ref={ref} className="h-20 w-full flex justify-center items-center mt-4">
          <div className="w-6 h-6 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}