'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchMovies } from '@/app/API'; // Make sure this path matches where your server action is
import { Movie } from '@/types/tmdb';
import { MovieCard } from './MovieCard'; // Import the new component

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
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      {/* Loading Trigger */}
      <div ref={ref} className="h-20 w-full flex justify-center items-center mt-4">
        <div className="w-6 h-6 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}