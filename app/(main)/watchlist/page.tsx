import { createClient } from '@/lib/supabase/server';
import { Movie } from '@/types/tmdb';
import WatchlistClientPage from './client';

interface WatchlistRow {
  movie_id: number;
  title: string;
  poster_path: string | null;
  overview: string | null;
  release_date: string | null;
  date_added: string;
}

export default async function WatchlistPage() {
  const supabase = await createClient();

  const [{ data: rows, error }, { data: watchedRows }] = await Promise.all([
    supabase
      .from('watchlist')
      .select('movie_id, title, poster_path, overview, release_date, date_added')
      .order('date_added', { ascending: false }),
    supabase.from('watched').select('movie_id'),
  ]);

  if (error) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden relative pt-14 sm:pt-20">
        <div className="z-40 bg-zinc-900/80 backdrop-blur-md px-4 py-2 sm:py-3 border-b border-zinc-800">
          <h1 className="pl-2 font-[family-name:var(--font-syne)] text-zinc-200 font-extrabold text-xl sm:text-2xl tracking-tight">
            watchlist
          </h1>
        </div>
        <div className="flex justify-center text-red-400 mt-10">Failed to load watchlist.</div>
      </div>
    );
  }

  const watchedSet = new Set((watchedRows ?? []).map((r: { movie_id: number }) => r.movie_id));

  const movies = (rows ?? []).map((row: WatchlistRow) => ({
    movie: {
      id: row.movie_id,
      title: row.title,
      poster_path: row.poster_path,
      overview: row.overview ?? '',
      release_date: row.release_date ?? '',
      vote_average: 0,
    } as Movie,
    dateAdded: row.date_added,
    isWatched: watchedSet.has(row.movie_id),
  }));

  return <WatchlistClientPage movies={movies} />;
}
