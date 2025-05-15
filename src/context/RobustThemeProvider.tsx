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
  
  // Try to use next-themes, but don't fail if it's not available
  let nextTheme: any = { theme: defaultColorMode, setTheme: () => {} }
  try {
    nextTheme = useNextTheme()
  } catch (error) {
    console.warn("next-themes provider not available:", error)
  }
  
  // Sync our colorMode with next-themes
  useEffect(() => {
    if (nextTheme.setTheme) {
      nextTheme.setTheme(colorMode)
    }
  }, [colorMode, nextTheme])
  
  // When experience changes, update the theme variant accordingly
  useEffect(() => {
    if (experience === EXPERIENCE_TYPES.STANDARD && !Object.values(STANDARD_VARIANTS).includes(themeVariant as any)) {
      setThemeVariant(STANDARD_VARIANTS.STANDARD)
    } else if (experience === EXPERIENCE_TYPES.CORPORATE && !Object.values(CORPORATE_VARIANTS).includes(themeVariant as any)) {
      setThemeVariant(CORPORATE_VARIANTS.CORPORATE)
    }
  }, [experience, themeVariant])
  
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
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}