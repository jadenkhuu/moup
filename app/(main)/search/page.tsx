import { fetchMovies } from '@/app/API';
import MovieGrid from '@/components/MovieGrid';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Search } from "lucide-react"

export default async function Home() {
  const initialMovies = await fetchMovies(1);

  return (
    /* 1. OUTER WRAPPER (Fixed)
      - flex-1 flex-col: Takes up all available space.
      - overflow-hidden: Prevents the whole page from scrolling.
      - pt-20: Pushes everything down to clear the absolute Global Header.
    */
    <div className="flex-1 flex flex-col overflow-hidden relative pt-20">
      
      {/* 2. SEARCH BAR (Static)
        - No longer 'sticky'. It just sits at the top of our column.
        - z-40: Ensures it stays above if we add anything else.
      */}
      <div className="z-40 bg-zinc-900/80 backdrop-blur-md p-4 border-b border-zinc-800">
          <InputGroup>
            <InputGroupAddon>
              <Search className='text-zinc-400'/>
            </InputGroupAddon>
            <InputGroupInput placeholder="Search..." />
          </InputGroup>
      </div>

      {/* 3. SCROLLABLE AREA (Dynamic)
        - flex-1: Fills ALL remaining space below the search bar.
        - overflow-y-auto: Only THIS section scrolls.
        - minimal-scrollbar: The scrollbar will now live inside here (starting below the search bar).
      */}
      <div className="flex-1 overflow-y-auto minimal-scrollbar">
        {/* We don't need padding-bottom here because MovieGrid already has pb-32 */}
        <MovieGrid initialMovies={initialMovies} />
      </div>

    </div>
  );
}