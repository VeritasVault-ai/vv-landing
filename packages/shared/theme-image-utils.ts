import { getThemeAwareImagePath } from "./theme-config"

export { getThemeAwareImagePath }

// Additional utility functions for theme-aware images

/**
 * Preloads an image for better performance
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

/**
 * Preloads both light and dark versions of an image
 */
export async function preloadThemeImages(basePath: string): Promise<void> {
  try {
    await Promise.all([
      preloadImage(getThemeAwareImagePath(basePath, "light")),
      preloadImage(getThemeAwareImagePath(basePath, "dark")),
    ])
  } catch (error) {
    console.error("Failed to preload theme images:", error)
  }
}

/**
 * Gets the appropriate image path based on the current theme
 */
export function getImagePathForTheme(basePath: string, theme: string | undefined): string {
  return getThemeAwareImagePath(basePath, theme)
}
