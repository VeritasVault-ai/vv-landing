import { useCallback, useEffect, useRef, useState } from 'react';
import { WebSocketStatus, DashboardData } from '@/types/websocket-data';
import { useBaseWebSocketSimulation } from './useBaseWebSocketSimulation';
/**
 * React hook that simulates a WebSocket connection for dashboard data, providing periodic mock updates and connection status management.
 *
 * @param onStatusChange - Optional callback invoked when the WebSocket connection status changes.
 * @returns An object containing the current dashboard data, a function to manually trigger reconnection, and a flag indicating if the data is simulated.
 *
 * @remark The hook generates and updates dashboard data locally without establishing a real WebSocket connection.
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