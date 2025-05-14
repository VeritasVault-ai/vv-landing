"use client"

import { VersionAwareHeader } from "@/src/components/layout/VersionAwareHeader"
import { ThemeProvider } from "@/src/context/ThemeProvider"

/**
 * Provides a corporate-themed layout with a consistent header and theming context.
 *
 * Wraps the given content with a `ThemeProvider` set to the corporate experience and displays a version-aware header above and below the main content area.
 *
 * @param children - The content to be displayed within the layout.
 */
export default function CorporateLayout({ children }) {
  return (
    <ThemeProvider defaultExperience="corporate">
      <VersionAwareHeader/>
      <main>{children}</main>
      <VersionAwareHeader/>
    </ThemeProvider>
  )
}
