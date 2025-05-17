"use client"
import { UnifiedFooter } from "@/components/unified-footer"
import { UnifiedHeader } from "@/components/unified-header"
import type { ReactNode } from "react"
import { LandingPageToggle } from "../landing-page-toggle"

interface LandingPageLayoutProps {
  children: ReactNode
  mode: "standard" | "corporate"
  onModeChange: (mode: "standard" | "corporate") => void
}

export function LandingPageLayout({ children, mode, onModeChange }: LandingPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingPageToggle onChange={onModeChange} initialMode={mode} />
      <UnifiedHeader 
        variant="landing"
        showSearch={false}
        data-mode={mode}
      />
      <main className="flex-1">{children}</main>
      <UnifiedFooter 
        variant={mode === "standard" ? "landing" : "corporate"} 
        showNewsletter={mode === "corporate"}
      />
    </div>
  )
}