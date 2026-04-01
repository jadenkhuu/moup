'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Movie } from '@/types/tmdb';
import { MovieCard } from '@/components/MovieCard';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';

interface WatchlistMovie {
  movie: Movie;
  dateAdded: string;
  isWatched: boolean;
}

interface WatchlistClientPageProps {
  movies: WatchlistMovie[];
}

export default function WatchlistClientPage({ movies }: WatchlistClientPageProps) {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? movies.filter((m) => m.movie.title.toLowerCase().includes(query.toLowerCase()))
    : movies;

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative pt-14 sm:pt-20">
      <div className="z-40 bg-zinc-900/80 backdrop-blur-md px-4 py-2 sm:py-3 border-b border-zinc-800 flex items-center justify-between gap-4">
        <h1 className="pl-2 font-[family-name:var(--font-syne)] text-zinc-200 font-extrabold text-xl sm:text-2xl tracking-tight shrink-0">
          watchlist
        </h1>
        <InputGroup className="h-8 w-36 sm:w-44">
          <InputGroupAddon>
            <Search className="text-zinc-400" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-base sm:text-sm"
          />
        </InputGroup>
      </div>

      <div className="flex-1 overflow-y-auto minimal-scrollbar pb-32">
        {movies.length === 0 ? (
          <div className="p-5 pr-3.25 pb-32">
            <div className="flex flex-col items-center gap-1.5 text-center text-zinc-400 mt-16">
              <p>track the movies you plan to watch.</p>
              <p>get started by adding movies to your watchlist.</p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-5 pr-3.25 pb-32">
            <div className="flex justify-center text-zinc-500 mt-10">
              no movies match &ldquo;{query}&rdquo;
            </div>
          </div>
        ) : (
          <div className="p-3 pr-2 sm:p-5 sm:pr-4 pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4">
              {filtered.map(({ movie, dateAdded, isWatched }) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isInWatchlist={true}
                  isWatched={isWatched}
                  dateAdded={dateAdded}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
