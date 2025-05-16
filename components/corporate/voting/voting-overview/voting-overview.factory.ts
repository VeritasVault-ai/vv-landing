import { votingEvents } from "@/lib/events/voting-events"
import { VotingOverview as VotingOverviewType } from "@/lib/repositories/voting-repository"
import { votingService } from "@/lib/services/voting-service"
import { isValidEthereumAddress, isValidPositiveNumber } from "@/lib/utils/validation"
import { useEffect, useState } from "react"
import { mockVotingOverview } from "../voting-overview.mock"

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
  useMsw = false 
}: VotingOverviewFactoryOptions = {}) {
  const [data, setData] = useState<VotingOverviewType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usedFallback, setUsedFallback] = useState(false)
  const [isMockData, setIsMockData] = useState(false)
  const [delegationLoading, setDelegationLoading] = useState(false)

  useEffect(() => {
    let isMounted = true
    const isMswEnabled = useMsw || process.env.NEXT_PUBLIC_API_MOCKING === 'enabled' 

    async function fetchData() {
      try {
        // When MSW is enabled, it will intercept this request
        // and return mock data automatically
        const result = await votingService.getVotingOverview()
        
        if (isMounted) {
          setData(result)
          // If MSW is enabled, we're using mocks but NOT fallback data
          setIsMockData(isMswEnabled)
          setUsedFallback(false)
        }
      } catch (err) {
        console.error('Error fetching voting overview:', err)
        
        if (isMounted && !isMswEnabled) {
          setError('Failed to load voting data. Using fallback data instead.')
          
          if (useFallback) {
            setData(fallbackData)
            setUsedFallback(true)
            setIsMockData(true) // Fallback data is also mock data
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
        setIsMockData(false) // Real-time data from events is not mock data
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

  // Use this function to safely check MSW status at runtime
  const checkMswEnabled = () => useMsw || process.env.NEXT_PUBLIC_API_MOCKING === 'enabled';

  return {
    loading,
    data,
    error,
    usedFallback,
    isMockData, // Expose the new flag to consumers
    chartConfig,
    colors: VOTING_CHART_COLORS,
    delegationLoading,
    // Add methods that interact with the API (which MSW will intercept)
    delegateVotes: async (address: string, amount: number) => {
      // Validate inputs
      if (!address || address.trim() === '') {
        setError('Invalid address provided.');
        return false;
      }
      
      // Check for valid Ethereum address format
      if (!isValidEthereumAddress(address)) {
        setError('Please provide a valid Ethereum address.');
        return false;
      }
      
      // Validate amount
      if (!isValidPositiveNumber(amount)) {
        setError('Amount must be a positive number.');
        return false;
      }
      
      // Check if amount exceeds available voting power
      const availableVotes = data?.votingPower?.votes || 0;
      if (amount > availableVotes) {
        setError(`Cannot delegate more than your available voting power (${availableVotes}).`);
        return false;
      }
      
      // Reset error state and set loading
      setError(null);
      setDelegationLoading(true);
      
      try {
        const response = await fetch('/api/voting/delegate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address, amount })
        });
        
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        const result = await response.json();
        
        if (result.success && result.overview) {
          setData(result.overview);
          setUsedFallback(false);
          // Use the same MSW check at runtime
          setIsMockData(checkMswEnabled()); 
          return true;
        }
        
        // Set error message from API response or default message
        setError(result.message || 'Failed to delegate votes.');
        return false;
      } catch (err) {
        console.error('Error delegating votes:', err);
        setError('Failed to delegate votes. Please try again later.');
        return false;
      } finally {
        setDelegationLoading(false);
      }
    }
  }
}