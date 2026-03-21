import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/app/(auth)/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-6">
      <div className="w-full max-w-sm flex flex-col gap-8">

        {/* Title */}
        <div className="flex flex-col gap-1">
          <h1 className="font-[family-name:var(--font-syne)] text-zinc-200 font-extrabold text-4xl tracking-tight">
            moup
          </h1>
          <p className="text-zinc-500 text-sm">Sign in to your account</p>
        </div>

        {/* Form */}
        <form action={login} className="flex flex-col gap-4">
          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-zinc-400 text-xs font-medium tracking-wide uppercase">
              Email
            </label>
            <Input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="!bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:border-zinc-500 focus-visible:ring-zinc-500/20 h-10"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-zinc-400 text-xs font-medium tracking-wide uppercase">
              Password
            </label>
            <Input
              type="password"
              name="password"
              placeholder="••••••••"
              className="!bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:border-zinc-500 focus-visible:ring-zinc-500/20 h-10"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-10 mt-2 bg-zinc-200 text-zinc-900 font-semibold hover:bg-zinc-100 active:bg-zinc-300 transition-colors"
          >
            Sign in
          </Button>
        </form>

        {/* Footer */}
        <p className="text-zinc-600 text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-zinc-400 hover:text-zinc-200 underline underline-offset-4 transition-colors"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
