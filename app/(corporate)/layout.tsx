"use client"

import { VersionAwareFooter } from "@/src/components/layout/VersionAwareFooterBridge"
import { VersionAwareHeader } from "@/src/components/layout/VersionAwareHeaderBridge"
import { ThemeProvider } from "@/src/context/ThemeProvider"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * Provides the corporate-themed layout for pages, wrapping content with theme providers and version-aware headers.
 *
 * Renders the given {@link children} between header and footer components inside theme providers
 * configured for the corporate experience.
 *
 * @param children - The content to display within the layout.
 */
export default function CorporateLayout({ children }) {
  return (
    <NextThemesProvider attribute="class" enableSystem defaultTheme="light" themes={['light','dark']}>
      <ThemeProvider defaultExperience="corporate">
        <VersionAwareHeader/>
        <main>{children}</main>
        <VersionAwareFooter/>
      </ThemeProvider>
    </NextThemesProvider>
  )
}