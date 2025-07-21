export type ThemeConfig = {
  name: string
  imageSuffix: string
  className: string
  variables: Record<string, string>
}

export const themeConfig: Record<string, ThemeConfig> = {
  light: {
    name: "Light",
    imageSuffix: "-light",
    className: "light-theme",
    variables: {
      background: "#ffffff",
      foreground: "#1f2937",
      primary: "#3b82f6",
      secondary: "#10b981",
      accent: "#8b5cf6",
      muted: "#f3f4f6",
    },
  },
  dark: {
    name: "Dark",
    imageSuffix: "",
    className: "dark-theme",
    variables: {
      background: "#0a0e1a",
      foreground: "#e6edf8",
      primary: "#4e90ff",
      secondary: "#7c5cff",
      accent: "#a56eff",
      muted: "#a0b0c8",
    },
  },
  system: {
    name: "System",
    imageSuffix: "", // Will use dark or light based on system preference
    className: "system-theme",
    variables: {}, // Will inherit from dark or light based on system preference
  },
}

export const getThemeImageSuffix = (theme: string | undefined): string => {
  if (!theme || theme === "system") {
    // For system theme, we'd ideally check the system preference
    // But for simplicity in this implementation, we'll default to no suffix (dark)
    return ""
  }

  return themeConfig[theme]?.imageSuffix || ""
}

export const getThemeClassName = (theme: string | undefined): string => {
  if (!theme) return ""
  return themeConfig[theme]?.className || ""
}

// Helper function to get the image path based on theme
export const getThemeAwareImagePath = (basePath: string | undefined, theme: string | undefined): string => {
  // Handle undefined basePath
  if (!basePath) {
    return "";
  }
  
  const suffix = getThemeImageSuffix(theme)

  // Handle file extension
  const lastDotIndex = basePath.lastIndexOf(".")
  if (lastDotIndex === -1) {
    // No file extension
    return `${basePath}${suffix}`
  }

  const pathWithoutExtension = basePath.substring(0, lastDotIndex)
  const extension = basePath.substring(lastDotIndex)

  return `${pathWithoutExtension}${suffix}${extension}`
}

// Get CSS variables for a theme
export const getThemeVariables = (theme: string | undefined): Record<string, string> => {
  if (!theme || theme === "system") {
    // For system theme, we'd ideally check the system preference
    // But for simplicity, we'll default to dark theme variables
    return themeConfig.dark.variables
  }

  return themeConfig[theme]?.variables || {}
}

// Generate CSS variable string for inline styles
export const getThemeVariablesStyle = (theme: string | undefined): string => {
  const variables = getThemeVariables(theme)
  return Object.entries(variables)
    .map(([key, value]) => `--${key}: ${value};`)
    .join(" ")
}