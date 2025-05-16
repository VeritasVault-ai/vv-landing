"use client"
import { useState, useEffect } from "react"
import { ArrowRight, BarChart3, LineChart, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import styles from "./insights-panel.module.css"

interface Insight {
  id: string
  title: string
  description: string
  category: "market" | "technical" | "fundamental" | "sentiment"
  severity: "high" | "medium" | "low"
  timestamp: string
  relatedAssets: string[]
}

export interface InsightsPanelProps {
  chain?: string
}

export const InsightsPanel = ({ chain = "all" }: InsightsPanelProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [insights, setInsights] = useState<Insight[]>([])

  useEffect(() => {
    // Simulate loading insights data
    const loadInsights = async () => {
      setIsLoading(true)
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Mock insights data
      const mockData: Insight[] = [
        {
          id: "i1",
          title: "Unusual volume spike detected",
          description:
            "ETH trading volume has increased by 45% in the last 24 hours, significantly above the 30-day average.",
          category: "market",
          severity: "high",
          timestamp: "2023-05-12T14:30:00Z",
          relatedAssets: ["ETH"],
        },
        {
          id: "i2",
          title: "Bullish divergence forming",
          description:
            "BTC price is showing a bullish divergence on the 4-hour chart, with RSI forming higher lows while price forms lower lows.",
          category: "technical",
          severity: "medium",
          timestamp: "2023-05-12T12:15:00Z",
          relatedAssets: ["BTC"],
        },
        {
          id: "i3",
          title: "Increased social sentiment",
          description:
            "Social media sentiment for SOL has turned positive with a 32% increase in bullish mentions over the last 48 hours.",
          category: "sentiment",
          severity: "medium",
          timestamp: "2023-05-12T10:45:00Z",
          relatedAssets: ["SOL"],
        },
        {
          id: "i4",
          title: "Major protocol upgrade approaching",
          description:
            "Ethereum's next major upgrade is scheduled for next week, which could impact price and network activity.",
          category: "fundamental",
          severity: "high",
          timestamp: "2023-05-12T09:20:00Z",
          relatedAssets: ["ETH"],
        },
        {
          id: "i5",
          title: "Whale accumulation detected",
          description:
            "Large wallets have accumulated over $25M worth of LINK in the past 72 hours, indicating potential institutional interest.",
          category: "market",
          severity: "medium",
          timestamp: "2023-05-12T08:10:00Z",
          relatedAssets: ["LINK"],
        },
      ]
      
      setInsights(mockData)
      setIsLoading(false)
    }
    
    loadInsights()
  }, [chain])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "market":
        return <BarChart3 className={styles.categoryIcon} />
      case "technical":
        return <LineChart className={styles.categoryIcon} />
      case "fundamental":
        return <TrendingUp className={styles.categoryIcon} />
      case "sentiment":
        return <TrendingUp className={styles.categoryIcon} />
      default:
        return <TrendingUp className={styles.categoryIcon} />
    }
  }

  const getCategoryClass = (category: string) => {
    switch (category) {
      case "market":
        return styles.market
      case "technical":
        return styles.technical
      case "fundamental":
        return styles.fundamental
      case "sentiment":
        return styles.sentiment
      default:
        return ""
    }
  }

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case "high":
        return styles.high
      case "medium":
        return styles.medium
      case "low":
        return styles.low
      default:
        return ""
    }
  }

  return (
    <Card className={styles.insightsCard}>
      <CardHeader className={styles.cardHeader}>
        <div>
          <CardTitle>Market Insights</CardTitle>
          <CardDescription>AI-powered market analysis and insights</CardDescription>
        </div>
        <Button variant="outline" size="sm" className={styles.viewAllButton}>
          View All
          <ArrowRight className={styles.buttonIcon} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className={styles.insightsList}>
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className={styles.insightItemSkeleton}>
                  <div className={styles.insightHeaderSkeleton}>
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-3/4 mt-1" />
                  <div className={styles.insightFooterSkeleton}>
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))
            : insights.map((insight) => (
                <div key={insight.id} className={styles.insightItem}>
                  <div className={styles.insightHeader}>
                    <div className={styles.insightTitle}>
                      {getCategoryIcon(insight.category)}
                      <span>{insight.title}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${styles.severityBadge} ${getSeverityClass(insight.severity)}`}
                    >
                      {insight.severity}
                    </Badge>
                  </div>
                  <p className={styles.insightDescription}>{insight.description}</p>
                  <div className={styles.insightFooter}>
                    <Badge
                      variant="secondary"
                      className={`${styles.categoryBadge} ${getCategoryClass(insight.category)}`}
                    >
                      {insight.category}
                    </Badge>
                    <div className={styles.insightMeta}>
                      <div className={styles.relatedAssets}>
                        {insight.relatedAssets.map((asset) => (
                          <Badge key={asset} variant="outline" className={styles.assetBadge}>
                            {asset}
                          </Badge>
                        ))}
                      </div>
                      <div className={styles.insightTime}>{formatDate(insight.timestamp)}</div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </CardContent>
    </Card>
  )
}