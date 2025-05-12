import { NextResponse } from "next/server"

// Helper function to retry failed API requests
async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3, delay = 1000) {
  let lastError

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          Accept: "application/json",
          ...(options.headers || {}),
        },
      })

      if (response.ok) {
        return await response.json()
      }

      lastError = new Error(`API request failed with status ${response.status} ${response.statusText}`)
    } catch (error) {
      lastError = error
    }

    // Wait before retrying
    if (i < retries - 1) {
      await new Promise((resolve) => setTimeout(resolve, delay))
      // Exponential backoff
      delay *= 2
    }
  }

  throw lastError
}

export async function GET() {
  // Track if we're using real data or fallbacks
  let usingRealMarketData = false
  let usingRealTvlData = false
  let usingRealTezosData = false
  let usingRealEthData = false

  // Initialize with fallback data
  let marketData = { data: { total_market_cap: { usd: 42800000000 } } }
  let totalTvl = 48500000000
  let tezosTvl = 120000000
  let ethTvl = 28500000000

  try {
    // Fetch real market data from CoinGecko with retry logic
    try {
      console.log("Fetching market data from CoinGecko...")
      marketData = await fetchWithRetry("https://api.coingecko.com/api/v3/global", {
        next: { revalidate: 300 }, // Cache for 5 minutes
      })
      console.log("Successfully fetched market data")
      usingRealMarketData = true
    } catch (marketError) {
      console.error("Error fetching market data:", marketError)
    }

    // Fetch DeFi TVL data from DefiLlama with retry logic
    try {
      console.log("Fetching TVL data from DefiLlama...")
      const tvlData = await fetchWithRetry("https://api.llama.fi/protocols", {
        next: { revalidate: 300 }, // Cache for 5 minutes
      })

      // Calculate total DeFi TVL
      totalTvl = tvlData.reduce((sum, protocol) => sum + (protocol.tvl || 0), 0)
      usingRealTvlData = true

      // Calculate Tezos ecosystem TVL
      const tezosProtocols = tvlData.filter((protocol) => protocol.chains?.includes("Tezos"))
      if (tezosProtocols.length > 0) {
        tezosTvl = tezosProtocols.reduce((sum, protocol) => sum + (protocol.tvl || 0), 0)
        usingRealTezosData = true
        console.log(`Found ${tezosProtocols.length} Tezos protocols with total TVL: ${tezosTvl}`)
      } else {
        console.log("No Tezos protocols found in DefiLlama data, using fallback value")
      }

      // Calculate Ethereum ecosystem TVL
      const ethProtocols = tvlData.filter((protocol) => protocol.chains?.includes("Ethereum"))
      if (ethProtocols.length > 0) {
        ethTvl = ethProtocols.reduce((sum, protocol) => sum + (protocol.tvl || 0), 0)
        usingRealEthData = true
        console.log(`Found ${ethProtocols.length} Ethereum protocols with total TVL: ${ethTvl}`)
      } else {
        console.log("No Ethereum protocols found in DefiLlama data, using fallback value")
      }

      console.log("Successfully fetched TVL data")
    } catch (tvlError) {
      console.error("Error fetching TVL data:", tvlError)
    }

    // Calculate growth rates based on historical data or use industry average
    // For now, using a fixed value as getting historical growth requires more complex API calls
    const defiGrowthRate = 27.3

    // Format the response
    const response = {
      totalAddressableMarket: usingRealMarketData ? marketData.data?.total_market_cap?.usd : 42800000000,
      defiTvl: usingRealTvlData ? totalTvl : 48500000000,
      tezosTvl: usingRealTezosData ? tezosTvl : 120000000,
      ethTvl: usingRealEthData ? ethTvl : 28500000000,
      defiGrowthRate: defiGrowthRate,
      projectedRevenue: 4200000, // Based on financial model
      targetRaise: 2500000,
      timestamp: new Date().toISOString(),
      isLive: usingRealMarketData || usingRealTvlData, // Consider data live if at least one source is real
      dataSources: {
        marketData: usingRealMarketData ? "CoinGecko API" : "Fallback",
        tvlData: usingRealTvlData ? "DefiLlama API" : "Fallback",
        tezosData: usingRealTezosData ? "DefiLlama API" : "Fallback",
        ethData: usingRealEthData ? "DefiLlama API" : "Fallback",
      },
      dataStatus: {
        marketData: usingRealMarketData,
        tvlData: usingRealTvlData,
        tezosData: usingRealTezosData,
        ethData: usingRealEthData,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching investor metrics:", error)

    // Return fallback data if all API calls fail
    return NextResponse.json({
      totalAddressableMarket: 42800000000,
      defiTvl: 48500000000,
      tezosTvl: 120000000,
      ethTvl: 28500000000,
      defiGrowthRate: 27.3,
      projectedRevenue: 4200000,
      targetRaise: 2500000,
      timestamp: new Date().toISOString(),
      isLive: false,
      dataSources: {
        marketData: "Fallback",
        tvlData: "Fallback",
        tezosData: "Fallback",
        ethData: "Fallback",
      },
      dataStatus: {
        marketData: false,
        tvlData: false,
        tezosData: false,
        ethData: false,
      },
    })
  }
}
