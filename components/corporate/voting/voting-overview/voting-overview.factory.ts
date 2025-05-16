import { VotingOverview as VotingOverviewType } from "@/lib/repositories/voting-repository"
import { votingService } from "@/lib/services/voting-service"
import { votingEvents } from "@/lib/events/voting-events"
import { useState, useEffect } from "react"
import { mockVotingOverview } from "./voting-overview.mock"

// Chart colors
export const VOTING_CHART_COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

type VotingOverviewFactoryOptions = {
  useFallback?: boolean
  fallbackData?: VotingOverviewType
  useMsw?: boolean  // New option to use MSW instead of direct mock injection
}

/**
 * Factory hook for creating VotingOverview instances
 */
export function createVotingOverview({
  useFallback = true,
  fallbackData = mockVotingOverview,
  useMsw = process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
}: VotingOverviewFactoryOptions = {}) {
  const [data, setData] = useState<VotingOverviewType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usedFallback, setUsedFallback] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      try {
        // When MSW is enabled, it will intercept this request
        // and return mock data automatically
        const result = await votingService.getVotingOverview()
        
        if (isMounted) {
          setData(result)
          // If MSW is enabled, we're technically using mocks but not fallback
          setUsedFallback(useMsw)
        }
      } catch (err) {
        console.error('Error fetching voting overview:', err)
        
        if (isMounted && !useMsw) {
          setError('Failed to load voting data. Using fallback data instead.')
          
          if (useFallback) {
            setData(fallbackData)
            setUsedFallback(true)
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    // Subscribe to voting-power-changed events
    const unsubscribe = votingEvents.subscribe('voting-power-changed', ({ overview }) => {
      if (isMounted) {
        setData(overview)
        setUsedFallback(false)
      }
    })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [useFallback, fallbackData, useMsw])

  // Chart config creation remains the same
  const chartConfig = data?.votingPowerDistribution?.reduce(
    (acc, item, index) => {
      acc[item.name] = {
        label: item.name,
        color: VOTING_CHART_COLORS[index % VOTING_CHART_COLORS.length],
      }
      return acc
    },
    {} as Record<string, { label: string; color: string }>,
  ) || {}

  return {
    loading,
    data,
    error,
    usedFallback,
    chartConfig,
    colors: VOTING_CHART_COLORS,
    // Add methods that interact with the API (which MSW will intercept)
    delegateVotes: async (address: string, amount: number) => {
      try {
        const response = await fetch('/api/voting/delegate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address, amount })
        })
        const result = await response.json()
        if (result.success && result.overview) {
          setData(result.overview)
          return true
        }
        return false
      } catch (err) {
        console.error('Error delegating votes:', err)
        return false
      }
    }
  }
}