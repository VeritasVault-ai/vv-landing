"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { LandingPageLayout } from "@/components/layout/landing-page-layout"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mode, setMode] = useState<"standard" | "corporate">("standard")

  // Load the mode from localStorage on component mount
  useEffect(() => {
    const savedMode = localStorage.getItem("landing-page-mode")
    if (savedMode === "standard" || savedMode === "corporate") {
      setMode(savedMode)
    }
  }, [])

  // Save the mode to localStorage when it changes
  const handleModeChange = (newMode: "standard" | "corporate") => {
    setMode(newMode)
    localStorage.setItem("landing-page-mode", newMode)
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <LandingPageLayout mode={mode} onModeChange={handleModeChange}>
        {children}
      </LandingPageLayout>
    </ThemeProvider>
  )
}
