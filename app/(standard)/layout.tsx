"use client"

import { ReactNode } from "react"
import { UnifiedHeader } from "@/components/unified-header"
import { UnifiedFooter } from "@/components/unified-footer"
import { ThemeProvider } from "@/src/context/ThemeProvider"

interface CorporateLayoutProps {
  children: ReactNode;
}
/**
 * Provides a corporate-themed layout with a consistent header, footer, and theming context.
 *
 * Wraps the given content with a `ThemeProvider` set to the corporate experience and displays 
 * a unified header above and unified footer below the main content area.
 *
 * @param children - The content to be displayed within the layout.
 */
export default function CorporateLayout({ children }: CorporateLayoutProps) {
  return (
    <ThemeProvider defaultExperience="corporate">
      <div className="flex flex-col min-h-screen">
        <UnifiedHeader variant="landing" />
        <main className="flex-grow">{children}</main>
        <UnifiedFooter variant="landing" />
      </div>
    </ThemeProvider>
  )
}
