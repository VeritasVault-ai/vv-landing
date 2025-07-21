"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { getCookie } from "@/lib/cookies"

type ExperienceType = "standard" | "corporate" | null

interface VersionContextType {
  version: ExperienceType
  isStandard: boolean
  isCorporate: boolean
}

const VersionContext = createContext<VersionContextType>({
  version: null,
  isStandard: false,
  isCorporate: false,
})

/**
 * Provides the current user experience version context to its child components.
 *
 * Determines the experience version ("standard" or "corporate") based on the current URL pathname or a "preferred-version" cookie, defaulting to "standard" if neither is set. Supplies the version and related flags to descendants via React context.
 *
 * @param children - The React nodes that will have access to the version context.
 */
export function VersionProvider({ children }: { children: React.ReactNode }) {
  const [version, setVersion] = useState<ExperienceType>(null)
  const pathname = usePathname()

  useEffect(() => {
    // First try to determine version from URL
    if (pathname?.startsWith("/standard")) {
      setVersion("standard")
    } else if (pathname?.startsWith("/corporate")) {
      setVersion("corporate")
    } else {
      // If not in URL, check cookie
      const cookieVersion = getCookie("preferred-version")
      if (cookieVersion === "standard" || cookieVersion === "corporate") {
        setVersion(cookieVersion)
      } else {
        // Default to standard if no preference is found
        setVersion("standard")
      }
    }
  }, [pathname])

  const value = {
    version,
    isStandard: version === "standard",
    isCorporate: version === "corporate",
  }

  return <VersionContext.Provider value={value}>{children}</VersionContext.Provider>
}

export function useVersion() {
  const context = useContext(VersionContext)
  if (context === undefined) {
    throw new Error("useVersion must be used within a VersionProvider")
  }
  return context
}
