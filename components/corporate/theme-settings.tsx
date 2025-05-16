"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import { ThemeSelector } from "@/components/theme-selector/ThemeSelector"
import { useRobustTheme } from "@/src/context/RobustThemeProvider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

/**
 * Theme settings component for the corporate version
 * Allows users to select different themes, including the VeritasVault theme
 * Uses the robust theme provider to ensure theme context is always available
 */
export function ThemeSettings() {
  const [isOpen, setIsOpen] = useState(false)
  const { themeVariant, colorMode, setThemeVariant, setColorMode } = useRobustTheme()
  
  // Get the current theme ID
  const currentThemeId = `${themeVariant}-${colorMode}`
  
  // Handle theme selection
  const handleThemeSelect = (themeId: string) => {
    const [variant, mode] = themeId.split('-')
    setThemeVariant(variant as any)
    setColorMode(mode as any)
    setIsOpen(false)
  }
  
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <Settings className="h-4 w-4" />
        <span className="hidden md:inline">Theme Settings</span>
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Theme Settings</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <ThemeSelector 
              experience="corporate"
              onThemeSelect={handleThemeSelect}
              currentTheme={currentThemeId}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}