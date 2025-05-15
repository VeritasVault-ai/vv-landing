"use client"
import { useState } from "react"
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency, formatPercentage } from "@/src/lib/formatters"
import { PortfolioChart } from "./portfolio-chart"
import styles from "./portfolio-summary.module.css"

interface PortfolioSummaryProps {
  isLoading: boolean
  totalValue: number
  change24h: number
  changePercentage24h: number
  historyData: {
    date: string
    value: number
  }[]
  onTimeframeChange: (timeframe: string) => void
  currentTimeframe: string
}

export const PortfolioSummary = ({
  isLoading,
  totalValue,
  change24h,
  changePercentage24h,
  historyData,
  onTimeframeChange,
  currentTimeframe
}: PortfolioSummaryProps) => {
  return (
    <div className={styles.summaryContent}>
      <div className={styles.totalValue}>
        {isLoading ? (
          <Skeleton className="h-10 w-40" />
        ) : (
          <>
            <DollarSign className={styles.currencyIcon} />
            <span>{formatCurrency(totalValue)}</span>
          </>
        )}
      </div>
      
      {isLoading ? (
        <Skeleton className="h-6 w-24" />
      ) : (
        <div
          className={`${styles.change} ${change24h >= 0 ? styles.positive : styles.negative}`}
        >
          {change24h >= 0 ? (
            <ArrowUp className={styles.changeIcon} />
          ) : (
            <ArrowDown className={styles.changeIcon} />
          )}
          <span>{formatCurrency(Math.abs(change24h))}</span>
          <span className={styles.changePercent}>
            ({formatPercentage(Math.abs(changePercentage24h))})
          </span>
          <span className={styles.changePeriod}>24h</span>
        </div>
      )}
      
      <div className={styles.timeframeButtons}>
        <Button
          variant={currentTimeframe === "1d" ? "default" : "outline"}
          size="sm"
          onClick={() => onTimeframeChange("1d")}
          className={styles.timeframeButton}
        >
          1D
        </Button>
        <Button
          variant={currentTimeframe === "1w" ? "default" : "outline"}
          size="sm"
          onClick={() => onTimeframeChange("1w")}
          className={styles.timeframeButton}
        >
          1W
        </Button>
        <Button
          variant={currentTimeframe === "1m" ? "default" : "outline"}
          size="sm"
          onClick={() => onTimeframeChange("1m")}
          className={styles.timeframeButton}
        >
          1M
        </Button>
        <Button
          variant={currentTimeframe === "3m" ? "default" : "outline"}
          size="sm"
          onClick={() => onTimeframeChange("3m")}
          className={styles.timeframeButton}
        >
          3M
        </Button>
        <Button
          variant={currentTimeframe === "1y" ? "default" : "outline"}
          size="sm"
          onClick={() => onTimeframeChange("1y")}
          className={styles.timeframeButton}
        >
          1Y
        </Button>
      </div>
      
      <div className={styles.chartContainer}>
        {isLoading ? (
          <Skeleton className="h-[200px] w-full" />
        ) : (
          <PortfolioChart data={historyData} />
        )}
      </div>
    </div>
  )
}