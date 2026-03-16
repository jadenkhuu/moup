import { createClient } from '@/lib/supabase/server';
import { Movie } from '@/types/tmdb';
import { MovieCard } from './MovieCard';

interface WatchlistRow {
  movie_id: number;
  title: string;
  poster_path: string | null;
  overview: string | null;
  release_date: string | null;
  date_added: string;
}

export default async function WatchlistMovieGrid() {
  const supabase = await createClient();

  const [{ data: rows, error }, { data: watchedRows }] = await Promise.all([
    supabase
      .from('watchlist')
      .select('movie_id, title, poster_path, overview, release_date, date_added')
      .order('date_added', { ascending: false }),
    supabase.from('watched').select('movie_id'),
  ]);

  const watchedSet = new Set((watchedRows ?? []).map((r: { movie_id: number }) => r.movie_id));

  if (error) {
    return (
      <div className="p-5 pr-3.25 pb-32">
        <div className="flex justify-center text-red-400 mt-10">
          Failed to load watchlist.
        </div>
      </div>
    );
  }

  if (!rows || rows.length === 0) {
    return (
      <div className="p-5 pr-3.25 pb-32">
        <div className="flex justify-center text-zinc-400 mt-10">
          Get started by adding movies to your watchlist.
        </div>
      </div>
    );
  }

  const movies = (rows as WatchlistRow[]).map((row) => ({
    movie: {
      id: row.movie_id,
      title: row.title,
      poster_path: row.poster_path,
      overview: row.overview ?? '',
      release_date: row.release_date ?? '',
      vote_average: 0,
    } as Movie,
    dateAdded: row.date_added as string,
  }));

  return (
    <div className="p-3 pr-2 sm:p-5 sm:pr-4 pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4">
        {movies.map(({ movie, dateAdded }) => (
          <MovieCard key={movie.id} movie={movie} isInWatchlist={true} isWatched={watchedSet.has(movie.id)} dateAdded={dateAdded} />
        ))}
      </div>
    </div>
  );
}
