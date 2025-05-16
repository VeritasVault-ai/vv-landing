/**
 * Dashboard domain types
 * Contains all types related to system monitoring and dashboards
 */
import { BaseWebSocketData } from './websocket-infrastructure';

// Performance metrics - domain value object
export interface PerformanceMetrics {
  cpu: number;
  memory: number;
  latency: number;
}

// WebSocket data payload for dashboard domain
export interface DashboardData extends BaseWebSocketData {
  activeUsers: number;
  systemStatus: 'healthy' | 'warning' | 'critical';
  recentTransactions: number;
  performanceMetrics: PerformanceMetrics;
  lastUpdated: string;
  isSimulated?: boolean; // Flag to indicate simulation mode
}