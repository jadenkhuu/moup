import { Home, Search, Plus, User } from "lucide-react";

export const BottomNav = () => {
  return (
    /* Fixed wrapper: 
       - pointer-events-none: so you can click things "behind" the empty space
    */
    <div className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none z-50">
      
      {/* The Dock: 
          - pointer-events-auto: restores clickability to the bar itself 
      */}
      <nav className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-2 rounded-2xl shadow-2xl pointer-events-auto">
        
        <NavButton icon={<Home size={20} />} label="Home" active />
        <NavButton icon={<Search size={20} />} label="Search" />
        
        {/* Action Button */}
        <button className="flex items-center justify-center bg-white text-black p-3 rounded-xl hover:bg-zinc-200 transition-all active:scale-95 mx-1 shadow-lg shadow-white/10">
          <Plus size={22} strokeWidth={3} />
        </button>

        <NavButton icon={<User size={20} />} label="Profile" />
        <NavButton icon={<Search size={20} />} label="Settings" />
        
      </nav>
    </div>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavButton = ({ icon, label, active = false }: NavButtonProps) => (
  <button className={`
    p-3 rounded-xl transition-all flex flex-col items-center justify-center
    ${active ? 'text-white bg-zinc-800' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'}
  `}>
    {icon}
    <span className="text-[10px] mt-1 font-medium">{label}</span>
  </button>
);