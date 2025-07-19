"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { getCookie } from "@/lib/cookies"

export type Version = "standard" | "corporate"

export function useCurrentVersion(): {
  version: Version
  isStandard: boolean
  isCorporate: boolean
} {
  const pathname = usePathname()
  const [version, setVersion] = useState<Version>("standard")

  useEffect(() => {
    // First try to determine version from URL
    if (pathname?.startsWith("/standard")) {
      setVersion("standard")
    } else if (pathname?.startsWith("/corporate")) {
      setVersion("corporate")
    } else {
      // If not in URL, check cookie
      const cookieVersion = getCookie("preferred-version") as Version | undefined
      setVersion(cookieVersion || "standard")
    }
  }, [pathname])

  return {
    version,
    isStandard: version === "standard",
    isCorporate: version === "corporate",
  }
}
