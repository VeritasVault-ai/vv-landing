import type React from "react"
import { Header } from "@/components/layout/header"
import { UnifiedFooter } from "@/components/layout/unified-footer"
import { standardMetadata } from "@/lib/metadata-utils"
import { StructuredData } from "@/components/seo/structured-data"
import { ThemeDebugger } from "@/components/theme-debugger"
import type { Metadata } from "next"
import { ThemeProvider } from "@/src/lib/context/ThemeProvider"
export const metadata: Metadata = standardMetadata

/**
 * Provides a debug-themed page layout with theming, SEO structured data, and development tools.
 *
 * Wraps the content in a standard theme context and includes a header, footer, structured data, and a theme debugger for inspection.
 *
 * @param children - The main content to display within the layout.
 */
export default function DebugLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider defaultColorMode="system" defaultExperience="standard">
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
