import type { HistoricalTvlData, ProtocolData } from "@/types/market-data"
import { API_ENDPOINTS } from "@/lib/constants"

class DefiLlamaService {
  private baseUrl: string
  
  constructor() {
    this.baseUrl = API_ENDPOINTS.DEFILLAMA
  }
  
  private async fetchWithRetry<T>(url: string, options: RequestInit = {}, retries = 3): Promise<T> {
    try {
      const response = await fetch(url, options)
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      
      return (await response.json()) as T
    } catch (error) {
      if (retries > 0) {
        // Exponential backoff
        const delay = 1000 * Math.pow(2, 3 - retries)
        await new Promise((resolve) => setTimeout(resolve, delay))
        return this.fetchWithRetry<T>(url, options, retries - 1)
      }
      throw error
    }
  }
  
  async getChainTvl(chain: string): Promise<{ totalTvl: number }> {
    // Map chain to DeFiLlama's chain ID format
    const chainId = this.mapChainToDefiLlamaId(chain)
    const url = `${this.baseUrl}/v2/chains`
    
    const data = await this.fetchWithRetry<any[]>(url)
    const chainData = data.find((item) => item.name.toLowerCase() === chainId)
    
    return {
      totalTvl: chainData?.tvl || 0,
    }
  }
  
  async getTopProtocols(chain: string, limit = 50): Promise<ProtocolData[]> {
    // Map chain to DeFiLlama's chain ID format
    const chainId = this.mapChainToDefiLlamaId(chain)
    const url = `${this.baseUrl}/protocols`
    
    const data = await this.fetchWithRetry<any[]>(url)
    
    // Filter protocols by chain and sort by TVL
    const filteredProtocols = data
      .filter((protocol) => protocol.chains.map((c: string) => c.toLowerCase()).includes(chainId))
      .sort((a, b) => b.tvl - a.tvl)
      .slice(0, limit)
    
    return filteredProtocols.map((protocol) => ({
      id: protocol.id,
      name: protocol.name,
      logo: protocol.logo,
      tvl: protocol.tvl,
      change24h: protocol.change_1d || 0,
      chains: protocol.chains,
      url: protocol.url,
    }))
  }
  
  async getHistoricalTvl(chain: string, days = 30): Promise<HistoricalTvlData[]> {
    // Map chain to DeFiLlama's chain ID format
    const chainId = this.mapChainToDefiLlamaId(chain)
    const url = `${this.baseUrl}/v2/historicalChainTvl/${chainId}`
    
    const data = await this.fetchWithRetry<any>(url)
    
    // Extract historical TVL data
    const tvlData = data.tvl || []
    
    // Get data for the specified number of days
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    
    return tvlData
      .filter((item: any) => new Date(item.date * 1000) >= startDate)
      .map((item: any) => ({
        date: new Date(item.date * 1000).toISOString(),
        tvl: item.totalLiquidityUSD,
      }))
  }
  
  private mapChainToDefiLlamaId(chain: string): string {
    // Map chain names to DeFiLlama chain IDs
    const chainMap: Record<string, string> = {
      ethereum: "ethereum",
      binance: "bsc",
      polygon: "polygon",
      avalanche: "avax",
      solana: "solana",
      // Add more chains as needed
    }
    
    return chainMap[chain.toLowerCase()] || "ethereum"
  }
}

export const defiLlamaService = new DefiLlamaService()