"use client"

import { DashboardHeader } from "@/components/corporate/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDashboardWebSocketSimulation } from "@/lib/services/websocket-simulations/useDashboardWebSocketSimulation"
import { useModelWebSocketSimulation } from "@/lib/services/websocket-simulations/useModelWebSocketSimulation"
import { useVotingWebSocketSimulation } from "@/lib/services/websocket-simulations/useVotingWebsocketSimulation"
import { useState } from "react"
import { WebSocketStatus } from "@/lib/services/dashboard-realtime-manager"
import { SimulationIndicator } from "@/components/corporate/simulation-indicator"
import { Activity, Users, BarChart3, Clock } from "lucide-react"

/**
 * Dashboard overview page that demonstrates the use of WebSocket simulations
 * and simulation indicators
 */
export default function DashboardOverview() {
  const [connectionStatus, setConnectionStatus] = useState<WebSocketStatus>('connecting')
  
  // Use all our WebSocket simulation hooks
  const { data: dashboardData, isSimulated: isDashboardSimulated } = useDashboardWebSocketSimulation(
    (status) => setConnectionStatus(status)
  )
  
  const { data: modelData, isSimulated: isModelSimulated } = useModelWebSocketSimulation()
  const { data: votingData, isSimulated: isVotingSimulated } = useVotingWebSocketSimulation()
  
  // Determine if any data is simulated
  const isAnyDataSimulated = isDashboardSimulated || isModelSimulated || isVotingSimulated
  
  return (
    <div className="p-6">
      <DashboardHeader
        title="Dashboard Overview"
        description="Real-time metrics and system status"
        isSimulated={isAnyDataSimulated}
        connectionStatus={connectionStatus}
        lastUpdated={dashboardData?.lastUpdated}
        onRefresh={async () => {
          // In a real app, this would trigger a data refresh
          await new Promise(resolve => setTimeout(resolve, 1000))
        }}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Active Users Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData?.activeUsers || 0}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Currently online
            </p>
            {isDashboardSimulated && (
              <div className="mt-2">
                <SimulationIndicator showLabel />
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* System Status Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Activity className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              dashboardData?.systemStatus === 'healthy' ? 'text-green-600 dark:text-green-500' :
              dashboardData?.systemStatus === 'warning' ? 'text-amber-600 dark:text-amber-500' :
              'text-red-600 dark:text-red-500'
            }`}>
              {dashboardData?.systemStatus || 'Unknown'}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              All systems operational
            </p>
            {isDashboardSimulated && (
              <div className="mt-2">
                <SimulationIndicator showLabel />
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Model Status Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Model Status</CardTitle>
            <BarChart3 className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {modelData?.modelStatus || 'Unknown'}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {modelData?.availableModels?.length || 0} models available
            </p>
            {isModelSimulated && (
              <div className="mt-2">
                <SimulationIndicator showLabel />
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Voting Status Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Proposals</CardTitle>
            <Clock className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {votingData?.activeProposals?.length || 0}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {votingData?.votingStats?.participationRate 
                ? `${(votingData.votingStats.participationRate * 100).toFixed(1)}% participation`
                : 'No participation data'}
            </p>
            {isVotingSimulated && (
              <div className="mt-2">
                <SimulationIndicator showLabel />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Performance Metrics */}
      {dashboardData?.performanceMetrics && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-500">CPU Usage</span>
                <span className="text-2xl font-bold">{dashboardData.performanceMetrics.cpu}%</span>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${dashboardData.performanceMetrics.cpu}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-500">Memory Usage</span>
                <span className="text-2xl font-bold">{dashboardData.performanceMetrics.memory}%</span>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${dashboardData.performanceMetrics.memory}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-500">API Latency</span>
                <span className="text-2xl font-bold">{dashboardData.performanceMetrics.latency} ms</span>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${Math.min(100, dashboardData.performanceMetrics.latency / 5)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Voting Proposals */}
      {votingData?.activeProposals && votingData.activeProposals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Active Proposals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {votingData.activeProposals.map(proposal => (
                <div key={proposal.id} className="border-b border-slate-200 dark:border-slate-700 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-medium text-slate-900 dark:text-white">{proposal.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{proposal.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-green-600 dark:text-green-500">
                        For: {proposal.votes.for.toLocaleString()}
                      </span>
                      <span className="text-xs text-red-600 dark:text-red-500">
                        Against: {proposal.votes.against.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500">
                        Abstain: {proposal.votes.abstain.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Ends: {new Date(proposal.endTime).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-2">
                    <div 
                      className="bg-green-500 h-1.5 rounded-l-full" 
                      style={{ 
                        width: `${proposal.votes.for / (proposal.votes.for + proposal.votes.against + proposal.votes.abstain) * 100}%`,
                        float: 'left'
                      }}
                    ></div>
                    <div 
                      className="bg-red-500 h-1.5" 
                      style={{ 
                        width: `${proposal.votes.against / (proposal.votes.for + proposal.votes.against + proposal.votes.abstain) * 100}%`,
                        float: 'left'
                      }}
                    ></div>
                    <div 
                      className="bg-slate-400 h-1.5 rounded-r-full" 
                      style={{ 
                        width: `${proposal.votes.abstain / (proposal.votes.for + proposal.votes.against + proposal.votes.abstain) * 100}%`,
                        float: 'left'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}