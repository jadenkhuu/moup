import { createClient } from '@/lib/supabase/server';
import { Movie } from '@/types/tmdb';
import { WatchedMovieCard } from './WatchedMovieCard';

interface WatchedRow {
  movie_id: number;
  title: string;
  poster_path: string | null;
  overview: string | null;
  release_date: string | null;
  stars: number | null;
  date_watched: string;
}

export default async function WatchedMovieGrid() {
  const supabase = await createClient();

  const [{ data: rows, error }, { data: watchlistRows }] = await Promise.all([
    supabase
      .from('watched')
      .select('movie_id, title, poster_path, overview, release_date, stars, date_watched')
      .order('date_watched', { ascending: false }),
    supabase.from('watchlist').select('movie_id'),
  ]);

  const watchlistSet = new Set((watchlistRows ?? []).map((r: { movie_id: number }) => r.movie_id));

  if (error) {
    return (
      <div className="pl-2 pr-5 pt-5 pb-32">
        <div className="flex justify-center text-red-400 mt-10">
          Failed to load watched movies.
        </div>
      </div>
    );
  }

  if (!rows || rows.length === 0) {
    return (
      <div className="pl-2 pr-5 pt-5 pb-32">
        <div className="flex justify-center text-zinc-400 mt-10">
          go rate some movies.
        </div>
      </div>
    );
  }

  const movies = (rows as WatchedRow[]).map((row, i) => ({
    movie: {
      id: row.movie_id,
      title: row.title,
      poster_path: row.poster_path,
      overview: row.overview ?? '',
      release_date: row.release_date ?? '',
      vote_average: 0,
    } as Movie,
    rank: i + 1,
    stars: row.stars ?? 0,
  }));

  return (
    <div className="pl-2 pr-5 pt-5 pb-32">
      <div className="flex flex-col gap-2">
        {movies.map(({ movie, rank, stars }) => (
          <WatchedMovieCard key={movie.id} movie={movie} rank={rank} stars={stars} isInWatchlist={watchlistSet.has(movie.id)} />
        ))}
      </div>
    </div>
  );
}
