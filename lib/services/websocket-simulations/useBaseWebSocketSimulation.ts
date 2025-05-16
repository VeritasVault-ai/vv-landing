import { WebSocketSimulationOptions } from '@/types/websocket-simulation';
import { useCallback, useEffect, useRef, useState } from 'react';

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
    initialDataEndpoint,
    maxReconnectAttempts = 10,
    initialReconnectDelay = 1000,
    maxReconnectDelay = 30000
  } = options;

  const [data, setData] = useState<T | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const updateIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isSimulated, setIsSimulated] = useState(true);
  // Use a ref to track current isSimulated value to avoid stale closures
  const isSimulatedRef = useRef(true);
  
  // Track reconnection attempts
  const reconnectAttemptsRef = useRef(0);
  const reconnectDelayRef = useRef(initialReconnectDelay);
  
  // Reference for simulation cleanup function
  const simulationCleanupRef = useRef<(() => void) | null>(null);
  
  // Flag to track if simulation is already starting to prevent duplicate starts
  const isStartingSimulationRef = useRef(false);

  // Keep the ref in sync with the state
  useEffect(() => {
    isSimulatedRef.current = isSimulated;
  }, [isSimulated]);

  // Start the WebSocket simulation with proper cleanup handling
  const startSimulation = useCallback(async () => {
    // Prevent duplicate simulation starts
    if (isStartingSimulationRef.current) {
      return;
    }
    
    isStartingSimulationRef.current = true;
    
    // Clean up any existing simulation before starting a new one
    if (simulationCleanupRef.current) {
      simulationCleanupRef.current();
      simulationCleanupRef.current = null;
    }
    
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
    } finally {
      // Reset the flag when simulation setup is complete
      isStartingSimulationRef.current = false;
    }
    
    // Store the cleanup function in the ref for later use
    simulationCleanupRef.current = () => {
      if (initialDataTimeoutRef) {
        clearTimeout(initialDataTimeoutRef);
        initialDataTimeoutRef = null;
      }
      
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
        updateIntervalRef.current = null;
      }
    };
    
    // Also return the cleanup function for immediate use if needed
    return simulationCleanupRef.current;
  }, [fetchInitialData, getInitialData, initialDataEndpoint, onStatusChange, updateDataPeriodically, updateInterval]);

  // Schedule reconnect with exponential backoff
  const scheduleReconnect = useCallback(() => {
    // Clear any existing reconnect timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    // Check if we've exceeded maximum reconnect attempts
    if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
      console.warn(`Maximum reconnect attempts (${maxReconnectAttempts}) reached. Falling back to simulation.`);
      onStatusChange?.('error');
      setIsSimulated(true);
      isSimulatedRef.current = true;
      startSimulation();
      return;
    }
    
    // Calculate next delay with exponential backoff
    const delay = Math.min(
      reconnectDelayRef.current * Math.pow(1.5, reconnectAttemptsRef.current),
      maxReconnectDelay
    );
    
    console.log(`Scheduling reconnect attempt ${reconnectAttemptsRef.current + 1}/${maxReconnectAttempts} in ${delay}ms`);
    
    // Schedule reconnect
    reconnectTimeoutRef.current = setTimeout(() => {
      reconnectAttemptsRef.current++;
      onStatusChange?.('connecting');
      connect();
    }, delay);
  }, [maxReconnectAttempts, maxReconnectDelay, onStatusChange, startSimulation]);

  const connect = useCallback(() => {
    try {
      // Report connecting status
      onStatusChange?.('connecting');
      
      // Clear any existing connection
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        return;
      }
      
      // Always use simulation mode in development
      // In development, fall back to simulation immediately
      if (process.env.NODE_ENV === 'development') {
        setIsSimulated(true);
        isSimulatedRef.current = true;
        startSimulation();
        return;
      }
      
      // Track if error handler has already triggered simulation
      let hasErrorOccurred = false;
      
      try {
        // Try to connect to the actual WebSocket endpoint
        const ws = new WebSocket(endpoint);
        wsRef.current = ws;
        
        ws.onopen = () => {
          // Reset reconnect attempts and delay on successful connection
          reconnectAttemptsRef.current = 0;
          reconnectDelayRef.current = initialReconnectDelay;
          
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
          // Don't report error or reconnect for normal closure (code 1000)
          if (event.code !== 1000) {
            console.log(`WebSocket closed abnormally with code ${event.code}, reason: ${event.reason}`);
            onStatusChange?.('disconnected');
            
            // Schedule reconnect with exponential backoff
            scheduleReconnect();
            
            // Fall back to simulation while attempting to reconnect
            // Only start simulation if it wasn't already started by the error handler
            if (!hasErrorOccurred) {
              setIsSimulated(true);
              isSimulatedRef.current = true;
              startSimulation();
            }
          } else {
            console.log('WebSocket closed normally');
          }
        };
        
        ws.onerror = (error) => {
          console.error('WebSocket connection error:', error);
          onStatusChange?.('error');
          
          // Mark that error has occurred to prevent duplicate simulation starts
          hasErrorOccurred = true;
          
          // Fall back to simulation
          setIsSimulated(true);
          isSimulatedRef.current = true;
          
          if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
            ws.close();
          }
          
          startSimulation();
        };
      } catch (error) {
        console.error('WebSocket not available - using simulation instead:', error);
        setIsSimulated(true);
        isSimulatedRef.current = true;
        startSimulation();
        
        // Schedule reconnect attempt
        scheduleReconnect();
      }
    } catch (error) {
      console.error('Failed to establish WebSocket connection - using simulation:', error);
      onStatusChange?.('error');
      setIsSimulated(true);
      isSimulatedRef.current = true;
      startSimulation();
      
      // Schedule reconnect attempt
      scheduleReconnect();
    }
  }, [endpoint, onStatusChange, initialReconnectDelay, scheduleReconnect, startSimulation]);

  // Manual reconnect function
  const reconnect = useCallback(() => {
    // Clear any pending reconnect
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    // Reset reconnect attempts and delay for manual reconnect
    reconnectAttemptsRef.current = 0;
    reconnectDelayRef.current = initialReconnectDelay;
    
    connect();
  }, [connect, initialReconnectDelay]);

  // Initialize connection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      connect();
    }

    // Clean up on unmount
    return () => {
      // Clean up simulation
      if (simulationCleanupRef.current) {
        simulationCleanupRef.current();
        simulationCleanupRef.current = null;
      }

      // Clear intervals and timeouts
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
        updateIntervalRef.current = null;
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      // Close WebSocket connection
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