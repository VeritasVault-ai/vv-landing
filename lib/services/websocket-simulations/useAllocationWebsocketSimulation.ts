import { useCallback, useEffect, useRef, useState } from 'react';
import { WebSocketStatus } from '../dashboard-realtime-manager';
import { AssetAllocation, DEFAULT_ALLOCATIONS } from '@/mocks/data/allocations';

// Define types for allocation data
export interface AllocationData {
  status: string;
  allocations: AssetAllocation[];
  timestamp: string;
  totalValue?: number;
  changePercentage?: number;
}

/**
 * Custom hook for simulating WebSocket connections for asset allocation data
 * Provides mock data and connection status management with automatic reconnection
 */
export function useAllocationWebSocketSimulation(
  onStatusChange?: (status: WebSocketStatus) => void
) {
  const [data, setData] = useState<AllocationData | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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
        const ws = new WebSocket('wss://your-api.com/allocations');
        wsRef.current = ws;
        
        ws.onopen = () => {
          setIsSimulated(false);
          onStatusChange?.('connected');
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
            startSimulation();
          }
        };
        
        ws.onerror = () => {
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
    
    // For simulation, fetch initial data from our mock API endpoint
    setTimeout(async () => {
      try {
        // Fetch initial data from our mock API endpoint
        const response = await fetch('/api/portfolio/allocations/websocket-data');
        
        if (!response.ok) {
          throw new Error('Failed to fetch initial allocation data');
        }
        
        const initialData = await response.json();
        setData(initialData);
      } catch (error) {
        console.error('Error fetching initial allocation data:', error);
        
        // Fallback to default data
        const initialData: AllocationData = {
          status: 'active',
          allocations: DEFAULT_ALLOCATIONS,
          timestamp: new Date().toISOString(),
          totalValue: 100000,
          changePercentage: 0.5
        };
        
        setData(initialData);
      }
      
      // Start periodic updates
      startPeriodicUpdates();
    }, 1000);
  }, [onStatusChange]);

  // Simulate periodic allocation updates
  const startPeriodicUpdates = useCallback(() => {
    const updateInterval = setInterval(() => {
      if (!isSimulated) {
        clearInterval(updateInterval);
        return;
      }
      
      setData(prevData => {
        if (!prevData) return null;
        
        // Deep clone the previous data to avoid mutation
        const updatedData = JSON.parse(JSON.stringify(prevData)) as AllocationData;
        
        // Update allocations with small random changes
        updatedData.allocations = updatedData.allocations.map(allocation => {
          // Random weight change between -1% and +1%
          const weightChange = (Math.random() * 2 - 1) * 0.5;
          let newWeight = allocation.weight + weightChange;
          
          // Ensure weight doesn't go below 1%
          newWeight = Math.max(1, newWeight);
          
          return {
            ...allocation,
            weight: newWeight
          };
        });
        
        // Normalize weights to ensure they sum to 100%
        const totalWeight = updatedData.allocations.reduce((sum, alloc) => sum + alloc.weight, 0);
        updatedData.allocations = updatedData.allocations.map(allocation => ({
          ...allocation,
          weight: (allocation.weight / totalWeight) * 100
        }));
        
        // Update timestamp and change percentage
        updatedData.timestamp = new Date().toISOString();
        updatedData.changePercentage = (Math.random() * 2 - 1) * 0.2; // Random change between -0.2% and +0.2%
        
        // Update total value with small random change
        if (updatedData.totalValue) {
          const valueChange = updatedData.totalValue * (Math.random() * 0.01 - 0.005); // Random change between -0.5% and +0.5%
          updatedData.totalValue += valueChange;
        }
        
        return updatedData;
      });
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(updateInterval);
  }, [isSimulated]);

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
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  // Function to update allocations (for manual testing)
  const updateAllocations = useCallback((newAllocations: AssetAllocation[]) => {
    setData(prevData => {
      if (!prevData) return null;
      
      return {
        ...prevData,
        allocations: newAllocations,
        timestamp: new Date().toISOString()
      };
    });
  }, []);

  return { 
    data, 
    reconnect,
    isSimulated,
    updateAllocations
  };
}