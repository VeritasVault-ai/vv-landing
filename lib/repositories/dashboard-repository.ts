/**
 * TEMPORARY FILE - PART OF CODEBASE MIGRATION
 * 
 * This is a temporary repository module that provides mock data for dashboard API routes.
 * 
 * TODO: Once the proper data layer is implemented, this file should be replaced with
 * a proper repository implementation or imports should be updated to point to the
 * correct location in the src/ directory structure.
 */

// Mock data for dashboard overview
export const getDashboardOverview = async () => {
  return {
    stats: {
      totalUsers: 12483,
      activeUsers: 8976,
      totalTransactions: 145832,
      averageValue: 3245.87
    },
    recentActivity: [
      { id: 1, type: 'transaction', user: 'user123', amount: 1250, timestamp: new Date().toISOString() },
      { id: 2, type: 'deposit', user: 'user456', amount: 5000, timestamp: new Date().toISOString() },
      { id: 3, type: 'withdrawal', user: 'user789', amount: 2500, timestamp: new Date().toISOString() }
    ],
    topPerformers: [
      { id: 1, name: 'Strategy Alpha', performance: 12.5 },
      { id: 2, name: 'Strategy Beta', performance: 10.2 },
      { id: 3, name: 'Strategy Gamma', performance: 8.7 }
    ]
  };
};

// Mock data for dashboard performance
export const getDashboardPerformance = async () => {
  return {
    daily: [
      { date: '2025-05-01', value: 1250 },
      { date: '2025-05-02', value: 1300 },
      { date: '2025-05-03', value: 1280 },
      { date: '2025-05-04', value: 1320 },
      { date: '2025-05-05', value: 1350 },
      { date: '2025-05-06', value: 1400 },
      { date: '2025-05-07', value: 1420 }
    ],
    weekly: [
      { date: '2025-W18', value: 8500 },
      { date: '2025-W19', value: 9200 },
      { date: '2025-W20', value: 8900 },
      { date: '2025-W21', value: 9500 }
    ],
    monthly: [
      { date: '2025-01', value: 35000 },
      { date: '2025-02', value: 38000 },
      { date: '2025-03', value: 37500 },
      { date: '2025-04', value: 42000 },
      { date: '2025-05', value: 40000 }
    ]
  };
};