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
    if (!allocationData) return;

    // Ensure weights sum to 100%
    const totalWeight = targetAllocations.reduce((sum, asset) => sum + asset.weight, 0);

    // Only normalize if there's a significant difference
    if (Math.abs(totalWeight - 100) > 0.01) {
      targetAllocations = targetAllocations.map(asset => ({
        ...asset,
        weight: (asset.weight / totalWeight) * 100
      }));
    }

    updateAllocations(targetAllocations);
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