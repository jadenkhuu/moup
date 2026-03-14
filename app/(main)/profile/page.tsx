import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from '@/components/LogoutButton'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="flex-1 w-full flex flex-col items-center justify-center gap-4 bg-zinc-900 pt-14 sm:pt-20">
        <h1 className="text-2xl font-bold text-zinc-500">You are not logged in</h1>
        <Link href="/login" className="text-white underline underline-offset-4 hover:text-zinc-300">
          Go to login
        </Link>
      </div>
    )
  }

  const displayName = user.user_metadata?.full_name ?? user.email

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center gap-6 bg-zinc-900 pt-14 sm:pt-20">
      <h1 className="text-2xl font-bold text-zinc-500">
        Logged in as <span className="text-white">{displayName}</span>
      </h1>
      <LogoutButton />
    </div>
  );
}