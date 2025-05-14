'use client'

import { Providers } from "@/app/providers"
import { VersionAwareFooter } from "@/components/layout/footer"
import VersionAwareHeader from "@/components/layout/header"
import { EXPERIENCE_TYPES } from "@/src/constants/theme"
import { ThemeProvider } from '@/src/lib/context/ThemeProvider'
import { Analytics } from "@vercel/analytics/next"
import type { ReactNode } from "react"

/**
 * Wraps corporate version content in a corporate-themed context provider.
 *
 * @param children - The content to display within the corporate version layout.
 * @returns The provided {@link children} wrapped in a {@link UnifiedThemeProvider} configured for the corporate experience.
 */
export default function CorporateVersionLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <Analytics />
      <Providers experience={EXPERIENCE_TYPES.CORPORATE}>
        <ThemeProvider defaultExperience={EXPERIENCE_TYPES.CORPORATE}>
          <VersionAwareHeader/>
            <main>{children}</main>
          <VersionAwareFooter/>
        </ThemeProvider>
      </Providers>
    </>
  )
}