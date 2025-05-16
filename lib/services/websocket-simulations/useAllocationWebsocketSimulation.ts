import { useCallback } from 'react';
import { DEFAULT_ALLOCATIONS } from '@/mocks/data/allocations';
import { useBaseWebSocketSimulation } from './useBaseWebSocketSimulation';
import { AllocationData, WebSocketStatus, AssetAllocation } from '@/types/websocket-data';

/**
 * Simulates a WebSocket connection for asset allocation data, providing live mock updates and connection status management.
 *
 * This custom React hook generates initial allocation data, periodically updates it with randomized changes, and manages simulated connection status, including automatic reconnection. It also allows manual updates to allocations for testing or interactive scenarios.
 *
 * @param onStatusChange - Optional callback invoked when the simulated WebSocket status changes.
 * @returns An object containing the current allocation data, a reconnect function, a flag indicating simulation mode, and a function to manually update allocations.
 */
export function useAllocationWebSocketSimulation(
  onStatusChange?: (status: WebSocketStatus) => void
) {
  // Create initial data function
  const getInitialData = useCallback((): AllocationData => {
    // Convert mock allocations to the format expected by AllocationData
    const enrichedAllocations: AssetAllocation[] = DEFAULT_ALLOCATIONS.map(allocation => ({
      id: allocation.symbol.toLowerCase(),
      name: allocation.symbol,
      symbol: allocation.symbol,
      weight: allocation.weight,
      category: 'crypto', // Default category
      color: allocation.color
    }));
    
      return {
      status: 'active',
      allocations: enrichedAllocations,
      timestamp: new Date().toISOString(),
      totalValue: 100000,
      changePercentage: 0.5
      };
  }, []);

  // Create update function for periodic updates
  const updateDataPeriodically = useCallback((prevData: AllocationData): AllocationData => {
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
  }, []);

  // Use the base WebSocket simulation hook
  const { data, reconnect, isSimulated, setData } = useBaseWebSocketSimulation<AllocationData>({
    endpoint: 'wss://your-api.com/allocations',
    onStatusChange,
    getInitialData,
    updateDataPeriodically,
    updateInterval: 10000,
    fetchInitialData: true,
    initialDataEndpoint: '/api/portfolio/allocations/websocket-data'
  });

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
  }, [setData]);

  return { 
    data, 
    reconnect,
    isSimulated,
    updateAllocations
  };
}