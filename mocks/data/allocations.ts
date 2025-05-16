import { AssetAllocation as PortfolioAssetAllocation } from '@/types/websocket-data';

// Default allocation data - using the type from websocket-data
export const DEFAULT_ALLOCATIONS: Omit<PortfolioAssetAllocation, 'id' | 'name' | 'category'>[] = [
  { symbol: "stETH", weight: 50.0, color: "#3B82F6" },
  { symbol: "tzBTC", weight: 20.0, color: "#10B981" },
  { symbol: "USDC", weight: 30.0, color: "#F59E0B" }
];