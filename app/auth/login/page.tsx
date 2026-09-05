import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Sign-in unavailable | VeritasVault",
  description: "Authentication is unavailable in this alpha build.",
}

export default function LoginUnavailablePage() {
  return (
    <main className="container flex min-h-screen max-w-xl flex-col items-center justify-center gap-5 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Sign-in is not available yet</h1>
      <p className="text-muted-foreground">
        Legacy and demo sign-in methods have been retired. Mystira identity will be enabled in a later,
        separately approved alpha phase.
      </p>
      <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/standard">
        Return to VeritasVault
      </Link>
    </main>
  )
}
