'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Play, Pause, BarChart3, Edit, Trash2 } from "lucide-react"

/**
 * Active Strategies Component
 * Displays and manages currently active investment strategies
 */
export function ActiveStrategies() {
  // Mock data for active strategies
  const strategies = [
    {
      id: "strat-1",
      name: "Balanced Yield Optimizer",
      status: "active",
      type: "yield",
      assets: ["USDC", "ETH", "WBTC"],
      allocation: "$2,450,000",
      returns: {
        daily: "0.08%",
        weekly: "0.52%",
        monthly: "2.1%",
        total: "12.4%"
      },
      risk: "medium",
      created: "2025-03-15"
    },
    {
      id: "strat-2",
      name: "Stablecoin Liquidity Provider",
      status: "active",
      type: "liquidity",
      assets: ["USDC", "DAI", "USDT"],
      allocation: "$3,800,000",
      returns: {
        daily: "0.05%",
        weekly: "0.35%",
        monthly: "1.4%",
        total: "8.2%"
      },
      risk: "low",
      created: "2025-02-28"
    },
    {
      id: "strat-3",
      name: "DeFi Blue Chip Portfolio",
      status: "paused",
      type: "growth",
      assets: ["AAVE", "UNI", "COMP", "MKR"],
      allocation: "$1,250,000",
      returns: {
        daily: "0.12%",
        weekly: "0.85%",
        monthly: "3.5%",
        total: "18.7%"
      },
      risk: "high",
      created: "2025-04-10"
    },
    {
      id: "strat-4",
      name: "Tezos Staking Optimizer",
      status: "active",
      type: "staking",
      assets: ["XTZ"],
      allocation: "$950,000",
      returns: {
        daily: "0.06%",
        weekly: "0.42%",
        monthly: "1.8%",
        total: "10.5%"
      },
      risk: "medium",
      created: "2025-01-20"
    },
    {
      id: "strat-5",
      name: "Cross-Chain Arbitrage",
      status: "active",
      type: "arbitrage",
      assets: ["ETH", "MATIC", "AVAX", "SOL"],
      allocation: "$1,850,000",
      returns: {
        daily: "0.15%",
        weekly: "1.05%",
        monthly: "4.2%",
        total: "22.8%"
      },
      risk: "high",
      created: "2025-05-05"
    }
  ]
  
  // Get badge variant based on strategy status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success" className="capitalize">Active</Badge>
      case "paused":
        return <Badge variant="warning" className="capitalize">Paused</Badge>
      case "failed":
        return <Badge variant="destructive" className="capitalize">Failed</Badge>
      default:
        return <Badge variant="outline" className="capitalize">{status}</Badge>
    }
  }
  
  // Get badge variant based on risk level
  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 capitalize">Low Risk</Badge>
      case "medium":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 capitalize">Medium Risk</Badge>
      case "high":
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 capitalize">High Risk</Badge>
      default:
        return <Badge variant="outline" className="capitalize">{risk}</Badge>
    }
  }
  
  // Handle strategy actions
  const handlePauseStrategy = (id: string) => {
    console.log(`Pause strategy ${id}`)
  }
  
  const handleStartStrategy = (id: string) => {
    console.log(`Start strategy ${id}`)
  }
  
  const handleEditStrategy = (id: string) => {
    console.log(`Edit strategy ${id}`)
  }
  
  const handleDeleteStrategy = (id: string) => {
    console.log(`Delete strategy ${id}`)
  }
  
  const handleViewPerformance = (id: string) => {
    console.log(`View performance for strategy ${id}`)
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Strategy Name</th>
            <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Type</th>
            <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Status</th>
            <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Allocation</th>
            <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Monthly Return</th>
            <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Risk</th>
            <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {strategies.map((strategy) => (
            <tr key={strategy.id} className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-3 px-4">
                <div className="font-medium">{strategy.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {strategy.assets.join(', ')}
                </div>
              </td>
              <td className="py-3 px-4 capitalize">{strategy.type}</td>
              <td className="py-3 px-4">{getStatusBadge(strategy.status)}</td>
              <td className="text-right py-3 px-4">{strategy.allocation}</td>
              <td className="text-right py-3 px-4 text-green-600 dark:text-green-500">{strategy.returns.monthly}</td>
              <td className="text-right py-3 px-4">{getRiskBadge(strategy.risk)}</td>
              <td className="text-right py-3 px-4">
                <div className="flex items-center justify-end space-x-2">
                  {strategy.status === 'active' ? (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handlePauseStrategy(strategy.id)}
                      title="Pause Strategy"
                    >
                      <Pause className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleStartStrategy(strategy.id)}
                      title="Start Strategy"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleViewPerformance(strategy.id)}
                    title="View Performance"
                  >
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditStrategy(strategy.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteStrategy(strategy.id)}
                        className="text-red-600 dark:text-red-400"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}