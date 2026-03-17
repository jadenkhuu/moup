'use client';

import { useState } from 'react';
import { PairMovieCard } from '@/components/PairMovieCard';
import { Movie } from '@/types/tmdb';

const mockMovieA: Movie = {
  id: 550,
  title: 'Fight Club',
  poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
  vote_average: 8.4,
  release_date: '1999-10-15',
  overview: '',
};

const mockMovieB: Movie = {
  id: 13,
  title: 'Forrest Gump',
  poster_path: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
  vote_average: 8.5,
  release_date: '1994-07-06',
  overview: '',
};

export default function PairPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-6 gap-10"
      onClick={() => setSelected(null)}
    >
      <p className="text-zinc-400 text-sm font-medium tracking-wide uppercase">
        choose one option from below:
      </p>

      <div
        className="flex flex-col items-center gap-4 w-full max-w-sm sm:max-w-l lg:max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
      <div className="flex gap-4 w-full">
        <div className="flex-1">
          <PairMovieCard
            movie={mockMovieA}
            isSelected={selected === mockMovieA.id}
            onClick={() => setSelected(mockMovieA.id)}
          />
        </div>
        <div className="flex-1">
          <PairMovieCard
            movie={mockMovieB}
            isSelected={selected === mockMovieB.id}
            onClick={() => setSelected(mockMovieB.id)}
          />
        </div>
      </div>

      </div>
        <p className={`text-zinc-400 text-sm transition-all duration-300 ${selected !== null ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'}`}>
          click it again to confirm the selection
        </p>
    </div>
  );
}
