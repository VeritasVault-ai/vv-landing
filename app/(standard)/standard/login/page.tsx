import type { Metadata } from "next"
import { Suspense } from "react"
import { VersionAwareLoginForm } from "@/components/auth/version-aware-login-form"

export const metadata: Metadata = {
  title: "Login | Tezos Liquidity Management",
  description: "Sign in to your Tezos Liquidity Management account",
}

/**
 * Renders the standard login page for the Tezos Liquidity Management application.
 *
 * Displays the application title, a subtitle, and a version-aware login form with a loading state while the form is being loaded asynchronously.
 */
export default function StandardLoginPage() {
  return (
    <div className="container flex h-screen w-full flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-400">
            Tezos Liquidity Management
          </h1>
          <p className="text-sm text-muted-foreground">Optimize your liquidity strategy</p>
        </div>
        <Suspense fallback={<div className="p-4 text-center">Loading login form...</div>}>
          <VersionAwareLoginForm version="standard" redirectTo="/standard/dashboard" />
        </Suspense>
      </div>
    </div>
  )
}