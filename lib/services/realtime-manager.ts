import { useCallback, useEffect, useState } from 'react';
import { useDashboardWebSocketSimulation } from './websocket-simulations/useDashboardWebSocketSimulation';
import { useModelWebSocketSimulation } from './websocket-simulations/useModelWebSocketSimulation';
import { useVotingWebSocketSimulation } from './websocket-simulations/useVotingWebsocketSimulation';
import { useAllocationWebSocketSimulation } from './websocket-simulations/useAllocationWebsocketSimulation';
import { 
  WebSocketStatus, 
  WebSocketState, 
  SimulationState 
} from '@/types/websocket-data';

/**
 * Real-Time Data Manager
 * 
 * A unified manager for all WebSocket connections across the application that provides:
 * - Combined and individual connection statuses
 * - Centralized data access
 * - Detailed simulation status tracking
 * - Unified reconnection capabilities
 */
export function useRealTimeManager() {
  // Track connection status for each WebSocket
  const [status, setStatus] = useState<WebSocketState>({
    voting: 'connecting',
    model: 'connecting',
    dashboard: 'connecting',
    allocation: 'connecting'
  });
  
  // Track connection errors
  const [connectionErrors, setConnectionErrors] = useState<string[]>([]);

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

  // Handlers for each WebSocket connection
  const handleVotingStatus = useCallback((newStatus: WebSocketStatus) => {
    setStatus(prev => ({ ...prev, voting: newStatus }));
    
    if (newStatus === 'error') {
      setConnectionErrors(prev => [...prev, 'Voting connection failed']);
    }
  }, []);
  
  const handleModelStatus = useCallback((newStatus: WebSocketStatus) => {
    setStatus(prev => ({ ...prev, model: newStatus }));
    
    if (newStatus === 'error') {
      setConnectionErrors(prev => [...prev, 'Model connection failed']);
    }
  }, []);
  
  const handleDashboardStatus = useCallback((newStatus: WebSocketStatus) => {
    setStatus(prev => ({ ...prev, dashboard: newStatus }));
    
    if (newStatus === 'error') {
      setConnectionErrors(prev => [...prev, 'Dashboard connection failed']);
    }
  }, []);

  const handleAllocationStatus = useCallback((newStatus: WebSocketStatus) => {
    setStatus(prev => ({ ...prev, allocation: newStatus }));
    
    if (newStatus === 'error') {
      setConnectionErrors(prev => [...prev, 'Allocation connection failed']);
    }
  }, []);

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
    setConnectionErrors([]);
    
    // Call reconnect methods from each WebSocket hook
    reconnectVoting();
    reconnectModel();
    reconnectDashboard();
    reconnectAllocation();
  }, [reconnectVoting, reconnectModel, reconnectDashboard, reconnectAllocation]);

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