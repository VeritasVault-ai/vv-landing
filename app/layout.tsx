import type React from "react"
import "./globals.css"
import "./globals-standard.css"
import "./globals-corporate.css"
import "./theme-variables.css"
import "./enhanced-dark-theme.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tezos Liquidity Management",
  description: "AI-powered Tezos liquidity management platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
