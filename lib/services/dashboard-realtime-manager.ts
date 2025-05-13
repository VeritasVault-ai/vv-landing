"use client"

import { useEffect } from "react"
import { useVotingWebSocketSimulation } from "./websocket-simulation"
import { useModelWebSocketSimulation } from "./model-websocket-simulation"
import { useDashboardWebSocketSimulation } from "./dashboard-websocket-simulation"

/**
 * Initializes and manages all real-time WebSocket simulations for the dashboard.
 *
 * This hook consolidates the setup of multiple WebSocket simulation hooks, ensuring that all real-time data connections required by the dashboard are established and cleaned up together.
 *
 * @remark
 * Intended to be used once at the top level of the dashboard to centralize real-time connection management.
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