import { useState, useEffect } from "react"
import { VotingOverview as VotingOverviewType } from "@/lib/repositories/voting-repository"
import { votingService } from "@/lib/services/voting-service"
import { votingEvents } from "@/lib/events/voting-events"
import { MOCK_VOTING_OVERVIEW, VOTING_CHART_COLORS } from "@/mocks/data/voting";

/**
 * Module hook for VotingOverview component.
 * Handles data fetching, state management, and business logic.
 * 
 * @param options Configuration options
 * @returns State and data for the VotingOverview component
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