export default function Home() {
  return (
    /* flex-1 and overflow-y-auto enables scrolling within the layout shell */
    <div className="flex-1 overflow-y-auto no-scrollbar relative pb-32">
      
      {/* STICKY SEARCH BAR AREA
        - sticky top-0: keeps it pinned during scroll
        - z-20: ensures it stays above the cards
        - bg-zinc-900/80: semi-transparent so you see cards behind it
        - backdrop-blur: premium glass effect
      */}
      <div className="sticky top-0 z-20 bg-zinc-900/80 backdrop-blur-md p-4 border-b border-zinc-800">
        <div className="h-12 mb-4 flex items-center px-2">
          <span className="text-zinc-300 font-bold md:text-2xl text-xl">moup</span>
        </div>
        <div className="w-full h-12 bg-zinc-800 rounded-lg border border-zinc-700 flex items-center px-4">
          <span className="text-zinc-500">search movies</span>
        </div>
      </div>

      {/* CARD GRID AREA */}
      <div className="p-5">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {[...Array(16)].map((_, i) => (
            <div 
              key={i} 
              className="h-[250px] bg-zinc-800 p-6 rounded-xl border border-zinc-700 text-white"
            >
              Card {i + 1}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}