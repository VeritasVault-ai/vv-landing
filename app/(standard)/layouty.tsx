"use client"

import { ReactNode, useEffect, Suspense } from "react"
import { SimpleFooter } from "@/components/ui/simple-footer"
import { useTheme } from "next-themes"
import { useSearchParams } from "next/navigation"
import { getCookie, setCookie } from "@/lib/cookies"
import { VersionAwareHeader } from "@/src/components/layout/VersionAwareHeader"
import { ThemeProvider } from "@/src/lib/hooks/context/ThemeProvider"

export default function CorporateLayout({ children }) {
  return (
    <ThemeProvider defaultExperience="corporate">
      <VersionAwareHeader/>
      <main>{children}</main>
      <VersionAwareHeader/>
    </ThemeProvider>
  )
}
