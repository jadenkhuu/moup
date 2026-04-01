"use client"

import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full h-10 mt-2 bg-zinc-200 text-zinc-900 font-semibold hover:bg-zinc-100 active:bg-zinc-300 transition-colors disabled:opacity-60"
    >
      {pending ? <Loader2 className="size-4 animate-spin" /> : children}
    </Button>
  )
}
