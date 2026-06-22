import MovieGrid from '@/components/MovieGrid';
import SearchBar from '@/components/SearchBar';
import CategorySelect from '@/components/CategorySelect';
import { fetchMovies, searchMovies } from '@/app/API';
import { createClient } from '@/lib/supabase/server';
import { MovieCategory } from '@/types/tmdb';

const VALID_CATEGORIES: MovieCategory[] = ['popular', 'now_playing', 'upcoming', 'top_rated'];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  const category: MovieCategory = VALID_CATEGORIES.includes(resolvedParams.category as MovieCategory)
    ? (resolvedParams.category as MovieCategory)
    : 'popular';

  const [initialMovies, supabase] = await Promise.all([
    query ? searchMovies(query, 1) : fetchMovies(1, category),
    createClient(),
  ]);

  const [{ data: watchlistRows }, { data: watchedRows }] = await Promise.all([
    supabase.from('watchlist').select('movie_id'),
    supabase.from('watched').select('movie_id'),
  ]);

  const watchlistIds = watchlistRows?.map((row: { movie_id: number }) => row.movie_id) ?? [];
  const watchedIds = watchedRows?.map((row: { movie_id: number }) => row.movie_id) ?? [];

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative pt-14 sm:pt-20">
      <div className="z-40 bg-zinc-900/80 backdrop-blur-md p-4 py-2 sm:p-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <SearchBar />
            </div>
            <CategorySelect />
          </div>
      </div>

      <div className="flex-1 overflow-y-auto minimal-scrollbar">
        <MovieGrid initialMovies={initialMovies} searchQuery={query} category={category} watchlistIds={watchlistIds} watchedIds={watchedIds} />
      </div>
    </div>
  );
}
