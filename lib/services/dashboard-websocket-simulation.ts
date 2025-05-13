"use client"

import { useEffect } from "react"
import { dashboardEvents } from "@/lib/events/dashboard-events"
import { dashboardService } from "./dashboard-service"
import { DashboardOverview, DashboardPerformance } from "@/lib/repositories/dashboard-repository"

/**
 * This service simulates WebSocket events for dashboard data.
 * In a real application, this would be replaced with an actual WebSocket connection.
 */
export function useDashboardWebSocketSimulation() {
  useEffect(() => {
    let isActive = true
    let overviewData: DashboardOverview | null = null
    let performanceData: DashboardPerformance | null = null

    // Fetch initial data
    async function fetchInitialData() {
      try {
        overviewData = await dashboardService.getDashboardOverview()
        performanceData = await dashboardService.getDashboardPerformance()
      } catch (error) {
        console.error("Failed to fetch initial dashboard data for simulation:", error)
      }
    }

    fetchInitialData()

    // Simulate portfolio value updates
    const portfolioValueInterval = setInterval(() => {
      if (!isActive || !overviewData) return

      // Simulate market fluctuations with small random changes to portfolio value
      const changePercentage = (Math.random() * 0.6) - 0.3 // Random change between -0.3% and +0.3%
      const currentValue = overviewData.portfolioValue.current
      const newValue = Math.round(currentValue * (1 + (changePercentage / 100)))
      
      // Calculate new percentage change from previous value
      const previousValue = overviewData.portfolioValue.previous
      const newPercentageChange =
        previousValue === 0
          ? 0
          : ((newValue - previousValue) / previousValue) * 100
      // Update our local cache
      overviewData = {
        ...overviewData,
        portfolioValue: {
          ...overviewData.portfolioValue,
          current: newValue,
          percentageChange: parseFloat(newPercentageChange.toFixed(1)),
          lastUpdated: "just now"
        }
      }

      // Emit the update event
      dashboardEvents.emit('portfolio-value-updated', {
        portfolioValue: newValue,
        percentageChange: parseFloat(newPercentageChange.toFixed(1)),
        lastUpdated: "just now"
      })
    }, 20000) // Update every 20 seconds

    // Simulate risk score changes (less frequently)
    const riskScoreInterval = setInterval(() => {
      if (!isActive || !overviewData || Math.random() > 0.15) return

      // Randomly select a new risk level
      const riskLevels = ["Low", "Low-Medium", "Medium", "Medium-High", "High"]
      const statusOptions = ["Optimal", "Acceptable", "Review Needed", "Action Required"]
      const descriptions = [
        "Within institutional parameters",
        "Slightly above target risk level",
        "Consider rebalancing portfolio",
        "Immediate attention required"
      ]
      
      // Select risk level based on weighted probabilities
      const riskIndex = Math.floor(Math.random() * 5)
      const statusIndex = Math.min(riskIndex, 3) // Higher risk levels get higher status indices
      
      const newRiskScore = {
        level: riskLevels[riskIndex],
        status: statusOptions[statusIndex],
        description: descriptions[statusIndex]
      }
      
      // Update our local cache
      overviewData = {
        ...overviewData,
        riskScore: newRiskScore
      }

      // Emit the update event
      dashboardEvents.emit('risk-score-changed', newRiskScore)
    }, 60000) // Check every minute

    // Simulate performance data updates
    const performanceUpdateInterval = setInterval(() => {
      if (!isActive || !performanceData) return

      // Clone the performance data
      const updatedPerformance = JSON.parse(JSON.stringify(performanceData)) as DashboardPerformance
      
      // Add a new data point to historical performance
      if (updatedPerformance.historicalPerformance.data.length > 0) {
        const lastDataPoint = updatedPerformance.historicalPerformance.data[
          updatedPerformance.historicalPerformance.data.length - 1
        ]
        
        // Generate a new date (7 days after the last one)
        const lastDate = new Date(lastDataPoint.date)
        const newDate = new Date(lastDate)
        newDate.setDate(newDate.getDate() + 7)
        
        // Generate a new value with a small random change
        const changePercentage = (Math.random() * 4) - 1 // Random change between -1% and +3%
        const newValue = Math.round(lastDataPoint.value * (1 + (changePercentage / 100)))
        
        // Add the new data point
        updatedPerformance.historicalPerformance.data.push({
          date: newDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
          value: newValue
        })
        
        // Remove the oldest data point if we have more than 10
        if (updatedPerformance.historicalPerformance.data.length > 10) {
          updatedPerformance.historicalPerformance.data.shift()
        }
      }
      
      // Update our local cache
      performanceData = updatedPerformance
      
      // Emit the update event
      dashboardEvents.emit('performance-data-updated', {
        historicalPerformance: updatedPerformance.historicalPerformance
      })
    }, 90000) // Update every 1.5 minutes

    // Simulate asset performance changes
    const assetPerformanceInterval = setInterval(() => {
      if (!isActive || !performanceData) return

      // Clone the performance data
      const updatedPerformance = JSON.parse(JSON.stringify(performanceData)) as DashboardPerformance
      
      // Update top performers with small random changes
      updatedPerformance.topPerformers = updatedPerformance.topPerformers.map(performer => ({
        ...performer,
        performance: parseFloat((performer.performance + (Math.random() * 1.5 - 0.5)).toFixed(1))
      }))
      
      // Update underperformers with small random changes
      updatedPerformance.underperformers = updatedPerformance.underperformers.map(performer => ({
        ...performer,
        performance: parseFloat((performer.performance + (Math.random() * 1 - 0.7)).toFixed(1))
      }))
      
      // Sort the performers by performance
      updatedPerformance.topPerformers.sort((a, b) => b.performance - a.performance)
      updatedPerformance.underperformers.sort((a, b) => a.performance - b.performance)
      
      // Update our local cache
      performanceData = updatedPerformance
      
      // Emit the update event
      dashboardEvents.emit('asset-performance-changed', {
        topPerformers: updatedPerformance.topPerformers,
        underperformers: updatedPerformance.underperformers
      })
    }, 45000) // Update every 45 seconds

    // Clean up intervals when component unmounts
    return () => {
      isActive = false
      clearInterval(portfolioValueInterval)
      clearInterval(riskScoreInterval)
      clearInterval(performanceUpdateInterval)
      clearInterval(assetPerformanceInterval)
    }
  }, [])
}