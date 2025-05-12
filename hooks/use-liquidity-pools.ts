"use client"

import { useState, useEffect } from "react"
import {
  liquidityPoolService,
  type LiquidityPool,
  type PerformanceHistory,
} from "@/lib/services/liquidity-pool-service"

export function useLiquidityPools() {
  const [pools, setPools] = useState<LiquidityPool[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchPools = async () => {
      try {
        setIsLoading(true)
        const data = await liquidityPoolService.getAllPools()
        setPools(data)
      } catch (err) {
        console.error("Failed to fetch liquidity pools:", err)
        setError(err instanceof Error ? err : new Error("Failed to fetch liquidity pools"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchPools()
  }, [])

  const refetchPools = async () => {
    try {
      setIsLoading(true)
      const data = await liquidityPoolService.getAllPools()
      setPools(data)
      return data
    } catch (err) {
      console.error("Failed to fetch liquidity pools:", err)
      setError(err instanceof Error ? err : new Error("Failed to fetch liquidity pools"))
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { pools, isLoading, error, refetchPools }
}

export function useLiquidityPoolById(id: string) {
  const [pool, setPool] = useState<LiquidityPool | null>(null)
  const [performanceHistory, setPerformanceHistory] = useState<PerformanceHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchPool = async () => {
      try {
        setIsLoading(true)
        const poolData = await liquidityPoolService.getPoolById(id)
        setPool(poolData)

        const historyData = await liquidityPoolService.getPoolPerformanceHistory(id)
        setPerformanceHistory(historyData)
      } catch (err) {
        console.error("Failed to fetch liquidity pool:", err)
        setError(err instanceof Error ? err : new Error("Failed to fetch liquidity pool"))
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchPool()
    }
  }, [id])

  return { pool, performanceHistory, isLoading, error }
}
