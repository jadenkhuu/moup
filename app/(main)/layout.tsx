import { BottomNav } from "@/components/BottomNav";
import { HeaderLogo } from "@/components/HeaderLogo";
import { createClient } from "@/lib/supabase/server";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    /* Main Viewport Wrapper */
    <div className="h-screen w-screen flex justify-center relative">
      
      {/* Main Interface Shell (1000px wide) */}
      <div className="relative h-full w-full max-w-[1000px] bg-zinc-900 shadow-2xl border-x border-zinc-800 flex flex-col">
        
        {/* GLOBAL HEADER */}
        <div className="absolute top-0 left-0 right-0 z-50 h-14 sm:h-20 flex items-center px-6 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 pointer-events-none">
          <HeaderLogo isLoggedIn={Boolean(user)} />
        </div>
        
        {/* Page Content - This is where page.tsx or search/page.tsx renders */}
        {children}

        {/* Persistent Navbar */}
        <BottomNav />
      </div>

    </div>
  );
}