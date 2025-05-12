"use client"

import { useEffect } from "react"
import { useVotingWebSocketSimulation } from "./websocket-simulation"
import { useModelWebSocketSimulation } from "./model-websocket-simulation"
import { useDashboardWebSocketSimulation } from "./dashboard-websocket-simulation"

/**
 * This hook centralizes all WebSocket simulations for the dashboard.
 * It initializes all the real-time data connections in one place.
 */
export function useDashboardRealtime() {
  // Initialize all WebSocket simulations
  useVotingWebSocketSimulation()
  useModelWebSocketSimulation()
  useDashboardWebSocketSimulation()
  
  useEffect(() => {
    console.log("Dashboard real-time connections initialized")
    
    // You could add additional initialization logic here
    // For example, setting up global event listeners or error handlers
    
    return () => {
      console.log("Dashboard real-time connections cleaned up")
      // Any additional cleanup logic
    }
  }, [])
}