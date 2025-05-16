import { useCallback, useEffect, useRef, useState } from 'react';
import { WebSocketStatus } from '@/types/websocket-data';

// Options for the base WebSocket hook
export interface WebSocketSimulationOptions<T> {
  // WebSocket endpoint URL
  endpoint: string;
  
  // Status change handler
  onStatusChange?: (status: WebSocketStatus) => void;
  
  // Initial data generator function
  getInitialData: () => T | Promise<T>;
  
  // Data update function (optional)
  updateDataPeriodically?: (prevData: T) => T;
  
  // Update interval in milliseconds (default: 10000)
  updateInterval?: number;
  
  // Whether to fetch initial data from an API endpoint
  fetchInitialData?: boolean;
  
  // API endpoint for fetching initial data
  initialDataEndpoint?: string;
}

/**
 * Base hook for WebSocket simulation
 * Handles common WebSocket connection logic, simulation, and reconnection
 */
export function useBaseWebSocketSimulation<T>(options: WebSocketSimulationOptions<T>) {
  const {
    endpoint,
    onStatusChange,
    getInitialData,
    updateDataPeriodically,
    updateInterval = 10000,
    fetchInitialData = false,
    initialDataEndpoint
  } = options;

  const [data, setData] = useState<T | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const updateIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isSimulated, setIsSimulated] = useState(true);
  // Use a ref to track current isSimulated value to avoid stale closures
  const isSimulatedRef = useRef(true);

  // Keep the ref in sync with the state
  useEffect(() => {
    isSimulatedRef.current = isSimulated;
  }, [isSimulated]);

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
      isSimulatedRef.current = true;
      startSimulation();
      
      // Skip actual WebSocket connection attempt in development
      if (process.env.NODE_ENV === 'development') {
        return;
      }
      
      try {
        // Try to connect to the actual WebSocket endpoint
        const ws = new WebSocket(endpoint);
        wsRef.current = ws;
        
        ws.onopen = () => {
          setIsSimulated(false);
          isSimulatedRef.current = false;
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
            setData(parsedData);
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
            isSimulatedRef.current = true;
            startSimulation();
}
        };
        
        ws.onerror = () => {
          console.error('WebSocket connection error - falling back to simulation');
          onStatusChange?.('error');
          
          // Fall back to simulation
          setIsSimulated(true);
          isSimulatedRef.current = true;
          if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
            ws.close();
          }
          startSimulation();
        };
      } catch (error) {
        console.error('WebSocket not available - using simulation instead');
        setIsSimulated(true);
        isSimulatedRef.current = true;
        startSimulation();
      }
    } catch (error) {
      console.error('Failed to establish WebSocket connection - using simulation');
      onStatusChange?.('error');
      setIsSimulated(true);
      isSimulatedRef.current = true;
      startSimulation();
    }
  }, [endpoint, onStatusChange]);

  // Start the WebSocket simulation
  const startSimulation = useCallback(async () => {
    onStatusChange?.('connected');
    
    // Clear any existing update interval
    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current);
      updateIntervalRef.current = null;
    }
    
    // Store the timeout reference for cleanup
    let initialDataTimeoutRef: ReturnType<typeof setTimeout> | null = null;
    
    try {
      let initialData: T;
      
      // Fetch initial data from API if specified
      if (fetchInitialData && initialDataEndpoint) {
        try {
          const response = await fetch(initialDataEndpoint);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch initial data from ${initialDataEndpoint}`);
          }
          
          initialData = await response.json();
        } catch (error) {
          console.error('Error fetching initial data:', error);
          // Fall back to generated initial data
          initialData = await Promise.resolve(getInitialData());
        }
      } else {
        // Use the provided initial data function
        initialData = await Promise.resolve(getInitialData());
      }
      
      // Set data with a small delay to simulate network latency
      initialDataTimeoutRef = setTimeout(() => {
        setData(initialData);
        initialDataTimeoutRef = null;
        
        // Start periodic updates if update function is provided
        if (updateDataPeriodically) {
          updateIntervalRef.current = setInterval(() => {
            // Check the current value of isSimulated from the ref
            if (!isSimulatedRef.current) {
              if (updateIntervalRef.current) {
                clearInterval(updateIntervalRef.current);
                updateIntervalRef.current = null;
              }
              return;
            }
            
            setData(prevData => {
              if (!prevData) return null;
              return updateDataPeriodically(prevData);
            });
          }, updateInterval);
        }
      }, 1000);
      
    } catch (error) {
      console.error('Error starting simulation:', error);
      onStatusChange?.('error');
    }
    
    // Return a cleanup function to cancel the timeout if needed
    return () => {
      if (initialDataTimeoutRef) {
        clearTimeout(initialDataTimeoutRef);
      }
    };
  }, [fetchInitialData, getInitialData, initialDataEndpoint, onStatusChange, updateDataPeriodically, updateInterval]);

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
    let cleanupSimulation: (() => void) | undefined;
    
    if (typeof window !== 'undefined') {
      connect();
    }
    
    // Clean up on unmount
    return () => {
      if (cleanupSimulation) {
        cleanupSimulation();
      }
      
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
        updateIntervalRef.current = null;
      }
      
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [connect]);

  return {
    data,
    reconnect,
    isSimulated,
    setData // Expose setData for direct updates
  };
}