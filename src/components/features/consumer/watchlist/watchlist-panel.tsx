"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency, formatPercentage } from "@/src/lib/formatters"
import { ArrowDown, ArrowUp, Plus, Search, Star, StarOff, Trash } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import styles from "./watchlist-panel.module.css"

interface WatchlistItem {
  id: string
  name: string
  symbol: string
  price: number
  priceChange24h: number
  marketCap: number
  volume24h: number
  logo?: string
}

export interface WatchlistPanelProps {
  selectedChain?: string
}

export const WatchlistPanel = ({ selectedChain = "all" }: WatchlistPanelProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Simulate loading watchlist data
    const loadWatchlist = async () => {
      setIsLoading(true)
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1200))
      
      // Mock watchlist data
      const mockData: WatchlistItem[] = [
        {
          id: "bitcoin",
          name: "Bitcoin",
          symbol: "BTC",
          price: 40000.0,
          priceChange24h: 1.8,
          marketCap: 750000000000,
          volume24h: 25000000000,
          logo: "/placeholder.svg?key=hkd6v",
        },
        {
          id: "ethereum",
          name: "Ethereum",
          symbol: "ETH",
          price: 3000.0,
          priceChange24h: 2.5,
          marketCap: 350000000000,
          volume24h: 15000000000,
          logo: "/placeholder.svg?key=be3lv",
        },
        {
          id: "solana",
          name: "Solana",
          symbol: "SOL",
          price: 50.0,
          priceChange24h: 5.2,
          marketCap: 20000000000,
          volume24h: 2000000000,
          logo: "/placeholder.svg?key=lh7tr",
        },
        {
          id: "cardano",
          name: "Cardano",
          symbol: "ADA",
          price: 0.45,
          priceChange24h: -1.2,
          marketCap: 15000000000,
          volume24h: 800000000,
          logo: "/placeholder.svg?key=esjc5",
        },
        {
          id: "polkadot",
          name: "Polkadot",
          symbol: "DOT",
          price: 6.5,
          priceChange24h: 3.1,
          marketCap: 8000000000,
          volume24h: 500000000,
          logo: "/placeholder.svg?key=953o7",
        },
        {
          id: "chainlink",
          name: "Chainlink",
          symbol: "LINK",
          price: 8.0,
          priceChange24h: -1.3,
          marketCap: 4000000000,
          volume24h: 300000000,
          logo: "/placeholder.svg?key=symz7",
        },
      ]
      
      setWatchlist(mockData)
      setIsLoading(false)
    }
    
    loadWatchlist()
  }, [selectedChain])

  const filteredWatchlist = watchlist.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const removeFromWatchlist = (id: string) => {
    setWatchlist(watchlist.filter((item) => item.id !== id))
  }

  // Generate stable skeleton item IDs
  const skeletonItems = Array.from({ length: 6 }).map((_, i) => ({
    id: `watchlist-skeleton-${i}`
  }));

  return (
    <div className={styles.container}>
      <Card className={styles.watchlistCard}>
        <CardHeader className={styles.cardHeader}>
          <div>
            <CardTitle>
              <Star className={styles.titleIcon} />
              Your Watchlist
            </CardTitle>
            <CardDescription>Track your favorite assets</CardDescription>
          </div>
          <Button className={styles.addButton}>
            <Plus className={styles.buttonIcon} />
            <span>Add Asset</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <Input
              placeholder="Search watchlist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.watchlistItems}>
            {isLoading ? (
              skeletonItems.map((item) => (
                <div key={item.id} className={styles.watchlistItemSkeleton}>
                  <div className={styles.itemInfoSkeleton}>
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div>
                      <Skeleton className="h-5 w-24 mb-1" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                  <div className={styles.itemPriceSkeleton}>
                    <Skeleton className="h-5 w-20 mb-1" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              ))
            ) : filteredWatchlist.length === 0 ? (
              <div className={styles.emptyState}>
                <StarOff className={styles.emptyIcon} />
                <p>No assets found</p>
                {searchQuery ? (
                  <Button variant="outline" size="sm" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                ) : (
                  <Button variant="outline" size="sm">
                    <Plus className={styles.buttonIcon} />
                    <span>Add Assets</span>
                  </Button>
                )}
              </div>
            ) : (
              filteredWatchlist.map((item) => (
                <div key={item.id} className={styles.watchlistItem}>
                  <div className={styles.itemInfo}>
                    <div className={styles.itemLogo}>
                      {item.logo ? (
                        <Image
                          src={item.logo || "/placeholder.svg"}
                          alt={item.name}
                          width={32}
                          height={32}
                          className={styles.logoImage}
                        />
                      ) : (
                        <div className={styles.logoPlaceholder}>{item.symbol.substring(0, 2)}</div>
                      )}
                    </div>
                    <div className={styles.itemDetails}>
                      <div className={styles.itemName}>{item.name}</div>
                      <div className={styles.itemSymbol}>{item.symbol}</div>
                    </div>
                  </div>
                  <div className={styles.itemPrice}>
                    <div className={styles.currentPrice}>{formatCurrency(item.price)}</div>
                    <div
                      className={`${styles.priceChange} ${item.priceChange24h >= 0 ? styles.positive : styles.negative}`}
                    >
                      {item.priceChange24h >= 0 ? (
                        <ArrowUp className={styles.changeIcon} />
                      ) : (
                        <ArrowDown className={styles.changeIcon} />
                      )}
                      {formatPercentage(Math.abs(item.priceChange24h))}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromWatchlist(item.id)}
                    className={styles.removeButton}
                  >
                    <Trash className={styles.removeIcon} />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}