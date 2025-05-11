import type React from "react"
import { Header } from "@/components/layout/header"
import { UnifiedFooter } from "@/components/layout/unified-footer"
import { standardMetadata } from "@/lib/metadata-utils"
import { StructuredData } from "@/components/seo/structured-data"
import { ThemeProvider } from "@/lib/context/theme-context"
import { ThemeDebugger } from "@/components/theme-debugger"
import type { Metadata } from "next"

export const metadata: Metadata = standardMetadata

export default function DebugLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider defaultTheme="system" version="standard">
      <div className="min-h-screen flex flex-col">
        <StructuredData version="standard" />
        <Header />
        <main className="flex-1">{children}</main>
        <UnifiedFooter />
        <ThemeDebugger />
      </div>
    </ThemeProvider>
  )
}
