import { abortableDelay } from "./abortable-delay"

/**
 * CoinGecko API Client for fetching cryptocurrency market data
 */
export class CoinGeckoClient {
  private baseUrl: string
  private apiKey: string
  private rateLimitDelay: number

  constructor() {
    this.baseUrl = "https://api.coingecko.com/api/v3"
    this.apiKey = process.env.COINGECKO_API_KEY || ""
    this.rateLimitDelay = 1100 // 1.1 seconds to respect rate limits
  }

  /**
   * Make a request to CoinGecko API
   */
  private async request<T>(
    endpoint: string,
    params: Record<string, any> = {},
    signal?: AbortSignal,
  ): Promise<T> {
    await abortableDelay(this.rateLimitDelay, signal) // Respect rate limits
    signal?.throwIfAborted()

    const url = new URL(`${this.baseUrl}${endpoint}`)

    // Add API key if available
    if (this.apiKey) {
      params.x_cg_pro_api_key = this.apiKey
    }

    // Add query parameters
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })

    try {
      const response = await fetch(url.toString(), { signal })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`CoinGecko API error: ${response.status} - ${errorText}`)
      }

      return (await response.json()) as T
    } catch (error) {
      console.error("CoinGecko API error:", error)
      throw error
    }
  }

  /**
   * Get coin market data
   */
  async getCoinMarketData(coinIds: string[], currency = "usd", signal?: AbortSignal): Promise<any> {
    return this.request("/coins/markets", {
      vs_currency: currency,
      ids: coinIds.join(","),
      order: "market_cap_desc",
      per_page: 100,
      page: 1,
      sparkline: false,
      price_change_percentage: "24h,7d,30d",
    }, signal)
  }

  /**
   * Get historical market data for a coin
   */
  async getCoinHistoricalData(
    coinId: string,
    days = 30,
    currency = "usd",
    signal?: AbortSignal,
  ): Promise<any> {
    return this.request(`/coins/${coinId}/market_chart`, {
      vs_currency: currency,
      days,
    }, signal)
  }

  /**
   * Get Tezos token data
   */
  async getTezosTokenData(currency = "usd", signal?: AbortSignal): Promise<any> {
    return this.request("/coins/tezos", {
      localization: false,
      tickers: true,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: false,
    }, signal)
  }
}

export const coinGeckoClient = new CoinGeckoClient()
