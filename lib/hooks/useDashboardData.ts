import { useRealTimeManager } from "@/lib/services/realtime-manager";
import { transformPerformanceMetrics } from "@/mocks/transformers/dashboard-transformers";

/**
 * Custom hook that provides dashboard data from the real-time manager
 * and transforms it for UI consumption
 * 
 * @returns Processed dashboard data and status information
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