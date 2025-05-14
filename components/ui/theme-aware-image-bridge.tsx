"use client"

/**
 * TEMPORARY FILE - PART OF CODEBASE MIGRATION
 * 
 * This is a temporary bridge file created to fix the "useTheme must be within ThemeProvider" error.
 * It wraps the ThemeAwareImage component with a ThemeProvider.
 * 
 * TODO: Once the theme provider hierarchy is properly refactored, this file should be deleted.
 */

import { ThemeProvider } from "next-themes"
import { ThemeAwareImage as OriginalThemeAwareImage } from "./theme-aware-image"
import { ImageProps } from "next/image"

interface ThemeAwareImageProps extends Omit<ImageProps, "src"> {
  src: string
  darkSrc?: string
  lightSrc?: string
}

export function ThemeAwareImage(props: ThemeAwareImageProps) {
  return (
    <ThemeProvider attribute="class">
      <OriginalThemeAwareImage {...props} />
    </ThemeProvider>
  )
}