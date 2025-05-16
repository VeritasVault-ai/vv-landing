"use client"

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react"
import { dashboardService } from "@/lib/services/dashboard-service"

// Import the mock service initialization
import initMocks from "@/lib/mocks"

// Initialize mocks in development environment
if (process.env.NODE_ENV === 'development') {
  initMocks()
}

// Define types for dashboard settings
export interface DashboardSettings {
  compactView: boolean
  realTimeUpdates: boolean
  showSimulationIndicators: boolean
}

// Define types for dashboard context
interface DashboardContextType {
  settings: DashboardSettings
  updateSettings: (newSettings: DashboardSettings) => void
  isLoading: boolean
  error: string | null
  performanceData: any | null
  portfolioData: any | null
  marketData: any | null
  votingData: any | null
  refreshData: () => Promise<void>
}

// Create the dashboard context with default values
const DashboardContext = createContext<DashboardContextType>({
  settings: {
    compactView: false,
    realTimeUpdates: true,
    showSimulationIndicators: true
  },
  updateSettings: () => {},
  isLoading: false,
  error: null,
  performanceData: null,
  portfolioData: null,
  marketData: null,
  votingData: null,
  refreshData: async () => {}
})

// Provider component for the dashboard context
export function DashboardProvider({ children }: { children: ReactNode }) {
  // Dashboard settings state
  const [settings, setSettings] = useState<DashboardSettings>({
    compactView: false,
    realTimeUpdates: true,
    showSimulationIndicators: true
  })

  // Data loading state
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Dashboard data state
  const [performanceData, setPerformanceData] = useState<any | null>(null)
  const [portfolioData, setPortfolioData] = useState<any | null>(null)
  const [marketData, setMarketData] = useState<any | null>(null)
  const [votingData, setVotingData] = useState<any | null>(null)

  // Function to update dashboard settings
  const updateSettings = useCallback((newSettings: DashboardSettings) => {
    setSettings(newSettings)
    // Save settings to local storage
    try {
      localStorage.setItem('dashboardSettings', JSON.stringify(newSettings))
    } catch (error) {
      console.error("Error saving dashboard settings:", error)
    }
  }, [])

  // Function to fetch performance data
  const fetchPerformanceData = useCallback(async () => {
    try {
      const data = await dashboardService.getDashboardPerformance()
      setPerformanceData(data)
      return data
    } catch (error) {
      console.error("Error fetching dashboard performance:", error)
      setError("Failed to load performance data")
      throw error
    }
  }, [])

  // Function to fetch portfolio data
  const fetchPortfolioData = useCallback(async () => {
    try {
      const data = await dashboardService.getDashboardPortfolio()
      setPortfolioData(data)
      return data
    } catch (error) {
      console.error("Error fetching portfolio data:", error)
      setError("Failed to load portfolio data")
      throw error
    }
  }, [])

  // Function to fetch market data
  const fetchMarketData = useCallback(async () => {
    try {
      const data = await dashboardService.getDashboardMarket()
      setMarketData(data)
      return data
    } catch (error) {
      console.error("Error fetching market data:", error)
      setError("Failed to load market data")
      throw error
    }
  }, [])

  // Function to fetch voting data
  const fetchVotingData = useCallback(async () => {
    try {
      const data = await dashboardService.getDashboardVoting()
      setVotingData(data)
      return data
    } catch (error) {
      console.error("Error fetching voting data:", error)
      setError("Failed to load voting data")
      throw error
    }
  }, [])

  // Function to refresh all dashboard data
  const refreshData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const results = await Promise.allSettled([
        fetchPerformanceData(),
        fetchPortfolioData(),
        fetchMarketData(),
        fetchVotingData()
      ])
      
      // Check for any rejected promises
      const failedRequests = results.filter(result => result.status === 'rejected')
      if (failedRequests.length > 0) {
        setError(`Failed to load some dashboard data (${failedRequests.length} errors)`)
      }
    } catch (error) {
      console.error("Error refreshing dashboard data:", error)
      setError("Failed to refresh dashboard data")
    } finally {
      setIsLoading(false)
    }
  }, [fetchPerformanceData, fetchPortfolioData, fetchMarketData, fetchVotingData])

  // Load saved settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('dashboardSettings')
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings)
        setSettings(parsedSettings)
      }
    } catch (error) {
      console.error("Error loading saved dashboard settings:", error)
    }
  }, [])

  // Set up real-time data updates if enabled
  useEffect(() => {
    if (!settings.realTimeUpdates) return
    
    const updateInterval = setInterval(() => {
      refreshData()
    }, 60000) // Update every minute if real-time updates are enabled
    
    return () => clearInterval(updateInterval)
  }, [settings.realTimeUpdates, refreshData])

  // Fetch initial data on mount
  useEffect(() => {
    refreshData()
  }, [refreshData])

  return (
    <DashboardContext.Provider
      value={{
        settings,
        updateSettings,
        isLoading,
        error,
        performanceData,
        portfolioData,
        marketData,
        votingData,
        refreshData
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

// Custom hook to use the dashboard context
export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider')
  }
  return context
}