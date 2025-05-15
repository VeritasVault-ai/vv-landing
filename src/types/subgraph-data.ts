// Goldsky Subgraph Types
export interface SubgraphQueryOptions {
  apiKey?: string
  cache?: RequestCache
}

export interface SubgraphResponse {
  [key: string]: any
}

// Protocol Metrics
export interface ProtocolMetrics {
  name: string
  chain: string
  tvl: number
  volume24h: number
  volumeTotal: number
  users: number
  transactions: number
  dailyMetrics: Array<{
    date: string
    volume: number
    tvl: number
    activeUsers: number
    transactions: number
  }>
}

// Token Transfer Data
export interface TokenTransferData {
  address: string
  symbol: string
  name: string
  totalSupply: number
  transfers: Array<{
    from: string
    to: string
    amount: number
    amountUSD: number
    timestamp: string
    transactionHash: string
  }>
}

// Liquidity Pool Data
export interface LiquidityPoolData {
  id: string
  name: string
  token0: {
    symbol: string
    address: string
  }
  token1: {
    symbol: string
    address: string
  }
  tvl: number
  volume: number
  feeTier: number
  apr: number
  protocol: string
}

// Chain Activity
export interface ChainActivity {
  chain: string
  dailyMetrics: Array<{
    date: string
    blocks: number
    transactions: number
    activeAddresses: number
    gasUsed: number
    avgGasPrice: number
    valueTransferred: number
  }>
}