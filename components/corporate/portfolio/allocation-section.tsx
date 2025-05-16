"use client"

import { AllocationChart } from "@/components/allocation-chart"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface AssetAllocation {
  symbol: string;
  weight: number;
  color: string;
}

interface AllocationSectionProps {
  className?: string;
  // We'll make allocations optional and provide default data
  allocations?: AssetAllocation[];
}

// Default allocation data
const DEFAULT_ALLOCATIONS: AssetAllocation[] = [
  { symbol: "stETH", weight: 50.0, color: "#3B82F6" },
  { symbol: "tzBTC", weight: 20.0, color: "#10B981" },
  { symbol: "USDC", weight: 30.0, color: "#F59E0B" }
];
export function AllocationSection({ allocations = DEFAULT_ALLOCATIONS, className }: AllocationSectionProps) {
  // Use state to store the allocations (could be updated later if needed)
  const [assetAllocations] = useState<AssetAllocation[]>(allocations);
  
  return (
    <div className={cn("bg-slate-800/50 dark:bg-slate-900/50 rounded-lg p-5", className)}>
      <h2 className="text-lg font-medium text-white mb-4">Allocations</h2>
      
      <div className="flex flex-col md:flex-row">
        {/* Table section - takes 60% of the width on larger screens */}
        <div className="w-full md:w-3/5 pr-0 md:pr-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-2 text-slate-400 font-medium">Asset</th>
                  <th className="text-right py-2 text-slate-400 font-medium">Weight</th>
                </tr>
              </thead>
              <tbody>
                {assetAllocations.map((allocation) => (
                  <tr key={allocation.symbol}>
                    <td className="text-left py-2 border-t border-slate-700">{allocation.symbol}</td>
                    <td className="text-right py-2 border-t border-slate-700">{allocation.weight.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Chart section - takes 40% of the width on larger screens */}
        <div className="w-full md:w-2/5 mt-4 md:mt-0 flex items-center justify-center">
          <div className="h-[220px] w-full max-w-[220px]">
            {/* Pass the allocations data directly to the chart */}
            <AllocationChart initialData={assetAllocations.map(a => ({
              name: a.symbol,
              value: a.weight,
              color: a.color
            }))} />
        </div>
      </div>
    </div>
    </div>
  )
}