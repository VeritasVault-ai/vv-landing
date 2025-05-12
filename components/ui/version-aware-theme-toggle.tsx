"use client"

import { StandaloneThemeToggle } from "@/components/ui/standalone-theme-toggle"

interface VersionAwareThemeToggleProps {
  className?: string
  version?: "standard" | "corporate"
}

export function VersionAwareThemeToggle({ className, version = "standard" }: VersionAwareThemeToggleProps) {
  return <StandaloneThemeToggle className={className} />
}
