import { useCallback, useEffect, useRef, useState } from 'react';
import { WebSocketStatus } from '../dashboard-realtime-manager';

// Define types for dashboard data
export interface DashboardData {
  activeUsers: number;
  systemStatus: 'healthy' | 'warning' | 'critical';
  recentTransactions: number;
  performanceMetrics: {
    cpu: number;
    memory: number;
    latency: number;
  };
  lastUpdated: string;
  isSimulated?: boolean; // Flag to indicate simulation mode
}

/**
 * Custom hook for simulating WebSocket connections for dashboard data
 * Provides mock data and connection status management with automatic reconnection
 */
export function useDashboardWebSocketSimulation(
  onStatusChange?: (status: WebSocketStatus) => void
) {
  const [data, setData] = useState<DashboardData | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isSimulated, setIsSimulated] = useState(true);

  const connect = useCallback(() => {
    try {
      // Report connecting status
      onStatusChange?.('connecting');
      
      // Clear any existing connection
      if (wsRef.current) {
        wsRef.current.close();
      }
      
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        return;
      }
      
      // Always use simulation mode in development
      setIsSimulated(true);
      startSimulation();
      
      // Skip actual WebSocket connection attempt in development
      if (process.env.NODE_ENV === 'development') {
        return;
      }
      
      // In production, we would try to connect to the real WebSocket
      try {
        // Try to connect to the actual WebSocket endpoint
        const ws = new WebSocket('wss://your-api.com/dashboard');
        wsRef.current = ws;
        
        ws.onopen = () => {
          setIsSimulated(false);
          onStatusChange?.('connected');
          
          // Cancel any pending auto-reconnect
          if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
          }
        };
        
        ws.onmessage = (event) => {
          try {
            const parsedData = JSON.parse(event.data);
            // Add isSimulated flag to the data
            setData({ ...parsedData, isSimulated: false });
          } catch (error) {
            console.error('Failed to parse WebSocket message');
          }
        };
        
        ws.onclose = (event) => {
          // Don't report error for normal closure
          if (event.code !== 1000) {
            onStatusChange?.('disconnected');
            
            // Fall back to simulation
            setIsSimulated(true);
            startSimulation();
          }
        };
        
        ws.onerror = () => {
          // Instead of logging the error object which can cause circular reference issues
          console.error('WebSocket connection error - falling back to simulation');
          onStatusChange?.('error');
          
          // Fall back to simulation
          setIsSimulated(true);
          if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
            ws.close();
          }
          startSimulation();
        };
      } catch (error) {
        console.error('WebSocket not available - using simulation instead');
        setIsSimulated(true);
        startSimulation();
      }
    } catch (error) {
      console.error('Failed to establish WebSocket connection - using simulation');
      onStatusChange?.('error');
      setIsSimulated(true);
      startSimulation();
    }
  }, [onStatusChange]);

  // Start the WebSocket simulation
  const startSimulation = useCallback(() => {
    onStatusChange?.('connected');
    
    // Clear any existing update interval
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current);
    }
    
    // Send initial data
    const initialData: DashboardData = {
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
    
    setData(initialData);
    
    // Start periodic updates
    updateIntervalRef.current = setInterval(() => {
      const updatedData: DashboardData = {
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
      
      setData(updatedData);
    }, 10000); // Update every 10 seconds
  }, [onStatusChange]);

  // Manual reconnect function
  const reconnect = useCallback(() => {
    // Clear any pending reconnect
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    connect();
  }, [connect]);

  // Initialize connection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      connect();
    }
    
    // Clean up on unmount
    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
      
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  return { 
    data, 
    reconnect,
    isSimulated
  };
}