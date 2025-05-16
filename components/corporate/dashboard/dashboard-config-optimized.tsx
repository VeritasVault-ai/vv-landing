import { JSX, ReactNode } from 'react'
import {
  Activity,
  BarChart3,
  BarChartHorizontal,
  Bell,
  Briefcase,
  Calculator,
  Coins,
  Eye,
  Layers,
  LayoutDashboard,
  LineChart,
  PieChart,
  ShieldAlert,
  TrendingUp,
  Users,
  Vote,
  Wallet
} from 'lucide-react'
import { LazyDashboardComponent } from '../lazy-dashboard-component'

// Define dashboard category types
export type DashboardCategory = 'main' | 'analytics' | 'portfolio' | 'admin' | 'tools'

// Define dashboard configuration interface
export interface DashboardConfig {
  id: string
  name: string
  icon: ReactNode
  component: () => JSX.Element
  description: string
  path: string
  category: DashboardCategory
}

// Define dashboard categories mapping
export const dashboardCategories: Record<DashboardCategory, string[]> = {
  main: [
    'corporate',
    'consumer',
    'tezos-liquidity',
    'market'
  ],
  analytics: [
    'analytics',
    'performance',
    'onchain',
    'offchain',
    'ai-analytics'
  ],
  portfolio: [
    'portfolio',
    'watchlist',
    'model-portfolio',
    'treasury'
  ],
  admin: [
    'admin',
    'events',
    'voting'
  ],
  tools: [
    'strategies',
    'risk-assessment',
    'flash-loans'
  ]
}

// Define category display names
export const categoryDisplayNames: Record<DashboardCategory, string> = {
  main: 'Main',
  analytics: 'Analytics',
  portfolio: 'Portfolio',
  admin: 'Administration',
  tools: 'Tools'
}

// Get dashboards by category
export const getDashboardsByCategory = (
  dashboards: DashboardConfig[],
  category: DashboardCategory
): DashboardConfig[] => {
  return dashboards.filter(dash => dashboardCategories[category].includes(dash.id))
}

// Function to create dashboard configurations with lazy loading
export const createDashboardConfig = (
  styles: Record<string, string>
): DashboardConfig[] => {
  return [
    {
      id: 'corporate',
      name: 'Corporate Dashboard',
      icon: <LayoutDashboard size={18} />,
      component: () => (
        <LazyDashboardComponent 
          componentPath="src/components/dashboard/CorporateDashboard" 
        />
      ),
      description: 'Enterprise liquidity management dashboard',
      path: '/corporate/dashboard',
      category: 'main'
    },
    {
      id: 'consumer',
      name: 'Consumer Dashboard',
      icon: <Users size={18} />,
      component: () => (
        <LazyDashboardComponent 
          componentPath="src/components/features/consumer/dashboard/consumer-dashboard" 
        />
      ),
      description: 'Multi-chain analytics and insights for consumers',
      path: '/corporate/dashboard/consumer',
      category: 'main'
    },
    {
      id: 'tezos-liquidity',
      name: 'Veritas Vault - Tezos Liquidity',
      icon: <Coins size={18} />,
      component: () => (
        <div className={styles.dashboardWrapper}>
          <h2 className={styles.sectionTitle}>Tezos Liquidity Management</h2>
          <div className={styles.dashboardSection}>
            <LazyDashboardComponent 
              componentPath="app/corporate/dashboard/overview" 
            />
          </div>
        </div>
      ),
      description: 'AI-powered Tezos liquidity management',
      path: '/corporate/dashboard/tezos',
      category: 'main'
    },
    {
      id: 'market',
      name: 'Market Dashboard',
      icon: <BarChart3 size={18} />,
      component: () => (
        <LazyDashboardComponent 
          componentPath="src/components/features/market-data/market-dashboard" 
        />
      ),
      description: 'Real-time market data and analytics',
      path: '/corporate/dashboard/market',
      category: 'main'
    },
    {
      id: 'analytics',
      name: 'Analytics Dashboard',
      icon: <Activity size={18} />,
      component: () => (
        <LazyDashboardComponent 
          componentPath="src/components/features/analytics/analytics-dashboard" 
        />
      ),
      description: 'Platform analytics and insights',
      path: '/corporate/dashboard/analytics',
      category: 'analytics'
    },
    {
      id: 'admin',
      name: 'Admin Dashboard',
      icon: <ShieldAlert size={18} />,
      component: () => (
        <LazyDashboardComponent 
          componentPath="src/components/features/admin/admin-dashboard" 
        />
      ),
      description: 'System administration and monitoring',
      path: '/corporate/dashboard/admin',
      category: 'admin'
    },
    {
      id: 'events',
      name: 'Event Grid',
      icon: <Bell size={18} />,
      component: () => (
        <LazyDashboardComponent 
          componentPath="src/components/features/event-grid/event-grid-dashboard" 
        />
      ),
      description: 'Monitor real-time blockchain events',
      path: '/corporate/dashboard/events',
      category: 'admin'
    },
    {
      id: 'treasury',
      name: 'Treasury Dashboard',
      icon: <Wallet size={18} />,
      component: () => (
        <LazyDashboardComponent 
          componentPath="app/corporate-version/solutions/treasury/components/treasury-dashboard" 
        />
      ),
      description: 'Comprehensive view of your treasury operations',
      path: '/corporate/dashboard/treasury',
      category: 'portfolio'
    },
    {
      id: 'portfolio',
      name: 'Portfolio Dashboard',
      icon: <Briefcase size={18} />,
      component: () => (
        <LazyDashboardComponent 
          componentPath="src/components/features/consumer/dashboard/consumer-dashboard"
          defaultTab="portfolio" 
        />
      ),
      description: 'Portfolio overview and management',
      path: '/corporate/dashboard/portfolio',
      category: 'portfolio'
    },
    {
      id: 'watchlist',
      name: 'Watchlist Dashboard',
      icon: <Eye size={18} />,
      component: () => (
        <LazyDashboardComponent 
          componentPath="src/components/features/consumer/dashboard/consumer-dashboard"
          defaultTab="watchlist" 
        />
      ),
      description: 'Monitor assets on your watchlist',
      path: '/corporate/dashboard/watchlist',
      category: 'portfolio'
    },
    {
      id: 'performance',
      name: 'Performance Dashboard',
      icon: <TrendingUp size={18} />,
      component: () => (
        <LazyDashboardComponent 
          componentPath="components/corporate/dashboard-performance" 
        />
      ),
      description: 'Portfolio performance and metrics',
      path: '/corporate/dashboard/performance',
      category: 'analytics'
    },
    {
      id: 'model-portfolio',
      name: 'Model Portfolio',
      icon: <PieChart size={18} />,
      component: () => (
        <LazyDashboardComponent 
          componentPath="src/components/features/consumer/model-portfolio/model-portfolio-dashboard"
          modelId="default-model-1" 
          modelName="Balanced Growth Portfolio" 
        />
      ),
      description: 'Model portfolio management and analysis',
      path: '/corporate/dashboard/model-portfolio',
      category: 'portfolio'
    },
    {
      id: 'onchain',
      name: 'On-Chain Analytics',
      icon: <Layers size={18} />,
      component: () => (
        <LazyDashboardComponent 
          componentPath="components/corporate/dashboard/analytics/onchain-dashboard" 
        />
      ),
      description: 'On-chain data analysis and metrics',
      path: '/corporate/dashboard/onchain',
      category: 'analytics'
    },
    {
      id: 'offchain',
      name: 'Off-Chain Analytics',
      icon: <LineChart size={18} />,
      component: () => (
        <LazyDashboardComponent 
          componentPath="components/corporate/dashboard/analytics/offchain-dashboard" 
        />
      ),
      description: 'Traditional market and off-chain data analysis',
      path: '/corporate/dashboard/offchain',
      category: 'analytics'
    },
    {
      id: 'voting',
      name: 'Governance Voting',
      icon: <Vote size={18} />,
      component: () => (
        <LazyDashboardComponent 
          componentPath="components/corporate/voting" 
        />
      ),
      description: 'Participate in governance decisions',
      path: '/corporate/dashboard/voting',
      category: 'admin'
    },
    {
      id: 'ai-analytics',
      name: 'AI Analytics',
      icon: <Calculator size={18} />,
      component: () => (
        <LazyDashboardComponent 
          componentPath="components/ai-analytics-dashboard" 
        />
      ),
      description: 'AI-powered analytics and insights',
      path: '/corporate/dashboard/ai-analytics',
      category: 'analytics'
    },
    {
      id: 'strategies',
      name: 'Strategies',
      icon: <BarChartHorizontal size={18} />,
      component: () => (
        <LazyDashboardComponent 
          componentPath="components/corporate/dashboard/tools/strategies-dashboard" 
        />
      ),
      description: 'Investment and trading strategies',
      path: '/corporate/dashboard/strategies',
      category: 'tools'
    },
    {
      id: 'risk-assessment',
      name: 'Risk Assessment',
      icon: <ShieldAlert size={18} />,
      component: () => (
        <LazyDashboardComponent 
          componentPath="components/corporate/dashboard/tools/risk-assessment-dashboard" 
        />
      ),
      description: 'Portfolio risk analysis and assessment',
      path: '/corporate/dashboard/risk-assessment',
      category: 'tools'
    },
    {
      id: 'flash-loans',
      name: 'Flash Loans',
      icon: <Coins size={18} />,
      component: () => (
        <LazyDashboardComponent 
          componentPath="components/corporate/dashboard/tools/flash-loans-dashboard" 
        />
      ),
      description: 'Flash loan management and execution',
      path: '/corporate/dashboard/flash-loans',
      category: 'tools'
    }
  ]
}