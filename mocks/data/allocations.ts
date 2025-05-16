export interface AssetAllocation {
  symbol: string;
  weight: number;
  color: string;
}

// Default allocation data
export const DEFAULT_ALLOCATIONS: AssetAllocation[] = [
  { symbol: "stETH", weight: 50.0, color: "#3B82F6" },
  { symbol: "tzBTC", weight: 20.0, color: "#10B981" },
  { symbol: "USDC", weight: 30.0, color: "#F59E0B" }
];