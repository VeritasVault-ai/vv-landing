"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle, BarChart3, LineChart, PieChart, Users } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase"
import Link from "next/link"

export function AnalyticsDashboard() {
  const [analyticsId, setAnalyticsId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const fetchAnalyticsId = async () => {
      try {
        setIsLoading(true)
        const supabase = createBrowserClient()
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) return

        const { data } = await supabase
          .from("user_settings")
          .select("google_analytics_id")
          .eq("user_id", session.user.id)
          .single()

        if (data?.google_analytics_id) {
          setAnalyticsId(data.google_analytics_id)
        }
      } catch (error) {
        console.error("Error fetching Google Analytics ID:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalyticsId()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!analyticsId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>View insights about your platform usage</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Google Analytics Not Configured</AlertTitle>
            <AlertDescription>
              To view analytics, you need to add your Google Analytics Measurement ID in settings.
            </AlertDescription>
          </Alert>
          <div className="mt-4">
            <Button asChild>
              <Link href="/settings?tab=api-keys">Configure Analytics</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>View insights about your platform usage</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="conversion">Conversion</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard title="Total Users" value="1,234" change="+12.3%" icon={<Users className="h-4 w-4" />} />
                <MetricCard title="Page Views" value="5,678" change="+8.7%" icon={<BarChart3 className="h-4 w-4" />} />
                <MetricCard
                  title="Avg. Session"
                  value="2m 45s"
                  change="-1.2%"
                  negative
                  icon={<LineChart className="h-4 w-4" />}
                />
                <MetricCard
                  title="Conversion Rate"
                  value="3.45%"
                  change="+0.8%"
                  icon={<PieChart className="h-4 w-4" />}
                />
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Traffic Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                    Chart placeholder - Connect to Google Analytics API for real data
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">User Demographics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                    Demographics chart placeholder - Connect to Google Analytics API for real data
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="engagement" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                    Engagement chart placeholder - Connect to Google Analytics API for real data
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conversion" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Funnel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center text-muted-foreground">
                    Conversion funnel placeholder - Connect to Google Analytics API for real data
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground">
        <p>
          This dashboard is connected to your Google Analytics account (ID: {analyticsId}). For more detailed analytics,{" "}
          <a
            href={`https://analytics.google.com/analytics/web/#/p${analyticsId}/reports/intelligenthome`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            visit Google Analytics
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
