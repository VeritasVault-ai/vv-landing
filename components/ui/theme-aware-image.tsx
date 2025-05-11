"use client"

import Image, { type ImageProps } from "next/image"
import { useThemeAwareImage } from "@/hooks/use-theme-aware-image"

interface ThemeAwareImageProps extends Omit<ImageProps, "src"> {
  src: string
  darkSrc?: string
  lightSrc?: string
}

export function ThemeAwareImage({ src, darkSrc, lightSrc, alt, className = "", ...props }: ThemeAwareImageProps) {
  const { imageSrc, isLoaded } = useThemeAwareImage(src, darkSrc, lightSrc)

  if (!isLoaded) {
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
      src={imageSrc || "/placeholder.svg"}
      alt={alt}
      className={`theme-aware-image loaded ${className}`}
      {...props}
    />
  )
}
