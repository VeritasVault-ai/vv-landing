"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { DashboardOverview, DashboardPerformance } from "@/lib/repositories/dashboard-repository"
import { dashboardService } from "@/lib/services/dashboard-service"
import { dashboardEvents } from "@/lib/events/dashboard-events"
import { useTheme } from "@/lib/context/ThemeProvider" // Import the app's theme provider

// Define types for user preferences (without theme, which comes from ThemeProvider)
export interface DashboardSettings {
  visibleMetrics: {
    portfolioValue: boolean
    activeStrategies: boolean
    riskScore: boolean
  }
  refreshRates: {
    portfolioValue: number // in seconds
    riskScore: number // in seconds
    performance: number // in seconds
    modelResults: number // in seconds
    voting: number // in seconds
  }
  compactView: boolean
}

// Define the context state type
interface DashboardContextType {
  // Dashboard data
  overviewData: DashboardOverview | null
  performanceData: DashboardPerformance | null
  
  // Loading and error states
  isLoading: {
    overview: boolean
    performance: boolean
  }
  errors: {
    overview: string | null
    performance: string | null
  }
  
  // User settings
  settings: DashboardSettings
  updateSettings: (newSettings: Partial<DashboardSettings>) => void
  
  // Active tab
  activeTab: string
  setActiveTab: (tab: string) => void
  
  // Refresh data manually
  refreshData: (section?: "overview" | "performance" | "models" | "voting") => Promise<void>
}

// Default settings
const DEFAULT_SETTINGS: DashboardSettings = {
  visibleMetrics: {
    portfolioValue: true,
    activeStrategies: true,
    riskScore: true,
  },
  refreshRates: {
    portfolioValue: 20, // 20 seconds
    riskScore: 60, // 60 seconds
    performance: 90, // 90 seconds
    modelResults: 45, // 45 seconds
    voting: 30, // 30 seconds
  },
  compactView: false,
}

// Create the context with a default value
const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

// Provider component
export function DashboardProvider({ children }: { children: ReactNode }) {
  // Access the application's theme context
  const appTheme = useTheme()
  
  // Dashboard data
  const [overviewData, setOverviewData] = useState<DashboardOverview | null>(null)
  const [performanceData, setPerformanceData] = useState<DashboardPerformance | null>(null)
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState({
    overview: true,
    performance: true,
  })
  const [errors, setErrors] = useState({
    overview: null as string | null,
    performance: null as string | null,
  })
  
  // User settings with persistence (excluding theme which is managed by ThemeProvider)
  const [settings, setSettings] = useState<DashboardSettings>(() => {
    // Try to load settings from localStorage
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("dashboardSettings")
      if (savedSettings) {
        try {
          return JSON.parse(savedSettings) as DashboardSettings
        } catch (e) {
          console.error("Failed to parse saved dashboard settings", e)
        }
      }
    }
    return DEFAULT_SETTINGS
  })
  
  // Active tab state
  const [activeTab, setActiveTab] = useState("overview")
  
  // Update settings and save to localStorage
const updateSettings = (newSettings: Partial<DashboardSettings>) => {
  setSettings(prev => {
    const updated = {
      ...prev,
      ...newSettings,
      // Handle nested objects
      visibleMetrics: {
        ...prev.visibleMetrics,
        ...(newSettings.visibleMetrics || {}),
      },
      refreshRates: {
        ...prev.refreshRates,
        ...(newSettings.refreshRates || {}),
      },
    }
    
    // Save to localStorage
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("dashboardSettings", JSON.stringify(updated))
      } catch (e) {
        console.warn("Unable to persist dashboard settings", e)
      }
    }
    
    return updated
  })
}
  
  // Fetch dashboard overview data
  const fetchOverviewData = async () => {
    try {
      setIsLoading(prev => ({ ...prev, overview: true }))
      const data = await dashboardService.getDashboardOverview()
      setOverviewData(data)
      setErrors(prev => ({ ...prev, overview: null }))
    } catch (err) {
      console.error("Error fetching dashboard overview:", err)
      setErrors(prev => ({ ...prev, overview: "Failed to load dashboard data" }))
    } finally {
      setIsLoading(prev => ({ ...prev, overview: false }))
    }
  }
  
  // Fetch dashboard performance data
  const fetchPerformanceData = async () => {
    try {
      setIsLoading(prev => ({ ...prev, performance: true }))
      const data = await dashboardService.getDashboardPerformance()
      setPerformanceData(data)
      setErrors(prev => ({ ...prev, performance: null }))
    } catch (err) {
      console.error("Error fetching dashboard performance:", err)
      setErrors(prev => ({ ...prev, performance: "Failed to load performance data" }))
    } finally {
      setIsLoading(prev => ({ ...prev, performance: false }))
    }
  }
  
  // Refresh data manually
  const refreshData = async (section?: "overview" | "performance" | "models" | "voting") => {
    if (!section || section === "overview") {
      await fetchOverviewData()
    }
    if (!section || section === "performance") {
      await fetchPerformanceData()
    }
    // Add other sections as needed
  }
  
  // Initial data fetch
  useEffect(() => {
    fetchOverviewData()
    fetchPerformanceData()
  }, [])
  
  // Subscribe to dashboard events
  useEffect(() => {
    // Portfolio value updates
    const portfolioSubscription = dashboardEvents.subscribe(
      "portfolio-value-updated",
      ({ portfolioValue, percentageChange, lastUpdated }) => {
        setOverviewData(prev => {
          if (!prev) return null
          return {
            ...prev,
            portfolioValue: {
              ...prev.portfolioValue,
              current: portfolioValue,
              percentageChange,
              lastUpdated,
            },
          }
        })
      }
    )
    
    // Risk score changes
    const riskSubscription = dashboardEvents.subscribe(
      "risk-score-changed",
      ({ level, status, description }) => {
        setOverviewData(prev => {
          if (!prev) return null
          return {
            ...prev,
            riskScore: {
              level,
              status,
              description,
            },
          }
        })
      }
    )
    
    // Performance data updates
    const performanceSubscription = dashboardEvents.subscribe(
      "performance-data-updated",
      ({ historicalPerformance }) => {
        setPerformanceData(prev => {
          if (!prev) return null
          return {
            ...prev,
            historicalPerformance,
          }
        })
      }
    )
    
    // Asset performance changes
    const assetPerformanceSubscription = dashboardEvents.subscribe(
      "asset-performance-changed",
      ({ topPerformers, underperformers }) => {
        setPerformanceData(prev => {
          if (!prev) return null
          return {
            ...prev,
            topPerformers,
            underperformers,
          }
        })
      }
    )
    
    // Clean up subscriptions
    return () => {
      portfolioSubscription()
      riskSubscription()
      performanceSubscription()
      assetPerformanceSubscription()
    }
  }, [])
  
  const value: DashboardContextType = {
    overviewData,
    performanceData,
    isLoading,
    errors,
    settings,
    updateSettings,
    activeTab,
    setActiveTab,
    refreshData,
  }
  
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

// Custom hook to use the dashboard context
export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}

// Custom hook that combines dashboard context with theme context
export function useDashboardWithTheme() {
  const dashboardContext = useDashboard()
  const themeContext = useTheme()
  
  return {
    ...dashboardContext,
    theme: themeContext
  }
}