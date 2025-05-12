"use client"

import { ReactNode, useEffect, Suspense } from "react"
import { SimpleFooter } from "@/components/ui/simple-footer"
import { useTheme } from "next-themes"
import { useSearchParams } from "next/navigation"
import { getCookie, setCookie } from "@/lib/cookies"
import { VersionAwareHeader } from "@/src/components/layout/VersionAwareHeader"
import { ThemeProvider } from "@/src/lib/hooks/context/ThemeProvider"
import { VersionAwareFooter } from "@/src/components/layout/VersionAwareFooter"

/**
 * Provides the corporate-themed layout for pages, wrapping content with a theme provider and version-aware headers.
 *
 * Renders the given {@link children} between two instances of {@link VersionAwareHeader} inside a {@link ThemeProvider} configured for the corporate experience.
 *
 * @param children - The content to display within the layout.
 */
export default function CorporateLayout({ children }) {
  return (
    <ThemeProvider defaultExperience="corporate">
      <VersionAwareHeader/>
      <main>{children}</main>
      <VersionAwareFooter/>
    </ThemeProvider>
  )
}
