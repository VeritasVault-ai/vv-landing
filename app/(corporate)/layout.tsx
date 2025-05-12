"use client"

import { CorporateFooter } from "@/components/layout/corporate-footer"
import { CorporateHeader } from "@/components/layout/corporate-header"
import { SimpleFooter } from "@/components/ui/simple-footer"
import { ThemeProvider } from "@/lib/context/theme-context"
import { getCookie, setCookie } from "@/lib/cookies"
import { useTheme } from "next-themes"
import { useSearchParams } from "next/navigation"
import { ReactNode, Suspense, useEffect } from "react"

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
