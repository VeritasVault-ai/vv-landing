import { UnifiedThemeProvider } from "@/src/providers/unified-theme-provider"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "VeritasVault.ai - AI-Powered Tezos Liquidity Management",
  description: "Manage Tezos liquidity with our AI-powered platform offering standard and corporate experiences",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <UnifiedThemeProvider>
          {children}
        </UnifiedThemeProvider>
      </body>
    </html>
  )
}