import {
  SimulationState,
  WebSocketState,
  WebSocketStatus
} from '@/types/websocket-data';
import { useCallback, useEffect, useState } from 'react';
import { useAllocationWebSocketSimulation, useVotingWebSocketSimulation } from './websocket-simulations';
import { useDashboardWebSocketSimulation } from './websocket-simulations/useDashboardWebSocketSimulation';
import { useModelWebSocketSimulation } from './websocket-simulations/useModelWebSocketSimulation';

// Define a more structured error type
type ConnectionError = {
  id: string;
  source: string;
  message: string;
  timestamp: number;
};

// Maximum number of errors to keep in history
const MAX_ERROR_HISTORY = 10;

/**
 * Centralizes management of all WebSocket connections, statuses, and simulation states for real-time data sources.
 *
 * Provides unified connection status indicators, error tracking and management, reconnection capability, and access to live or simulated data from voting, model, dashboard, and allocation sources.
 *
 * @returns An object containing connection statuses, error information and management functions, reconnection method, real-time data from all sources, simulation state indicators, and an allocation update function.
 */
export function useRealTimeManager() {
  // Track connection status for each WebSocket
  const [status, setStatus] = useState<WebSocketState>({
    voting: 'connecting',
    model: 'connecting',
    dashboard: 'connecting',
    allocation: 'connecting'
  });
  
  // Track connection errors with a more structured approach
  const [connectionErrors, setConnectionErrors] = useState<ConnectionError[]>([]);

  // Track simulation state
  const [simulationState, setSimulationState] = useState<SimulationState>({
    voting: false,
    model: false,
    dashboard: false,
    allocation: false,
    any: false
  });

  // Derived status indicators
  const hasError = Object.values(status).some(s => s === 'error');
  const isConnected = Object.values(status).every(s => s === 'connected');
  const connectionStatus: WebSocketStatus = 
    hasError ? 'error' :
    isConnected ? 'connected' : 
    'connecting';

  // Add a new connection error with proper structure
  const addConnectionError = useCallback((source: string, message: string) => {
    setConnectionErrors(prev => {
      // Create new error object
      const newError: ConnectionError = {
        id: `${source}-${Date.now()}`,
        source,
        message,
        timestamp: Date.now()
      };
      
      // Add to beginning of array and limit size
      const updatedErrors = [newError, ...prev].slice(0, MAX_ERROR_HISTORY);
      
      return updatedErrors;
    });
  }, []);

  // Clear errors for a specific source
  const clearErrorsForSource = useCallback((source: string) => {
    setConnectionErrors(prev => 
      prev.filter(error => error.source !== source)
    );
  }, []);

  // Clear all connection errors
  const clearAllErrors = useCallback(() => {
    setConnectionErrors([]);
  }, []);

  // Handlers for each WebSocket connection
  const handleVotingStatus = useCallback((newStatus: WebSocketStatus) => {
    setStatus(prev => ({ ...prev, voting: newStatus }));
    
    if (newStatus === 'error') {
      addConnectionError('voting', 'Voting connection failed');
    } else if (newStatus === 'connected') {
      clearErrorsForSource('voting');
    }
  }, [addConnectionError, clearErrorsForSource]);
  
  const handleModelStatus = useCallback((newStatus: WebSocketStatus) => {
    setStatus(prev => ({ ...prev, model: newStatus }));
    
    if (newStatus === 'error') {
      addConnectionError('model', 'Model connection failed');
    } else if (newStatus === 'connected') {
      clearErrorsForSource('model');
    }
  }, [addConnectionError, clearErrorsForSource]);
  
  const handleDashboardStatus = useCallback((newStatus: WebSocketStatus) => {
    setStatus(prev => ({ ...prev, dashboard: newStatus }));
    
    if (newStatus === 'error') {
      addConnectionError('dashboard', 'Dashboard connection failed');
    } else if (newStatus === 'connected') {
      clearErrorsForSource('dashboard');
    }
  }, [addConnectionError, clearErrorsForSource]);

  const handleAllocationStatus = useCallback((newStatus: WebSocketStatus) => {
    setStatus(prev => ({ ...prev, allocation: newStatus }));
    
    if (newStatus === 'error') {
      addConnectionError('allocation', 'Allocation connection failed');
    } else if (newStatus === 'connected') {
      clearErrorsForSource('allocation');
    }
  }, [addConnectionError, clearErrorsForSource]);

  // Initialize WebSocket connections with status handlers
  const { 
    data: votingData, 
    isSimulated: isVotingSimulated,
    reconnect: reconnectVoting
  } = useVotingWebSocketSimulation(handleVotingStatus);
  
  const { 
    data: modelData, 
    isSimulated: isModelSimulated,
    reconnect: reconnectModel
  } = useModelWebSocketSimulation(handleModelStatus);
  
  const { 
    data: dashboardData, 
    isSimulated: isDashboardSimulated,
    reconnect: reconnectDashboard
  } = useDashboardWebSocketSimulation(handleDashboardStatus);

  const {
    data: allocationData,
    isSimulated: isAllocationSimulated,
    reconnect: reconnectAllocation,
    updateAllocations
  } = useAllocationWebSocketSimulation(handleAllocationStatus);

  // Update simulation state when any simulation status changes
  useEffect(() => {
    const anySimulated = isVotingSimulated || 
                         isModelSimulated || 
                         isDashboardSimulated || 
                         isAllocationSimulated;
    
    setSimulationState({
      voting: isVotingSimulated,
      model: isModelSimulated,
      dashboard: isDashboardSimulated,
      allocation: isAllocationSimulated,
      any: anySimulated
    });
  }, [isVotingSimulated, isModelSimulated, isDashboardSimulated, isAllocationSimulated]);

  // Reconnect all WebSockets
  const reconnect = useCallback(() => {
    // Reset status to connecting
    setStatus({
      voting: 'connecting',
      model: 'connecting',
      dashboard: 'connecting',
      allocation: 'connecting'
    });
    
    // Clear any previous errors
    clearAllErrors();
    
    // Call reconnect methods from each WebSocket hook
    reconnectVoting();
    reconnectModel();
    reconnectDashboard();
    reconnectAllocation();
  }, [reconnectVoting, reconnectModel, reconnectDashboard, reconnectAllocation, clearAllErrors]);

  // Auto-cleanup old errors (older than 5 minutes)
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
      
      setConnectionErrors(prev => 
        prev.filter(error => error.timestamp > fiveMinutesAgo)
      );
    }, 60 * 1000); // Check every minute
    
    return () => clearInterval(cleanupInterval);
  }, []);

  // Log connection status changes in development
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('WebSocket status changed:', status);
      console.log('Simulation state:', simulationState);
    }
  }, [status, simulationState]);

  return {
    // Connection status - both combined and individual
    connectionStatus,
    status,
    isConnected,
    hasError,
    connectionErrors,
    
    // Error management
    clearAllErrors,
    clearErrorsForSource,
    
    // Reconnection method
    reconnect,
    
    // Data from all sources
    votingData,
    modelData,
    dashboardData,
    allocationData,
    
    // Simulation status - both combined and individual
    isSimulated: simulationState.any,
    simulationState,
    
    // Additional actions
    updateAllocations
  };
}
