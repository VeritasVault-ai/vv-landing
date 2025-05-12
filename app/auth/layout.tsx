import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication | Tezos Liquidity Management",
  description: "Sign in or register for Tezos Liquidity Management",
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">{children}</div>
    </ThemeProvider>
  )
}
