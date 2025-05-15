"use client"

import { useCallback, useEffect, useState } from "react"
import type { CoinGeckoData } from "@/types/market-data"
import { coinGeckoService } from "@/services/market-data/coingecko.service"

export const useCoinGeckoData = (chain = "ethereum") => {
  const [data, setData] = useState<CoinGeckoData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Fetch market data for the specified chain
      const marketData = await coinGeckoService.getMarketData(chain)
      
      // Fetch top tokens for the specified chain
      const tokens = await coinGeckoService.getTopTokens(chain, 50)
      
      // Calculate market dominance
      const totalMarketCap = tokens.reduce((sum, token) => sum + token.marketCap, 0)
      const marketDominance = tokens.slice(0, 10).map((token) => ({
        symbol: token.symbol,
        percentage: (token.marketCap / totalMarketCap) * 100,
      }))
      
      // Calculate total 24h volume
      const total24hVolume = tokens.reduce((sum, token) => sum + (token.volume24h || 0), 0)
      
      setData({
        tokens,
        totalMarketCap,
        total24hVolume,
        marketDominance,
      })
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch CoinGecko data"))
    } finally {
      setIsLoading(false)
    }
  }, [chain])
  
  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])
  
  useEffect(() => {
    fetchData()
  }, [fetchData])
  
  return { data, isLoading, error, refetch }
}