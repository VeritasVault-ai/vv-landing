"use client"

import { useState, useEffect } from "react"
import type { AnalyticsData, DateRange } from "../types/analytics"
import { formatCurrency, formatPercentage } from "../lib/formatters"

// This would be replaced with actual API calls in production
const fetchAnalyticsData = async (dateRange: DateRange): Promise<AnalyticsData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  
  // Mock data generation based on date range
  const daysDiff = Math.floor((dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24))
  
  // Generate daily data points for the selected range
  const generateDailyData = (baseValue: number, volatility: number) => {
    return Array.from({ length: daysDiff + 1 }, (_, i) => {
      const date = new Date(dateRange.start)
      date.setDate(date.getDate() + i)
      const randomFactor = 1 + (Math.random() * volatility * 2 - volatility)
      return {
        date: date.toISOString().split("T")[0],
        value: Math.round(baseValue * randomFactor * 100) / 100,
      }
    })
  }
  
  // Generate chain comparison data
  const generateChainData = () => {
    const chains = ["Ethereum", "Etherlink", "Tezos", "Polygon", "Arbitrum"]
    return chains.map((chain) => ({
      name: chain,
      transactionCount: Math.floor(Math.random() * 100000) + 5000,
      tvl: Math.floor(Math.random() * 1000000000) + 10000000,
      userCount: Math.floor(Math.random() * 10000) + 500,
      growth: (Math.random() * 30 - 5) / 100,
    }))
  }
  
  // Generate top assets data
  const generateTopAssets = () => {
    const assets = [
      { symbol: "ETH", name: "Ethereum" },
      { symbol: "BTC", name: "Bitcoin" },
      { symbol: "XTZ", name: "Tezos" },
      { symbol: "MATIC", name: "Polygon" },
      { symbol: "ARB", name: "Arbitrum" },
      { symbol: "SOL", name: "Solana" },
      { symbol: "AVAX", name: "Avalanche" },
      { symbol: "DOT", name: "Polkadot" },
      { symbol: "LINK", name: "Chainlink" },
      { symbol: "UNI", name: "Uniswap" },
    ]
    return assets.map((asset) => ({
      symbol: asset.symbol,
      name: asset.name,
      price: Math.random() * 10000,
      volume24h: Math.random() * 1000000000,
      marketCap: Math.random() * 100000000000,
      change24h: (Math.random() * 20 - 10) / 100,
    }))
  }
  
  // Generate user demographics data
  const generateUserDemographics = () => {
    return {
      byRegion: [
        { region: "North America", percentage: 35 },
        { region: "Europe", percentage: 30 },
        { region: "Asia", percentage: 25 },
        { region: "Other", percentage: 10 },
      ],
      byExperience: [
        { level: "Beginner", percentage: 40 },
        { level: "Intermediate", percentage: 35 },
        { level: "Advanced", percentage: 25 },
      ],
      byPlatform: [
        { platform: "Web", percentage: 55 },
        { platform: "Mobile", percentage: 40 },
        { platform: "API", percentage: 5 },
      ],
    }
  }
  
  return {
    kpis: {
      totalUsers: Math.floor(Math.random() * 100000) + 10000,
      activeUsers: Math.floor(Math.random() * 50000) + 5000,
      totalTransactions: Math.floor(Math.random() * 1000000) + 100000,
      totalVolume: Math.floor(Math.random() * 10000000000) + 1000000000,
      averageTransactionValue: Math.floor(Math.random() * 10000) + 1000,
      userGrowth: (Math.random() * 20) / 100,
      transactionGrowth: (Math.random() * 25) / 100,
      volumeGrowth: (Math.random() * 30) / 100,
    },
    userActivity: {
      dailyActiveUsers: generateDailyData(5000, 0.2),
      newUsers: generateDailyData(500, 0.3),
      sessionDuration: generateDailyData(15, 0.1), // in minutes
      bounceRate: generateDailyData(25, 0.15), // percentage
    },
    transactionMetrics: {
      volume: generateDailyData(10000000, 0.25),
      count: generateDailyData(50000, 0.2),
      averageValue: generateDailyData(2000, 0.15),
      fees: generateDailyData(50000, 0.3),
    },
    chainComparison: generateChainData(),
    topAssets: generateTopAssets(),
    userDemographics: generateUserDemographics(),
  }
}

export function useAnalyticsData(dateRange: DateRange) {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const analyticsData = await fetchAnalyticsData(dateRange)
        setData(analyticsData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load analytics data"))
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [dateRange])
  
  // Helper functions for formatting data
  const formatKpiValue = (value: number, type: "currency" | "number" | "percentage") => {
    if (type === "currency") return formatCurrency(value)
    if (type === "percentage") return formatPercentage(value)
    return value.toLocaleString()
  }
  
  return {
    data,
    isLoading,
    error,
    formatKpiValue,
  }
}