"use client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChainSelector } from "@/src/components/features/market-data/chain-selector"
import { MarketMetricsGrid } from "@/src/components/features/market-data/market-metrics-grid"
import { ProtocolTable } from "@/src/components/features/market-data/protocol-table"
import { TokenTable } from "@/src/components/features/market-data/token-table"
import { TvlChart } from "@/src/components/features/market-data/tvl-chart"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { useCoinGeckoData } from "@/src/hooks/use-coingecko-data"
import { useDefiLlamaData } from "@/src/hooks/use-defillama-data"
import { AlertCircle, ArrowUpDown, Layers, TrendingUp } from "lucide-react"
import { useEffect } from "react"
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

const MarketMetricsSkeleton = () => {
  // Define metrics with unique identifiers
  const metrics = [
    { id: "market-cap-skeleton", label: "Market Cap" },
    { id: "volume-skeleton", label: "24h Volume" },
    { id: "dominance-skeleton", label: "BTC Dominance" },
    { id: "tvl-skeleton", label: "Total TVL" },
  ];

  return (
    <div className={styles.metricsGrid}>
      {metrics.map((metric) => (
        <Card key={metric.id}>
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
  );
};

const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  // Define columns with unique identifiers
  const columns = [
    { id: "rank-col", label: "Rank" },
    { id: "name-col", label: "Name" },
    { id: "price-col", label: "Price" },
    { id: "change-col", label: "Change" },
    { id: "market-cap-col", label: "Market Cap" },
  ];

  // Generate unique row identifiers
  const rowData = Array.from({ length: rows }).map((_, index) => ({
    id: `table-row-${index}`,
  }));

  return (
    <div className={styles.tableSkeleton}>
      <div className={styles.tableHeader}>
        {columns.map((column) => (
          <Skeleton key={column.id} className="h-4 w-full" />
        ))}
      </div>
      {rowData.map((row) => (
        <div key={row.id} className={styles.tableRow}>
          {columns.map((column) => (
            <Skeleton key={`${row.id}-${column.id}`} className="h-4 w-full" />
          ))}
        </div>
      ))}
    </div>
  );
};