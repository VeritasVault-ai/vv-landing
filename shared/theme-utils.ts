/**
 * Utility functions for theme handling throughout the application
 */

import { COLOR_MODES, CORPORATE_VARIANTS, STANDARD_VARIANTS } from "@/src/constants/theme"

/**
 * Applies theme settings to the document based on the provided theme string
 * This function directly manipulates the DOM for immediate theme application
 * 
 * @param theme The theme string in format "variant-colorMode" (e.g., "corporate-dark")
 */
export function applyThemeToDocument(theme: string | null): void {
  if (!theme) return
  
  try {
    const [variant, colorMode] = theme.split('-')
    
    // Apply dark mode class directly
    if (colorMode === COLOR_MODES.DARK) {
      document.documentElement.classList.add('dark')
      document.documentElement.style.colorScheme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = 'light'
    }
    
    // Apply variant-specific CSS variables if needed
    if (variant === CORPORATE_VARIANTS.VERITASVAULT) {
      document.documentElement.classList.add('veritasvault-theme')
    } else {
      document.documentElement.classList.remove('veritasvault-theme')
    }
    
    // Apply neural theme
    if (variant === STANDARD_VARIANTS.NEURALLIQUID) {
      document.documentElement.classList.add('neural-theme')
    } else {
      document.documentElement.classList.remove('neural-theme')
    }
    
    // Apply cosmic theme
    if (variant === STANDARD_VARIANTS.COSMIC) {
      document.documentElement.classList.add('cosmic-theme')
    } else {
      document.documentElement.classList.remove('cosmic-theme')
    }
    
    // Store the theme preference
    try {
      localStorage.setItem('theme-preference', theme)
    } catch (error) {
      console.error('Failed to store theme preference:', error)
    }
  } catch (error) {
    console.error('Error applying theme to document:', error)
  }
}

/**
 * Gets the theme from URL parameters
 * 
 * @returns The theme string from URL or null if not present
 */
export function getThemeFromUrl(): string | null {
  if (typeof window === 'undefined') return null
  
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('theme')
}

/**
 * Gets the stored theme preference from localStorage
 * 
 * @returns The stored theme preference or null if not found
 */
export function getStoredThemePreference(): string | null {
  if (typeof window === 'undefined') return null
  
  try {
    return localStorage.getItem('theme-preference')
  } catch (error) {
    console.error('Error getting stored theme preference:', error)
    return null
  }
}

/**
 * Gets the effective theme to use, prioritizing URL parameters over stored preferences
 * 
 * @param defaultTheme The default theme to use if no preference is found
 * @returns The effective theme to use
 */
export function getEffectiveTheme(defaultTheme: string = 'corporate-light'): string {
  const urlTheme = getThemeFromUrl()
  const storedTheme = getStoredThemePreference()
  
  return urlTheme || storedTheme || defaultTheme
}

/**
 * Initializes the theme on page load
 * This function should be called as early as possible in the application lifecycle
 */
export function initializeTheme(): void {
  const theme = getEffectiveTheme()
  applyThemeToDocument(theme)
}