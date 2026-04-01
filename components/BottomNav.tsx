"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Star, ListPlus, Swords, Eye, CircleCheck } from "lucide-react";

export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex justify-center pointer-events-none z-50">
      <nav className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-2 rounded-2xl shadow-2xl pointer-events-auto">
        
        {/* Search (Home) */}
        <NavButton 
          href="/search" 
          icon={<Search size={20} strokeWidth={2} />} 
          label="search" 
          active={pathname === "/search"} 
        />
        
        {/* Watchlist */}
        <NavButton 
          href="/watchlist" 
          icon={<ListPlus size={20} strokeWidth={2} />} 
          label="watchlist" 
          active={pathname === "/watchlist"} 
        />        
      
        {/* Pair Button */}
        <Link href="/pair">
          <button className="flex flex-col items-center justify-center bg-white text-black p-3 rounded-xl hover:bg-zinc-200 transition-all active:scale-95 mx-1 shadow-lg shadow-white/10">
            <Swords size={20} strokeWidth={2} />
          </button>
        </Link>

        {/* Watched */}
        <NavButton 
          href="/watched" 
          icon={<CircleCheck size={20} strokeWidth={2} />} 
          label="rankings" 
          active={pathname === "/watched"} 
        />
        
        {/* Profile */}
        <NavButton 
          href="/profile" 
          icon={<User size={20} strokeWidth={2} />} 
          label="profile" 
          active={pathname === "/profile"} 
        />
                
      </nav>
    </div>
  );
};

interface NavButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavButton = ({ href, icon, label, active = false }: NavButtonProps) => (
  <Link href={href}>
    <button className={`
      p-3 rounded-xl transition-all flex flex-col items-center justify-center min-w-[64px]
      ${active ? 'text-white bg-zinc-800' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'}
    `}>
      {icon}
      <span className="text-[10px] mt-1 font-medium">{label}</span>
    </button>
  </Link>
);