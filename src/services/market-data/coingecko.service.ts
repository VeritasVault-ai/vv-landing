import type { TokenData } from "@/types/market-data"
import { API_ENDPOINTS } from "@/lib/constants"

class CoinGeckoService {
  private baseUrl: string
  private apiKey: string | null
  
  constructor() {
    this.baseUrl = API_ENDPOINTS.COINGECKO
    this.apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY || null
  }
  
  private async fetchWithRetry<T>(url: string, options: RequestInit = {}, retries = 3): Promise<T> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          ...(this.apiKey && { "x-cg-api-key": this.apiKey }),
        },
      })
      
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
  
  async getMarketData(chain: string): Promise<{ totalMarketCap: number; total24hVolume: number }> {
    const url = `${this.baseUrl}/global`
    const data = await this.fetchWithRetry<any>(url)
    
    // Extract global market data
    return {
      totalMarketCap: data.data.total_market_cap.usd || 0,
      total24hVolume: data.data.total_volume.usd || 0,
    }
  }
  
  async getTopTokens(chain: string, limit = 50): Promise<TokenData[]> {
    // Map chain to CoinGecko's chain ID format
    const chainId = this.mapChainToCoinGeckoId(chain)
    const url = `${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h&category=${chainId}`
    
    const data = await this.fetchWithRetry<any[]>(url)
    
    return data.map((item, index) => ({
      id: item.id,
      rank: index + 1,
      name: item.name,
      symbol: item.symbol,
      image: item.image,
      currentPrice: item.current_price,
      marketCap: item.market_cap,
      volume24h: item.total_volume,
      priceChangePercentage24h: item.price_change_percentage_24h || 0,
    }))
  }
  
  private mapChainToCoinGeckoId(chain: string): string {
    // Map chain names to CoinGecko category IDs
    const chainMap: Record<string, string> = {
      ethereum: "ethereum-ecosystem",
      binance: "binance-smart-chain",
      polygon: "polygon-ecosystem",
      avalanche: "avalanche-ecosystem",
      solana: "solana-ecosystem",
      // Add more chains as needed
    }
    
    return chainMap[chain.toLowerCase()] || "ethereum-ecosystem"
  }
}

export const coinGeckoService = new CoinGeckoService()