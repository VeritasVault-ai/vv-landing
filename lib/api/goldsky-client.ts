/**
 * Goldsky API Client for fetching Tezos blockchain data
 */
export class GoldskyClient {
  private baseUrl: string
  private apiKey: string

  constructor() {
    this.baseUrl = process.env.GOLDSKY_API_URL || "https://api.goldsky.com"
    this.apiKey = process.env.NEURALLIQUID_GOLDSKY_API_KEY || ""
  }

  /**
   * Execute a GraphQL query against Goldsky
   */
  async executeQuery<T>(
    query: string,
    variables: Record<string, any> = {},
    signal?: AbortSignal,
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": this.apiKey,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
        signal,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Goldsky API error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()

      if (data.errors) {
        throw new Error(`GraphQL error: ${JSON.stringify(data.errors)}`)
      }

      return data.data as T
    } catch (error) {
      console.error("Goldsky API error:", error)
      throw error
    }
  }

  /**
   * Get historical liquidity data
   */
  async getHistoricalData(
    startTime: string,
    endTime: string,
    limit = 100,
    signal?: AbortSignal,
  ): Promise<any> {
    const query = `
      query GetHistoricalData($startTime: DateTime!, $endTime: DateTime!, $limit: Int!) {
        liquidityData(
          where: { timestamp_gte: $startTime, timestamp_lte: $endTime }
          limit: $limit
          orderBy: timestamp
          orderDirection: desc
        ) {
          id
          timestamp
          pool {
            id
            name
          }
          totalValueLocked
          volume24h
          apy
        }
      }
    `

    return this.executeQuery(query, { startTime, endTime, limit }, signal)
  }

  /**
   * Get protocol metrics
   */
  async getProtocolMetrics(signal?: AbortSignal): Promise<any> {
    const query = `
      query GetProtocolMetrics {
        protocols {
          id
          name
          totalValueLocked
          totalVolume24h
          totalFees24h
          poolCount
        }
      }
    `

    return this.executeQuery(query, {}, signal)
  }
}

export const goldskyClient = new GoldskyClient()
