"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle, BarChart3, LineChart, PieChart, Wallet } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase"
import Link from "next/link"
import { WalletType } from "@/lib/analytics/wallet-analytics"

// Mock data for initial development - will be replaced with real data
const MOCK_CONNECTION_DATA = {
  daily: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    attempts: [45, 52, 49, 60, 55, 48, 50],
    successes: [40, 48, 45, 55, 50, 45, 48],
    failures: [5, 4, 4, 5, 5, 3, 2],
  },
  weekly: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    attempts: [320, 350, 380, 400],
    successes: [290, 330, 360, 380],
    failures: [30, 20, 20, 20],
  },
  monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    attempts: [1200, 1300, 1400, 1500, 1600, 1700],
    successes: [1100, 1200, 1300, 1400, 1500, 1600],
    failures: [100, 100, 100, 100, 100, 100],
  },
}

const MOCK_WALLET_DISTRIBUTION = {
  labels: [WalletType.METAMASK, WalletType.WALLET_CONNECT, WalletType.COINBASE, WalletType.OTHER],
  data: [65, 20, 10, 5],
}

const MOCK_ERROR_DISTRIBUTION = {
  labels: ['User Rejected', 'Network Error', 'Unsupported Chain', 'Timeout', 'Other'],
  data: [40, 25, 15, 10, 10],
}

export function WalletConnectionDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("daily")

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Calculate success rate
  const getSuccessRate = (timeframe: 'daily' | 'weekly' | 'monthly') => {
    const data = MOCK_CONNECTION_DATA[timeframe]
    const totalAttempts = data.attempts.reduce((sum, val) => sum + val, 0)
    const totalSuccesses = data.successes.reduce((sum, val) => sum + val, 0)
    return totalAttempts > 0 ? ((totalSuccesses / totalAttempts) * 100).toFixed(1) : '0'
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Wallet Connection Dashboard</CardTitle>
          <CardDescription>Monitor wallet connection success rates and analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="connections">Connections</TabsTrigger>
              <TabsTrigger value="wallets">Wallet Types</TabsTrigger>
              <TabsTrigger value="errors">Error Analysis</TabsTrigger>
            </TabsList>

            <div className="mb-4">
              <TabsList>
                <TabsTrigger 
                  value="daily" 
                  onClick={() => setTimeRange("daily")}
                  data-state={timeRange === "daily" ? "active" : "inactive"}
                >
                  Daily
                </TabsTrigger>
                <TabsTrigger 
                  value="weekly" 
                  onClick={() => setTimeRange("weekly")}
                  data-state={timeRange === "weekly" ? "active" : "inactive"}
                >
                  Weekly
                </TabsTrigger>
                <TabsTrigger 
                  value="monthly" 
                  onClick={() => setTimeRange("monthly")}
                  data-state={timeRange === "monthly" ? "active" : "inactive"}
                >
                  Monthly
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard 
                  title="Success Rate" 
                  value={`${getSuccessRate(timeRange)}%`} 
                  change="+2.3%" 
                  icon={<BarChart3 className="h-4 w-4" />} 
                />
                <MetricCard 
                  title="Total Connections" 
                  value={MOCK_CONNECTION_DATA[timeRange].successes.reduce((sum, val) => sum + val, 0).toString()} 
                  change="+8.7%" 
                  icon={<Wallet className="h-4 w-4" />} 
                />
                <MetricCard 
                  title="Avg. Connect Time" 
                  value="1.2s" 
                  change="-0.3s" 
                  icon={<LineChart className="h-4 w-4" />} 
                />
                <MetricCard 
                  title="Failure Rate" 
                  value={`${(100 - parseFloat(getSuccessRate(timeRange))).toFixed(1)}%`} 
                  change="-1.2%" 
                  negative={false}
                  icon={<PieChart className="h-4 w-4" />} 
                />
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Connection Success Rate Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                    {/* This would be replaced with an actual chart component */}
                    Chart placeholder - Connection success rate over time
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="connections" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Connection Attempts vs Successes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                    {/* This would be replaced with an actual chart component */}
                    Chart placeholder - Connection attempts vs successes over time
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Connection by Time of Day</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                      Chart placeholder - Connection distribution by hour
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Connection by Device Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                      Chart placeholder - Connection distribution by device
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="wallets" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Wallet Type Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                    Chart placeholder - Wallet type distribution
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate by Wallet Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                    Chart placeholder - Success rate comparison by wallet type
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="errors" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Error Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                    Chart placeholder - Error type distribution
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Errors by Wallet Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                    Chart placeholder - Error distribution by wallet type
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground">
        <p>
          This dashboard displays wallet connection analytics. For more detailed analytics,{" "}
          <a
            href="/analytics"
            className="text-primary hover:underline"
          >
            visit the main Analytics Dashboard
          </a>
          .
        </p>
      </div>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  negative?: boolean
  icon: React.ReactNode
}

function MetricCard({ title, value, change, negative = false, icon }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className="rounded-full bg-primary/10 p-2 text-primary">{icon}</div>
        </div>
        <div className={`mt-2 text-xs ${negative ? "text-destructive" : "text-green-600"}`}>
          {change} from last period
        </div>
      </CardContent>
    </Card>
  )
}

