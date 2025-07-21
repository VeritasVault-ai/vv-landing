"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowUpIcon, ArrowDownIcon, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface Protocol {
  id: string
  name: string
  type: string
  totalValueLockedUSD: string
  cumulativeVolumeUSD: string
  currentApy?: number
  change24h?: number
}

export function ProtocolMetrics() {
  const [protocols, setProtocols] = useState<Protocol[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [sortField, setSortField] = useState<string>("totalValueLockedUSD")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/goldsky/protocols")
        if (!response.ok) {
          throw new Error("Failed to fetch protocols")
        }

        const data = await response.json()

        // Add mock APY and 24h change data (in a real app, this would come from the API)
        const enhancedData = data.map((protocol: Protocol) => ({
          ...protocol,
          currentApy: Math.random() * 20, // Mock APY between 0-20%
          change24h: Math.random() * 10 - 5, // Mock 24h change between -5% and +5%
        }))

        setProtocols(enhancedData)
        setError(null)
      } catch (error) {
        console.error("Error fetching protocols:", error)
        setError("Failed to load protocols. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProtocols()

    // Refresh data every 5 minutes
    const intervalId = setInterval(fetchProtocols, 5 * 60 * 1000)
    return () => clearInterval(intervalId)
  }, [])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const sortedProtocols = [...protocols].sort((a, b) => {
    let aValue = a[sortField as keyof Protocol]
    let bValue = b[sortField as keyof Protocol]

    // Convert string values to numbers for numeric fields
    if (sortField === "totalValueLockedUSD" || sortField === "cumulativeVolumeUSD") {
      aValue = Number.parseFloat(aValue as string)
      bValue = Number.parseFloat(bValue as string)
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Protocol Metrics</CardTitle>
        <CardDescription>Current TVL and APY metrics for DeFi protocols</CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error}
              <div className="mt-4">
                <Button onClick={() => window.location.reload()}>Retry</Button>
              </div>
            </AlertDescription>
          </Alert>
        ) : loading ? (
          <div className="space-y-4">
            <Skeleton className="h-[400px] w-full" />
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                    Protocol
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("type")}>
                    Type
                  </TableHead>
                  <TableHead className="cursor-pointer text-right" onClick={() => handleSort("totalValueLockedUSD")}>
                    TVL
                  </TableHead>
                  <TableHead className="cursor-pointer text-right" onClick={() => handleSort("currentApy")}>
                    Current APY
                  </TableHead>
                  <TableHead className="cursor-pointer text-right" onClick={() => handleSort("change24h")}>
                    24h Change
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedProtocols.map((protocol) => (
                  <TableRow key={protocol.id}>
                    <TableCell className="font-medium">{protocol.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{protocol.type}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      ${Number.parseFloat(protocol.totalValueLockedUSD).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">{protocol.currentApy?.toFixed(2)}%</TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`flex items-center justify-end ${protocol.change24h && protocol.change24h >= 0 ? "text-emerald-600" : "text-red-600"}`}
                      >
                        {protocol.change24h && protocol.change24h >= 0 ? (
                          <ArrowUpIcon className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4 mr-1" />
                        )}
                        {protocol.change24h?.toFixed(2)}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ProtocolMetrics
