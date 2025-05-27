"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle, BarChart3, LineChart, PieChart, Shield, Vote } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase"
import Link from "next/link"

// Mock data for initial development - will be replaced with real data
const MOCK_PLURALITY_DATA = {
  daily: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    sessions: [120, 135, 128, 142, 150, 138, 145],
    authentications: [110, 125, 120, 135, 140, 130, 138],
    transactions: [85, 95, 90, 105, 110, 100, 108],
  },
  weekly: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    sessions: [900, 950, 980, 1020],
    authentications: [850, 900, 930, 970],
    transactions: [650, 700, 720, 750],
  },
  monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    sessions: [3800, 4000, 4200, 4400, 4600, 4800],
    authentications: [3600, 3800, 4000, 4200, 4400, 4600],
    transactions: [2800, 3000, 3200, 3400, 3600, 3800],
  },
}

const MOCK_TRANSACTION_TYPES = {
  labels: ['Deposit', 'Withdrawal', 'Governance', 'Other'],
  data: [45, 30, 20, 5],
}

const MOCK_GOVERNANCE_DATA = {
  proposals: 12,
  votes: 450,
  participation: 68, // percentage
}

export function PluralityDashboard() {
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

  // Calculate authentication success rate
  const getAuthSuccessRate = (timeframe: 'daily' | 'weekly' | 'monthly') => {
    const data = MOCK_PLURALITY_DATA[timeframe]
    const totalSessions = data.sessions.reduce((sum, val) => sum + val, 0)
    const totalAuths = data.authentications.reduce((sum, val) => sum + val, 0)
    return totalSessions > 0 ? ((totalAuths / totalSessions) * 100).toFixed(1) : '0'
  }

  // Calculate transaction success rate
  const getTransactionSuccessRate = (timeframe: 'daily' | 'weekly' | 'monthly') => {
    const data = MOCK_PLURALITY_DATA[timeframe]
    const totalAuths = data.authentications.reduce((sum, val) => sum + val, 0)
    const totalTxs = data.transactions.reduce((sum, val) => sum + val, 0)
    return totalAuths > 0 ? ((totalTxs / totalAuths) * 100).toFixed(1) : '0'
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Plurality Integration Dashboard</CardTitle>
          <CardDescription>Monitor Plurality system integration metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="governance">Governance</TabsTrigger>
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
                  title="Auth Success Rate" 
                  value={`${getAuthSuccessRate(timeRange)}%`} 
                  change="+1.8%" 
                  icon={<Shield className="h-4 w-4" />} 
                />
                <MetricCard 
                  title="Transaction Success" 
                  value={`${getTransactionSuccessRate(timeRange)}%`} 
                  change="+3.2%" 
                  icon={<BarChart3 className="h-4 w-4" />} 
                />
                <MetricCard 
                  title="Active Sessions" 
                  value={MOCK_PLURALITY_DATA[timeRange].sessions.reduce((sum, val) => sum + val, 0).toString()} 
                  change="+5.5%" 
                  icon={<LineChart className="h-4 w-4" />} 
                />
                <MetricCard 
                  title="Governance Participation" 
                  value={`${MOCK_GOVERNANCE_DATA.participation}%`} 
                  change="+2.3%" 
                  icon={<Vote className="h-4 w-4" />} 
                />
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Plurality Activity Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                    {/* This would be replaced with an actual chart component */}
                    Chart placeholder - Sessions, authentications, and transactions over time
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="authentication" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Authentication Success vs Failure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                    {/* This would be replaced with an actual chart component */}
                    Chart placeholder - Authentication success vs failure over time
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Authentication by Wallet Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                      Chart placeholder - Authentication distribution by wallet type
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Authentication Errors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                      Chart placeholder - Authentication error distribution
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Transaction Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                    Chart placeholder - Transaction type distribution
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Transaction Success Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                      Chart placeholder - Transaction success rate over time
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Transaction Errors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                      Chart placeholder - Transaction error distribution
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="governance" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Governance Participation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                    Chart placeholder - Governance participation over time
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Active Proposals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                      Chart placeholder - Active proposals and voting status
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Vote Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                      Chart placeholder - Vote distribution by proposal
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground">
        <p>
          This dashboard displays Plurality integration metrics. For more detailed analytics,{" "}
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

