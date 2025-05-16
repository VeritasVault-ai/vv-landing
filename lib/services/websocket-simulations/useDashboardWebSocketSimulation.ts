import { useCallback, useEffect, useRef, useState } from 'react';
import { WebSocketStatus, DashboardData } from '@/types/websocket-data';
import { useBaseWebSocketSimulation } from './useBaseWebSocketSimulation';
/**
 * Custom hook for simulating WebSocket connections for dashboard data
 * Provides mock data and connection status management with automatic reconnection
 */
export function useDashboardWebSocketSimulation(
  onStatusChange?: (status: WebSocketStatus) => void
) {
  // Create initial data function
  const getInitialData = useCallback((): DashboardData => {
    return {
      activeUsers: 128,
      systemStatus: 'healthy',
      recentTransactions: 24,
      performanceMetrics: {
        cpu: 42,
        memory: 68,
        latency: 230
      },
      lastUpdated: new Date().toISOString(),
      isSimulated: true // Mark as simulated data
    };
  }, []);

  // Create update function for periodic updates
  const updateDataPeriodically = useCallback((prevData: DashboardData): DashboardData => {
    return {
      activeUsers: 120 + Math.floor(Math.random() * 20),
      systemStatus: Math.random() > 0.95 ? 'warning' : 'healthy',
      recentTransactions: Math.floor(Math.random() * 30),
      performanceMetrics: {
        cpu: 40 + Math.floor(Math.random() * 15),
        memory: 60 + Math.floor(Math.random() * 20),
        latency: 200 + Math.floor(Math.random() * 100)
      },
      lastUpdated: new Date().toISOString(),
      isSimulated: true // Mark as simulated data
    };
  }, []);

  // Use the base WebSocket simulation hook
  const { data, reconnect, isSimulated } = useBaseWebSocketSimulation<DashboardData>({
    endpoint: 'wss://your-api.com/dashboard',
    onStatusChange,
    getInitialData,
    updateDataPeriodically,
    updateInterval: 10000, // Update every 10 seconds
    fetchInitialData: false
  });

  return { 
    data, 
    reconnect,
    isSimulated
  };
}