'use client'

import { Badge } from "@/components/ui/badge"

interface LiquidityPoolsTableProps {
  limit?: number
}

/**
 * Liquidity Pools Table Component
 * Displays information about top liquidity pools across protocols
 */
export function LiquidityPoolsTable({ limit = 5 }: LiquidityPoolsTableProps) {
  // Mock data for liquidity pools
  const pools = [
    {
      id: "pool-1",
      name: "ETH-USDC",
      protocol: "Uniswap V3",
      tvl: "1,250,000,000",
      apy: "4.2",
      volume24h: "325,000,000",
      risk: "low"
    },
    {
      id: "pool-2",
      name: "WBTC-ETH",
      protocol: "Uniswap V3",
      tvl: "980,000,000",
      apy: "3.8",
      volume24h: "215,000,000",
      risk: "low"
    },
    {
      id: "pool-3",
      name: "USDC-USDT",
      protocol: "Curve",
      tvl: "850,000,000",
      apy: "2.5",
      volume24h: "420,000,000",
      risk: "low"
    },
    {
      id: "pool-4",
      name: "ETH-DAI",
      protocol: "Uniswap V3",
      tvl: "720,000,000",
      apy: "4.5",
      volume24h: "180,000,000",
      risk: "medium"
    },
    {
      id: "pool-5",
      name: "AAVE-ETH",
      protocol: "SushiSwap",
      tvl: "450,000,000",
      apy: "6.8",
      volume24h: "95,000,000",
      risk: "medium"
    },
    {
      id: "pool-6",
      name: "LINK-ETH",
      protocol: "Uniswap V3",
      tvl: "380,000,000",
      apy: "5.2",
      volume24h: "85,000,000",
      risk: "medium"
    },
    {
      id: "pool-7",
      name: "COMP-ETH",
      protocol: "SushiSwap",
      tvl: "320,000,000",
      apy: "7.5",
      volume24h: "65,000,000",
      risk: "high"
    },
    {
      id: "pool-8",
      name: "UNI-ETH",
      protocol: "Uniswap V3",
      tvl: "290,000,000",
      apy: "4.8",
      volume24h: "75,000,000",
      risk: "medium"
    },
    {
      id: "pool-9",
      name: "YFI-ETH",
      protocol: "SushiSwap",
      tvl: "210,000,000",
      apy: "9.2",
      volume24h: "45,000,000",
      risk: "high"
    },
    {
      id: "pool-10",
      name: "SNX-ETH",
      protocol: "Uniswap V3",
      tvl: "180,000,000",
      apy: "8.5",
      volume24h: "38,000,000",
      risk: "high"
    }
  ]
  
  // Apply limit if provided
  const displayedPools = limit ? pools.slice(0, limit) : pools
  
  // Get badge variant based on risk level
  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return <Badge variant="success">Low Risk</Badge>
      case "medium":
        return <Badge variant="warning">Medium Risk</Badge>
      case "high":
        return <Badge variant="destructive">High Risk</Badge>
      default:
        return <Badge variant="outline">{risk}</Badge>
    }
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Pool</th>
            <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Protocol</th>
            <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">TVL</th>
            <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">APY</th>
            <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Risk</th>
          </tr>
        </thead>
        <tbody>
          {displayedPools.map((pool) => (
            <tr key={pool.id} className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-3 px-4 font-medium">{pool.name}</td>
              <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{pool.protocol}</td>
              <td className="text-right py-3 px-4">${pool.tvl}</td>
              <td className="text-right py-3 px-4">{pool.apy}%</td>
              <td className="text-right py-3 px-4">
                {getRiskBadge(pool.risk)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {limit && pools.length > limit && (
        <div className="text-center pt-4">
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            View all liquidity pools
          </button>
        </div>
      )}
    </div>
  )
}