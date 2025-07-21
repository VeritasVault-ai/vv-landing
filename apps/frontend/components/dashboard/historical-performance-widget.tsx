"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HistoricalPerformanceChart } from "@/components/historical-performance-chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getBrowserClient } from "@/lib/supabase"

export function HistoricalPerformanceWidget() {
  const [poolCount, setPoolCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const supabase = getBrowserClient()

  useEffect(() => {
    async function fetchPoolCount() {
      try {
        const { count, error } = await supabase.from("liquidity_pools").select("*", { count: "exact", head: true })

        if (!error && count !== null) {
          setPoolCount(count)
        }
      } catch (err) {
        console.error("Error fetching pool count:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPoolCount()
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Historical Performance</CardTitle>
        <CardDescription>Track the historical performance of {poolCount} liquidity pools over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart">
          <TabsList className="mb-4">
            <TabsTrigger value="chart">Chart View</TabsTrigger>
            <TabsTrigger value="comparison">Pool Comparison</TabsTrigger>
          </TabsList>
          <TabsContent value="chart">
            <HistoricalPerformanceChart />
          </TabsContent>
          <TabsContent value="comparison">
            <div className="p-8 text-center text-muted-foreground">Pool comparison feature coming soon</div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
