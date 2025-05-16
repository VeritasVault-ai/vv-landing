'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode, useEffect, useState } from 'react'

// Define the Attribute type based on next-themes
type Attribute = 'class' | 'data-theme' | 'data-mode'

interface ServerSafeThemeProviderProps {
  children: ReactNode
  attribute?: Attribute | Attribute[]
  defaultTheme?: string
  enableSystem?: boolean
  forcedTheme?: string
  storageKey?: string
  disableTransitionOnChange?: boolean
}

/**
 * A server-safe theme provider that only renders its children after hydration
 * This prevents the "useTheme must be within ThemeProvider" error in server components
 */
export function ServerSafeThemeProvider({
  children,
  attribute = 'data-theme',
  defaultTheme = 'system',
  enableSystem = true,
  forcedTheme,
  storageKey = 'theme',
  disableTransitionOnChange,
}: ServerSafeThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  // Only render children after first client-side render to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder with the same structure but no theme context
    // This prevents hydration errors while still allowing server rendering
    return <>{children}</>
  }

  return (
    <ThemeProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      forcedTheme={forcedTheme}
      storageKey={storageKey}
      disableTransitionOnChange={disableTransitionOnChange}
    >
      {children}
    </ThemeProvider>
  )
}