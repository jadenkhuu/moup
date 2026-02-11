import { fetchMovies } from '@/app/API';
import MovieGrid from '@/components/MovieGrid';

export default async function Home() {
  const initialMovies = await fetchMovies(1);

  return (
    /* pt-20 pushes content down so it starts below the absolute header */
    <div className="flex-1 overflow-y-auto no-scrollbar relative pb-32 pt-20">
      
      {/* STICKY SEARCH BAR
          - top-20: Matches the height of the global header so they flush together
          - z-40: sits below header (z-50) but above cards
      */}
      <div className="sticky top-0 z-40 bg-zinc-900/80 backdrop-blur-md p-4 border-b border-zinc-800">
        <div className="w-full h-12 bg-zinc-800 rounded-lg border border-zinc-700 flex items-center px-4">
          <span className="text-zinc-500">search movies</span>
        </div>
      </div>

      {/* CARD GRID */}
      <MovieGrid initialMovies={initialMovies} />

    </div>
  );
}