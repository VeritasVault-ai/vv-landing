"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { AISettings, DEFAULT_AI_SETTINGS } from "./ai-settings-types"
import { aiHistoryTracker } from "@/lib/ai/ai-history-tracker"

// Context for AI settings
interface AISettingsContextType {
  settings: AISettings;
  updateSettings: (newSettings: Partial<AISettings>) => void;
  updateFeature: (feature: keyof AISettings['features'], enabled: boolean) => void;
  updatePrivacy: (setting: keyof AISettings['privacy'], value: boolean) => void;
  updatePersonalization: (setting: keyof AISettings['personalization'], value: any) => void;
  updateDisplay: (setting: keyof AISettings['display'], value: boolean) => void;
  resetToDefaults: () => void;
  isAIEnabled: () => boolean;
}

const AISettingsContext = createContext<AISettingsContextType | undefined>(undefined)

// Storage key for persisting settings
const STORAGE_KEY = "ai_settings"

/**
 * Provider component for AI settings
 */
export function AISettingsProvider({ children }: { children: ReactNode }) {
  // Initialize settings from localStorage or defaults
  const [settings, setSettings] = useState<AISettings>(() => {
    if (typeof window !== "undefined") {
      try {
        const storedSettings = localStorage.getItem(STORAGE_KEY)
        if (storedSettings) {
          return JSON.parse(storedSettings) as AISettings
        }
      } catch (error) {
        console.error("Failed to parse stored AI settings:", error)
      }
    }
    return DEFAULT_AI_SETTINGS
  })

  // Update settings in localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    }
    
    // Update AI history tracker settings
    aiHistoryTracker.setEnabled(settings.historyTracking)
  }, [settings])

  // Update all settings
  const updateSettings = (newSettings: Partial<AISettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings,
      // Handle nested objects
      features: {
        ...prev.features,
        ...(newSettings.features || {})
      },
      privacy: {
        ...prev.privacy,
        ...(newSettings.privacy || {})
      },
      personalization: {
        ...prev.personalization,
        ...(newSettings.personalization || {})
      },
      display: {
        ...prev.display,
        ...(newSettings.display || {})
      }
    }))
  }

  // Update a specific feature setting
  const updateFeature = (feature: keyof AISettings['features'], enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: enabled
      }
    }))
  }

  // Update a specific privacy setting
  const updatePrivacy = (setting: keyof AISettings['privacy'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [setting]: value
      }
    }))
  }

  // Update a specific personalization setting
  const updatePersonalization = (setting: keyof AISettings['personalization'], value: any) => {
    setSettings(prev => ({
      ...prev,
      personalization: {
        ...prev.personalization,
        [setting]: value
      }
    }))
  }

  // Update a specific display setting
  const updateDisplay = (setting: keyof AISettings['display'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      display: {
        ...prev.display,
        [setting]: value
      }
    }))
  }

  // Reset all settings to defaults
  const resetToDefaults = () => {
    setSettings(DEFAULT_AI_SETTINGS)
  }

  // Check if AI features are enabled
  const isAIEnabled = () => settings.enabled

  return (
    <AISettingsContext.Provider 
      value={{
        settings,
        updateSettings,
        updateFeature,
        updatePrivacy,
        updatePersonalization,
        updateDisplay,
        resetToDefaults,
        isAIEnabled
      }}
    >
      {children}
    </AISettingsContext.Provider>
  )
}

/**
 * Hook for accessing AI settings
 */
export function useAISettings() {
  const context = useContext(AISettingsContext)
  if (context === undefined) {
    throw new Error("useAISettings must be used within an AISettingsProvider")
  }
  return context
}