"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CORPORATE_VARIANTS, STANDARD_VARIANTS, COLOR_MODES } from "@/src/constants/theme"
import { setCookie } from "@/lib/cookies"
import { trackNavigationEvent } from "@/lib/analytics/track-events"

interface InitialThemeModalProps {
  isOpen: boolean
  onClose: () => void
  experienceType: 'standard' | 'corporate'
}

/**
 * Modal that appears when a user first selects either Standard or Corporate experience
 * Allows the user to select a theme before proceeding to the selected version
 */
export function InitialThemeModal({ isOpen, onClose, experienceType }: InitialThemeModalProps) {
  const router = useRouter()
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Define available themes based on experience type
  const themes = experienceType === 'standard' 
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

  // Handle theme selection and navigation
  const handleContinue = () => {
    if (selectedTheme) {
      // Save user preferences
      setCookie("preferred-version", experienceType, 30)
      setCookie("preferred-theme", selectedTheme, 30)
      
      // Extract variant and color mode from theme ID (e.g., "standard-dark")
      const [variant, colorMode] = selectedTheme.split('-')
      
      // Track the selection
      trackNavigationEvent({ 
        feature_name: "theme_selection", 
        button_text: "Continue", 
        destination: `/${experienceType}-version`,
        metadata: { theme: selectedTheme }
      })
      
      // Navigate to the selected version with theme parameter
      router.push(`/${experienceType}-version?theme=${selectedTheme}`)
    } else {
      // If no theme is selected, just navigate to the version
      router.push(`/${experienceType}-version`)
    }
    
    // Close the modal
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Choose Your Theme
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
            Select a theme for your {experienceType === 'standard' ? 'Standard' : 'Corporate'} experience
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {themes.map((theme) => (
              <div
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`
                  p-4 rounded-lg cursor-pointer transition-all border
                  ${theme.isDark 
                    ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' 
                    : 'bg-white text-slate-900 border-slate-200 hover:bg-slate-50'}
                  ${selectedTheme === theme.id 
                    ? 'ring-2 ring-blue-500 ring-offset-2' 
                    : ''}
                `}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{theme.name}</h4>
                  {selectedTheme === theme.id && (
                    <span className="px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">Selected</span>
                  )}
                </div>
                <p className={`text-sm ${theme.isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {theme.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Skip
            </Button>
            <Button 
              onClick={handleContinue}
              disabled={!selectedTheme}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Continue with {selectedTheme ? themes.find(t => t.id === selectedTheme)?.name : 'Selected Theme'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}