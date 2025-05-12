// src/lib/hooks/useDashboardMetrics.ts
'use client';

import { useState, useEffect } from 'react';

export interface DashboardMetrics {
  portfolioValue: { value: string; change: string; updatedAt: string };
  activeStrategies: { value: number; optimized: number; updatedAt: string };
  riskScore: { value: string; status: string; details: string };
}

export function useDashboardMetrics() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    portfolioValue: { value: '$0', change: '0%', updatedAt: '' },
    activeStrategies: { value: 0, optimized: 0, updatedAt: '' },
    riskScore: { value: 'N/A', status: '', details: '' },
  });

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await fetch('/api/dashboard/metrics');
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data: DashboardMetrics = await res.json();
        setMetrics(data);
      } catch (err) {
        console.error('Failed to fetch dashboard metrics:', err);
      }
    }
    fetchMetrics();
  }, []);

  return metrics;
}
