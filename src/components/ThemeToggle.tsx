// src/components/ThemeToggle.tsx - Updated to use useUnifiedTheme
'use client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useUnifiedTheme } from '@/src/hooks/use-unified-theme'
import { ColorMode } from '@/styles/theme'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ThemeVariant } from '../types'

/**
 * Renders a theme toggle button with a dropdown menu for selecting color modes and theme variants.
 *
 * Provides a smart toggle between light and dark modes, automatically selecting a corresponding theme variant based on the current experience. Users can also explicitly choose from available light and dark theme variants via the dropdown menu. The component ensures correct rendering during hydration by delaying UI display until mounted.
 */
export function ThemeToggle() {
  // Add try-catch to handle potential errors from useUnifiedTheme
  let themeData = {
    theme: 'light' as ColorMode,
    setTheme: (theme: ColorMode) => {},
    themeVariant: 'standard' as ThemeVariant,
    setThemeVariant: (variant: ThemeVariant) => {},
    availableThemeVariants: [] as ThemeVariant[]
  };
  
  try {
    themeData = useUnifiedTheme();
  } catch (error) {
    console.error("Error using unified theme:", error);
    // Continue with default values
  }
  
  const {
    theme: colorMode,
    setTheme: setColorMode,
    themeVariant,
    setThemeVariant,
    availableThemeVariants = [],
  } = themeData;
  
  // Extract experience from themeVariant - this needs to be adjusted based on your actual implementation
  const experience = themeVariant?.includes('corporate') || themeVariant?.includes('veritasvault') 
    ? 'corporate' 
    : 'standard'
  
  const [mounted, setMounted] = useState(false)
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Smart toggle between corresponding light/dark variants
  const handleSmartToggle = () => {
    const nextMode: ColorMode = colorMode === 'light' ? 'dark' : 'light'
    const nextVariant: ThemeVariant =
      nextMode === 'dark'
        ? experience === 'standard'
          ? 'neuralliquid'
          : 'veritasvault'
        : experience === 'standard'
          ? 'standard'
          : 'corporate'
    setColorMode(nextMode)
    setThemeVariant(nextVariant)
  }
  
  // Typed theme selection
  const handleThemeSelect = (variant: ThemeVariant, mode: ColorMode) => {
    setThemeVariant(variant)
    setColorMode(mode)
  }
  
  // Define default theme variants if availableThemeVariants is empty
  const lightThemeVariants = ['standard', 'corporate'].filter(v => 
    !availableThemeVariants.length || availableThemeVariants.includes(v as ThemeVariant)
  ) as ThemeVariant[];
    
  const darkThemeVariants = ['neuralliquid', 'veritasvault'].filter(v => 
    !availableThemeVariants.length || availableThemeVariants.includes(v as ThemeVariant)
  ) as ThemeVariant[];
  
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
                aria-label="Toggle theme"
                className="text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
              >
                {colorMode === 'dark' ? (
                  <Sun className="h-5 w-5 transition-all" />
                ) : (
                  <Moon className="h-5 w-5 transition-all" />
                )}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Switch to {colorMode === 'dark' ? 'light' : 'dark'} mode</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Toggle Theme</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleSmartToggle}>
            {colorMode === 'dark' ? (
              <><Sun className="mr-2 h-4 w-4"/><span>Light Mode</span></>
            ) : (
              <><Moon className="mr-2 h-4 w-4"/><span>Dark Mode</span></>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Light Mode Themes</DropdownMenuLabel>
          {lightThemeVariants.map(variant => (
            <DropdownMenuItem
              key={variant}
              onClick={() => handleThemeSelect(variant, 'light')}
              className={
                colorMode === 'light' && themeVariant === variant
                  ? 'bg-slate-100 dark:bg-slate-800'
                  : ''
              }
            >
              <span className="capitalize mr-auto">{variant}</span>
              {colorMode === 'light' && themeVariant === variant && (
                <span className="ml-auto">✓</span>
              )}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Dark Mode Themes</DropdownMenuLabel>
          {darkThemeVariants.map(variant => (
            <DropdownMenuItem
              key={variant}
              onClick={() => handleThemeSelect(variant, 'dark')}
              className={
                colorMode === 'dark' && themeVariant === variant
                  ? 'bg-slate-100 dark:bg-slate-800'
                  : ''
              }
            >
              <span className="capitalize mr-auto">{variant}</span>
              {colorMode === 'dark' && themeVariant === variant && (
                <span className="ml-auto">✓</span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}