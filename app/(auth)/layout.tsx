export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen flex justify-center relative overflow-hidden">
      <div className="relative h-full w-full max-w-[1000px] bg-zinc-900 shadow-2xl border-x border-zinc-800 flex flex-col">

        {/* GLOBAL HEADER */}
        {/* <div className="absolute top-0 left-0 right-0 z-50 h-20 flex items-center px-6 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 pointer-events-none">
          <span className="font-[family-name:var(--font-syne)] text-zinc-200 font-extrabold lg:text-3xl text-2xl tracking-tight">
            moup
          </span>
        </div> */}

        {children}
      </div>
    </div>
  );
}
