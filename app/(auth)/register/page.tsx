// app/(auth)/register/page.tsx
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { signup } from "../actions";
import { SubmitButton } from "@/components/auth/submit-button";

export default async function RegisterPage({
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
          <Link
            href="/"
            className="w-fit font-[family-name:var(--font-syne)] text-zinc-200 font-extrabold text-4xl tracking-tight hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/40 rounded-sm"
          >
            moup
          </Link>
          <p className="text-zinc-500 text-sm">Create a new account</p>
        </div>

        {/* Form wired to the signup action */}
        <form action={signup} className="flex flex-col gap-4">
          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-md px-3 py-2">
              {error}
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-zinc-400 text-xs font-medium tracking-wide uppercase">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="!bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:border-zinc-500 focus-visible:ring-zinc-500/20 h-10"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-zinc-400 text-xs font-medium tracking-wide uppercase">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="!bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:border-zinc-500 focus-visible:ring-zinc-500/20 h-10"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-zinc-400 text-xs font-medium tracking-wide uppercase">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="••••••••"
              className="!bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-500 focus-visible:border-zinc-500 focus-visible:ring-zinc-500/20 h-10"
            />
          </div>

          <SubmitButton>Create account</SubmitButton>
        </form>

        {/* Footer */}
        <p className="text-zinc-600 text-sm text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-zinc-400 hover:text-zinc-200 underline underline-offset-4 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}