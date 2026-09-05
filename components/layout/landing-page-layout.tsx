"use client"
import { UnifiedFooter } from "@/components/unified-footer"
import { UnifiedHeader } from "@/components/unified-header"
import type { ReactNode } from "react"

interface LandingPageLayoutProps {
  children: ReactNode
}

export function LandingPageLayout({ children }: LandingPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <UnifiedHeader 
        variant="landing"
        showSearch={false}
        data-mode="standard"
      />
      <main className="flex-1">{children}</main>
      <UnifiedFooter 
        variant="landing"
        showNewsletter={false}
      />
    </div>
  )
}
