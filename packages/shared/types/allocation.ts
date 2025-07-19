/**
 * Allocation domain types
 * Contains all types related to asset allocations and portfolio management
 */
import { BaseWebSocketData } from './websocket-infrastructure';

/**
 * Portfolio asset allocation type
 * Represents how assets are allocated in a user's portfolio
 */
export interface PortfolioAsset {
  id: string;
  name: string;
  symbol: string;
  weight: number;
  category: string;
  color?: string;
}

// WebSocket data payload for allocation domain
export interface AllocationData extends BaseWebSocketData {
  allocations: PortfolioAsset[];
  totalValue?: number;
  changePercentage?: number;
}