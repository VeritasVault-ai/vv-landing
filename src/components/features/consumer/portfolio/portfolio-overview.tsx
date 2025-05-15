"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart } from "lucide-react"
import { useEffect, useState } from "react"
import { AllocationChart } from "./allocation-chart"
import { PortfolioAssets } from "./portfolio-assets"
import styles from "./portfolio-overview.module.css"
import { PortfolioSummary } from "./portfolio-summary"

interface Asset {
  name: string
  symbol: string
  amount: number
  value: number
  price: number
  priceChange24h: number
  allocation: number
  logo?: string
}

interface PortfolioData {
  totalValue: number
  change24h: number
  changePercentage24h: number
  assets: Asset[]
  history: {
    date: string
    value: number
  }[]
}

export interface PortfolioOverviewProps {
  selectedChain?: string
}

export const PortfolioOverview = ({ selectedChain = "all" }: PortfolioOverviewProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [timeframe, setTimeframe] = useState("1w")

  useEffect(() => {
    // Simulate loading portfolio data
    const loadPortfolioData = async () => {
      setIsLoading(true)
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Mock portfolio data
      const mockData: PortfolioData = {
        totalValue: 15782.43,
        change24h: 423.18,
        changePercentage24h: 2.76,
        assets: [
          {
            name: "Ethereum",
            symbol: "ETH",
            amount: 2.45,
            value: 7350.0,
            price: 3000.0,
            priceChange24h: 2.5,
            allocation: 46.57,
            logo: "/placeholder.svg?key=o4wht",
          },
          {
            name: "Bitcoin",
            symbol: "BTC",
            amount: 0.12,
            value: 4800.0,
            price: 40000.0,
            priceChange24h: 1.8,
            allocation: 30.41,
            logo: "/placeholder.svg?key=s2bn8",
          },
          {
            name: "Solana",
            symbol: "SOL",
            amount: 45.5,
            value: 2275.0,
            price: 50.0,
            priceChange24h: 5.2,
            allocation: 14.42,
            logo: "/placeholder.svg?key=e3mh7",
          },
          {
            name: "Chainlink",
            symbol: "LINK",
            amount: 120.0,
            value: 960.0,
            price: 8.0,
            priceChange24h: -1.3,
            allocation: 6.08,
            logo: "/placeholder.svg?key=hza00",
          },
          {
            name: "Uniswap",
            symbol: "UNI",
            amount: 65.0,
            value: 397.43,
            price: 6.11,
            priceChange24h: 3.7,
            allocation: 2.52,
            logo: "/placeholder.svg?key=y3gy8",
          },
        ],
        history: generateMockHistoryData(timeframe),
      }
      
      setPortfolioData(mockData)
      setIsLoading(false)
    }
    
    loadPortfolioData()
  }, [selectedChain, timeframe])

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe)
    // In a real app, this would trigger a new API call
    // For the demo, we'll just update the history data
    if (portfolioData) {
      setPortfolioData({
        ...portfolioData,
        history: generateMockHistoryData(newTimeframe),
      })
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.overviewGrid}>
        <Card className={styles.summaryCard}>
          <CardHeader className={styles.cardHeader}>
            <CardTitle>Portfolio Summary</CardTitle>
            <CardDescription>Your assets across all chains</CardDescription>
          </CardHeader>
          <CardContent>
            <PortfolioSummary
              isLoading={isLoading}
              totalValue={portfolioData?.totalValue || 0}
              change24h={portfolioData?.change24h || 0}
              changePercentage24h={portfolioData?.changePercentage24h || 0}
              historyData={portfolioData?.history || []}
              onTimeframeChange={handleTimeframeChange}
              currentTimeframe={timeframe}
            />
          </CardContent>
        </Card>
        
        <Card className={styles.allocationCard}>
          <CardHeader className={styles.cardHeader}>
            <CardTitle>
              <PieChart className={styles.titleIcon} />
              Asset Allocation
            </CardTitle>
            <CardDescription>Distribution of your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <AllocationSkeleton />
            ) : (
              <AllocationChart assets={portfolioData?.assets || []} />
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card className={styles.assetsCard}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle>Your Assets</CardTitle>
          <CardDescription>All assets in your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <PortfolioAssets 
            isLoading={isLoading} 
            assets={portfolioData?.assets || []} 
          />
        </CardContent>
      </Card>
    </div>
  )
}

// Helper function to generate mock history data
function generateMockHistoryData(timeframe: string): { date: string; value: number }[] {
  const now = new Date()
  const data: { date: string; value: number }[] = []
  let days = 7
  
  switch (timeframe) {
    case "1d":
      days = 1
      break
    case "1w":
      days = 7
      break
    case "1m":
      days = 30
      break
    case "3m":
      days = 90
      break
    case "1y":
      days = 365
      break
  }
  
  const baseValue = 15000
  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    // Generate a random value with a slight upward trend
    const randomFactor = 0.05 // 5% random variation
    const trendFactor = 0.001 // 0.1% daily upward trend
    const dayValue = baseValue * (1 + (Math.random() * 2 - 1) * randomFactor + i * trendFactor)
    
    data.push({
      date: date.toISOString(),
      value: dayValue,
    })
  }
  
  return data
}

// Skeleton component for allocation chart
const AllocationSkeleton = () => {
  // Generate stable IDs for skeleton items
  const skeletonItems = Array.from({ length: 5 }).map((_, i) => ({
    id: `allocation-skeleton-item-${i}`,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center">
        <div className="h-[200px] w-[200px] rounded-full bg-muted animate-pulse" />
      </div>
      <div className="w-full space-y-2">
        {skeletonItems.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-muted animate-pulse" />
            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
            <div className="ml-auto h-4 w-16 bg-muted animate-pulse rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};