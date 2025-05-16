"use client"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AssetsList } from "./assets-list"
import styles from "./portfolio-assets.module.css"

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

interface PortfolioAssetsProps {
  isLoading: boolean
  assets: Asset[]
}

export const PortfolioAssets = ({ isLoading, assets }: PortfolioAssetsProps) => {
  return (
    <Tabs defaultValue="all" className={styles.assetsTabs}>
      <TabsList>
        <TabsTrigger value="all">All Assets</TabsTrigger>
        <TabsTrigger value="tokens">Tokens</TabsTrigger>
        <TabsTrigger value="nfts">NFTs</TabsTrigger>
        <TabsTrigger value="defi">DeFi Positions</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        {isLoading ? <AssetsSkeleton /> : <AssetsList assets={assets} />}
      </TabsContent>
      
      <TabsContent value="tokens">
        {isLoading ? <AssetsSkeleton /> : <AssetsList assets={assets} />}
      </TabsContent>
      
      <TabsContent value="nfts">
        <div className={styles.emptyState}>
          <p>No NFTs in your portfolio</p>
          <Button variant="outline" size="sm">
            Add NFTs
          </Button>
        </div>
      </TabsContent>
      
      <TabsContent value="defi">
        <div className={styles.emptyState}>
          <p>No DeFi positions found</p>
          <Button variant="outline" size="sm">
            Add Position
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  )
}

// Skeleton component for assets list
const AssetsSkeleton = () => (
  <div className={styles.assetsSkeleton}>
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={`asset-skeleton-${index}`} className={styles.assetRowSkeleton}>
        <div className={styles.assetInfoSkeleton}>
          <Skeleton className="h-8 w-8 rounded-full" />
          <div>
            <Skeleton className="h-5 w-24 mb-1" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <div className={styles.assetValuesSkeleton}>
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    ))}
  </div>
)