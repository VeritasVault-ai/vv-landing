// CoinGecko Types
export interface TokenData {
  id: string
  rank: number
  name: string
  symbol: string
  image: string
  currentPrice: number
  marketCap: number
  volume24h?: number
  priceChangePercentage24h: number
}

export interface CoinGeckoData {
  tokens: TokenData[]
  totalMarketCap: number
  total24hVolume: number
  marketDominance: {
    symbol: string
    percentage: number
  }[]
}

// DeFiLlama Types
export interface ProtocolData {
  id: string
  name: string
  logo: string
  tvl: number
  change24h: number
  chains: string[]
  url?: string
}

export interface HistoricalTvlData {
  date: string
  tvl: number
}

export interface DefiLlamaData {
  totalTvl: number
  tvlChange24h: number
  protocols: ProtocolData[]
  historicalTvl: HistoricalTvlData[]
}