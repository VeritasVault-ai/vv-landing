"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { LandingPageLayout } from "@/components/layout/landing-page-layout"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider defaultColorMode="dark">
      <LandingPageLayout>{children}</LandingPageLayout>
    </ThemeProvider>
  )
}
