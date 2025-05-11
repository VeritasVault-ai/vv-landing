import { liquidityPoolRepository } from "@/lib/repository/liquidity-pool-repository"
import { goldskyClient } from "@/lib/api/goldsky-client"
import { coinGeckoClient } from "@/lib/api/coingecko-client"
import { defiLlamaClient } from "@/lib/api/defillama-client"

/**
 * Service for synchronizing data from external APIs
 */
export class SyncService {
  /**
   * Sync liquidity pools data from Goldsky and DeFiLlama
   */
  async syncLiquidityPools(): Promise<void> {
    try {
      console.log("Syncing liquidity pools data...")

      // Get protocol data from DeFiLlama
      const tezosProtocols = await defiLlamaClient.getTezosProtocols()

      // Get liquidity data from Goldsky
      const now = new Date()
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

      const historicalData = await goldskyClient.getHistoricalData(thirtyDaysAgo.toISOString(), now.toISOString(), 1000)

      // Process and transform the data
      const poolsMap = new Map<string, any>()

      // Process DeFiLlama data
      for (const protocol of tezosProtocols) {
        const protocolDetail = await defiLlamaClient.getProtocolTvlHistory(protocol.slug)

        // Create a pool entry for each protocol
        poolsMap.set(protocol.slug, {
          id: protocol.slug,
          name: protocol.name,
          pair: "Multiple",
          protocol: protocol.name,
          tvl: protocol.tvl || 0,
          apy: 0, // Will be updated from Goldsky data if available
          risk_level: "medium", // Default risk level
          description: protocol.description || "",
          url: protocol.url || "",
          logo: protocol.logo || "",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
      }

      // Process Goldsky data to update APY and other metrics
      if (historicalData && historicalData.liquidityData) {
        for (const item of historicalData.liquidityData) {
          if (item.pool && poolsMap.has(item.pool.id)) {
            const pool = poolsMap.get(item.pool.id)
            pool.apy = item.apy || pool.apy
            pool.tvl = item.totalValueLocked || pool.tvl
            poolsMap.set(item.pool.id, pool)
          }
        }
      }

      // Store the pools in the database
      for (const pool of poolsMap.values()) {
        const existingPool = await liquidityPoolRepository.getById(pool.id)

        if (existingPool) {
          // Update existing pool
          await liquidityPoolRepository.update(pool.id, {
            name: pool.name,
            pair: pool.pair,
            protocol: pool.protocol,
            tvl: pool.tvl,
            apy: pool.apy,
            risk_level: pool.risk_level,
            description: pool.description,
            url: pool.url,
            logo: pool.logo,
            updated_at: new Date().toISOString(),
          })
        } else {
          // Create new pool
          await liquidityPoolRepository.create(pool)
        }
      }

      console.log(`Synced ${poolsMap.size} liquidity pools`)
    } catch (error) {
      console.error("Error syncing liquidity pools:", error)
      throw new Error(`Failed to sync liquidity pools: ${error.message}`)
    }
  }

  /**
   * Sync market data from CoinGecko
   */
  async syncMarketData(): Promise<void> {
    try {
      console.log("Syncing market data...")

      // Get Tezos token data
      const tezosData = await coinGeckoClient.getTezosTokenData()

      // Get historical data
      const historicalData = await coinGeckoClient.getCoinHistoricalData("tezos", 30)

      // Store the data in the database
      // This would typically go into a market_data table
      // For now, we'll just log it
      console.log("Synced market data for Tezos")

      // You would typically store this data in a database table
      // await marketDataRepository.upsert({
      //   id: "tezos",
      //   name: tezosData.name,
      //   symbol: tezosData.symbol,
      //   current_price: tezosData.market_data.current_price.usd,
      //   market_cap: tezosData.market_data.market_cap.usd,
      //   total_volume: tezosData.market_data.total_volume.usd,
      //   price_change_24h: tezosData.market_data.price_change_percentage_24h,
      //   price_change_7d: tezosData.market_data.price_change_percentage_7d,
      //   price_change_30d: tezosData.market_data.price_change_percentage_30d,
      //   historical_data: JSON.stringify(historicalData),
      //   updated_at: new Date().toISOString(),
      // })
    } catch (error) {
      console.error("Error syncing market data:", error)
      throw new Error(`Failed to sync market data: ${error.message}`)
    }
  }

  /**
   * Sync protocol metrics from DeFiLlama and Goldsky
   */
  async syncProtocolMetrics(): Promise<void> {
    try {
      console.log("Syncing protocol metrics...")

      // Get Tezos TVL data from DeFiLlama
      const tezosTvl = await defiLlamaClient.getTezosTvl()
      const tezosTvlHistory = await defiLlamaClient.getTezosTvlHistory()

      // Get protocol metrics from Goldsky
      const protocolMetrics = await goldskyClient.getProtocolMetrics()

      // Store the data in the database
      // This would typically go into a protocol_metrics table
      // For now, we'll just log it
      console.log("Synced protocol metrics for Tezos")

      // You would typically store this data in a database table
      // await protocolMetricsRepository.upsert({
      //   id: "tezos",
      //   name: "Tezos",
      //   tvl: tezosTvl.tvl,
      //   tvl_history: JSON.stringify(tezosTvlHistory),
      //   protocol_count: tezosTvl.protocols?.length || 0,
      //   metrics: JSON.stringify(protocolMetrics),
      //   updated_at: new Date().toISOString(),
      // })
    } catch (error) {
      console.error("Error syncing protocol metrics:", error)
      throw new Error(`Failed to sync protocol metrics: ${error.message}`)
    }
  }

  /**
   * Run all sync operations
   */
  async syncAll(): Promise<void> {
    await this.syncLiquidityPools()
    await this.syncMarketData()
    await this.syncProtocolMetrics()
  }
}

export const syncService = new SyncService()
