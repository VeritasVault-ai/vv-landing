"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { getThemeAwareImagePath } from "@/lib/theme-config"

export function useThemeAwareImage(src: string, darkSrc?: string, lightSrc?: string) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const currentTheme = resolvedTheme || theme

    if (currentTheme === "dark" && darkSrc) {
      setImageSrc(darkSrc)
    } else if (currentTheme === "light" && lightSrc) {
      setImageSrc(lightSrc)
    } else {
      setImageSrc(getThemeAwareImagePath(src, currentTheme))
    }
  }, [theme, resolvedTheme, src, darkSrc, lightSrc, mounted])

  return { imageSrc, isLoaded: mounted }
}
