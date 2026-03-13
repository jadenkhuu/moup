import SearchBar from '@/components/SearchBar';
import WatchlistMovieGrid from '@/components/WatchlistMovieGrid';

export default function WatchlistPage() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden relative pt-20">
      <div className="z-40 bg-zinc-900/80 backdrop-blur-md p-4 border-b border-zinc-800">
        <SearchBar />
      </div>

      <div className="flex-1 overflow-y-auto minimal-scrollbar">
        <WatchlistMovieGrid />
      </div>
    </div>
  );
}