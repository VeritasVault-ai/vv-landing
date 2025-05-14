"use client"

/**
 * Hook to determine the current experience based on the URL path
 * 
 * This hook uses the window.location.pathname to determine which experience
 * should be active based on the current route.
 */

import { useEffect, useState } from "react"
import { EXPERIENCE_TYPES } from "@/src/constants/theme"

/**
 * React hook that returns the current user experience type based on the browser's URL path.
 *
 * Determines the experience type by inspecting the pathname and updates automatically when the route changes via browser navigation.
 *
 * @returns The current experience type, as defined in {@link EXPERIENCE_TYPES}.
 *
 * @remark Returns the default experience type if used in a non-browser environment.
 */
export function useCurrentExperience() {
  const [currentExperience, setCurrentExperience] = useState(EXPERIENCE_TYPES.STANDARD)
  
  useEffect(() => {
    // Only run in the browser
    if (typeof window === "undefined") return
    
    const path = window.location.pathname
    
    // Determine experience based on path
    if (path.startsWith('/corporate') || path.startsWith('/institutional')) {
      setCurrentExperience(EXPERIENCE_TYPES.CORPORATE)
    } else if (path.startsWith('/veritasvault')) {
      setCurrentExperience(EXPERIENCE_TYPES.VERITASVAULT)
    } else {
      setCurrentExperience(EXPERIENCE_TYPES.STANDARD)
    }
    
    // Listen for route changes if using client-side routing
    const handleRouteChange = () => {
      const newPath = window.location.pathname
      
      if (newPath.startsWith('/corporate') || newPath.startsWith('/institutional')) {
        setCurrentExperience(EXPERIENCE_TYPES.CORPORATE)
      } else if (newPath.startsWith('/veritasvault')) {
        setCurrentExperience(EXPERIENCE_TYPES.VERITASVAULT)
      } else {
        setCurrentExperience(EXPERIENCE_TYPES.STANDARD)
      }
    }
    
    window.addEventListener('popstate', handleRouteChange)
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])
  
  return currentExperience
}