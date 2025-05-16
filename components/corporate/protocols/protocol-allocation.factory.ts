import { useState, useEffect } from 'react';
import { AssetAllocation } from '@/lib/models/types';
import { mockProtocolAllocations } from '@/mocks/data/protocols';

// Chart colors - could be moved to a theme constants file
export const PROTOCOL_CHART_COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

type ProtocolAllocationFactoryOptions = {
  useFallback?: boolean;
  fallbackData?: AssetAllocation[];
}

/**
 * Factory hook for creating ProtocolAllocation instances
 * Handles data fetching, state management, and configuration
 */
export function createProtocolAllocation({
  useFallback = true,
  fallbackData = mockProtocolAllocations
}: ProtocolAllocationFactoryOptions = {}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AssetAllocation[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [usedFallback, setUsedFallback] = useState(false);
  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        // MSW will intercept this request when enabled
        const response = await fetch('/api/goldsky/protocols');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch protocol data: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (isMounted) {
          setData(result);
          setUsedFallback(false);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching protocol allocation:', err);
        
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load protocol data');
          
          if (useFallback) {
            setData(fallbackData);
            setUsedFallback(true);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [useFallback, fallbackData]);

  // Calculate total value for percentages
  const totalValue = data?.reduce(
    (sum, protocol) => sum + parseFloat(protocol.totalValueLockedUSD), 
    0
  ) || 0;

  // Create chart configuration
  const chartConfig = data?.reduce(
    (acc, item, index) => {
      acc[item.name] = {
        label: item.name,
        color: item.color || PROTOCOL_CHART_COLORS[index % PROTOCOL_CHART_COLORS.length],
      };
      return acc;
    },
    {} as Record<string, { label: string; color: string }>,
  ) || {};

  return {
    loading,
    data,
    error,
    usedFallback,
    chartConfig,
    colors: PROTOCOL_CHART_COLORS,
    totalValue
  };
}