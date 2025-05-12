"use client"

import type { ReactNode } from "react"
import { Header } from "@/components/layout/header"
import { CorporateHeader } from "@/components/layout/corporate-header"
import { LandingPageToggle } from "@/components/landing-page-toggle"
import { UnifiedFooter } from "@/components/layout/unified-footer"
import { CorporateFooter } from "@/components/layout/corporate-footer"

interface LandingPageLayoutProps {
  children: ReactNode
  mode: "standard" | "corporate"
  onModeChange: (mode: "standard" | "corporate") => void
}

export function LandingPageLayout({ children, mode, onModeChange }: LandingPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingPageToggle onChange={onModeChange} initialMode={mode} />
      {mode === "standard" ? <Header /> : <CorporateHeader />}
      <main className="flex-1">{children}</main>
      {mode === "standard" ? <UnifiedFooter /> : <CorporateFooter />}
    </div>
  )
}
