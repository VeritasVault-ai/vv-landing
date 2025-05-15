"use client"

import { useCallback, useEffect, useState } from "react"
import type { DefiLlamaData } from "@/types/market-data"
import { defiLlamaService } from "@/services/market-data/defillama.service"

export const useDefiLlamaData = (chain = "ethereum") => {
  const [data, setData] = useState<DefiLlamaData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Fetch TVL data for the specified chain
      const tvlData = await defiLlamaService.getChainTvl(chain)
      
      // Fetch top protocols for the specified chain
      const protocols = await defiLlamaService.getTopProtocols(chain, 50)
      
      // Fetch historical TVL data
      const historicalTvl = await defiLlamaService.getHistoricalTvl(chain, 30) // Last 30 days
      
      // Calculate TVL change percentage
      const currentTvl = tvlData.totalTvl
      const yesterdayTvl = historicalTvl[historicalTvl.length - 2]?.tvl || currentTvl
      const tvlChange24h = ((currentTvl - yesterdayTvl) / yesterdayTvl) * 100
      
      setData({
        totalTvl: tvlData.totalTvl,
        tvlChange24h,
        protocols,
        historicalTvl,
      })
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch DeFiLlama data"))
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