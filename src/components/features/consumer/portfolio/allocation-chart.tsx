"use client"
import { Coins, Percent } from "lucide-react"
import { formatPercentage } from "@/src/lib/formatters"
import styles from "./allocation-chart.module.css"

interface Asset {
  name: string
  symbol: string
  allocation: number
}

interface AllocationChartProps {
  assets: Asset[]
}

export const AllocationChart = ({ assets }: AllocationChartProps) => {
  // Helper function to get a color for an asset
  const getAssetColor = (symbol: string): string => {
    const colorMap: Record<string, string> = {
      BTC: "var(--color-orange)",
      ETH: "var(--color-purple)",
      SOL: "var(--color-green)",
      LINK: "var(--color-blue)",
      UNI: "var(--color-pink)",
    }
    return colorMap[symbol] || "var(--muted-foreground)"
  }

  return (
    <div className={styles.allocationContent}>
      <div className={styles.allocationChart}>
        {/* In a real app, this would be a proper pie chart component */}
        <div className={styles.pieChartPlaceholder}>
          <div className={styles.pieChartInner}>
            <Coins className={styles.pieChartIcon} />
          </div>
        </div>
      </div>
      <div className={styles.allocationLegend}>
        {assets.map((asset) => (
          <div key={asset.symbol} className={styles.legendItem}>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: getAssetColor(asset.symbol) }}
            />
            <div className={styles.legendName}>{asset.name}</div>
            <div className={styles.legendValue}>
              <span>{formatPercentage(asset.allocation)}</span>
              <Percent className={styles.percentIcon} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}