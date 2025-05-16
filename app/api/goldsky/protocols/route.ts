import { NextResponse } from 'next/server';
import type { AssetAllocation } from '@/lib/models/types';
import { portfolioRepository } from '@/lib/repository/portfolio-repository';
import { mockProtocolAllocations } from '@/mocks/data/protocols';

// Define proper interfaces for the portfolio and allocation data
interface PortfolioAllocation {
  asset_symbol?: string;
  symbol?: string;
  percentage?: number;
  value?: number;
  color?: string;
}

interface Portfolio {
  allocations?: PortfolioAllocation[];
}
/**
 * Handles GET requests to retrieve asset allocation data for the current user's portfolio.
 *
 * Returns a list of protocol allocation objects, each containing `name`, `totalValueLockedUSD`, and `color`. 
 * If the user's portfolio or allocations are missing, or if an error occurs, returns a predefined fallback dataset.
 *
 * @returns A JSON response with an array of protocol allocation objects.
 *
 * @remark The user ID is currently hardcoded as "current-user" for demonstration purposes.
 * @remark Uses the same mock data as MSW for fallbacks to ensure consistency.
 */
export async function GET() {
  try {
    // Get the current user's ID - in a real app, you'd get this from the session
    // For demo purposes, we'll use a placeholder
    const userId = "current-user";
    
    const portfolio = await portfolioRepository.getForUser(userId);
    
    if (!portfolio) {
      console.log("No portfolio found, using fallback data");
      return NextResponse.json(mockProtocolAllocations);
    }
    
    // Check if portfolio has allocations property and it's an array
    const allocations = (portfolio as Portfolio).allocations;
    
    if (!allocations || !Array.isArray(allocations) || allocations.length === 0) {
      console.log("No allocations found in portfolio, using fallback data");
      return NextResponse.json(mockProtocolAllocations);
    }
    // Transform portfolio allocations into the format expected by the chart
    const protocols: AssetAllocation[] = allocations.map((allocation: PortfolioAllocation) => {
      // Determine which property to use for the name with explicit fallback
      const name = allocation.asset_symbol ?? allocation.symbol ?? "Unknown Asset";
      
      // Get value as number with fallback, then convert to string
      const value = typeof allocation.percentage === 'number' ? allocation.percentage : 
                    typeof allocation.value === 'number' ? allocation.value : 0;
      
      // Generate a consistent asset_id from the name if not available
      const asset_id = name.toLowerCase().replace(/\s+/g, '-');
      
      return {
        name,
        totalValueLockedUSD: value.toString(),
        color: allocation.color ?? "#3B82F6", // Default color if not provided
        asset_id,
        percentage: value,
        protocol: name.split(' ')[0] // Use first word of name as protocol if not available
      };
    });
    return NextResponse.json(protocols);
  } catch (error) {
    console.error('API Error:', error);
    
    // Return fallback data in case of error
    return NextResponse.json(mockProtocolAllocations);
  }
}
