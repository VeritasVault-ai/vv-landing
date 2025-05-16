import { NextResponse } from 'next/server';
import type { AssetAllocation } from '@/lib/models/types';
import { portfolioRepository } from '@/lib/repository/portfolio-repository';

// Fallback data to use when no portfolio is found or an error occurs
const FALLBACK_PROTOCOLS = [
  { name: "stETH", totalValueLockedUSD: "50", color: "#3B82F6" },
  { name: "tzBTC", totalValueLockedUSD: "20", color: "#10B981" },
  { name: "USDC", totalValueLockedUSD: "30", color: "#F59E0B" }
];

export async function GET() {
  try {
    // Get the current user's ID - in a real app, you'd get this from the session
    // For demo purposes, we'll use a placeholder
    const userId = "current-user";
    
    const portfolio = await portfolioRepository.getForUser(userId);
    
    if (!portfolio) {
      console.log("No portfolio found, using fallback data");
      return NextResponse.json(FALLBACK_PROTOCOLS);
    }
    
    // Check if portfolio has allocations property and it's an array
    const allocations = (portfolio as any).allocations;
    
    if (!allocations || !Array.isArray(allocations) || allocations.length === 0) {
      console.log("No allocations found in portfolio, using fallback data");
      return NextResponse.json(FALLBACK_PROTOCOLS);
    }
    // Transform portfolio allocations into the format expected by the chart
    const protocols = allocations.map((allocation: any) => ({
      name: allocation.asset_symbol || allocation.symbol || "Unknown Asset",
      totalValueLockedUSD: (allocation.percentage || allocation.value || 0).toString(),
      color: allocation.color || "#3B82F6" // Default color if not provided
    }));
    return NextResponse.json(protocols);
  } catch (error) {
    console.error('API Error:', error);
    
    // Return fallback data in case of error
    return NextResponse.json(FALLBACK_PROTOCOLS);
  }
}
