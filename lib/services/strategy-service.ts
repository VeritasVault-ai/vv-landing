/**
 * Service for handling strategy-related operations
 */

import { apiClient } from "../api-client"
import type { Strategy, ID } from "../models/types"

export const strategyService = {
  async getAll(): Promise<Strategy[]> {
    return apiClient.get<Strategy[]>("/strategies")
  },

  async getById(id: ID): Promise<Strategy> {
    return apiClient.get<Strategy>(`/strategies/${id}`)
  },

  async create(strategy: Omit<Strategy, "id" | "createdAt" | "updatedAt">): Promise<Strategy> {
    return apiClient.post<Strategy>("/strategies", strategy)
  },

  async update(id: ID, strategy: Partial<Strategy>): Promise<Strategy> {
    return apiClient.put<Strategy>(`/strategies/${id}`, strategy)
  },

  async delete(id: ID): Promise<void> {
    return apiClient.delete<void>(`/strategies/${id}`)
  },

  async getPerformance(id: ID): Promise<Strategy> {
    return apiClient.get<Strategy>(`/strategies/${id}/performance`)
  },

  async simulate(strategy: Partial<Strategy>): Promise<Strategy> {
    return apiClient.post<Strategy>("/strategies/simulate", strategy)
  },
}
