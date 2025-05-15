"use client"

import { useCallback, useEffect, useState } from "react"
import { goldskyService } from "@/services/subgraph/goldsky.service"
import type { ProtocolMetrics, TokenTransferData, LiquidityPoolData, ChainActivity } from "@/types/subgraph-data"

// Hook for protocol metrics
export const useProtocolMetrics = (chain: string, protocolName: string, days = 7) => {
  const [data, setData] = useState<ProtocolMetrics | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const metrics = await goldskyService.getProtocolMetrics(chain, protocolName, days)
      setData(metrics)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch protocol metrics"))
      console.error("Error fetching protocol metrics:", err)
    } finally {
      setIsLoading(false)
    }
  }, [chain, protocolName, days])
  
  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])
  
  useEffect(() => {
    fetchData()
  }, [fetchData])
  
  return { data, isLoading, error, refetch }
}

// Hook for token transfers
export const useTokenTransfers = (chain: string, tokenAddress: string, limit = 20) => {
  const [data, setData] = useState<TokenTransferData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const transfers = await goldskyService.getTokenTransfers(chain, tokenAddress, limit)
      setData(transfers)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch token transfers"))
      console.error("Error fetching token transfers:", err)
    } finally {
      setIsLoading(false)
    }
  }, [chain, tokenAddress, limit])
  
  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])
  
  useEffect(() => {
    fetchData()
  }, [fetchData])
  
  return { data, isLoading, error, refetch }
}

// Hook for liquidity pools
export const useLiquidityPools = (chain: string, count = 10, orderBy = "tvlUSD") => {
  const [data, setData] = useState<LiquidityPoolData[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const pools = await goldskyService.getLiquidityPools(chain, count, orderBy)
      setData(pools)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch liquidity pools"))
      console.error("Error fetching liquidity pools:", err)
    } finally {
      setIsLoading(false)
    }
  }, [chain, count, orderBy])
  
  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])
  
  useEffect(() => {
    fetchData()
  }, [fetchData])
  
  return { data, isLoading, error, refetch }
}

// Hook for chain activity
export const useChainActivity = (chain: string, days = 7) => {
  const [data, setData] = useState<ChainActivity | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const activity = await goldskyService.getChainActivity(chain, days)
      setData(activity)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch chain activity"))
      console.error("Error fetching chain activity:", err)
    } finally {
      setIsLoading(false)
    }
  }, [chain, days])
  
  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])
  
  useEffect(() => {
    fetchData()
  }, [fetchData])
  
  return { data, isLoading, error, refetch }
}