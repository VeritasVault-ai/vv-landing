"use client"

// Common types
export type ID = string | number

// User related types
export interface User {
  id: ID
  name: string
  email: string
  role: "admin" | "user"
  avatar?: string
  createdAt: string
  updatedAt: string
}

// Strategy related types
export interface Strategy {
  id: ID
  name: string
  description: string
  risk_level: string
  target_apy: number
  stable_pairs_percentage: number
  medium_volatility_percentage: number
  high_volatility_percentage: number
  status: string
  user_id: ID
  createdAt: string
  updatedAt: string
}

// Pool related types
export interface LiquidityPool {
  id: ID
  name: string
  protocol: string
  pair: string
  tvl: number
  apy: number
  risk_level: string
  chain: string
  address: string
  createdAt: string
  updatedAt: string
}

// Performance metrics
export interface PerformanceMetrics {
  id: ID
  strategyId: ID
  totalReturn: number
  dailyReturns: DailyReturn[]
  startDate: string
  endDate: string
}

export interface DailyReturn {
  date: string
  value: number
}

// Content types for dynamic UI elements
export interface ContentBlock {
  id: string
  title: string
  content: string
  page: string
  position: string
  type: string
  metadata?: Record<string, any>
}

// Navigation types
export interface NavigationItem {
  id: string
  label: string
  href: string
  icon?: string
  parent_id?: string
  order?: number
  group?: string
  featured?: boolean
  created_at?: string
  updated_at?: string
}

// Settings type
export interface Settings {
  id: ID
  key: string
  value: any
  type: "string" | "number" | "boolean" | "json"
  description?: string
  updatedAt: string
}

export interface Activity {
  id: string
  user_id: string
  type: string
  description: string
  metadata?: Record<string, any>
  created_at: string
}

export interface Portfolio {
  id: string
  user_id: string
  name: string
  description: string
  created_at: string
  updatedAt: string
}

/**
 * Protocol asset allocation type
 * Used for representing protocol-level asset allocations
 */
export interface ProtocolAssetAllocation {
  totalValueLockedUSD: string
  name: string
  asset_id: string
  percentage: number
  color: string
  protocol: string
}

export interface RiskFactor {
  factor: string
  severity: "Low" | "Medium" | "High"
  description: string
  impact: string
}

export interface MitigationStrategy {
  strategy: string
  description: string
  effectiveness: "Low" | "Medium" | "High"
}

export interface MarketConditions {
  current_assessment: string
  outlook: string
}

export interface RiskAssessment {
  id: string
  pool_id?: string
  strategy_id?: string
  assessment: {
    overall_risk_score: number
    risk_factors: RiskFactor[]
    mitigation_strategies: MitigationStrategy[]
    market_conditions: MarketConditions
    recommendations: string[]
  }
  created_at: string
  updated_at?: string
}

export interface Event {
  id: string
  user_id: string
  type: string
  description: string
  metadata?: Record<string, any>
  created_at: string
}