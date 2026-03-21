import { createClient } from '@/lib/supabase/server';
import { Movie } from '@/types/tmdb';
import WatchedClientPage from './client';

interface WatchedRow {
  movie_id: number;
  title: string;
  poster_path: string | null;
  overview: string | null;
  release_date: string | null;
  stars: number | null;
  rating: number | null;
  date_watched: string;
}

export default async function WatchedPage() {
  const supabase = await createClient();

  const [{ data: rows, error }, { data: watchlistRows }] = await Promise.all([
    supabase
      .from('watched')
      .select('movie_id, title, poster_path, overview, release_date, stars, rating, date_watched')
      .order('rating', { ascending: false }),
    supabase.from('watchlist').select('movie_id'),
  ]);

  if (error) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden relative pt-14 sm:pt-20">
        <div className="z-40 bg-zinc-900/80 backdrop-blur-md px-4 py-2 sm:py-3 border-b border-zinc-800">
          <h1 className="pl-2 font-[family-name:var(--font-syne)] text-zinc-200 font-extrabold text-xl sm:text-2xl tracking-tight">
            ranking
          </h1>
        </div>
        <div className="flex justify-center text-red-400 mt-10">Failed to load watched movies.</div>
      </div>
    );
  }

  const watchlistSet = new Set((watchlistRows ?? []).map((r: { movie_id: number }) => r.movie_id));
  const sorted = (rows ?? []) as WatchedRow[];

  let rank = 1;
  const movies = sorted.map((row, i) => {
    if (i > 0 && (row.rating ?? 0) < (sorted[i - 1].rating ?? 0)) {
      rank = i + 1;
    }
    return {
      movie: {
        id: row.movie_id,
        title: row.title,
        poster_path: row.poster_path,
        overview: row.overview ?? '',
        release_date: row.release_date ?? '',
        vote_average: 0,
      } as Movie,
      rank,
      stars: row.stars ?? 0,
      rating: row.rating ?? 1500,
      isInWatchlist: watchlistSet.has(row.movie_id),
    };
  });

  return <WatchedClientPage movies={movies} />;
}
