"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Building2, User } from "lucide-react"
import { trackNavigationEvent } from "@/lib/analytics/track-events"

interface VersionSelectorProps {
  className?: string
}

export function VersionSelector({ className }: VersionSelectorProps) {
  const router = useRouter()

  const selectVersion = (version: "standard" | "corporate") => {
    // Store the preference in localStorage and cookies
    localStorage.setItem("site-version", version)
    document.cookie = `site-version=${version}; path=/; max-age=${60 * 60 * 24 * 365}` // 1 year

    // Track the version selection
    trackNavigationEvent({
      feature_name: "version_selection",
      tab_destination: version,
    })

    // Navigate to the selected version
    router.push(`/${version}`)
  }

  return (
    <div className={`flex gap-4 ${className || ""}`}>
      <Button variant="outline" size="lg" className="flex items-center gap-2" onClick={() => selectVersion("standard")}>
        <User className="h-5 w-5" />
        <span>Standard Version</span>
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="flex items-center gap-2 bg-blue-800 text-white hover:bg-blue-900"
        onClick={() => selectVersion("corporate")}
      >
        <Building2 className="h-5 w-5" />
        <span>Corporate Version</span>
      </Button>
    </div>
  )
}
