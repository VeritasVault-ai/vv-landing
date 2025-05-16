"use client"

import { useProtocolMetrics } from "@/src//hooks/use-subgraph-data"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Skeleton } from "@/src/components/ui/skeleton"
import { formatCurrency, formatNumber } from "@/src/lib/formatters"
import { ArrowUpRight, TrendingDown, TrendingUp, Users } from "lucide-react"
import { useMemo } from "react"
import { ProtocolActivityChart } from "./protocol-activity-chart"
import styles from "./protocol-metrics-card.module.css"

export interface ProtocolMetricsCardProps {
  chain: string
  protocolName: string
  days?: number
}

export const ProtocolMetricsCard = ({ chain, protocolName, days = 7 }: ProtocolMetricsCardProps) => {
  const { data, isLoading, error, refetch } = useProtocolMetrics(chain, protocolName, days)

  const volumeChange = useMemo(() => {
    if (!data || data.dailyMetrics.length < 2) return 0
    const today = data.dailyMetrics[0].volume
    const yesterday = data.dailyMetrics[1].volume
    if (yesterday === 0) return 0
    return ((today - yesterday) / yesterday) * 100
  }, [data])

  if (error) {
    return (
      <Card className={styles.errorCard}>
        <CardHeader>
          <CardTitle>Protocol Metrics</CardTitle>
          <CardDescription>Error loading data for {protocolName}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className={styles.errorMessage}>{error.message}</p>
          <Button onClick={() => refetch()} variant="outline" size="small" className={styles.retryButton}>
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className={styles.cardTitle}>
          {isLoading ? <Skeleton className="h-6 w-32" /> : protocolName}
        </CardTitle>
        <CardDescription>
          {isLoading ? <Skeleton className="h-4 w-24" /> : `On-chain metrics from ${chain}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={styles.metricsGrid}>
          <div className={styles.metricItem}>
            <div className={styles.metricLabel}>TVL</div>
            <div className={styles.metricValue}>
              {isLoading ? <Skeleton className="h-7 w-24" /> : formatCurrency(data?.tvl || 0)}
            </div>
          </div>
          <div className={styles.metricItem}>
            <div className={styles.metricLabel}>24h Volume</div>
            <div className={styles.metricValue}>
              {isLoading ? (
                <Skeleton className="h-7 w-24" />
              ) : (
                <div className={styles.volumeWrapper}>
                  {formatCurrency(data?.volume24h || 0)}
                  {volumeChange !== 0 && (
                    <span className={volumeChange > 0 ? styles.positive : styles.negative}>
                      {volumeChange > 0 ? (
                        <TrendingUp className={styles.trendIcon} />
                      ) : (
                        <TrendingDown className={styles.trendIcon} />
                      )}
                      {Math.abs(volumeChange).toFixed(2)}%
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className={styles.metricItem}>
            <div className={styles.metricLabel}>Users</div>
            <div className={styles.metricValue}>
              {isLoading ? (
                <Skeleton className="h-7 w-16" />
              ) : (
                <div className={styles.usersWrapper}>
                  <Users className={styles.usersIcon} />
                  {formatNumber(data?.users || 0)}
                </div>
              )}
            </div>
          </div>
          <div className={styles.metricItem}>
            <div className={styles.metricLabel}>Transactions</div>
            <div className={styles.metricValue}>
              {isLoading ? <Skeleton className="h-7 w-20" /> : formatNumber(data?.transactions || 0)}
            </div>
          </div>
        </div>
        <div className={styles.chartContainer}>
          {isLoading ? (
            <Skeleton className="h-[200px] w-full" />
          ) : (
            <ProtocolActivityChart metrics={data?.dailyMetrics || []} />
          )}
        </div>
      </CardContent>
      <CardFooter className={styles.cardFooter}>
        <a 
          href={`/protocol/${chain}/${protocolName}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.viewMoreLink}
        >
          <Button variant="ghost" size="small" className={styles.viewMoreButton}>
            View Details
            <ArrowUpRight className={styles.linkIcon} />
          </Button>
        </a>
      </CardFooter>
    </Card>
  )
}