"use client"

import { ReactNode, createContext, useState, useContext, useEffect } from "react"
import { EXPERIENCE_TYPES, CORPORATE_VARIANTS, STANDARD_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { ExperienceType, ThemeVariant, ColorMode } from "@/src/types/theme"
import { useTheme as useNextTheme } from "next-themes"

// Define the context shape
interface ThemeContextType {
  themeVariant: ThemeVariant
  setThemeVariant: (variant: ThemeVariant) => void
  colorMode: ColorMode
  setColorMode: (mode: ColorMode) => void
  experience: ExperienceType
  setExperience: (exp: ExperienceType) => void
  isDark: boolean
}

// Create the context with default values
const ThemeContext = createContext<ThemeContextType>({
  themeVariant: STANDARD_VARIANTS.STANDARD,
  setThemeVariant: () => {},
  colorMode: COLOR_MODES.LIGHT,
  setColorMode: () => {},
  experience: EXPERIENCE_TYPES.STANDARD,
  setExperience: () => {},
  isDark: false
})

// Create a hook to use the theme context
export const useRobustTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    console.warn("useRobustTheme must be used within a RobustThemeProvider")
    // Return default values instead of throwing an error
    return {
      themeVariant: STANDARD_VARIANTS.STANDARD,
      setThemeVariant: () => {},
      colorMode: COLOR_MODES.LIGHT,
      setColorMode: () => {},
      experience: EXPERIENCE_TYPES.STANDARD,
      setExperience: () => {},
      isDark: false
    }
  }
  return context
}

interface RobustThemeProviderProps {
  children: ReactNode
  defaultExperience?: ExperienceType
  defaultVariant?: ThemeVariant
  defaultColorMode?: ColorMode
}

/**
 * A robust theme provider that handles errors gracefully
 * This provider works independently of other theme providers and can be used as a fallback
 */
export function RobustThemeProvider({
  children,
  defaultExperience = EXPERIENCE_TYPES.STANDARD,
  defaultVariant = STANDARD_VARIANTS.STANDARD,
  defaultColorMode = COLOR_MODES.LIGHT
}: RobustThemeProviderProps) {
  // State for theme settings
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>(defaultVariant)
  const [experience, setExperience] = useState<ExperienceType>(defaultExperience)
  const [colorMode, setColorMode] = useState<ColorMode>(defaultColorMode)
  const [mounted, setMounted] = useState(false)
  
  // Try to use next-themes, but don't fail if it's not available
  let nextTheme: any = { theme: defaultColorMode, setTheme: () => {} }
  try {
    nextTheme = useNextTheme()
  } catch (error) {
    console.warn("next-themes provider not available:", error)
  }
  
  // Initialize theme from stored preferences or URL parameters
  useEffect(() => {
    setMounted(true)
    
    try {
      // Try to get theme from localStorage
      const storedTheme = localStorage.getItem('theme-preference')
      if (storedTheme) {
        const [variant, mode] = storedTheme.split('-')
        if (variant) setThemeVariant(variant as ThemeVariant)
        if (mode) setColorMode(mode as ColorMode)
      }
      
      // Check URL parameters for theme
      const urlParams = new URLSearchParams(window.location.search)
      const themeParam = urlParams.get('theme')
      if (themeParam) {
        const [variant, mode] = themeParam.split('-')
        if (variant) setThemeVariant(variant as ThemeVariant)
        if (mode) setColorMode(mode as ColorMode)
        
        // Store the preference
        localStorage.setItem('theme-preference', themeParam)
      }
    } catch (error) {
      console.error('Error initializing theme from storage:', error)
    }
  }, [])
  
  // Sync our colorMode with next-themes
  useEffect(() => {
    if (mounted && nextTheme.setTheme) {
      nextTheme.setTheme(colorMode)
      
      // Apply dark mode class directly to document for immediate effect
      if (colorMode === COLOR_MODES.DARK) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [colorMode, nextTheme, mounted])
  
  // When experience changes, update the theme variant accordingly
  useEffect(() => {
    if (experience === EXPERIENCE_TYPES.STANDARD && !Object.values(STANDARD_VARIANTS).includes(themeVariant as any)) {
      setThemeVariant(STANDARD_VARIANTS.STANDARD)
    } else if (experience === EXPERIENCE_TYPES.CORPORATE && !Object.values(CORPORATE_VARIANTS).includes(themeVariant as any)) {
      setThemeVariant(CORPORATE_VARIANTS.CORPORATE)
    }
  }, [experience, themeVariant])
  
  // Store theme preferences when they change
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem('theme-preference', `${themeVariant}-${colorMode}`)
      } catch (error) {
        console.error('Error storing theme preference:', error)
      }
    }
  }, [themeVariant, colorMode, mounted])
  
  // Compute isDark based on colorMode
  const isDark = colorMode === COLOR_MODES.DARK
  
  // Create the context value
  const contextValue: ThemeContextType = {
    themeVariant,
    setThemeVariant,
    colorMode,
    setColorMode,
    experience,
    setExperience,
    isDark
  }
  
  // Provide a loading state until client-side code is initialized
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}