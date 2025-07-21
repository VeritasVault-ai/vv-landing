import { useState, useEffect } from "react"
import { VotingOverview as VotingOverviewType } from "@/lib/repositories/voting-repository"
import { votingService } from "@/lib/services/voting-service"
import { votingEvents } from "@/lib/events/voting-events"
import { MOCK_VOTING_OVERVIEW, VOTING_CHART_COLORS } from "@/mocks/data/voting";

/**
 * React hook for managing voting overview data, state, and chart configuration.
 *
 * Fetches voting overview information, handles loading and error states, supports fallback data on fetch failure, and subscribes to real-time updates. Returns state, data, and chart configuration for use in the VotingOverview component.
 *
 * @param options - Optional configuration for fallback behavior and fallback data.
 * @returns An object containing loading state, voting overview data (or fallback), error message, fallback usage flag, and chart configuration for visualization.
 *
 * @remark If data fetching fails and fallback is enabled, the hook uses the provided fallback data and sets {@link usedFallback} to true.
 */
export function useVotingOverviewModule({
  useFallback = true,
  fallbackData = MOCK_VOTING_OVERVIEW
}: {
  useFallback?: boolean;
  fallbackData?: VotingOverviewType;
} = {}) {
  const [data, setData] = useState<VotingOverviewType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usedFallback, setUsedFallback] = useState(false)

  useEffect(() => {
    let isMounted = true

    /**
     * Fetches the latest voting overview data and updates state, optionally falling back to predefined data on failure.
     *
     * @remark
     * If data fetching fails and {@link useFallback} is true, fallback data is used and the error state is set.
     */
    async function fetchData() {
      try {
        const result = await votingService.getVotingOverview()
        
        if (isMounted) {
          setData(result)
          setUsedFallback(false)
        }
      } catch (err) {
        console.error('Error fetching voting overview:', err)
        
        if (isMounted) {
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

    // Subscribe to voting-power-changed events for real-time updates
    const unsubscribe = votingEvents.subscribe('voting-power-changed', ({ overview }) => {
      if (isMounted) {
        setData(overview)
        setUsedFallback(false)
      }
    })

    // Clean up subscription and prevent state updates if component unmounts
    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [useFallback, fallbackData])

  // Create chart configuration
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
    chartConfig
  }
}