import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GithubIcon } from "./GithubIcon";

export function CTA() {
  return (
    <section id="cta" className="border-t hairline">
      <div className="max-w-[1200px] mx-auto px-6 py-28 text-center relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(closest-side, rgba(255,255,255,.05), transparent 70%)",
            }}
          />
        </div>
        <div className="relative">
          <h2 className="font-syne font-extrabold text-[clamp(2rem,4vw,3.75rem)] leading-[1.05] tracking-tight text-zinc-100 max-w-3xl mx-auto">
            your true top 10
            <br />
            is{" "}
            <span className="text-zinc-100 underline decoration-zinc-500 decoration-[3px] underline-offset-[8px]">
              a few clicks away.
            </span>
          </h2>
          <p className="mt-6 text-zinc-400 max-w-lg mx-auto">
            sign up, add a handful of films you&apos;ve actually seen, and start picking. your real ranking builds itself.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-900 rounded-xl px-6 py-3.5 text-sm font-semibold hover:bg-white transition-all active:scale-[.98]"
            >
              start ranking — it&apos;s free
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <a
              href="https://github.com/jadenkhuu/moup"
              className="inline-flex items-center gap-2 text-zinc-300 rounded-xl px-5 py-3.5 text-sm font-medium border hairline hover:border-zinc-600 hover:text-zinc-100 transition-colors"
            >
              <GithubIcon size={14} /> star on github
            </a>
          </div>
          <div className="mt-8 font-mono text-[11px] text-zinc-600 uppercase tracking-[0.25em]">moup.app</div>
        </div>
      </div>
    </section>
  );
}
