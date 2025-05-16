import { useRealTimeManager } from "@/lib/services/realtime-manager";
import { transformPerformanceMetrics } from "@/mocks/transformers/dashboard-transformers";

/**
 * Provides processed dashboard data, connection status, simulation flags, and a refresh method for UI components.
 *
 * Retrieves real-time dashboard, model, and voting data, transforms performance metrics for display, and exposes connection and simulation state information along with a refresh action.
 *
 * @returns An object containing raw and transformed dashboard data, connection and error status, simulation flags, and a refresh method.
 */
export function useDashboardData() {
  const { 
    // Data from relevant sources
    dashboardData,
    modelData,
    votingData,
    
    // Connection status
    connectionStatus,
    status,
    isConnected,
    hasError,
    connectionErrors,
    
    // Reconnection method
    reconnect,
    
    // Simulation status
    simulationState
  } = useRealTimeManager();
  
  // Transform raw metrics data into display-friendly format
  const performanceMetrics = transformPerformanceMetrics(dashboardData);
  
  return {
    // Data
    dashboardData,
    modelData,
    votingData,
    performanceMetrics,
    
    // Status
    connectionStatus,
    connectionErrors,
    status,
    isConnected,
    hasError,
    
    // Simulation flags - both combined and individual
    isAnyDataSimulated: simulationState.any,
    isDashboardSimulated: simulationState.dashboard,
    isModelSimulated: simulationState.model,
    isVotingSimulated: simulationState.voting,
    simulationState,
    
    // Actions
    refresh: reconnect
  };
}