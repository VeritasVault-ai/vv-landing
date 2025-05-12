"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface ProtocolData {
  id: string
  name: string
  tvl: number
  change_1d: number
  change_7d: number
  category: string
  chain: string
}

export function DefiProtocolData() {
  const [protocolData, setProtocolData] = useState<ProtocolData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProtocolData = async () => {
      try {
        setLoading(true)
        // Using DefiLlama API for real protocol data
        const response = await fetch("https://api.llama.fi/protocols")

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()

        // Transform the data to match our interface
        const transformedData = data.slice(0, 10).map((protocol: any) => ({
          id: protocol.id,
          name: protocol.name,
          tvl: protocol.tvl,
          change_1d: protocol.change_1d || 0,
          change_7d: protocol.change_7d || 0,
          category: protocol.category,
          chain: Array.isArray(protocol.chains) ? protocol.chains[0] : "Multiple",
        }))

        setProtocolData(transformedData)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch protocol data:", err)
        setError("Failed to load protocol data. Please try again later.")
        // Fallback to mock data if API fails
        setProtocolData([
          {
            id: "uniswap",
            name: "Uniswap",
            tvl: 5678901234,
            change_1d: 1.2,
            change_7d: 3.4,
            category: "DEX",
            chain: "Ethereum",
          },
          {
            id: "aave",
            name: "Aave",
            tvl: 4567890123,
            change_1d: -0.5,
            change_7d: 2.1,
            category: "Lending",
            chain: "Multiple",
          },
          {
            id: "curve",
            name: "Curve",
            tvl: 3456789012,
            change_1d: 0.8,
            change_7d: -1.2,
            category: "DEX",
            chain: "Ethereum",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProtocolData()

    // Refresh data every 5 minutes
    const intervalId = setInterval(fetchProtocolData, 300000)

    return () => clearInterval(intervalId)
  }, [])

  const formatLargeNumber = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
    return `$${value.toFixed(2)}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>DeFi Protocol Data</CardTitle>
        <CardDescription>Total Value Locked (TVL) and performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-4 dark:bg-red-900/20">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Protocol</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Chain</TableHead>
                <TableHead>TVL</TableHead>
                <TableHead>1d Change</TableHead>
                <TableHead className="hidden md:table-cell">7d Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton className="h-6 w-24" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-6 w-20" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-6 w-20" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-6 w-20" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-6 w-16" />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Skeleton className="h-6 w-16" />
                        </TableCell>
                      </TableRow>
                    ))
                : protocolData.map((protocol) => (
                    <TableRow key={protocol.id}>
                      <TableCell className="font-medium">{protocol.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{protocol.category}</Badge>
                      </TableCell>
                      <TableCell>{protocol.chain}</TableCell>
                      <TableCell>{formatLargeNumber(protocol.tvl)}</TableCell>
                      <TableCell>
                        <span className={protocol.change_1d >= 0 ? "text-emerald-600" : "text-red-600"}>
                          {protocol.change_1d >= 0 ? "+" : ""}
                          {protocol.change_1d.toFixed(2)}%
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className={protocol.change_7d >= 0 ? "text-emerald-600" : "text-red-600"}>
                          {protocol.change_7d >= 0 ? "+" : ""}
                          {protocol.change_7d.toFixed(2)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Data provided by DefiLlama API. Updated every 5 minutes.</p>
      </CardContent>
    </Card>
  )
}
