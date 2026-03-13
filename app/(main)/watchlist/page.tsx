import SearchBar from '@/components/SearchBar';
import WatchlistMovieGrid from '@/components/WatchlistMovieGrid';

export default function WatchlistPage() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden relative pt-20">
      {/* <div className="z-40 bg-zinc-900/80 backdrop-blur-md p-4 border-b border-zinc-800">
        <SearchBar />
      </div> */}

      <div className="z-40 bg-zinc-900/80 backdrop-blur-md px-4 py-3 border-b border-zinc-800">
        <h1 className="font-[family-name:var(--font-syne)] text-zinc-200 font-extrabold text-2xl tracking-tight">
          watchlist
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto minimal-scrollbar">
        <WatchlistMovieGrid />
      </div>
    </div>
  );
}