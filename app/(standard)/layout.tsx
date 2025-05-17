"use client"

import { UnifiedHeader } from "@/components/unified-header"
import { ThemeProvider } from "@/src/context/ThemeProvider"

/**
 * Provides a corporate-themed layout with a consistent header and theming context.
 *
 * Wraps the given content with a `ThemeProvider` set to the corporate experience and displays a unified header above and below the main content area.
 *
 * @param children - The content to be displayed within the layout.
 */
export default function CorporateLayout({ children }) {
  return (
    <ThemeProvider defaultExperience="corporate">
      <UnifiedHeader />
      <main>{children}</main>
      <UnifiedHeader />
    </ThemeProvider>
  )
}
