import { abortableDelay } from "./abortable-delay"

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
   * Make a request to DeFiLlama API
   */
  private async request<T>(endpoint: string, signal?: AbortSignal): Promise<T> {
    await abortableDelay(this.rateLimitDelay, signal) // Respect rate limits
    signal?.throwIfAborted()

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, { signal })

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
  async getAllProtocols(signal?: AbortSignal): Promise<any> {
    return this.request("/protocols", signal)
  }

  /**
   * Get Tezos protocols
   */
  async getTezosProtocols(signal?: AbortSignal): Promise<any> {
    const allProtocols = await this.getAllProtocols(signal)
    signal?.throwIfAborted()
    return allProtocols.filter(
      (protocol: any) => protocol.chains.includes("Tezos") || protocol.chains.includes("tezos"),
    )
  }

  /**
   * Get protocol TVL history
   */
  async getProtocolTvlHistory(protocol: string, signal?: AbortSignal): Promise<any> {
    return this.request(`/protocol/${protocol}`, signal)
  }

  /**
   * Get Tezos TVL
   */
  async getTezosTvl(signal?: AbortSignal): Promise<any> {
    return this.request("/chain/tezos", signal)
  }

  /**
   * Get Tezos TVL history
   */
  async getTezosTvlHistory(signal?: AbortSignal): Promise<any> {
    return this.request("/charts/tezos", signal)
  }
}

export const defiLlamaClient = new DeFiLlamaClient()
