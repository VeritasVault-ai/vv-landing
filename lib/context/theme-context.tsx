"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useTheme as useNextTheme } from "next-themes"

type ThemeContextType = {
  theme: string
  setTheme: (theme: string) => void
  resolvedTheme: string | undefined
  isDark: boolean
  version?: "standard" | "corporate"
}

type ThemeContextProviderProps = {
  children: ReactNode
  initialVersion?: "standard" | "corporate"
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children, initialVersion }: ThemeContextProviderProps) {
  const { theme, setTheme, resolvedTheme } = useNextTheme()
  const [isDark, setIsDark] = useState(false)
  const [version] = useState(initialVersion)

  useEffect(() => {
    setIsDark(resolvedTheme === "dark")
  }, [resolvedTheme])

  return (
    <ThemeContext.Provider
      value={{
        theme: theme || "system",
        setTheme,
        resolvedTheme,
        isDark,
        version,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeContextProvider")
  }
  return context
}
