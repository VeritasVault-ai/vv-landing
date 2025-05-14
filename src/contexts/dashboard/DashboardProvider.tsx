'use client'

import { useState, useEffect, ReactNode } from 'react';
import { DashboardContext } from './DashboardContext';
import type { 
  DashboardSettings, 
  DashboardOverview, 
  DashboardPerformance 
} from './types';

// Default settings
const DEFAULT_SETTINGS: DashboardSettings = {
  visibleMetrics: {
    portfolioValue: true,
    activeStrategies: true,
    riskScore: true,
  },
  refreshRates: {
    portfolioValue: 20, // 20 seconds
    riskScore: 60, // 60 seconds
    performance: 90, // 90 seconds
    modelResults: 45, // 45 seconds
    voting: 30, // 30 seconds
  },
  theme: "system",
  compactView: false,
};

// Mock service for demo purposes
const mockDashboardService = {
  getDashboardOverview: async (): Promise<DashboardOverview> => {
    return {
      portfolioValue: {
        current: 1250000,
        percentageChange: 2.5,
        lastUpdated: new Date().toISOString(),
      },
      riskScore: {
        level: 3,
        status: 'medium',
        description: 'Moderate risk exposure with balanced allocation',
      },
      activeStrategies: [
        {
          id: 'strategy-1',
          name: 'Balanced Growth',
          status: 'active',
          performance: 3.2,
        },
        {
          id: 'strategy-2',
          name: 'Income Generation',
          status: 'active',
          performance: 1.8,
        },
      ],
      lastUpdated: new Date().toISOString(),
    };
  },
  getDashboardPerformance: async (): Promise<DashboardPerformance> => {
    return {
      topPerformers: [
        {
          id: 'asset-1',
          name: 'Technology Fund',
          symbol: 'TECH',
          performance: 8.5,
          value: 125000,
        },
        {
          id: 'asset-2',
          name: 'Healthcare ETF',
          symbol: 'HLTH',
          performance: 6.2,
          value: 98000,
        },
      ],
      underperformers: [
        {
          id: 'asset-3',
          name: 'Energy Sector',
          symbol: 'ENRG',
          performance: -2.1,
          value: 75000,
        },
        {
          id: 'asset-4',
          name: 'Real Estate Trust',
          symbol: 'REIT',
          performance: -1.5,
          value: 110000,
        },
      ],
      historicalPerformance: Array.from({ length: 12 }, (_, i) => ({
        date: new Date(Date.now() - (11 - i) * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        value: 1000000 + Math.random() * 300000,
      })),
      lastUpdated: new Date().toISOString(),
    };
  },
};

interface DashboardProviderProps {
  children: ReactNode;
}

/**
 * Provider component for dashboard context
 * 
 * Manages dashboard state and provides it to children components
 */
export function DashboardProvider({ children }: DashboardProviderProps) {
  // Dashboard data
  const [overviewData, setOverviewData] = useState<DashboardOverview | null>(null);
  const [performanceData, setPerformanceData] = useState<DashboardPerformance | null>(null);
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState({
    overview: true,
    performance: true,
  });
  const [errors, setErrors] = useState({
    overview: null as string | null,
    performance: null as string | null,
  });
  
  // User settings with persistence
  const [settings, setSettings] = useState<DashboardSettings>(() => {
    // Try to load settings from localStorage
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("dashboardSettings");
      if (savedSettings) {
        try {
          return JSON.parse(savedSettings) as DashboardSettings;
        } catch (e) {
          console.error("Failed to parse saved dashboard settings", e);
        }
      }
    }
    return DEFAULT_SETTINGS;
  });
  
  // Active tab state
  const [activeTab, setActiveTab] = useState("overview");
  
  // Update settings and save to localStorage
  const updateSettings = (newSettings: Partial<DashboardSettings>) => {
    setSettings(prevSettings => {
      const updated = {
        ...prevSettings,
        ...newSettings,
        // Handle nested objects
        visibleMetrics: {
          ...prevSettings.visibleMetrics,
          ...(newSettings.visibleMetrics || {}),
        },
        refreshRates: {
          ...prevSettings.refreshRates,
          ...(newSettings.refreshRates || {}),
        },
      };
      
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("dashboardSettings", JSON.stringify(updated));
      }
      
      return updated;
    });
  };
  
  // Fetch dashboard overview data
  const fetchOverviewData = async () => {
    try {
      setIsLoading(prev => ({ ...prev, overview: true }));
      const data = await mockDashboardService.getDashboardOverview();
      setOverviewData(data);
      setErrors(prev => ({ ...prev, overview: null }));
    } catch (err) {
      console.error("Error fetching dashboard overview:", err);
      setErrors(prev => ({ ...prev, overview: "Failed to load dashboard data" }));
    } finally {
      setIsLoading(prev => ({ ...prev, overview: false }));
    }
  };
  
  // Fetch dashboard performance data
  const fetchPerformanceData = async () => {
    try {
      setIsLoading(prev => ({ ...prev, performance: true }));
      const data = await mockDashboardService.getDashboardPerformance();
      setPerformanceData(data);
      setErrors(prev => ({ ...prev, performance: null }));
    } catch (err) {
      console.error("Error fetching dashboard performance:", err);
      setErrors(prev => ({ ...prev, performance: "Failed to load performance data" }));
    } finally {
      setIsLoading(prev => ({ ...prev, performance: false }));
    }
  };
  
  // Refresh data manually
  const refreshData = async (section?: "overview" | "performance" | "models" | "voting") => {
    if (!section || section === "overview") {
      await fetchOverviewData();
    }
    if (!section || section === "performance") {
      await fetchPerformanceData();
    }
    // Add other sections as needed
  };
  
  // Initial data fetch
  useEffect(() => {
    fetchOverviewData();
    fetchPerformanceData();
  }, []);
  
  const contextValue = {
    overviewData,
    performanceData,
    isLoading,
    errors,
    settings,
    updateSettings,
    activeTab,
    setActiveTab,
    refreshData,
  };
  
  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
}