"use client"

import { UnifiedFooter } from "@/components/unified-footer"
import type { ReactNode } from "react"
import { LandingPageToggle } from "../landing-page-toggle"
import { UnifiedHeader } from "../unified-header"

interface LandingPageLayoutProps {
  children: ReactNode
  mode: "standard" | "corporate"
  onModeChange: (mode: "standard" | "corporate") => void
}

export function LandingPageLayout({ children, mode, onModeChange }: LandingPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingPageToggle onChange={onModeChange} initialMode={mode} />
-      <UnifiedHeader />
+      <UnifiedHeader
+        variant={mode === "standard" ? "landing" : "dashboard"}
+      />
      <main className="flex-1">{children}</main>
      <UnifiedFooter 
        variant={mode === "standard" ? "landing" : "corporate"} 
        showNewsletter={mode === "corporate"}
      />
    </div>
  )
}