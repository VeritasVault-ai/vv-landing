"use client"
import { useState } from "react"
import type { DateRange } from "@/types/analytics"
import { useAnalyticsData } from "@/hooks/use-analytics-data"
import { KpiCards } from "./kpi-cards"
import { DateRangePicker } from "./date-range-picker"
import { UserActivityChart } from "./user-activity-chart"
import { TransactionVolumeChart } from "./transaction-volume-chart"
import { ChainComparisonChart } from "./chain-comparison-chart"
import { TopAssetsTable } from "./top-assets-table"
import { UserDemographics } from "./user-demographics"
import { ReportGenerator } from "./report-generator"
import styles from "./analytics-dashboard.module.css"

export function AnalyticsDashboard() {
  // Default date range: last 30 days
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date(),
  })
  
  const { data, isLoading, error } = useAnalyticsData(dateRange)
  
  const handleDateRangeChange = (newRange: DateRange) => {
    setDateRange(newRange)
  }
  
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h3 className={styles.errorTitle}>Error Loading Analytics</h3>
        <p className={styles.errorMessage}>{error.message}</p>
        <button className={styles.retryButton}>Retry</button>
      </div>
    )
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Platform Analytics</h2>
        <DateRangePicker dateRange={dateRange} onChange={handleDateRangeChange} />
      </div>
      
      <KpiCards data={data?.kpis} isLoading={isLoading} />
      
      <div className={styles.chartsContainer}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>User Activity</h3>
          <UserActivityChart data={data?.userActivity} isLoading={isLoading} />
        </div>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Transaction Volume</h3>
          <TransactionVolumeChart data={data?.transactionMetrics} isLoading={isLoading} />
        </div>
      </div>
      
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Chain Comparison</h3>
          <div className={styles.sectionActions}>
            <button className={styles.actionButton}>Export</button>
          </div>
        </div>
        <ChainComparisonChart data={data?.chainComparison} isLoading={isLoading} />
      </div>
      
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Top Assets</h3>
          </div>
          <TopAssetsTable data={data?.topAssets} isLoading={isLoading} />
        </div>
        <div className={styles.gridItem}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>User Demographics</h3>
          </div>
          <UserDemographics data={data?.userDemographics} isLoading={isLoading} />
        </div>
      </div>
      
      <div className={styles.reportSection}>
        <ReportGenerator dateRange={dateRange} />
      </div>
    </div>
  )
}