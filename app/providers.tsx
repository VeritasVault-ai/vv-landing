'use client'

import { EXPERIENCE_TYPES } from "@/src/constants/theme"
import { UnifiedThemeProvider } from "@/src/providers/unified-theme-provider"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

export function Providers({
  children,
  experience = EXPERIENCE_TYPES.CORPORATE,
}: {
  children: ReactNode
  experience?: string
}) {
  return (
    <SessionProvider>
      <UnifiedThemeProvider defaultExperience={experience}>
        {children}
      </UnifiedThemeProvider>
    </SessionProvider>
  )
}