/**
 * DeFiLlama API Client for fetching DeFi protocol data
 */
export class DeFiLlamaClient {
  private baseUrl: string
  private rateLimitDelay: number

  constructor() {
    this.baseUrl = "https://api.llama.fi"
    this.rateLimitDelay = 1000 // 1 second to respect rate limits
  }

  /**
   * Add delay to respect rate limits
   */
  private async delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.rateLimitDelay))
  }

  /**
   * Make a request to DeFiLlama API
   */
  private async request<T>(endpoint: string): Promise<T> {
    await this.delay() // Respect rate limits

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`DeFiLlama API error: ${response.status} - ${errorText}`)
      }

      return (await response.json()) as T
    } catch (error) {
      console.error("DeFiLlama API error:", error)
      throw error
    }
  }

  /**
   * Get all protocols
   */
  async getAllProtocols(): Promise<any> {
    return this.request("/protocols")
  }

  /**
   * Get Tezos protocols
   */
  async getTezosProtocols(): Promise<any> {
    const allProtocols = await this.getAllProtocols()
    return allProtocols.filter(
      (protocol: any) => protocol.chains.includes("Tezos") || protocol.chains.includes("tezos"),
    )
  }

  /**
   * Get protocol TVL history
   */
  async getProtocolTvlHistory(protocol: string): Promise<any> {
    return this.request(`/protocol/${protocol}`)
  }

  /**
   * Get Tezos TVL
   */
  async getTezosTvl(): Promise<any> {
    return this.request("/chain/tezos")
  }

  /**
   * Get Tezos TVL history
   */
  async getTezosTvlHistory(): Promise<any> {
    return this.request("/charts/tezos")
  }
}

export const defiLlamaClient = new DeFiLlamaClient()
