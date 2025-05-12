"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, Filter, Plus, RefreshCw, Search } from "lucide-react"

export function LiquidityPoolsTable() {
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("tvl")
  const [sortDirection, setSortDirection] = useState("desc")

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortDirection("desc")
    }
  }

  const pools = [
    { id: 1, name: "Tezos/USDT", tvl: "$24.5M", apy: "12.4%", risk: "Low", protocol: "Quipuswap", volume: "$3.2M" },
    { id: 2, name: "Tezos/ETH", tvl: "$18.2M", apy: "15.7%", risk: "Medium", protocol: "Plenty", volume: "$2.8M" },
    { id: 3, name: "Etherlink/USDC", tvl: "$32.1M", apy: "9.8%", risk: "Low", protocol: "Quipuswap", volume: "$4.5M" },
    { id: 4, name: "Tezos/BTC", tvl: "$12.6M", apy: "18.3%", risk: "High", protocol: "Plenty", volume: "$2.1M" },
    {
      id: 5,
      name: "Etherlink/DAI",
      tvl: "$15.9M",
      apy: "11.2%",
      risk: "Medium",
      protocol: "SpicySwap",
      volume: "$1.9M",
    },
    { id: 6, name: "Tezos/USDC", tvl: "$22.3M", apy: "10.5%", risk: "Low", protocol: "Quipuswap", volume: "$3.0M" },
    {
      id: 7,
      name: "Etherlink/ETH",
      tvl: "$14.7M",
      apy: "16.2%",
      risk: "Medium",
      protocol: "SpicySwap",
      volume: "$2.4M",
    },
    { id: 8, name: "Tezos/DAI", tvl: "$19.8M", apy: "11.8%", risk: "Low", protocol: "Plenty", volume: "$2.7M" },
  ]

  const filteredPools = pools.filter(
    (pool) =>
      pool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pool.protocol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Liquidity Pools</h2>
          <p className="text-muted-foreground">Explore and analyze available liquidity pools</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Liquidity
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Available Liquidity Pools</CardTitle>
              <CardDescription>Explore pools with AI-predicted performance</CardDescription>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search pools..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-6 bg-muted/50 p-3 text-sm font-medium">
              <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("name")}>
                Pool
                {sortBy === "name" &&
                  (sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
              </div>
              <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("protocol")}>
                Protocol
                {sortBy === "protocol" &&
                  (sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
              </div>
              <div className="flex items-center gap-1 cursor-pointer text-right" onClick={() => handleSort("tvl")}>
                TVL
                {sortBy === "tvl" &&
                  (sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
              </div>
              <div className="flex items-center gap-1 cursor-pointer text-right" onClick={() => handleSort("volume")}>
                24h Volume
                {sortBy === "volume" &&
                  (sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
              </div>
              <div className="flex items-center gap-1 cursor-pointer text-right" onClick={() => handleSort("apy")}>
                APY
                {sortBy === "apy" &&
                  (sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
              </div>
              <div className="flex items-center gap-1 cursor-pointer text-right" onClick={() => handleSort("risk")}>
                Risk
                {sortBy === "risk" &&
                  (sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
              </div>
            </div>

            <div className="divide-y">
              {loading ? (
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="grid grid-cols-6 p-3 text-sm animate-pulse">
                      <div className="h-5 bg-muted rounded w-3/4"></div>
                      <div className="h-5 bg-muted rounded w-1/2"></div>
                      <div className="h-5 bg-muted rounded w-1/2 justify-self-end"></div>
                      <div className="h-5 bg-muted rounded w-1/2 justify-self-end"></div>
                      <div className="h-5 bg-muted rounded w-1/3 justify-self-end"></div>
                      <div className="h-5 bg-muted rounded w-1/3 justify-self-end"></div>
                    </div>
                  ))
              ) : filteredPools.length > 0 ? (
                filteredPools.map((pool) => (
                  <div key={pool.id} className="grid grid-cols-6 p-3 text-sm">
                    <div className="font-medium">{pool.name}</div>
                    <div>{pool.protocol}</div>
                    <div className="text-right">{pool.tvl}</div>
                    <div className="text-right">{pool.volume}</div>
                    <div className="text-right font-medium text-green-500">{pool.apy}</div>
                    <div className="text-right">
                      <Badge
                        variant={pool.risk === "Low" ? "outline" : pool.risk === "Medium" ? "secondary" : "destructive"}
                      >
                        {pool.risk}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  No pools found matching your search criteria
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment by Pool</CardTitle>
          <CardDescription>AI-powered risk analysis for each liquidity pool</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border bg-muted/20">
              <h3 className="font-medium mb-2">Risk Factors Explained</h3>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes multiple risk factors for each pool including market volatility, impermanent loss
                potential, smart contract security, and liquidity depth. Pools are then assigned an overall risk rating
                to help you make informed decisions.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-green-500 border-green-200">
                    Low Risk
                  </Badge>
                  <h4 className="font-medium">Stable Pairs</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Pools with stablecoin pairs or low volatility assets.
                </p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-1">
                    <ChevronDown className="h-3 w-3 text-green-500" />
                    <span>Tezos/USDT</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <ChevronDown className="h-3 w-3 text-green-500" />
                    <span>Tezos/USDC</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <ChevronDown className="h-3 w-3 text-green-500" />
                    <span>Etherlink/USDC</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">Medium Risk</Badge>
                  <h4 className="font-medium">Moderate Volatility</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Pools with moderate price fluctuations.</p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-1">
                    <ChevronDown className="h-3 w-3 text-amber-500" />
                    <span>Tezos/ETH</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <ChevronDown className="h-3 w-3 text-amber-500" />
                    <span>Etherlink/DAI</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <ChevronDown className="h-3 w-3 text-amber-500" />
                    <span>Etherlink/ETH</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Badge>High Risk</Badge>
                  <h4 className="font-medium">High Volatility</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Pools with significant price fluctuations.</p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-1">
                    <ChevronDown className="h-3 w-3 text-red-500" />
                    <span>Tezos/BTC</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <ChevronDown className="h-3 w-3 text-red-500" />
                    <span>Etherlink/BTC</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
