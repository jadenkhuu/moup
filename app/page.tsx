import { BottomNav } from "@/components/BottomNav"

export default function Home() {
  return (

    <div className="h-screen w-screen flex justify-center font-sans bg-zinc-950 overflow-hidden relative">
      <div className="relative h-full w-full max-w-250 bg-zinc-900 shadow-2xl border-x border-zinc-800 flex flex-col">

        <div className="flex-1 overflow-y-auto no-scrollbar p-4 pb-28">
        
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="h-62.5 bg-zinc-800 p-6 rounded-xl border border-zinc-700 text-white">Card 1</div>
            <div className="h-62.5 bg-zinc-800 p-6 rounded-xl border border-zinc-700 text-white">Card 2</div>
            <div className="h-62.5 bg-zinc-800 p-6 rounded-xl border border-zinc-700 text-white">Card 3</div>
            <div className="h-62.5 bg-zinc-800 p-6 rounded-xl border border-zinc-700 text-white">Card 4</div>
            <div className="h-62.5 bg-zinc-800 p-6 rounded-xl border border-zinc-700 text-white">Card 1</div>
            <div className="h-62.5 bg-zinc-800 p-6 rounded-xl border border-zinc-700 text-white">Card 2</div>
            <div className="h-62.5 bg-zinc-800 p-6 rounded-xl border border-zinc-700 text-white">Card 3</div>
            <div className="h-62.5 bg-zinc-800 p-6 rounded-xl border border-zinc-700 text-white">Card 4</div>
            <div className="h-62.5 bg-zinc-800 p-6 rounded-xl border border-zinc-700 text-white">Card 1</div>
            <div className="h-62.5 bg-zinc-800 p-6 rounded-xl border border-zinc-700 text-white">Card 2</div>
            <div className="h-62.5 bg-zinc-800 p-6 rounded-xl border border-zinc-700 text-white">Card 3</div>
            <div className="h-62.5 bg-zinc-800 p-6 rounded-xl border border-zinc-700 text-white">Card 4</div>
            <div className="h-62.5 bg-zinc-800 p-6 rounded-xl border border-zinc-700 text-white">Card 1</div>
            <div className="h-62.5 bg-zinc-800 p-6 rounded-xl border border-zinc-700 text-white">Card 2</div>
            <div className="h-62.5 bg-zinc-800 p-6 rounded-xl border border-zinc-700 text-white">Card 3</div>
            <div className="h-62.5 bg-zinc-800 p-6 rounded-xl border border-zinc-700 text-white">Card 4</div>
          
          </div>

        </div>

        <BottomNav />
        
      </div>
    </div>
  );
}
