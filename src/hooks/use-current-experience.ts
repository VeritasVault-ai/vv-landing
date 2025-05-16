"use client"

/**
 * Hook to determine the current experience based on the URL path
 * 
 * This hook uses the window.location.pathname to determine which experience
 * should be active based on the current route.
 */

import { EXPERIENCE_TYPES } from "@/src/constants/theme"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

/**
 * React hook that returns the current user experience type based on the URL path.
 *
 * Determines the experience type by inspecting the pathname and updates automatically when the route changes.
 *
 * @returns The current experience type, as defined in {@link EXPERIENCE_TYPES}.
 */
export function useCurrentExperience() {
  // Use Next.js's usePathname hook which works on both client and server
  const pathname = usePathname()
  const [currentExperience, setCurrentExperience] = useState(() => {
    // Initial state based on pathname
    if (pathname?.startsWith('/corporate') || pathname?.startsWith('/institutional') || 
        pathname?.startsWith('/corporate-version')) {
      return EXPERIENCE_TYPES.CORPORATE
    } else {
      return EXPERIENCE_TYPES.STANDARD
    }
  })
    
  // Update experience when pathname changes
  useEffect(() => {
    if (pathname?.startsWith('/corporate') || pathname?.startsWith('/institutional') || 
        pathname?.startsWith('/corporate-version')) {
      setCurrentExperience(EXPERIENCE_TYPES.CORPORATE)
    } else {
      setCurrentExperience(EXPERIENCE_TYPES.STANDARD)
    }
  }, [pathname])
  return currentExperience
}