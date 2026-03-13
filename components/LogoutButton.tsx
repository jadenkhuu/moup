'use client'

import { logout } from '@/app/(auth)/actions'
import { Button } from '@/components/ui/button'

export default function LogoutButton() {
  return (
    <form action={logout}>
      <Button type="submit" className="bg-zinc-200 text-zinc-900 hover:bg-zinc-300">
        Log out
      </Button>
    </form>
  )
}
