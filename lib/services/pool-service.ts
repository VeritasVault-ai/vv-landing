/**
 * Service for handling pool-related operations
 */

import { apiClient } from "../api-client"
import type { Pool, ID } from "../models/types"

export const poolService = {
  async getAll(): Promise<Pool[]> {
    return apiClient.get<Pool[]>("/pools")
  },

  async getById(id: ID): Promise<Pool> {
    return apiClient.get<Pool>(`/pools/${id}`)
  },

  async getByProtocol(protocol: string): Promise<Pool[]> {
    return apiClient.get<Pool[]>(`/pools?protocol=${protocol}`)
  },

  async getByChain(chain: string): Promise<Pool[]> {
    return apiClient.get<Pool[]>(`/pools?chain=${chain}`)
  },

  async getRecommended(): Promise<Pool[]> {
    return apiClient.get<Pool[]>("/pools/recommended")
  },
}
