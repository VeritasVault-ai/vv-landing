"use client"

import { setCookie } from "@/lib/cookies"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ReactNode, useEffect } from "react"

export type ExperienceType = "standard" | "corporate"

interface EnhancedThemeProviderProps extends ThemeProviderProps {
  version?: ExperienceType
  children: ReactNode;
}

export function ThemeProvider({ 
  children, 
  version,
  ...props 
}: EnhancedThemeProviderProps) {
  // Apply experience-specific class to body
  useEffect(() => {
    if (version) {
      // Remove all experience classes
      document.body.classList.remove("experience-standard", "experience-corporate")
      
      // Add the current experience class
      document.body.classList.add(`experience-${version}`)
      
      // Store the selected experience in a cookie for persistence
      setCookie("preferred-experience", version, 30)
    }
  }, [version])

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      themes={["light", "dark", "neuralliquid", "corporate", "veritasvault", "cosmic"]}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}