'use client';

import { useState } from 'react';
import { Search, Star } from 'lucide-react';
import { Movie } from '@/types/tmdb';
import { WatchedMovieCard } from '@/components/WatchedMovieCard';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface WatchedMovie {
  movie: Movie;
  rank: number;
  stars: number;
  rating: number;
  isInWatchlist: boolean;
}

interface WatchedClientPageProps {
  movies: WatchedMovie[];
}

export default function WatchedClientPage({ movies }: WatchedClientPageProps) {
  const [query, setQuery] = useState('');
  const [starFilter, setStarFilter] = useState<string>('*');

  const filtered = movies.filter((m) => {
    const matchesQuery = !query.trim() || m.movie.title.toLowerCase().includes(query.toLowerCase());
    const matchesStars = starFilter === '*' || m.stars === parseInt(starFilter);
    return matchesQuery && matchesStars;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative pt-14 sm:pt-20">
      <div className="z-40 bg-zinc-900/80 backdrop-blur-md px-4 py-2 sm:py-3 border-b border-zinc-800 flex items-center justify-between gap-2">
        <h1 className="pl-2 font-[family-name:var(--font-syne)] text-zinc-200 font-extrabold text-xl sm:text-2xl tracking-tight shrink-0">
          ranking
        </h1>
        <div className="flex items-center">
          <InputGroup className="h-8 w-28 sm:w-44 rounded-r-none border-r-0">
            <InputGroupAddon>
              <Search className="text-zinc-400" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-xs sm:text-sm"
            />
          </InputGroup>
          <Select value={starFilter} onValueChange={setStarFilter}>
            <SelectTrigger size="sm" className="w-[80px] rounded-l-none border-zinc-700 bg-zinc-800/20 dark:bg-zinc-800/20 backdrop-blur-md text-zinc-300 focus:ring-0 focus:ring-offset-0 shrink-0 shadow-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
              {['*', '5', '4', '3', '2', '1'].map((val) => (
                <SelectItem
                  key={val}
                  value={val}
                  className="text-zinc-200 focus:bg-zinc-700 focus:text-zinc-100 cursor-pointer"
                >
                  <span className="flex items-center gap-1">
                    {val === '*' ? '*' : val}
                    <Star className="w-3 h-3 fill-zinc-300 text-zinc-300" />
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto minimal-scrollbar">
        {movies.length === 0 ? (
          <div className="pl-2 pr-5 pt-5 pb-32">
            <div className="flex justify-center text-zinc-400 mt-10">go rate some movies.</div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="pl-2 pr-5 pt-5 pb-32">
            <div className="flex justify-center text-zinc-500 mt-10">
              {query.trim()
                ? `no movies match "${query}"`
                : `no ${starFilter} star movies`}
            </div>
          </div>
        ) : (
          <div className="pl-2 pr-5 pt-5 pb-32">
            <div className="flex flex-col gap-2">
              {filtered.map(({ movie, rank, stars, rating, isInWatchlist }) => (
                <WatchedMovieCard
                  key={movie.id}
                  movie={movie}
                  rank={rank}
                  stars={stars}
                  rating={rating}
                  isInWatchlist={isInWatchlist}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
