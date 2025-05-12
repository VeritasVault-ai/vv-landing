"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { getCookie, setCookie } from "@/lib/cookies"
import { useRouter, useSearchParams } from "next/navigation"
import { ExperienceType, ThemeVariant } from "@/src/types"

/**
 * React hook for managing user experience and theme preferences using cookies, URL parameters, and navigation.
 *
 * Initializes experience and theme from cookies or URL parameters, and provides functions to update these preferences and navigate accordingly.
 *
 * @returns An object containing the current experience, theme, loading state, and functions to update experience, theme, or both together.
 */
export function useExperienceTheme() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [experience, setExperience] = useState<ExperienceType | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Initialize from cookies and URL parameters
  useEffect(() => {
    const preferredExperience = getCookie("preferred-experience") as ExperienceType | undefined
    const preferredTheme = getCookie("preferred-theme") as ThemeVariant | undefined
    const themeParam = searchParams?.get("theme") as ThemeVariant | null
    
    // Set experience from cookie
    if (preferredExperience) {
      setExperience(preferredExperience)
    }
    
    // Set theme from URL param or cookie
    if (themeParam) {
      setTheme(themeParam)
      setCookie("preferred-theme", themeParam, 30)
    } else if (preferredTheme) {
      setTheme(preferredTheme)
    }
    
    setIsLoaded(true)
  }, [searchParams, setTheme])

  // Function to update experience and theme together
  const updateExperienceAndTheme = (newExperience: ExperienceType, newTheme?: ThemeVariant) => {
    setExperience(newExperience)
    setCookie("preferred-experience", newExperience, 30)
    
    if (newTheme) {
      setTheme(newTheme)
      setCookie("preferred-theme", newTheme, 30)
    }
    
    // Redirect to the experience route with theme parameter if provided
    const queryParams = newTheme ? `?theme=${newTheme}` : ""
    router.push(`/${newExperience}${queryParams}`)
  }

  return {
    experience,
    theme,
    isLoaded,
    setExperience: (newExperience: ExperienceType) => {
      setExperience(newExperience)
      setCookie("preferred-experience", newExperience, 30)
    },
    setTheme: (newTheme: ThemeVariant) => {
      setTheme(newTheme)
      setCookie("preferred-theme", newTheme, 30)
    },
    updateExperienceAndTheme
  }
}