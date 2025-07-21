"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"
import { preloadThemeImages } from "@/lib/theme-image-utils"

interface ThemeImagePreloaderProps {
  imagePaths: string[]
}

export function ThemeImagePreloader({ imagePaths }: ThemeImagePreloaderProps) {
  const { theme } = useTheme()

  useEffect(() => {
    // Preload all images when the theme changes or on initial load
    const preloadAllImages = async () => {
      await Promise.all(imagePaths.map((path) => preloadThemeImages(path)))
    }

    preloadAllImages()
  }, [theme, imagePaths])

  // This component doesn't render anything visible
  return null
}
