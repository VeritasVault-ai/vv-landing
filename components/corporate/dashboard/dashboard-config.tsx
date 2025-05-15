import { JSX, ReactNode } from 'react'
import {
  Activity,
  BarChart3,
  Bell,
  Briefcase,
  Calculator,
  Coins,
  Eye,
  Layers,
  LayoutDashboard,
  PieChart,
  ShieldAlert,
  TrendingUp,
  Users,
  Vote,
  Wallet
} from 'lucide-react'

// Define dashboard category types
export type DashboardCategory = 'main' | 'analytics' | 'portfolio' | 'admin'

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
  ]
}

// Define category display names
export const categoryDisplayNames: Record<DashboardCategory, string> = {
  main: 'Main',
  analytics: 'Analytics',
  portfolio: 'Portfolio',
  admin: 'Administration'
}

// Get dashboards by category
export const getDashboardsByCategory = (
  dashboards: DashboardConfig[],
  category: DashboardCategory
): DashboardConfig[] => {
  return dashboards.filter(dash => dashboardCategories[category].includes(dash.id))
}

// Function to create dashboard configurations - can be imported and used elsewhere
export const createDashboardConfig = (
  components: Record<string, any>,
  styles: Record<string, string>
): DashboardConfig[] => {
  const {
    ModularCorporateDashboard,
    AIAnalyticsDashboard,
    DashboardPerformance,
    DashboardVoting,
    DashboardOverview,
    AdminDashboard,
    AnalyticsDashboard,
    ConsumerDashboard,
    ModelPortfolioDashboard,
    EventGridDashboard,
    MarketDashboard,
    TreasuryDashboard
  } = components

  return [
    {
      id: 'corporate',
      name: 'Corporate Dashboard',
      icon: <LayoutDashboard size={18} />,
      component: () => <ModularCorporateDashboard />,
      description: 'Enterprise liquidity management dashboard',
      path: '/corporate/dashboard',
      category: 'main'
    },
    {
      id: 'consumer',
      name: 'Consumer Dashboard',
      icon: <Users size={18} />,
      component: () => <ConsumerDashboard />,
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
            <DashboardOverview />
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
      component: () => <MarketDashboard />,
      description: 'Real-time market data and analytics',
      path: '/corporate/dashboard/market',
      category: 'main'
    },
    {
      id: 'analytics',
      name: 'Analytics Dashboard',
      icon: <Activity size={18} />,
      component: () => <AnalyticsDashboard />,
      description: 'Platform analytics and insights',
      path: '/corporate/dashboard/analytics',
      category: 'analytics'
    },
    {
      id: 'admin',
      name: 'Admin Dashboard',
      icon: <ShieldAlert size={18} />,
      component: () => <AdminDashboard />,
      description: 'System administration and monitoring',
      path: '/corporate/dashboard/admin',
      category: 'admin'
    },
    {
      id: 'events',
      name: 'Event Grid',
      icon: <Bell size={18} />,
      component: () => <EventGridDashboard />,
      description: 'Monitor real-time blockchain events',
      path: '/corporate/dashboard/events',
      category: 'admin'
    },
    {
      id: 'treasury',
      name: 'Treasury Dashboard',
      icon: <Wallet size={18} />,
      component: () => <TreasuryDashboard />,
      description: 'Comprehensive view of your treasury operations',
      path: '/corporate/dashboard/treasury',
      category: 'portfolio'
    },
    {
      id: 'portfolio',
      name: 'Portfolio Dashboard',
      icon: <Briefcase size={18} />,
      component: () => <ConsumerDashboard defaultTab="portfolio" />,
      description: 'Portfolio overview and management',
      path: '/corporate/dashboard/portfolio',
      category: 'portfolio'
    },
    {
      id: 'watchlist',
      name: 'Watchlist Dashboard',
      icon: <Eye size={18} />,
      component: () => <ConsumerDashboard defaultTab="watchlist" />,
      description: 'Monitor assets on your watchlist',
      path: '/corporate/dashboard/watchlist',
      category: 'portfolio'
    },
    {
      id: 'performance',
      name: 'Performance Dashboard',
      icon: <TrendingUp size={18} />,
      component: () => <DashboardPerformance />,
      description: 'Portfolio performance and metrics',
      path: '/corporate/dashboard/performance',
      category: 'analytics'
    },
    {
      id: 'model-portfolio',
      name: 'Model Portfolio',
      icon: <PieChart size={18} />,
      component: () => (
        <ModelPortfolioDashboard 
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
        <div className={styles.dashboardWrapper}>
          <div className={styles.onChainDashboardContainer}>
            <div className={styles.onChainHeader}>
              <h2 className={styles.sectionTitle}>On-Chain Analytics Dashboard</h2>
              <p className={styles.sectionDescription}>Real-time blockchain data analytics and insights</p>
            </div>
            
            <div className={styles.onChainGrid}>
              <div className={styles.onChainCard}>
                <h3>Chain Activity</h3>
                <div className={styles.onChainCardContent}>
                  {/* Import components from src/components/on-chain-data */}
                  <div className={styles.placeholderChart}>
                    Chain activity visualization would appear here
                  </div>
                </div>
              </div>
              
              <div className={styles.onChainCard}>
                <h3>Protocol Metrics</h3>
                <div className={styles.onChainCardContent}>
                  <div className={styles.placeholderChart}>
                    Protocol metrics would appear here
                  </div>
                </div>
              </div>
              
              <div className={styles.onChainCard}>
                <h3>Token Transfers</h3>
                <div className={styles.onChainCardContent}>
                  <div className={styles.placeholderList}>
                    Recent token transfers would appear here
                  </div>
                </div>
              </div>
              
              <div className={styles.onChainCard}>
                <h3>Liquidity Pools</h3>
                <div className={styles.onChainCardContent}>
                  <div className={styles.placeholderTable}>
                    Liquidity pools data would appear here
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      description: 'On-chain data analysis and metrics',
      path: '/corporate/dashboard/onchain',
      category: 'analytics'
    },
    {
      id: 'voting',
      name: 'Governance Voting',
      icon: <Vote size={18} />,
      component: () => <DashboardVoting />,
      description: 'Participate in governance decisions',
      path: '/corporate/dashboard/voting',
      category: 'admin'
    },
    {
      id: 'ai-analytics',
      name: 'AI Analytics',
      icon: <Calculator size={18} />,
      component: () => <AIAnalyticsDashboard />,
      description: 'AI-powered analytics and insights',
      path: '/corporate/dashboard/ai-analytics',
      category: 'analytics'
    }
  ]
}