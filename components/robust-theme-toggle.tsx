"use client"

import { useState, useEffect } from "react"
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
import { useRobustTheme } from "@/src/context/RobustThemeProvider"
import { CORPORATE_VARIANTS, STANDARD_VARIANTS, COLOR_MODES } from "@/src/constants/theme"

/**
 * A robust theme toggle component that works with our RobustThemeProvider
 * This component allows users to switch between light and dark modes
 * and select different theme variants
 */
export function RobustThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { colorMode, setColorMode, themeVariant, setThemeVariant, experience } = useRobustTheme()
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="opacity-0">
        <Sun className="h-5 w-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }
  
  // Toggle between light and dark modes
  const toggleColorMode = () => {
    setColorMode(colorMode === COLOR_MODES.LIGHT ? COLOR_MODES.DARK : COLOR_MODES.LIGHT)
  }
  
  // Define available theme variants based on experience
  const availableVariants = experience === 'standard' 
    ? [
        { id: STANDARD_VARIANTS.STANDARD, name: 'Standard' },
        { id: STANDARD_VARIANTS.NEURALLIQUID, name: 'Neural Liquid' },
        { id: STANDARD_VARIANTS.COSMIC, name: 'Cosmic' }
      ]
    : [
        { id: CORPORATE_VARIANTS.CORPORATE, name: 'Corporate' },
        { id: CORPORATE_VARIANTS.VERITASVAULT, name: 'VeritasVault' }
      ]
  
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
                {colorMode === COLOR_MODES.DARK ? (
                  <Moon className="h-5 w-5 transition-all" />
                ) : (
                  <Sun className="h-5 w-5 transition-all" />
                )}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle theme</p>
          </TooltipContent>
        </Tooltip>
        
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuItem onClick={toggleColorMode}>
            {colorMode === COLOR_MODES.DARK ? (
              <><Sun className="mr-2 h-4 w-4" /><span>Light</span></>
            ) : (
              <><Moon className="mr-2 h-4 w-4" /><span>Dark</span></>
            )}
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Theme Variants</DropdownMenuLabel>
          
          {availableVariants.map((variant) => (
            <DropdownMenuItem
              key={variant.id}
              onClick={() => setThemeVariant(variant.id)}
              className={themeVariant === variant.id ? "bg-slate-100 dark:bg-slate-800" : ""}
            >
              <span className="mr-auto">{variant.name}</span>
              {themeVariant === variant.id && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}