"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Eye, Settings } from "lucide-react"
import Link from "next/link"

interface Strategy {
  id: string
  name: string
  type: string
  tvl: number
  apy: number
  status: "active" | "paused" | "optimizing"
}

export function StrategyPerformanceTable() {
  const [sorting, setSorting] = useState<{ column: keyof Strategy | null; direction: "asc" | "desc" }>({
    column: "apy",
    direction: "desc",
  })

  // Sample data - in a real app, this would come from an API
  const strategies: Strategy[] = [
    {
      id: "1",
      name: "ETH/USDC Balanced",
      type: "Balanced",
      tvl: 50000,
      apy: 12.5,
      status: "active",
    },
    {
      id: "2",
      name: "BTC/USDT Aggressive",
      type: "Aggressive",
      tvl: 30000,
      apy: 18.2,
      status: "active",
    },
    {
      id: "3",
      name: "XTZ/USDC Conservative",
      type: "Conservative",
      tvl: 20000,
      apy: 8.7,
      status: "active",
    },
    {
      id: "4",
      name: "ETH/BTC Balanced",
      type: "Balanced",
      tvl: 15000,
      apy: 14.3,
      status: "optimizing",
    },
    {
      id: "5",
      name: "XTZ/ETH Aggressive",
      type: "Aggressive",
      tvl: 13429,
      apy: 16.8,
      status: "paused",
    },
  ]

  const sortedStrategies = [...strategies].sort((a, b) => {
    if (sorting.column === null) return 0

    const aValue = a[sorting.column]
    const bValue = b[sorting.column]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sorting.direction === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sorting.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  const handleSort = (column: keyof Strategy) => {
    setSorting((prev) => ({
      column,
      direction: prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }))
  }

  const getStatusColor = (status: Strategy["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-500 hover:bg-green-500/30"
      case "paused":
        return "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30"
      case "optimizing":
        return "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-500 hover:bg-gray-500/30"
    }
  }

  return (
    <div className="rounded-md border border-white/10">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-white/5">
            <TableHead className="w-[250px]">
              <Button variant="ghost" className="p-0 font-medium text-white" onClick={() => handleSort("name")}>
                Strategy Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 font-medium text-white" onClick={() => handleSort("type")}>
                Type
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" className="p-0 font-medium text-white" onClick={() => handleSort("tvl")}>
                TVL
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" className="p-0 font-medium text-white" onClick={() => handleSort("apy")}>
                APY
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 font-medium text-white" onClick={() => handleSort("status")}>
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedStrategies.map((strategy) => (
            <TableRow key={strategy.id} className="hover:bg-white/5">
              <TableCell className="font-medium">{strategy.name}</TableCell>
              <TableCell>{strategy.type}</TableCell>
              <TableCell className="text-right">${strategy.tvl.toLocaleString()}</TableCell>
              <TableCell className="text-right font-medium">{strategy.apy.toFixed(1)}%</TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(strategy.status)}`}>
                  {strategy.status.charAt(0).toUpperCase() + strategy.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/strategies/${strategy.id}`}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/strategies/${strategy.id}/edit`}>
                      <Settings className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
