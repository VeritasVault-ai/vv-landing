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
 * React hook for retrieving and managing voting overview data with support for loading, error, and fallback states.
 *
 * Fetches voting overview data asynchronously and updates in real-time when voting power changes. If fetching fails, fallback data is used if enabled.
 *
 * @param options - Optional configuration for fallback behavior and custom fallback data.
 * @returns An object containing the loading state, voting overview data (or fallback), error message, and a flag indicating if fallback data is in use.
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

    /**
     * Fetches the latest voting overview data and updates state, using fallback data if retrieval fails and fallback is enabled.
     *
     * @remark
     * Only updates state if the component is still mounted.
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

  return {
    loading,
    data,
    error,
    usedFallback
  }
}