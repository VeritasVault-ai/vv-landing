"use client"

import Image, { type ImageProps } from "next/image"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { getThemeAwareImagePath } from "@/lib/theme-config"

interface ThemeOptimizedImageProps extends Omit<ImageProps, "src"> {
  src: string
  darkSrc?: string
  lightSrc?: string
}

export function ThemeOptimizedImage({
  src,
  darkSrc,
  lightSrc,
  alt,
  className = "",
  ...props
}: ThemeOptimizedImageProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Determine which image source to use
  const getImageSrc = () => {
    const currentTheme = resolvedTheme || theme

    if (currentTheme === "dark" && darkSrc) {
      return darkSrc
    }

    if (currentTheme === "light" && lightSrc) {
      return lightSrc
    }

    // If specific theme sources aren't provided, use the theme-aware path
    return getThemeAwareImagePath(src, currentTheme)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  // If not mounted yet, render a placeholder with the same dimensions
  if (!mounted) {
    return (
      <div
        className={`bg-muted ${className}`}
        style={{
          aspectRatio: props.width && props.height ? `${props.width} / ${props.height}` : "auto",
          width: props.width ? `${props.width}px` : "100%",
          height: props.height ? `${props.height}px` : "auto",
        }}
        aria-hidden="true"
      />
    )
  }

  return (
    <Image
      src={getImageSrc() || "/placeholder.svg"}
      alt={alt}
      className={`theme-aware-image ${imageLoaded ? "loaded" : "loading"} ${className}`}
      onLoad={() => setImageLoaded(true)}
      {...props}
    />
  )
}
