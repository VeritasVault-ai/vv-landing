import { useRealTimeManager } from "@/lib/services/realtime-manager";
import { AssetAllocation } from "@/types/websocket-data";

/**
 * Custom hook that provides portfolio allocation data from the real-time manager
 * 
 * @returns Portfolio allocation data and related functionality
 */
export function usePortfolioData() {
  const { 
    // Data
    allocationData,
    
    // Connection status
    connectionStatus,
    status,
    isConnected,
    hasError,
    connectionErrors,
    
    // Reconnection method
    reconnect,
    
    // Simulation status
    simulationState,
    
    // Actions
    updateAllocations
  } = useRealTimeManager();
  
  /**
   * Updates a specific asset allocation
   * 
   * @param assetId ID of the asset to update
   * @param newWeight New weight for the asset
   */
  const updateAssetWeight = (assetId: string, newWeight: number) => {
    if (!allocationData) return;

    // Validate weight is within acceptable range
    if (newWeight < 0 || newWeight > 100) {
      console.warn(`Invalid weight value: ${newWeight}. Weight must be between 0 and 100.`);
      return;
    }

    const updatedAllocations = allocationData.allocations.map(asset => 
      asset.id === assetId ? { ...asset, weight: newWeight } : asset
    );

    updateAllocations(updatedAllocations);
  };
  
  /**
   * Rebalances all allocations to match target weights
   * 
   * @param targetAllocations Target allocations to apply
   */
  const rebalancePortfolio = (targetAllocations: AssetAllocation[]) => {
    // Add null check to verify allocationData exists
    if (!allocationData) {
      console.warn('Cannot rebalance portfolio: allocation data is not available');
      return;
    }

    // Create a copy of the target allocations to avoid mutating the input
    let normalizedAllocations = [...targetAllocations];
    // Ensure weights sum to 100%
    const totalWeight = normalizedAllocations.reduce((sum, asset) => sum + asset.weight, 0);

    // Protect against division by zero
    if (Math.abs(totalWeight) < 0.00001) {
      console.warn('Cannot normalize portfolio weights: total weight is zero or near-zero');
      return;
    }

    // Always normalize to ensure exact 100% total
    // This handles both cases where total might be slightly off due to floating point precision
    if (Math.abs(totalWeight - 100) > 0.001) {
      console.info(`Normalizing portfolio weights from ${totalWeight.toFixed(2)}% to 100%`);
      normalizedAllocations = normalizedAllocations.map(asset => ({
        ...asset,
        weight: (asset.weight / totalWeight) * 100
      }));
      
      // Verify the normalization worked correctly
      const newTotal = normalizedAllocations.reduce((sum, asset) => sum + asset.weight, 0);
      console.debug(`After normalization: total weight = ${newTotal.toFixed(2)}%`);
    }

    // Update allocations with normalized weights
    updateAllocations(normalizedAllocations);
  };
  
  return {
    // Data
    allocationData,
    
    // Status
    connectionStatus,
    connectionErrors,
    status,
    isConnected,
    hasError,
    
    // Simulation status
    isSimulated: simulationState.allocation,
    simulationState,
    
    // Actions
    refresh: reconnect,
    updateAssetWeight,
    rebalancePortfolio
  };
}