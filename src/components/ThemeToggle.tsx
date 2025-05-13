// src/components/ThemeToggle.tsx
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
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAvailableThemeVariants, useTheme } from '../lib/hooks/context/ThemeProvider'
import { ColorMode } from '@/styles/theme'
import { ThemeVariant } from '../types'

/**
 * Renders a theme toggle button with a dropdown menu for selecting color modes and theme variants.
 *
 * Provides a smart toggle between light and dark modes, automatically selecting a corresponding theme variant based on the current experience. Users can also explicitly choose from available light and dark theme variants via the dropdown menu. The component ensures correct rendering during hydration by delaying UI display until mounted.
 */
export function ThemeToggle() {
  const {
    colorMode,
    themeVariant,
    setColorMode,
    setThemeVariant,
    experience,
  } = useTheme()
  const availableThemeVariants = useAvailableThemeVariants()
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

          {availableThemeVariants
            .filter(v => v === 'standard' || v === 'corporate')
            .map(variant => (
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

          {availableThemeVariants
            .filter(v => v === 'neuralliquid' || v === 'veritasvault')
            .map(variant => (
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
