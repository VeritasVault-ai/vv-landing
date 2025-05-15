"use client"
import { useAnalyticsData } from "@/src/hooks/use-analytics-data"
import {
  AssetData,
  DateRange
} from "@/src/types/analytics"
import { useState } from "react"
import styles from "./analytics-dashboard.module.css"
import { ChainComparisonChart } from "./chain-comparison-chart"
import { DateRangePicker } from "./date-range-picker"
import { KpiCards } from "./kpi-cards"
import { ReportGenerator } from "./report-generator"
import { TopAssetsTable } from "./top-assets-table"
import { TransactionVolumeChart } from "./transaction-volume-chart"
import { UserActivityChart } from "./user-activity-chart"
import { UserDemographics } from "./user-demographics"

// Define the interface expected by the UserDemographics component
interface DemographicData {
  name: string;
  value: number;
}

interface UserDemographicsData {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  ageGroups: DemographicData[];
  regions: DemographicData[];
  platforms: DemographicData[];
}

export function AnalyticsDashboard() {
  // Default date range: last 30 days
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date(),
  })
  
  const { data, isLoading, error, formatKpiValue } = useAnalyticsData(dateRange)
  
  const handleDateRangeChange = (newRange: DateRange) => {
    setDateRange(newRange)
  }
  
  const handleRetry = () => {
    // Trigger a refetch by updating the state
    setDateRange({...dateRange})
  }
  
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h3 className={styles.errorTitle}>Error Loading Analytics</h3>
        <p className={styles.errorMessage}>{error.message}</p>
        <button className={styles.retryButton} onClick={handleRetry}>Retry</button>
      </div>
    )
  }
  
  // Transform asset performance data to match the expected AssetData type
  const transformedAssetData = data?.topAssets?.map(asset => ({
    id: asset.symbol?.toLowerCase() || `asset-${asset.rank || Math.random().toString(36).substring(7)}`,
    name: asset.name || 'Unknown Asset',
    symbol: asset.symbol || 'N/A',
    price: asset.price || 0,
    marketCap: asset.marketCap || 0,
    change: asset.change || 0,
    volume: asset.volume || 0,
    rank: asset.rank || 0,
    chain: asset.chain || 'Unknown',
    priceChange24h: asset.change || 0,
    volumeChange24h: asset.volumeChange || 0
  })) as AssetData[] | undefined;
  
  // Transform user demographics data to match the expected UserDemographicsData type for the component
  const transformedDemographicsData = data?.userDemographics ? {
    totalUsers: data.userDemographics.totalUsers || 0,
    activeUsers: data.userDemographics.activeUsers || 0,
    newUsers: data.userDemographics.newUsers || 0,
    ageGroups: (data.userDemographics.ageGroups || []).map(item => ({
      name: item.group,
      value: item.value
    })),
    regions: (data.userDemographics.regions || []).map(item => ({
      name: item.region,
      value: item.value
    })),
    platforms: (data.userDemographics.platforms || []).map(item => ({
      name: item.platform,
      value: item.value
    }))
  } as UserDemographicsData : undefined;
  
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
          <TopAssetsTable data={transformedAssetData} isLoading={isLoading} />
        </div>
        <div className={styles.gridItem}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>User Demographics</h3>
          </div>
          <UserDemographics data={transformedDemographicsData} isLoading={isLoading} />
        </div>
      </div>
      
      <div className={styles.reportSection}>
        <ReportGenerator dateRange={dateRange} />
      </div>
    </div>
  )
}