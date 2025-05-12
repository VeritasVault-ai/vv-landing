import type { Metadata } from "next"
import { VersionAwareLoginForm } from "@/components/auth/version-aware-login-form"

export const metadata: Metadata = {
  title: "Login | Tezos Liquidity Management",
  description: "Sign in to your Tezos Liquidity Management account",
}

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
        <VersionAwareLoginForm version="standard" redirectTo="/standard/dashboard" />
      </div>
    </div>
  )
}
