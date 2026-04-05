"use client";

import { usePathname, useRouter } from "next/navigation";

const SEARCH_HOME_RESET = "moup:search-home-reset";

const logoClassName =
  "font-[family-name:var(--font-syne)] text-zinc-200 font-extrabold text-xl sm:text-2xl lg:text-3xl tracking-tight";

export function HeaderLogo({ isLoggedIn }: { isLoggedIn: boolean }) {
  const pathname = usePathname();
  const router = useRouter();

  if (!isLoggedIn) {
    return <span className={logoClassName}>moup</span>;
  }

  const handleClick = () => {
    if (pathname !== "/search") {
      router.push("/search");
      return;
    }

    router.replace("/search");
    document.getElementById("search-scroll-root")?.scrollTo({ top: 0, behavior: "auto" });
    router.refresh();

    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent(SEARCH_HOME_RESET));
    }, 100);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${logoClassName} pointer-events-auto cursor-pointer select-none bg-transparent p-0 border-0 text-left`}
    >
      moup
    </button>
  );
}
