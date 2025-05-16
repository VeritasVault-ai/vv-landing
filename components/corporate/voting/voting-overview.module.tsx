import { useState, useEffect } from "react"
import { VotingOverview as VotingOverviewType } from "@/lib/repositories/voting-repository"
import { votingService } from "@/lib/services/voting-service"
import { votingEvents } from "@/lib/events/voting-events"

// Default fallback data
export const FALLBACK_DATA: VotingOverviewType = {
  votingPower: {
    percentage: 5.2,
    votes: 52000,
    totalVotes: 1000000
  },
  participation: {
    participated: 12,
    totalProposals: 15,
    rate: 80,
    comparedToAverage: 15
  },
  votingPowerDistribution: [
    { name: "Core Team", value: 15 },
    { name: "Community", value: 45 },
    { name: "Treasury", value: 40 }
  ],
  delegations: [
    { address: "0x1a2...3b4c", timeAgo: "2 days ago", votes: 12000 },
    { address: "0x5d6...7e8f", timeAgo: "1 week ago", votes: 8000 },
    { address: "0x9a0...1b2c", timeAgo: "3 weeks ago", votes: 5000 }
  ]
}

// Chart colors
export const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

/**
 * Module hook for VotingOverview component.
 * Handles data fetching, state management, and business logic.
 * 
 * @param options Configuration options
 * @returns State and data for the VotingOverview component
 */
export function useVotingOverviewModule({
  useFallback = true,
  fallbackData = FALLBACK_DATA
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
        color: COLORS[index % COLORS.length],
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