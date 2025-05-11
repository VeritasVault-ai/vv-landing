"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User, Building } from "lucide-react"
import { trackNavigationEvent } from "@/lib/analytics/track-events"
import { setCookie } from "@/lib/cookies"

interface SiteVersionToggleProps {
  currentVersion: "standard" | "corporate"
}

export function SiteVersionToggle({ currentVersion }: SiteVersionToggleProps) {
  const router = useRouter()

  const handleToggle = (version: "standard" | "corporate") => {
    if (version === currentVersion) return

    // Save preference to localStorage and cookies
    localStorage.setItem("site-version", version)
    setCookie("site-version", version, 365) // 365 days expiry

    // Track the version change
    trackNavigationEvent({
      feature_name: "site_version_toggle",
      tab_destination: version,
    })

    // Navigate to the appropriate version
    router.push(`/${version}`)
  }

  return (
    <div className="bg-slate-100 border-b border-slate-200">
      <div className="container mx-auto px-4 py-2 flex justify-end">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-500 mr-2">View as:</span>
          <Button
            variant={currentVersion === "standard" ? "default" : "outline"}
            size="sm"
            className={`flex items-center gap-1 ${
              currentVersion === "standard" ? "bg-blue-600 text-white" : "text-slate-700"
            }`}
            onClick={() => handleToggle("standard")}
          >
            <User className="h-3.5 w-3.5" />
            <span>Standard</span>
          </Button>
          <Button
            variant={currentVersion === "corporate" ? "default" : "outline"}
            size="sm"
            className={`flex items-center gap-1 ${
              currentVersion === "corporate" ? "bg-blue-600 text-white" : "text-slate-700"
            }`}
            onClick={() => handleToggle("corporate")}
          >
            <Building className="h-3.5 w-3.5" />
            <span>Corporate</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
