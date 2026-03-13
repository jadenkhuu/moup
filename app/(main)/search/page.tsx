import MovieGrid from '@/components/MovieGrid';
import SearchBar from '@/components/SearchBar';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Search } from "lucide-react"
import { fetchMovies, searchMovies } from '@/app/API';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  const initialMovies = query ? await searchMovies(query, 1) : await fetchMovies(1);

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative pt-20">
      <div className="z-40 bg-zinc-900/80 backdrop-blur-md p-4 border-b border-zinc-800">
          <SearchBar />
      </div>

      {/* 3. SCROLLABLE AREA
        - flex-1: Fills ALL remaining space below the search bar.
        - overflow-y-auto: Only THIS section scrolls.
        - minimal-scrollbar: The scrollbar will now live inside here (starting below the search bar).
      */}
      <div className="flex-1 overflow-y-auto minimal-scrollbar">
        <MovieGrid initialMovies={initialMovies} searchQuery={query} />      
      </div>
    </div>
  );
}