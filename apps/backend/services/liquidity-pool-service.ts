/**
 * Service for handling liquidity pool operations
 */

import { apiClient } from "../api-client"

export interface LiquidityPool {
  id: string
  name: string
  pair: string
  protocol: string
  tvl: number
  apy: number
  risk_level: "low" | "medium" | "high"
  created_at: string
  updated_at: string
}

export interface PerformanceHistory {
  id: string
  pool_id: string
  date: string
  tvl: number
  apy: number
  created_at: string
}

export const liquidityPoolService = {
  async getAllPools(): Promise<LiquidityPool[]> {
    return apiClient.get<LiquidityPool[]>("/liquidity-pools")
  },

  async getPoolById(id: string): Promise<LiquidityPool> {
    return apiClient.get<LiquidityPool>(`/liquidity-pools/${id}`)
  },

  async getPoolsByProtocol(protocol: string): Promise<LiquidityPool[]> {
    return apiClient.get<LiquidityPool[]>(`/liquidity-pools?protocol=${protocol}`)
  },

  async getPoolsByRiskLevel(riskLevel: string): Promise<LiquidityPool[]> {
    return apiClient.get<LiquidityPool[]>(`/liquidity-pools?risk_level=${riskLevel}`)
  },

  async createPool(pool: Omit<LiquidityPool, "id" | "created_at" | "updated_at">): Promise<LiquidityPool> {
    return apiClient.post<LiquidityPool>("/liquidity-pools", pool)
  },

  async updatePool(id: string, pool: Partial<LiquidityPool>): Promise<LiquidityPool> {
    return apiClient.put<LiquidityPool>(`/liquidity-pools/${id}`, pool)
  },

  async deletePool(id: string): Promise<void> {
    return apiClient.delete<void>(`/liquidity-pools/${id}`)
  },

  async getPoolPerformanceHistory(poolId: string): Promise<PerformanceHistory[]> {
    return apiClient.get<PerformanceHistory[]>(`/liquidity-pools/${poolId}/performance`)
  },

  async getPerformanceHistoryByDateRange(
    poolId: string,
    startDate: string,
    endDate: string,
  ): Promise<PerformanceHistory[]> {
    return apiClient.get<PerformanceHistory[]>(
      `/liquidity-pools/${poolId}/performance?start_date=${startDate}&end_date=${endDate}`,
    )
  },
}
