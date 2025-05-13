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
    
    // Set up global error handler for WebSocket simulation errors
    const handleError = (error: Error) => {
      console.error("WebSocket simulation error:", error);
      // Implement error reporting or recovery logic here
    };
    
    // Subscribe to error events from the simulation services
    window.addEventListener("websocket-simulation-error", handleError as EventListener);
    
    return () => {
      console.log("Dashboard real-time connections cleaned up")
      // Any additional cleanup logic
      window.removeEventListener("websocket-simulation-error", handleError as EventListener);
    }
  }, [])
}