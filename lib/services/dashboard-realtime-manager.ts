import { useCallback, useEffect, useState } from 'react';
import { useDashboardWebSocketSimulation, useModelWebSocketSimulation, useVotingWebSocketSimulation } from './websocket-simulations';

export type WebSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

interface WebSocketState {
  voting: WebSocketStatus;
  model: WebSocketStatus;
  dashboard: WebSocketStatus;
}

export function useDashboardRealtime() {
  // Track connection status for each WebSocket
  const [status, setStatus] = useState<WebSocketState>({
    voting: 'connecting',
    model: 'connecting',
    dashboard: 'connecting'
  });

  // Track whether any connection has an error
  const hasError = Object.values(status).some(s => s === 'error');
  
  // Track whether all connections are established
  const isConnected = Object.values(status).every(s => s === 'connected');

  // Handlers for each WebSocket connection
  const handleVotingStatus = useCallback((newStatus: WebSocketStatus) => {
    setStatus(prev => ({ ...prev, voting: newStatus }));
  }, []);
  
  const handleModelStatus = useCallback((newStatus: WebSocketStatus) => {
    setStatus(prev => ({ ...prev, model: newStatus }));
  }, []);
  
  const handleDashboardStatus = useCallback((newStatus: WebSocketStatus) => {
    setStatus(prev => ({ ...prev, dashboard: newStatus }));
  }, []);

  // Initialize WebSocket connections with status handlers
  const votingData = useVotingWebSocketSimulation(handleVotingStatus);
  const modelData = useModelWebSocketSimulation(handleModelStatus);
  const dashboardData = useDashboardWebSocketSimulation(handleDashboardStatus);

  // Reconnect all WebSockets
  const reconnect = useCallback(() => {
    // Reset status to connecting
    setStatus({
      voting: 'connecting',
      model: 'connecting',
      dashboard: 'connecting'
    });
    
    // Call reconnect methods from each WebSocket hook
    votingData.reconnect();
    modelData.reconnect();
    dashboardData.reconnect();
  }, [votingData, modelData, dashboardData]);

  // Log connection status changes in development
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('WebSocket status changed:', status);
    }
  }, [status]);

  return {
    // Connection status
    status,
    isConnected,
    hasError,
    reconnect,
    
    // Data from WebSockets
    votingData: votingData.data,
    modelData: modelData.data,
    dashboardData: dashboardData.data,
  };
}