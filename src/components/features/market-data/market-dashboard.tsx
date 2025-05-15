"use client"
import { useEffect } from "react"
import { AlertCircle, ArrowUpDown, Layers, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useCoinGeckoData } from "@/hooks/use-coingecko-data"
import { useDefiLlamaData } from "@/hooks/use-defillama-data"
import { ChainSelector } from "@/components/features/market-data/chain-selector"
import { TokenTable } from "@/components/features/market-data/token-table"
import { ProtocolTable } from "@/components/features/market-data/protocol-table"
import { MarketMetricsGrid } from "@/components/features/market-data/market-metrics-grid"
import { TvlChart } from "@/components/features/market-data/tvl-chart"
import styles from "./market-dashboard.module.css"

export interface MarketDashboardProps {
  defaultChain?: string
}

export const MarketDashboard = ({ defaultChain = "ethereum" }: MarketDashboardProps) => {
  const {
    data: geckoData,
    isLoading: isGeckoLoading,
    error: geckoError,
    refetch: refetchGecko,
  } = useCoinGeckoData(defaultChain)
  
  const {
    data: llamaData,
    isLoading: isLlamaLoading,
    error: llamaError,
    refetch: refetchLlama,
  } = useDefiLlamaData(defaultChain)
  
  const isLoading = isGeckoLoading || isLlamaLoading
  const hasError = geckoError || llamaError
  
  useEffect(() => {
    // Refresh data every 5 minutes
    const interval = setInterval(
      () => {
        refetchGecko()
        refetchLlama()
      },
      5 * 60 * 1000,
    )
    
    return () => clearInterval(interval)
  }, [refetchGecko, refetchLlama])
  
  if (hasError) {
    return (
      <Alert variant="destructive" className={styles.errorAlert}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load market data. Please try again later.</AlertDescription>
      </Alert>
    )
  }
  
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Market Dashboard</h1>
        <ChainSelector defaultChain={defaultChain} />
      </div>
      
      <div className={styles.metricsContainer}>
        {isLoading ? (
          <MarketMetricsSkeleton />
        ) : (
          <MarketMetricsGrid
            marketCap={geckoData?.totalMarketCap}
            volume24h={geckoData?.total24hVolume}
            dominanceData={geckoData?.marketDominance}
            tvlData={llamaData?.totalTvl}
            tvlChange={llamaData?.tvlChange24h}
          />
        )}
      </div>
      
      <Tabs defaultValue="tokens" className={styles.dataTabs}>
        <TabsList>
          <TabsTrigger value="tokens">
            <TrendingUp className="mr-2 h-4 w-4" />
            Tokens
          </TabsTrigger>
          <TabsTrigger value="protocols">
            <Layers className="mr-2 h-4 w-4" />
            Protocols
          </TabsTrigger>
          <TabsTrigger value="tvl">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            TVL Trends
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tokens" className={styles.tabContent}>
          <Card>
            <CardHeader>
              <CardTitle>Top Tokens by Market Cap</CardTitle>
              <CardDescription>Real-time token data from CoinGecko</CardDescription>
            </CardHeader>
            <CardContent>
              {isGeckoLoading ? <TableSkeleton rows={10} /> : <TokenTable tokens={geckoData?.tokens || []} />}
            </CardContent>
            <CardFooter className={styles.cardFooter}>Data refreshes automatically every 5 minutes</CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="protocols" className={styles.tabContent}>
          <Card>
            <CardHeader>
              <CardTitle>Top DeFi Protocols by TVL</CardTitle>
              <CardDescription>Protocol data from DeFiLlama</CardDescription>
            </CardHeader>
            <CardContent>
              {isLlamaLoading ? <TableSkeleton rows={10} /> : <ProtocolTable protocols={llamaData?.protocols || []} />}
            </CardContent>
            <CardFooter className={styles.cardFooter}>Data refreshes automatically every 5 minutes</CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="tvl" className={styles.tabContent}>
          <Card>
            <CardHeader>
              <CardTitle>TVL Trends</CardTitle>
              <CardDescription>Historical TVL data across chains</CardDescription>
            </CardHeader>
            <CardContent className={styles.chartContainer}>
              {isLlamaLoading ? (
                <div className={styles.chartSkeleton}>
                  <Skeleton className="h-[300px] w-full" />
                </div>
              ) : (
                <TvlChart historicalData={llamaData?.historicalTvl || []} chainName={defaultChain} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const MarketMetricsSkeleton = () => (
  <div className={styles.metricsGrid}>
    {[1, 2, 3, 4].map((i) => (
      <Card key={i}>
        <CardHeader className="pb-2">
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/4" />
        </CardContent>
      </Card>
    ))}
  </div>
)

const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className={styles.tableSkeleton}>
    <div className={styles.tableHeader}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className={styles.tableRow}>
        {[1, 2, 3, 4, 5].map((j) => (
          <Skeleton key={j} className="h-4 w-full" />
        ))}
      </div>
    ))}
  </div>
)