"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { NavigationItem, User } from "../models/types"
import { contentService } from "../services/content-service"
import { STATIC_NAVIGATION, STATIC_SETTINGS } from "../static-data"

// Convert static settings array to object
const staticSettingsObject = STATIC_SETTINGS.reduce(
  (acc, setting) => {
    acc[setting.key] = setting.value
    return acc
  },
  {} as Record<string, any>,
)

interface AppContextType {
  navigation: NavigationItem[]
  settings: Record<string, any>
  user: User | null
  isLoading: boolean
  error: Error | null
  refreshNavigation: () => Promise<NavigationItem[]>
  refreshSettings: () => Promise<Record<string, any>>
  setUser: (user: User | null) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  // Initialize with static data to avoid loading state
  const [navigation, setNavigation] = useState<NavigationItem[]>(STATIC_NAVIGATION)
  const [settings, setSettings] = useState<Record<string, any>>(staticSettingsObject)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false) // Start with false since we have static data
  const [error, setError] = useState<Error | null>(null)

  // These functions now return the static data wrapped in a Promise
  // This maintains the same API but doesn't actually make network requests
  const refreshNavigation = async () => {
    return Promise.resolve(contentService.getNavigation())
  }

  const refreshSettings = async () => {
    return Promise.resolve(staticSettingsObject)
  }

  // We still have this effect for consistency, but it doesn't do network requests
  useEffect(() => {
    const initializeApp = async () => {
      // No need to set loading state since we're using static data
      setError(null)

      try {
        // These don't actually make network requests anymore
        const navData = contentService.getNavigation()
        setNavigation(navData)

        // We're already using static settings
      } catch (err) {
        console.error("Error initializing app:", err)
        setError(err instanceof Error ? err : new Error("Failed to initialize app"))
      }
    }

    initializeApp()
  }, [])

  return (
    <AppContext.Provider
      value={{
        navigation,
        settings,
        user,
        isLoading,
        error,
        refreshNavigation,
        refreshSettings,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
