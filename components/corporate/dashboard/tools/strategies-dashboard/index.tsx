'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActiveStrategies } from "./components/active-strategies"
import { StrategyPerformance } from "./components/strategy-performance"
import { StrategyCreator } from "./components/strategy-creator"
import { StrategyMarketplace } from "./components/strategy-marketplace"
import { StrategyAnalytics } from "./components/strategy-analytics"
import { DashboardMetrics } from "@/components/dashboard/dashboard-metrics"

/**
 * Strategies Dashboard Component
 * Provides interface for viewing, creating, and managing investment strategies
 */
export function StrategiesDashboard() {
  return (
    <div className="space-y-6">
      {/* Top metrics cards */}
      <DashboardMetrics />
      
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid grid-cols-5 h-10">
          <TabsTrigger value="active">Active Strategies</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="creator">Strategy Creator</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Strategies</CardTitle>
              <CardDescription>Currently deployed investment strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <ActiveStrategies />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Strategy Performance</CardTitle>
              <CardDescription>Performance metrics for your strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <StrategyPerformance />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="creator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Strategy Creator</CardTitle>
              <CardDescription>Build and deploy custom investment strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <StrategyCreator />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="marketplace" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Strategy Marketplace</CardTitle>
              <CardDescription>Browse and deploy pre-built strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <StrategyMarketplace />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Strategy Analytics</CardTitle>
              <CardDescription>In-depth analysis of strategy performance</CardDescription>
            </CardHeader>
            <CardContent>
              <StrategyAnalytics />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}