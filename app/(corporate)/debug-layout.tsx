import type React from "react"
import { UnifiedFooter } from "@/components/layout/unified-footer"
import { standardMetadata } from "@/lib/metadata-utils"
import { StructuredData } from "@/components/seo/structured-data"
import { ThemeDebugger } from "@/components/theme-debugger"
import type { Metadata } from "next"
import { VersionAwareHeader } from "@/src/components/layout/VersionAwareHeader"
import { ThemeProvider } from "@/src/lib/hooks/context/ThemeProvider"

export const metadata: Metadata = standardMetadata

/**
 * Provides a themed layout for debugging pages, including SEO structured data, a version-aware header, and theme debugging tools.
 *
 * Wraps the content in a `ThemeProvider` with system color mode and standard version, and arranges the layout with header, main content area, and theme debugging utilities.
 *
 * @param children - The content to display within the main area of the layout.
 */
export default function DebugLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider defaultColorMode="system" version="standard">
      <div className="min-h-screen flex flex-col">
        <StructuredData version="standard" />
        <VersionAwareHeader />
        <main className="flex-1">{children}</main>
        <ThemeDebugger />
      </div>
    </ThemeProvider>
  )
}
