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

/**
 * Renders a theme-aware image with support for light and dark sources, ensuring theme context is available.
 *
 * Wraps the original {@link OriginalThemeAwareImage} component in a {@link ThemeProvider} to provide theme context during migration.
 *
 * @remark This is a temporary bridge component to resolve theme context issues and should be removed once the theme provider hierarchy is refactored.
 */
export function ThemeAwareImage(props: ThemeAwareImageProps) {
  return (
    <ThemeProvider attribute="class">
      <OriginalThemeAwareImage {...props} />
    </ThemeProvider>
  )
}