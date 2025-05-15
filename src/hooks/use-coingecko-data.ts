"use client"

import { coinGeckoService } from "@/src/services/market-data/coingecko.service"
import type { CoinGeckoData } from "@/src/types/market-data"
import { useCallback, useEffect, useState } from "react"

export const useCoinGeckoData = (chain = "ethereum") => {
  const [data, setData] = useState<CoinGeckoData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Fetch global market data (no longer chain-specific)
      const marketData = await coinGeckoService.getGlobalMarketData()
      
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