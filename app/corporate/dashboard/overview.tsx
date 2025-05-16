"use client"

import { PerformanceMetrics } from "@/components/corporate/dashboard/performance-metrics"
import { ProposalsList } from "@/components/corporate/dashboard/proposals-list"
import { StatusCard } from "@/components/corporate/dashboard/status-card"
import { useDashboardData } from "@/lib/hooks/useDashboardData"
import { Activity, BarChart3, Clock, Users } from "lucide-react"
import styles from "./overview.module.css"
/**
 * Displays a corporate dashboard overview with real-time metrics, system status, model information, and active proposals.
 *
 * Renders status cards for active users, system health, model status, and voting activity, along with performance metrics and a list of active proposals when available.
 *
 * @remark
 * Uses simulated data indicators when real-time data is not available.
 */
export default function DashboardOverview() {
  const {
    dashboardData,
    modelData,
    votingData,
    performanceMetrics,
    isDashboardSimulated,
    isModelSimulated,
    isVotingSimulated
  } = useDashboardData();
  return (
    <div>
      <div className={styles.gridContainer}>
        {/* Active Users Card */}
        <StatusCard
          title="Active Users"
          value={dashboardData?.activeUsers || 0}
          description="Currently online"
          icon={Users}
          isSimulated={isDashboardSimulated}
        />
        {/* System Status Card */}
        <StatusCard
          title="System Status"
          value={dashboardData?.systemStatus || 'Unknown'}
          description="All systems operational"
          icon={Activity}
          isSimulated={isDashboardSimulated}
          statusColor={
            dashboardData?.systemStatus === 'healthy' ? 'healthy' :
            dashboardData?.systemStatus === 'warning' ? 'warning' : 'error'
          }
        />
        {/* Model Status Card */}
        <StatusCard
          title="Model Status"
          value={modelData?.modelStatus || 'Unknown'}
          description={`${modelData?.availableModels?.length || 0} models available`}
          icon={BarChart3}
          isSimulated={isModelSimulated}
        />
        {/* Voting Status Card */}
        <StatusCard
          title="Active Proposals"
          value={votingData?.activeProposals?.length || 0}
          description={
            votingData?.votingStats?.participationRate
              ? `${(votingData.votingStats.participationRate * 100).toFixed(1)}% participation`
              : 'No participation data'
          }
          icon={Clock}
          isSimulated={isVotingSimulated}
        />
      </div>
      {/* Performance Metrics */}
      {performanceMetrics.length > 0 && (
        <PerformanceMetrics metrics={performanceMetrics} />
      )}
      
      {/* Voting Proposals */}
      {votingData?.activeProposals && (
        <ProposalsList proposals={votingData.activeProposals} />
      )}
    </div>
  )
}