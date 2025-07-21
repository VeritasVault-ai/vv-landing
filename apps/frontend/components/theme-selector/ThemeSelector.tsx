"use client"

import { useState, useEffect } from "react"
import { CORPORATE_VARIANTS, STANDARD_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { useRobustTheme } from "@/src/context/RobustThemeProvider"

interface ThemeSelectorProps {
  experience: 'standard' | 'corporate'
  onThemeSelect: (themeId: string) => void
  currentTheme?: string
}

/**
 * A robust theme selector component that displays all available themes for a given experience
 * This component works independently of the main theme context system
 */
export function ThemeSelector({ experience, onThemeSelect, currentTheme }: ThemeSelectorProps) {
  const [mounted, setMounted] = useState(false)
  const robustTheme = useRobustTheme()
  
  // Mark as mounted after initial render
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Don't render anything until client-side
  if (!mounted) return null
  
  // Define available themes based on experience
  const themes = experience === 'standard' 
    ? [
        { 
          id: `${STANDARD_VARIANTS.STANDARD}-${COLOR_MODES.LIGHT}`, 
          name: "Standard Light", 
          description: "Clean, bright interface with blue accents",
          isDark: false
        },
        { 
          id: `${STANDARD_VARIANTS.STANDARD}-${COLOR_MODES.DARK}`, 
          name: "Standard Dark", 
          description: "Dark mode with reduced eye strain",
          isDark: true
        },
        { 
          id: `${STANDARD_VARIANTS.NEURALLIQUID}-${COLOR_MODES.LIGHT}`, 
          name: "Neural Light", 
          description: "Modern light theme with neural network visuals",
          isDark: false
        },
        { 
          id: `${STANDARD_VARIANTS.NEURALLIQUID}-${COLOR_MODES.DARK}`, 
          name: "Neural Dark", 
          description: "Immersive dark theme with neural network patterns",
          isDark: true
        },
        { 
          id: `${STANDARD_VARIANTS.COSMIC}-${COLOR_MODES.LIGHT}`, 
          name: "Cosmic Light", 
          description: "Vibrant light theme with cosmic design elements",
          isDark: false
        },
        { 
          id: `${STANDARD_VARIANTS.COSMIC}-${COLOR_MODES.DARK}`, 
          name: "Cosmic Dark", 
          description: "Immersive dark theme with cosmic design elements",
          isDark: true
        },
      ]
    : [
        { 
          id: `${CORPORATE_VARIANTS.CORPORATE}-${COLOR_MODES.LIGHT}`, 
          name: "Corporate Light", 
          description: "Professional light interface for enterprise users",
          isDark: false
        },
        { 
          id: `${CORPORATE_VARIANTS.CORPORATE}-${COLOR_MODES.DARK}`, 
          name: "Corporate Dark", 
          description: "Sophisticated dark mode for enterprise users",
          isDark: true
        },
        { 
          id: `${CORPORATE_VARIANTS.VERITASVAULT}-${COLOR_MODES.LIGHT}`, 
          name: "VeritasVault Light", 
          description: "Premium light theme with vault security visuals",
          isDark: false
        },
        { 
          id: `${CORPORATE_VARIANTS.VERITASVAULT}-${COLOR_MODES.DARK}`, 
          name: "VeritasVault Dark", 
          description: "Premium dark theme with vault security visuals",
          isDark: true
        },
      ]
  
  // Get the current theme from the robust theme provider if not provided
  const activeTheme = currentTheme || `${robustTheme.themeVariant}-${robustTheme.colorMode}`
  
  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Select Theme</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {themes.map((theme) => (
          <div
            key={theme.id}
            onClick={() => onThemeSelect(theme.id)}
            className={`
              p-4 rounded-lg cursor-pointer transition-all border
              ${theme.isDark 
                ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' 
                : 'bg-white text-slate-900 border-slate-200 hover:bg-slate-50'}
              ${activeTheme === theme.id 
                ? 'ring-2 ring-blue-500 ring-offset-2' 
                : ''}
            `}
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">{theme.name}</h4>
              {activeTheme === theme.id && (
                <span className="px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">Current</span>
              )}
            </div>
            <p className={`text-sm ${theme.isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {theme.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}