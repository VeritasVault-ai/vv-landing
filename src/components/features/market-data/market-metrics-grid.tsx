import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency, formatPercentage } from "@/src/lib/formatters"
import { TrendingDown, TrendingUp } from "lucide-react"
import styles from "./market-metrics-grid.module.css"

export interface MarketMetricsGridProps {
  marketCap?: number
  volume24h?: number
  dominanceData?: {
    symbol: string
    percentage: number
  }[]
  tvlData?: number
  tvlChange?: number
}

export const MarketMetricsGrid = ({
  marketCap,
  volume24h,
  dominanceData = [],
  tvlData,
  tvlChange,
}: MarketMetricsGridProps) => {
  const topDominance = dominanceData[0] || { symbol: "BTC", percentage: 0 }
  
  return (
    <div className={styles.metricsGrid}>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className={styles.metricTitle}>Total Market Cap</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={styles.metricValue}>{formatCurrency(marketCap || 0)}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className={styles.metricTitle}>24h Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={styles.metricValue}>{formatCurrency(volume24h || 0)}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className={styles.metricTitle}>Market Dominance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={styles.metricValue}>
            {topDominance.symbol}: {formatPercentage(topDominance.percentage)}
          </p>
          <div className={styles.dominanceBar}>
            {dominanceData.slice(0, 5).map((item) => (
              <div
                key={item.symbol}
                className={styles.dominanceSegment}
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: getColorForSymbol(item.symbol),
                }}
                title={`${item.symbol}: ${formatPercentage(item.percentage)}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className={styles.metricTitle}>Total TVL</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={styles.metricValue}>{formatCurrency(tvlData || 0)}</p>
          <div className={styles.changeIndicator}>
            {tvlChange && tvlChange > 0 ? (
              <span className={styles.positive}>
                <TrendingUp className={styles.trendIcon} />
                {formatPercentage(tvlChange)}
              </span>
            ) : (
              <span className={styles.negative}>
                <TrendingDown className={styles.trendIcon} />
                {formatPercentage(Math.abs(tvlChange || 0))}
              </span>
            )}
            <span className={styles.periodLabel}>24h</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper function to get a consistent color for a token symbol
function getColorForSymbol(symbol: string): string {
  const colors = [
    "var(--color-primary)",
    "var(--color-secondary)",
    "var(--color-accent)",
    "var(--color-muted)",
    "var(--color-info)",
  ]
  
  // Simple hash function to get a consistent index
  const index = symbol.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
  return colors[index]
}