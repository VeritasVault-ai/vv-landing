"use client"
import { useState } from "react"
import type { ChainMetric } from "@/types/analytics"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import styles from "./chart-common.module.css"

interface ChainComparisonChartProps {
  data: ChainMetric[] | undefined
  isLoading: boolean
}

export function ChainComparisonChart({ data, isLoading }: ChainComparisonChartProps) {
  const [metric, setMetric] = useState<'transactionCount' | 'tvl' | 'userCount' | 'growth'>('tvl');
  
  const metricLabels = {
    transactionCount: 'Transaction Count',
    tvl: 'Total Value Locked',
    userCount: 'User Count',
    growth: 'Growth Rate'
  };
  
  if (isLoading) {
    return <div className={styles.skeleton}></div>;
  }
  
  if (!data || data.length === 0) {
    return <div className={styles.noData}>No data available</div>;
  }
  
  return (
    <div className={styles.chartContainer}>
      <div className={styles.controls}>
        <button
          className={`${styles.controlButton} ${metric === 'tvl' ? styles.active : ''}`}
          onClick={() => setMetric('tvl')}
        >
          Total Value Locked
        </button>
        <button
          className={`${styles.controlButton} ${metric === 'transactionCount' ? styles.active : ''}`}
          onClick={() => setMetric('transactionCount')}
        >
          Transaction Count
        </button>
        <button
          className={`${styles.controlButton} ${metric === 'userCount' ? styles.active : ''}`}
          onClick={() => setMetric('userCount')}
        >
          User Count
        </button>
        <button
          className={`${styles.controlButton} ${metric === 'growth' ? styles.active : ''}`}
          onClick={() => setMetric('growth')}
        >
          Growth Rate
        </button>
      </div>
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickFormatter={(value) => {
                if (metric === 'tvl') {
                  if (value >= 1000000000) {
                    return `$${(value / 1000000000).toFixed(1)}B`;
                  } else if (value >= 1000000) {
                    return `$${(value / 1000000).toFixed(1)}M`;
                  } else if (value >= 1000) {
                    return `$${(value / 1000).toFixed(1)}K`;
                  }
                  return `$${value}`;
                } else if (metric === 'transactionCount' || metric === 'userCount') {
                  if (value >= 1000000) {
                    return `${(value / 1000000).toFixed(1)}M`;
                  } else if (value >= 1000) {
                    return `${(value / 1000).toFixed(1)}K`;
                  }
                  return value;
                } else if (metric === 'growth') {
                  return `${(value * 100).toFixed(1)}%`;
                }
                return value;
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value, name, props) => {
                if (metric === 'tvl') {
                  if (value >= 1000000000) {
                    return [`$${(value as number / 1000000000).toFixed(2)}B`, metricLabels[metric]];
                  } else if (value >= 1000000) {
                    return [`$${(value as number / 1000000).toFixed(2)}M`, metricLabels[metric]];
                  } else if (value >= 1000) {
                    return [`$${(value as number / 1000).toFixed(2)}K`, metricLabels[metric]];
                  }
                  return [`$${value}`, metricLabels[metric]];
                } else if (metric === 'transactionCount' || metric === 'userCount') {
                  if (value >= 1000000) {
                    return [`${(value as number / 1000000).toFixed(2)}M`, metricLabels[metric]];
                  } else if (value >= 1000) {
                    return [`${(value as number / 1000).toFixed(2)}K`, metricLabels[metric]];
                  }
                  return [value, metricLabels[metric]];
                } else if (metric === 'growth') {
                  return [`${((value as number) * 100).toFixed(2)}%`, metricLabels[metric]];
                }
                return [value, name];
              }}
            />
            <Bar dataKey={metric} fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}