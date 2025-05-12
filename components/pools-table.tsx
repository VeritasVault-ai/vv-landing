"use client"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowUpDown, Info } from "lucide-react"
import { useLiquidityPools } from "@/hooks/use-liquidity-pools"
import type { LiquidityPool } from "@/lib/services/liquidity-pool-service"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { useAnalytics } from "@/hooks/use-analytics"
import { trackSearch, trackViewPool } from "@/lib/analytics/track-events"

export default function PoolsTable() {
  const { pools, isLoading, error } = useLiquidityPools()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<keyof LiquidityPool>("tvl")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const { trackEvent } = useAnalytics()

  const handleSort = (field: keyof LiquidityPool) => {
    // Track sorting action
    trackEvent({
      action: "sort_pools",
      category: "pools",
      label: field,
      direction: sortField === field && sortDirection === "asc" ? "desc" : "asc",
    })

    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    // Only track search when user has typed at least 3 characters
    if (value.length >= 3) {
      trackSearch(
        value,
        "pools",
        pools.filter(
          (pool) =>
            pool.name.toLowerCase().includes(value.toLowerCase()) ||
            pool.pair.toLowerCase().includes(value.toLowerCase()) ||
            pool.protocol.toLowerCase().includes(value.toLowerCase()),
        ).length,
      )
    }
  }

  const handleViewPoolDetails = (pool: LiquidityPool) => {
    // Track pool details view
    trackViewPool(pool.id, pool.name, pool.protocol, pool.risk_level)
  }

  const filteredPools = pools
    .filter(
      (pool) =>
        pool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pool.pair.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pool.protocol.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return 0
    })

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  if (error) {
    return (
      <div className="rounded-lg border bg-card p-6 text-center">
        <p className="text-destructive">Error loading liquidity pools: {error.message}</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search pools..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("name")}>
                  Pool
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("pair")}>
                  Pair
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("protocol")}>
                  Protocol
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("tvl")}>
                  TVL
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("apy")}>
                  APY
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("risk_level")}>
                  Risk
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-6 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-6 w-16 ml-auto" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-6 w-12 ml-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-20 ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredPools.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No pools found.
                </TableCell>
              </TableRow>
            ) : (
              filteredPools.map((pool) => (
                <TableRow key={pool.id}>
                  <TableCell className="font-medium">{pool.name}</TableCell>
                  <TableCell>{pool.pair}</TableCell>
                  <TableCell>{pool.protocol}</TableCell>
                  <TableCell className="text-right">${Number(pool.tvl).toLocaleString()}</TableCell>
                  <TableCell className="text-right">{Number(pool.apy).toFixed(2)}%</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getRiskBadgeColor(pool.risk_level)}>
                      {pool.risk_level.charAt(0).toUpperCase() + pool.risk_level.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/pools/${pool.id}`} onClick={() => handleViewPoolDetails(pool)}>
                      <Button variant="outline" size="sm">
                        <Info className="mr-2 h-4 w-4" />
                        Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
