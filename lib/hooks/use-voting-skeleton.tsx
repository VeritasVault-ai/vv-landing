import { useState, useEffect } from "react"
import { VotingOverview as VotingOverviewType } from "@/lib/repositories/voting-repository"
import { votingService } from "@/lib/services/voting-service"
import { votingEvents } from "@/lib/events/voting-events"

// Default fallback data
const DEFAULT_FALLBACK_DATA: VotingOverviewType = {
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

/**
 * Hook for managing voting data with loading, error, and fallback states.
 * 
 * @param options Configuration options for the hook
 * @param options.useFallback Whether to use fallback data when the API call fails (default: true)
 * @param options.fallbackData Custom fallback data to use (optional)
 * @returns Object containing loading state, data, error message, and fallback status
 */
export function useVotingSkeleton({ 
  useFallback = true, 
  fallbackData = DEFAULT_FALLBACK_DATA 
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

  return {
    loading,
    data,
    error,
    usedFallback
  }
}