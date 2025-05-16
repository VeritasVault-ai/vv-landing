"use client"

import { useMemo } from "react"
import { Activity, ArrowUpRight, Cpu, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useChainActivity } from "@/hooks/use-subgraph-data"
import { formatNumber, formatCurrency } from "@/lib/formatters"
import { ChainActivityChart } from "./chain-activity-chart"
import styles from "./chain-activity-card.module.css"

export interface ChainActivityCardProps {
  chain: string
  days?: number
}

export const ChainActivityCard = ({ chain, days = 7 }: ChainActivityCardProps) => {
  const { data, isLoading, error } = useChainActivity(chain, days)
  
  const latestMetrics = useMemo(() => {
    if (!data || !data.dailyMetrics.length) return null
    return data.dailyMetrics[0]
  }, [data])
  
  const chainName = chain.charAt(0).toUpperCase() + chain.slice(1)
  
  if (error) {
    return (
      <Card className={styles.errorCard}>
        <CardHeader>
          <CardTitle>Chain Activity</CardTitle>
          <CardDescription>Error loading data for {chainName}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className={styles.errorMessage}>{error.message}</p>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className={styles.cardTitle}>
          <Activity className={styles.titleIcon} />
          {chainName} Network Activity
        </CardTitle>
        <CardDescription>On-chain metrics for the last {days} days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={styles.metricsGrid}>
          <div className={styles.metricItem}>
            <div className={styles.metricLabel}>
              <Activity className={styles.metricIcon} />
              Transactions (24h)
            </div>
            <div className={styles.metricValue}>
              {isLoading ? <Skeleton className="h-7 w-24" /> : formatNumber(latestMetrics?.transactions || 0)}
            </div>
          </div>
          <div className={styles.metricItem}>
            <div className={styles.metricLabel}>
              <Cpu className={styles.metricIcon} />
              Blocks (24h)
            </div>
            <div className={styles.metricValue}>
              {isLoading ? <Skeleton className="h-7 w-24" /> : formatNumber(latestMetrics?.blocks || 0)}
            </div>
          </div>
          <div className={styles.metricItem}>
            <div className={styles.metricLabel}>
              <Users className={styles.metricIcon} />
              Active Addresses
            </div>
            <div className={styles.metricValue}>
              {isLoading ? <Skeleton className="h-7 w-24" /> : formatNumber(latestMetrics?.activeAddresses || 0)}
            </div>
          </div>
          <div className={styles.metricItem}>
            <div className={styles.metricLabel}>Value Transferred</div>
            <div className={styles.metricValue}>
              {isLoading ? <Skeleton className="h-7 w-24" /> : formatCurrency(latestMetrics?.valueTransferred || 0)}
            </div>
          </div>
        </div>
        <div className={styles.chartContainer}>
          {isLoading ? (
            <Skeleton className="h-[200px] w-full" />
          ) : (
            <ChainActivityChart metrics={data?.dailyMetrics || []} />
          )}
        </div>
      </CardContent>
      <CardFooter className={styles.cardFooter}>
        <Button variant="ghost" size="sm" className={styles.viewMoreButton} asChild>
          <a href={`/chain/${chain}/activity`} target="_blank" rel="noopener noreferrer">
            View Details
            <ArrowUpRight className={styles.linkIcon} />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}