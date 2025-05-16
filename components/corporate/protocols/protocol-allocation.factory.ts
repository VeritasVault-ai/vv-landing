import { useState, useEffect } from 'react';
import { AssetAllocation } from '@/lib/models/types';
import { mockProtocolAllocations } from './protocol-allocation.mock';

// Chart colors - could be moved to a theme constants file
export const PROTOCOL_CHART_COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

type ProtocolAllocationFactoryOptions = {
  useFallback?: boolean;
  fallbackData?: AssetAllocation[];
  useMsw?: boolean;
}

type ProtocolAllocationState = {
  loading: boolean;
  data: AssetAllocation[] | null;
  error: string | null;
  usedFallback: boolean;
  totalValue: number;
}

/**
 * Factory hook for creating ProtocolAllocation instances
 * Handles data fetching, state management, and configuration
 */
export function createProtocolAllocation({
  useFallback = true,
  fallbackData = mockProtocolAllocations,
  useMsw = process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
}: ProtocolAllocationFactoryOptions = {}) {
  const [state, setState] = useState<ProtocolAllocationState>({
    loading: true,
    data: null,
    error: null,
    usedFallback: false,
    totalValue: 0
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        // When MSW is enabled, it will intercept this request
        const response = await fetch('/api/goldsky/protocols');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch protocol data: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (isMounted) {
          // Calculate total value for percentage calculations
          const totalValue = data.reduce(
            (sum: number, protocol: AssetAllocation) => 
              sum + parseFloat(protocol.totalValueLockedUSD), 
            0
          );
          
          setState({
            loading: false,
            data,
            error: null,
            usedFallback: useMsw, // If MSW is enabled, we're using mocks
            totalValue
          });
        }
      } catch (err) {
        console.error('Error fetching protocol allocation:', err);
        
        if (isMounted && useFallback) {
          const totalValue = fallbackData.reduce(
            (sum: number, protocol: AssetAllocation) => 
              sum + parseFloat(protocol.totalValueLockedUSD), 
            0
          );
          
          setState({
            loading: false,
            data: fallbackData,
            error: err instanceof Error ? err.message : 'Failed to load protocol data',
            usedFallback: true,
            totalValue
          });
        } else if (isMounted) {
          setState(prev => ({
            ...prev,
            loading: false,
            error: err instanceof Error ? err.message : 'Failed to load protocol data',
          }));
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [useFallback, fallbackData, useMsw]);

  // Create chart configuration
  const chartConfig = state.data?.reduce(
    (acc, item, index) => {
      acc[item.name] = {
        label: item.name,
        color: item.color || PROTOCOL_CHART_COLORS[index % PROTOCOL_CHART_COLORS.length],
      };
      return acc;
    },
    {} as Record<string, { label: string; color: string }>,
  ) || {};

  // Calculate percentages for each protocol
  const dataWithPercentages = state.data?.map(protocol => ({
    ...protocol,
    percentage: (parseFloat(protocol.totalValueLockedUSD) / state.totalValue * 100).toFixed(1)
  }));

  return {
    loading: state.loading,
    data: dataWithPercentages,
    error: state.error,
    usedFallback: state.usedFallback,
    chartConfig,
    colors: PROTOCOL_CHART_COLORS,
    totalValue: state.totalValue
  };
}