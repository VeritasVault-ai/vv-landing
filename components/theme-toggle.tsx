"use client"

import { useAvailableThemeVariants, useTheme } from "@/components/ThemeProvider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

// Define theme mappings for light/dark mode variants
const LIGHT_MODE_VARIANTS = {
  'standard': 'standard',
  'corporate': 'corporate'
}

const DARK_MODE_VARIANTS = {
  'standard': 'neuralliquid',
  'corporate': 'veritasvault'
}

export function ThemeToggle() {
  const { colorMode, themeVariant, setColorMode, setThemeVariant, experience } = useTheme()
  const availableThemeVariants = useAvailableThemeVariants()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Smart toggle that switches between appropriate light/dark variants
  const handleSmartToggle = () => {
    if (colorMode === 'light') {
      // Switch to dark mode with the appropriate variant for current experience
      setColorMode('dark')
      setThemeVariant(experience === 'standard' ? 'neuralliquid' : 'veritasvault')
    } else {
      // Switch to light mode with the appropriate variant for current experience
      setColorMode('light')
      setThemeVariant(experience === 'standard' ? 'standard' : 'corporate')
    }
  }

  // Handle specific theme selection
  const handleThemeSelect = (variant: string, mode: 'light' | 'dark') => {
    setThemeVariant(variant as any)
    setColorMode(mode)
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="opacity-0">
        <Sun className="h-5 w-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                aria-label="Toggle theme"
              >
                {colorMode === "dark" ? <Sun className="h-5 w-5 transition-all" /> : <Moon className="h-5 w-5 transition-all" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Switch to {colorMode === "dark" ? "light" : "dark"} mode</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Toggle Theme</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleSmartToggle}>
            {colorMode === "dark" ? (
              <>
                <Sun className="mr-2 h-4 w-4" />
                <span>Switch to Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="mr-2 h-4 w-4" />
                <span>Switch to Dark Mode</span>
              </>
            )}
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Light Mode Themes</DropdownMenuLabel>
          
          {experience === 'standard' && (
            <DropdownMenuItem 
              onClick={() => handleThemeSelect('standard', 'light')}
              className={colorMode === 'light' && themeVariant === 'standard' ? 'bg-slate-100 dark:bg-slate-800' : ''}
            >
              <div className="w-4 h-4 rounded-full bg-blue-500 mr-2" />
              <span>Standard Light</span>
              {colorMode === 'light' && themeVariant === 'standard' && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
          )}
          
          {experience === 'corporate' && (
            <DropdownMenuItem 
              onClick={() => handleThemeSelect('corporate', 'light')}
              className={colorMode === 'light' && themeVariant === 'corporate' ? 'bg-slate-100 dark:bg-slate-800' : ''}
            >
              <div className="w-4 h-4 rounded-full bg-slate-700 mr-2" />
              <span>Corporate Light</span>
              {colorMode === 'light' && themeVariant === 'corporate' && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
          )}
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Dark Mode Themes</DropdownMenuLabel>
          
          {experience === 'standard' && (
            <DropdownMenuItem 
              onClick={() => handleThemeSelect('neuralliquid', 'dark')}
              className={colorMode === 'dark' && themeVariant === 'neuralliquid' ? 'bg-slate-100 dark:bg-slate-800' : ''}
            >
              <div className="w-4 h-4 rounded-full bg-purple-700 mr-2" />
              <span>Neural Liquid</span>
              {colorMode === 'dark' && themeVariant === 'neuralliquid' && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
          )}
          
          {experience === 'corporate' && (
            <DropdownMenuItem 
              onClick={() => handleThemeSelect('veritasvault', 'dark')}
              className={colorMode === 'dark' && themeVariant === 'veritasvault' ? 'bg-slate-100 dark:bg-slate-800' : ''}
            >
              <div className="w-4 h-4 rounded-full bg-indigo-900 mr-2" />
              <span>Veritas Vault</span>
              {colorMode === 'dark' && themeVariant === 'veritasvault' && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}