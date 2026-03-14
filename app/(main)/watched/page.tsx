import { createClient } from '@/lib/supabase/server';
import { Movie } from '@/types/tmdb';
import { WatchedMovieCard } from '@/components/WatchedMovieCard';

export default async function WatchedPage() {
  const supabase = await createClient();

  const { data: rows, error } = await supabase
    .from('watchlist')
    .select('movie_id, title, poster_path, overview, release_date, date_added')
    .order('date_added', { ascending: false });

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative pt-14 sm:pt-20">
      <div className="z-40 bg-zinc-900/80 backdrop-blur-md px-4 py-2 sm:py-3 border-b border-zinc-800">
        <h1 className="pl-2 font-[family-name:var(--font-syne)] text-zinc-200 font-extrabold text-xl sm:text-2xl tracking-tight">
          ranking
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto minimal-scrollbar">
          <div className="pl-2 pr-5 pt-5 pb-32">
          {error && (
            <div className="flex justify-center text-red-400 mt-10">
              Failed to load watched movies.
            </div>
          )}

          {!error && (!rows || rows.length === 0) && (
            <div className="flex justify-center text-zinc-400 mt-10">
              Go rate some movies
            </div>
          )}

          {!error && rows && rows.length > 0 && (
            <div className="flex flex-col gap-2">
              {rows.map((row, i) => {
                const movie: Movie = {
                  id: row.movie_id,
                  title: row.title,
                  poster_path: row.poster_path,
                  overview: row.overview ?? '',
                  release_date: row.release_date ?? '',
                  vote_average: 0,
                };
                return (
                  <WatchedMovieCard
                    key={movie.id}
                    movie={movie}
                    rank={i + 1}
                    isInWatchlist={true}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
