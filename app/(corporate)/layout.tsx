"use client"

import { VersionAwareFooter } from "@/src/components/layout/VersionAwareFooterBridge"
import { VersionAwareHeader } from "@/src/components/layout/VersionAwareHeaderBridge"
import { ThemeProvider } from "@/src/context/ThemeProvider"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * Wraps page content in a corporate-themed layout with nested theme providers and version-aware header and footer.
 *
 * The layout applies both system and custom corporate theming, rendering the provided {@link children} between a header and footer.
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