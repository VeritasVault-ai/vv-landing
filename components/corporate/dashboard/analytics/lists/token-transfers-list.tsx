'use client'

import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface TokenTransfersListProps {
  limit?: number
}

/**
 * Token Transfers List Component
 * Displays recent significant token transfers on-chain
 */
export function TokenTransfersList({ limit = 5 }: TokenTransfersListProps) {
  // Mock data for token transfers
  const transfers = [
    {
      id: "tx-1",
      token: "ETH",
      amount: "1,250",
      usdValue: "2,375,000",
      from: "0x1a2...3b4c",
      to: "0x5d6...7e8f",
      type: "transfer",
      time: "10 minutes ago"
    },
    {
      id: "tx-2",
      token: "USDC",
      amount: "3,500,000",
      usdValue: "3,500,000",
      from: "0xabc...def0",
      to: "0x123...456",
      type: "bridge",
      time: "25 minutes ago"
    },
    {
      id: "tx-3",
      token: "WBTC",
      amount: "45",
      usdValue: "1,350,000",
      from: "0x789...012",
      to: "0x345...678",
      type: "swap",
      time: "42 minutes ago"
    },
    {
      id: "tx-4",
      token: "USDT",
      amount: "2,800,000",
      usdValue: "2,800,000",
      from: "0xdef...123",
      to: "0x456...789",
      type: "transfer",
      time: "1 hour ago"
    },
    {
      id: "tx-5",
      token: "ETH",
      amount: "850",
      usdValue: "1,615,000",
      from: "0x9ab...cde",
      to: "0xfgh...ijk",
      type: "bridge",
      time: "1 hour ago"
    },
    {
      id: "tx-6",
      token: "LINK",
      amount: "125,000",
      usdValue: "1,125,000",
      from: "0xlmn...opq",
      to: "0xrst...uvw",
      type: "transfer",
      time: "2 hours ago"
    },
    {
      id: "tx-7",
      token: "DAI",
      amount: "1,750,000",
      usdValue: "1,750,000",
      from: "0xxyz...123",
      to: "0x456...789",
      type: "swap",
      time: "3 hours ago"
    },
    {
      id: "tx-8",
      token: "AAVE",
      amount: "32,500",
      usdValue: "1,950,000",
      from: "0xabc...def",
      to: "0xghi...jkl",
      type: "transfer",
      time: "4 hours ago"
    },
    {
      id: "tx-9",
      token: "UNI",
      amount: "175,000",
      usdValue: "1,050,000",
      from: "0xmno...pqr",
      to: "0xstu...vwx",
      type: "bridge",
      time: "5 hours ago"
    },
    {
      id: "tx-10",
      token: "COMP",
      amount: "15,000",
      usdValue: "975,000",
      from: "0xyz...123",
      to: "0x456...789",
      type: "swap",
      time: "6 hours ago"
    }
  ]
  
  // Apply limit if provided
  const displayedTransfers = limit ? transfers.slice(0, limit) : transfers
  
  // Get badge color and text based on transfer type
  const getTransferBadge = (type: string) => {
    switch (type) {
      case "transfer":
        return <Badge variant="outline">Transfer</Badge>
      case "bridge":
        return <Badge variant="secondary">Bridge</Badge>
      case "swap":
        return <Badge variant="default">Swap</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }
  
  return (
    <div className="space-y-4">
      {displayedTransfers.map((transfer) => (
        <div key={transfer.id} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium text-sm">
              {transfer.token.substring(0, 1)}
            </div>
            <div>
              <div className="font-medium">{transfer.token}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {transfer.from} → {transfer.to}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end space-x-2">
              <div className="font-medium">${transfer.usdValue}</div>
              {getTransferBadge(transfer.type)}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {transfer.time}
            </div>
          </div>
        </div>
      ))}
      
      {limit && transfers.length > limit && (
        <div className="text-center pt-2">
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            View all transfers
          </button>
        </div>
      )}
    </div>
  )
}