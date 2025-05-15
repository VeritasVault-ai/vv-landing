"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardMetrics } from "./dashboard-metrics"
import { DashboardPerformance } from "./dashboard-performance"
import { DashboardRisk } from "./dashboard-risk"
import { DashboardActivity } from "./dashboard-activity"

interface DashboardOverviewProps {
  isLoading?: boolean
}

/**
 * Dashboard overview component that displays key metrics, performance charts,
 * risk assessment, and recent activity
 */
export function DashboardOverview({ isLoading = false }: DashboardOverviewProps) {
  const [activeTab, setActiveTab] = useState("overview")
  
  if (isLoading) {
    return <DashboardSkeleton />
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500 dark:text-slate-400">Last updated:</span>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {new Date().toLocaleString()}
          </span>
        </div>
      </div>
      
      {/* Key Metrics */}
      <DashboardMetrics />
      
      {/* Dashboard Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DashboardPerformance />
            <DashboardRisk />
          </div>
          <DashboardActivity limit={5} />
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <DashboardPerformance fullView />
        </TabsContent>
        
        <TabsContent value="risk" className="space-y-4">
          <DashboardRisk fullView />
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4">
          <DashboardActivity />
        </TabsContent>
      </Tabs>
    </div>
  )
}

/**
 * Loading skeleton for the dashboard
 */
function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-36 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
        <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
            </CardHeader>
            <CardContent>
              <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded-md" />
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="h-[400px] bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
    </div>
  )
}