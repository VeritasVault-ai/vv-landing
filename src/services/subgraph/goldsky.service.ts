import { API_ENDPOINTS } from "@/src/lib/constants";
import type {
  ChainActivity,
  LiquidityPoolData,
  ProtocolMetrics,
  SubgraphQueryOptions,
  SubgraphResponse,
  TokenTransferData,
} from "@/src/types/subgraph-data";

// Define interfaces for the response data structures
interface DailyMetric {
  timestamp: string;
  dailyVolumeUSD: string;
  totalValueLockedUSD: string;
  activeUsers: string;
  txCount: string;
}

interface TokenTransfer {
  from: { id: string };
  to: { id: string };
  amount: string;
  amountUSD: string;
  timestamp: string;
  transaction: { id: string };
}

interface Pool {
  id: string;
  name?: string;
  token0: { symbol: string; id: string };
  token1: { symbol: string; id: string };
  tvlUSD: string;
  volumeUSD: string;
  feeTier: string;
  apr: string;
  protocol?: { name: string };
}

interface NetworkMetric {
  timestamp: string;
  blockCount: string;
  transactionCount: string;
  activeAddresses: string;
  gasUsed: string;
  avgGasPrice: string;
  totalValueTransferredUSD: string;
}

class GoldskyService {
  private endpoints: Record<string, string>
  
  constructor() {
    this.endpoints = {
      ethereum: API_ENDPOINTS.GOLDSKY_ETH,
      etherlink: API_ENDPOINTS.GOLDSKY_ETHERLINK,
      tezos: API_ENDPOINTS.GOLDSKY_TEZOS,
    }
  }
  
  private async executeQuery<T>(
    chain: string,
    query: string,
    variables: Record<string, any> = {},
    options: SubgraphQueryOptions = {},
  ): Promise<T> {
    const endpoint = this.endpoints[chain.toLowerCase()]
    if (!endpoint) {
      throw new Error(`Unsupported chain: ${chain}`)
    }
    
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(options.apiKey && { Authorization: `Bearer ${options.apiKey}` }),
        },
        body: JSON.stringify({
          query,
          variables,
        }),
        cache: options.cache || "no-store",
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      
      const result = await response.json()
      if (result.errors) {
        throw new Error(`GraphQL Error: ${result.errors[0].message}`)
      }
      
      return result.data as T
    } catch (error) {
      console.error(`Error querying ${chain} subgraph:`, error)
      throw error
    }
  }
  
  // Protocol metrics (TVL, volume, users)
  async getProtocolMetrics(chain: string, protocolName: string, days = 7): Promise<ProtocolMetrics> {
    const query = `
      query GetProtocolMetrics($protocolName: String!, $days: Int!) {
        protocol(id: $protocolName) {
          totalValueLockedUSD
          dailyVolumeUSD
          cumulativeVolumeUSD
          userCount
          txCount
          dailyMetrics(first: $days, orderBy: timestamp, orderDirection: desc) {
            timestamp
            dailyVolumeUSD
            totalValueLockedUSD
            activeUsers
            txCount
          }
        }
      }
    `
    
    const response = await this.executeQuery<SubgraphResponse>(chain, query, { protocolName, days })
    
    if (!response.protocol) {
      throw new Error(`Protocol ${protocolName} not found on ${chain}`)
    }
    
    return {
      name: protocolName,
      chain,
      tvl: Number.parseFloat(response.protocol.totalValueLockedUSD),
      volume24h: Number.parseFloat(response.protocol.dailyMetrics[0]?.dailyVolumeUSD || "0"),
      volumeTotal: Number.parseFloat(response.protocol.cumulativeVolumeUSD),
      users: Number.parseInt(response.protocol.userCount),
      transactions: Number.parseInt(response.protocol.txCount),
      dailyMetrics: response.protocol.dailyMetrics.map((metric: DailyMetric) => ({
        date: new Date(Number.parseInt(metric.timestamp) * 1000).toISOString(),
        volume: Number.parseFloat(metric.dailyVolumeUSD),
        tvl: Number.parseFloat(metric.totalValueLockedUSD),
        activeUsers: Number.parseInt(metric.activeUsers),
        transactions: Number.parseInt(metric.txCount),
      })),
    }
  }
  
  // Token transfers and activity
  async getTokenTransfers(chain: string, tokenAddress: string, limit = 20): Promise<TokenTransferData> {
    const query = `
      query GetTokenTransfers($tokenAddress: String!, $limit: Int!) {
        token(id: $tokenAddress) {
          symbol
          name
          totalSupply
          transfers(first: $limit, orderBy: timestamp, orderDirection: desc) {
            from {
              id
            }
            to {
              id
            }
            amount
            amountUSD
            timestamp
            transaction {
              id
            }
          }
        }
      }
    `
    
    const response = await this.executeQuery<SubgraphResponse>(chain, query, { tokenAddress, limit })
    
    if (!response.token) {
      throw new Error(`Token ${tokenAddress} not found on ${chain}`)
    }
    
    return {
      address: tokenAddress,
      symbol: response.token.symbol,
      name: response.token.name,
      totalSupply: Number.parseFloat(response.token.totalSupply),
      transfers: response.token.transfers.map((transfer: TokenTransfer) => ({
        from: transfer.from.id,
        to: transfer.to.id,
        amount: Number.parseFloat(transfer.amount),
        amountUSD: Number.parseFloat(transfer.amountUSD),
        timestamp: new Date(Number.parseInt(transfer.timestamp) * 1000).toISOString(),
        transactionHash: transfer.transaction.id,
      })),
    }
  }
  
  // Liquidity pool data
  async getLiquidityPools(chain: string, count = 10, orderBy = "tvlUSD"): Promise<LiquidityPoolData[]> {
    const query = `
      query GetLiquidityPools($count: Int!, $orderBy: String!) {
        pools(first: $count, orderBy: $orderBy, orderDirection: desc) {
          id
          name
          token0 {
            symbol
            id
          }
          token1 {
            symbol
            id
          }
          tvlUSD
          volumeUSD
          feeTier
          apr
          protocol {
            name
          }
        }
      }
    `
    
    const response = await this.executeQuery<SubgraphResponse>(chain, query, { count, orderBy })
    
    if (!response.pools) {
      return []
    }
    
    return response.pools.map((pool: Pool) => ({
      id: pool.id,
      name: pool.name || `${pool.token0.symbol}-${pool.token1.symbol}`,
      token0: {
        symbol: pool.token0.symbol,
        address: pool.token0.id,
      },
      token1: {
        symbol: pool.token1.symbol,
        address: pool.token1.id,
      },
      tvl: Number.parseFloat(pool.tvlUSD),
      volume: Number.parseFloat(pool.volumeUSD),
      feeTier: Number.parseFloat(pool.feeTier) / 10000, // Convert from basis points
      apr: Number.parseFloat(pool.apr),
      protocol: pool.protocol?.name || "Unknown",
    }))
  }
  
  // Chain activity metrics
  async getChainActivity(chain: string, days = 7): Promise<ChainActivity> {
    const query = `
      query GetChainActivity($days: Int!) {
        networkMetrics(first: $days, orderBy: timestamp, orderDirection: desc) {
          timestamp
          blockCount
          transactionCount
          activeAddresses
          gasUsed
          avgGasPrice
          totalValueTransferredUSD
        }
      }
    `
    
    const response = await this.executeQuery<SubgraphResponse>(chain, query, { days })
    
    if (!response.networkMetrics || response.networkMetrics.length === 0) {
      throw new Error(`No network metrics available for ${chain}`)
    }
    
    return {
      chain,
      dailyMetrics: response.networkMetrics.map((metric: NetworkMetric) => ({
        date: new Date(Number.parseInt(metric.timestamp) * 1000).toISOString(),
        blocks: Number.parseInt(metric.blockCount),
        transactions: Number.parseInt(metric.transactionCount),
        activeAddresses: Number.parseInt(metric.activeAddresses),
        gasUsed: Number.parseFloat(metric.gasUsed),
        avgGasPrice: Number.parseFloat(metric.avgGasPrice),
        valueTransferred: Number.parseFloat(metric.totalValueTransferredUSD),
      })),
    }
  }
}

export const goldskyService = new GoldskyService()