import { AssetAllocation } from '@/lib/models/types';

/**
 * Mock data for the ProtocolAllocation component.
 * Used as fallback when API calls fail or during development.
 */
export const mockProtocolAllocations: AssetAllocation[] = [
  { 
    name: "stETH", 
    totalValueLockedUSD: "50", 
    color: "#3B82F6",
    asset_id: "steth",
    percentage: 50,
    protocol: "Lido"
  },
  { 
    name: "tzBTC", 
    totalValueLockedUSD: "20", 
    color: "#10B981",
    asset_id: "tzbtc",
    percentage: 20,
    protocol: "Tezos"
  },
  { 
    name: "USDC", 
    totalValueLockedUSD: "30", 
    color: "#F59E0B",
    asset_id: "usdc",
    percentage: 30,
    protocol: "Circle"
  }
];