import { type NextRequest, NextResponse } from "next/server"
export async function GET(request: NextRequest) {
  // Get filter from query params
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter') || 'all';

  // Mock data based on filter
  let mockData;
  
  switch (filter) {
    case 'liquidity-pools':
      mockData = {
        allocation: [
          { name: 'XTZ/USDT', value: 125000, color: '#3b82f6' },
          { name: 'ETH/USDC', value: 85000, color: '#10b981' },
          { name: 'BTC/USDT', value: 65000, color: '#f59e0b' },
        ],
        totalValue: 275000,
        performance: {
          daily: 1.8,
          weekly: 3.2,
          monthly: 7.5,
        }
      };
      break;
    case 'strategies':
      mockData = {
        allocation: [
          { name: 'Yield Farming', value: 180000, color: '#8b5cf6' },
          { name: 'Staking', value: 120000, color: '#ec4899' },
          { name: 'Lending', value: 90000, color: '#14b8a6' },
        ],
        totalValue: 390000,
        performance: {
          daily: 0.9,
          weekly: 2.7,
          monthly: 5.8,
        }
      };
      break;
    default:
      mockData = {
        allocation: [
          { name: 'Liquidity Pools', value: 275000, color: '#3b82f6' },
          { name: 'Strategies', value: 390000, color: '#8b5cf6' },
          { name: 'Staked Assets', value: 210000, color: '#ef4444' },
          { name: 'Treasury', value: 125000, color: '#f59e0b' },
        ],
        totalValue: 1000000,
        performance: {
          daily: 1.2,
          weekly: 3.5,
          monthly: 8.7,
        }
      };
  }
  
  return NextResponse.json(mockData);
}
