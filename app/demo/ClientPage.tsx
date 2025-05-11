"use client"

import { useEffect, useState } from "react"
import { BarChart3, DollarSign, RefreshCw, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

function EthereumComparison({ tezosTvl, ethTvl, isLiveData }) {
  // Calculate the ratio for the visual bar
  const total = tezosTvl + ethTvl
  const tezosPercentage = (tezosTvl / total) * 100
  const ethPercentage = (ethTvl / total) * 100

  // Format numbers for display
  const formatTVL = (value) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`
    }
    return `$${(value / 1000000).toFixed(1)}M`
  }

  return (
    <div className="border border-gray-800 rounded-lg p-6 mt-6">
      <h3 className="text-lg font-medium text-white mb-4 flex items-center">
        Tezos vs Ethereum TVL
        {isLiveData ? (
          <span className="ml-2 text-xs px-2 py-0.5 bg-emerald-900/50 text-emerald-400 rounded-full">Live</span>
        ) : (
          <span className="ml-2 text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded-full">Cached</span>
        )}
      </h3>

      <div className="flex items-center mb-2">
        <div className="w-24 text-sm text-emerald-400">Tezos</div>
        <div className="flex-1 h-6 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${tezosPercentage}%` }}></div>
        </div>
        <div className="w-24 text-right text-sm text-white">{formatTVL(tezosTvl)}</div>
      </div>

      <div className="flex items-center">
        <div className="w-24 text-sm text-blue-400">Ethereum</div>
        <div className="flex-1 h-6 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${ethPercentage}%` }}></div>
        </div>
        <div className="w-24 text-right text-sm text-white">{formatTVL(ethTvl)}</div>
      </div>

      <div className="mt-4 text-xs text-gray-400">
        <p>
          Tezos currently represents {((tezosTvl / ethTvl) * 100).toFixed(2)}% of Ethereum's TVL, showing significant
          growth potential.
        </p>
      </div>
    </div>
  )
}

function InvestorMetrics() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setIsRefreshing(true)
      const response = await fetch(`/api/investor-metrics?t=${Date.now()}`, {
        cache: "no-store", // Ensure we don't get a cached response
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
      }

      const newData = await response.json()
      setData(newData)
      setError(null)
    } catch (err) {
      console.error("Error fetching investor metrics:", err)
      setError(err.message)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleRefresh = () => {
    fetchData()
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="mb-6">
          <div className="bg-gray-800 animate-pulse h-12 rounded-md"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-800 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="h-8 w-8 rounded-full bg-gray-800 animate-pulse"></div>
              </div>
              <div className="h-5 bg-gray-800 animate-pulse mb-4 mx-auto w-3/4 rounded"></div>
              <div className="h-8 bg-gray-800 animate-pulse mb-2 mx-auto w-1/2 rounded"></div>
              <div className="h-3 bg-gray-800 animate-pulse mx-auto w-1/3 rounded"></div>
            </div>
          ))}
        </div>

        <div className="border border-gray-800 rounded-lg p-6 mt-6">
          <div className="h-5 bg-gray-800 animate-pulse mb-4 w-1/3 rounded"></div>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-24 h-4 bg-gray-800 animate-pulse rounded"></div>
              <div className="flex-1 h-6 bg-gray-800 animate-pulse rounded-full mx-2"></div>
              <div className="w-24 h-4 bg-gray-800 animate-pulse rounded"></div>
            </div>
            <div className="flex items-center">
              <div className="w-24 h-4 bg-gray-800 animate-pulse rounded"></div>
              <div className="flex-1 h-6 bg-gray-800 animate-pulse rounded-full mx-2"></div>
              <div className="w-24 h-4 bg-gray-800 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="mb-6">
          <div className="bg-red-950/50 border border-red-800 rounded-md px-4 py-3 text-center">
            <p className="text-red-400">Error loading data: {error}</p>
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              className="mt-2 border-red-800 text-red-400 hover:bg-red-950"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-800 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <DollarSign className="h-8 w-8 text-emerald-500" />
            </div>
            <h3 className="text-gray-300 mb-2">Total Addressable Market</h3>
            <p className="text-4xl font-bold text-white mb-1">$42.8B</p>
            <p className="text-xs text-emerald-500">Growing at 27.3% CAGR</p>
          </div>

          <div className="border border-gray-800 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <BarChart3 className="h-8 w-8 text-emerald-500" />
            </div>
            <h3 className="text-gray-300 mb-2">Projected Annual Revenue</h3>
            <p className="text-4xl font-bold text-white mb-1">$4.2M</p>
            <p className="text-xs text-emerald-500">By Year 3</p>
          </div>

          <div className="border border-gray-800 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-8 w-8 text-emerald-500" />
            </div>
            <h3 className="text-gray-300 mb-2">Target Raise</h3>
            <p className="text-4xl font-bold text-white mb-1">$2.5M</p>
            <p className="text-xs text-gray-400">Seed Round</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="mb-6 relative">
        <div className="bg-emerald-950/50 border border-emerald-800 rounded-md px-4 py-3 text-center">
          <div className="flex justify-between items-center">
            <div className="w-24">
              {isRefreshing && (
                <div className="animate-spin h-5 w-5 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto"></div>
              )}
            </div>
            <p className="text-emerald-400 flex-1">
              {data.isLive
                ? `Live Data: Market metrics updated every 5 minutes`
                : `Note: Using cached data due to API limitations`}
            </p>
            <div className="w-24 text-right">
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                disabled={isRefreshing}
                className="border-emerald-800 text-emerald-400 hover:bg-emerald-950"
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap justify-center gap-2 text-xs">
            <span
              className={`px-2 py-0.5 rounded-full ${data.dataStatus?.marketData ? "bg-emerald-900/50 text-emerald-400" : "bg-gray-800 text-gray-400"}`}
            >
              Market Data: {data.dataStatus?.marketData ? "Live" : "Cached"}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full ${data.dataStatus?.tvlData ? "bg-emerald-900/50 text-emerald-400" : "bg-gray-800 text-gray-400"}`}
            >
              DeFi TVL: {data.dataStatus?.tvlData ? "Live" : "Cached"}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full ${data.dataStatus?.tezosData ? "bg-emerald-900/50 text-emerald-400" : "bg-gray-800 text-gray-400"}`}
            >
              Tezos TVL: {data.dataStatus?.tezosData ? "Live" : "Cached"}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full ${data.dataStatus?.ethData ? "bg-emerald-900/50 text-emerald-400" : "bg-gray-800 text-gray-400"}`}
            >
              Ethereum TVL: {data.dataStatus?.ethData ? "Live" : "Cached"}
            </span>
          </div>

          {data.timestamp && (
            <p className="text-xs text-emerald-600 mt-1">
              Last updated: {new Date(data.timestamp).toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-gray-800 rounded-lg p-6 text-center">
          <div className="flex justify-center mb-4">
            <DollarSign className="h-8 w-8 text-emerald-500" />
          </div>
          <h3 className="text-gray-300 mb-2">Total Addressable Market</h3>
          <p className="text-4xl font-bold text-white mb-1">
            ${(data.totalAddressableMarket / 1000000000).toFixed(1)}B
          </p>
          <p className="text-xs text-emerald-500">Growing at {data.defiGrowthRate}% CAGR</p>
        </div>

        <div className="border border-gray-800 rounded-lg p-6 text-center">
          <div className="flex justify-center mb-4">
            <BarChart3 className="h-8 w-8 text-emerald-500" />
          </div>
          <h3 className="text-gray-300 mb-2">Projected Annual Revenue</h3>
          <p className="text-4xl font-bold text-white mb-1">${(data.projectedRevenue / 1000000).toFixed(1)}M</p>
          <p className="text-xs text-emerald-500">By Year 3</p>
        </div>

        <div className="border border-gray-800 rounded-lg p-6 text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-8 w-8 text-emerald-500" />
          </div>
          <h3 className="text-gray-300 mb-2">Target Raise</h3>
          <p className="text-4xl font-bold text-white mb-1">${(data.targetRaise / 1000000).toFixed(1)}M</p>
          <p className="text-xs text-gray-400">Seed Round</p>
        </div>
      </div>

      <EthereumComparison
        tezosTvl={data.tezosTvl}
        ethTvl={data.ethTvl}
        isLiveData={data.dataStatus?.tezosData && data.dataStatus?.ethData}
      />
    </div>
  )
}

export default function ClientPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto py-8">
        <InvestorMetrics />

        <div className="mt-8 border-t border-gray-800 pt-4">
          <div className="flex overflow-x-auto space-x-1 pb-2">
            <button className="px-4 py-2 text-gray-300 hover:text-white">Executive Summary</button>
            <button className="px-4 py-2 text-gray-300 hover:text-white">Market Opportunity</button>
            <button className="px-4 py-2 text-gray-300 hover:text-white">Product Demo</button>
            <button className="px-4 py-2 text-gray-300 hover:text-white">Financial Projections</button>
            <button className="px-4 py-2 bg-gray-800 text-white rounded">Team & Roadmap</button>
          </div>
        </div>
      </div>
    </div>
  )
}
