"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Building2, User } from "lucide-react"
import { trackNavigationEvent } from "@/lib/analytics/track-events"

interface VersionSwitcherProps {
  currentVersion: "standard" | "corporate"
  className?: string
}

export function VersionSwitcher({ currentVersion, className }: VersionSwitcherProps) {
  const router = useRouter()

  const switchVersion = () => {
    const newVersion = currentVersion === "standard" ? "corporate" : "standard"

    // Store the preference in localStorage and cookies
    localStorage.setItem("site-version", newVersion)
    document.cookie = `site-version=${newVersion}; path=/; max-age=${60 * 60 * 24 * 365}` // 1 year

    // Track the version switch
    trackNavigationEvent({
      feature_name: "version_switch",
      tab_destination: newVersion,
    })

    // Navigate to the other version
    router.push(`/${newVersion}`)
  }

  return (
    <Button variant="ghost" size="sm" className={`flex items-center gap-1 ${className || ""}`} onClick={switchVersion}>
      {currentVersion === "standard" ? (
        <>
          <Building2 className="h-4 w-4" />
          <span className="text-xs">Switch to Corporate</span>
        </>
      ) : (
        <>
          <User className="h-4 w-4" />
          <span className="text-xs">Switch to Standard</span>
        </>
      )}
    </Button>
  )
}
