"use client"
import { useState } from "react"
import { BarChart3, Briefcase, Eye, LineChart, Bell } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChainSelector } from "@/src/components/features/market-data/chain-selector"
import { MarketDashboard } from "@/src/components/features/market-data/market-dashboard"
import { PortfolioOverview } from "../portfolio/portfolio-overview"
import { WatchlistPanel } from "../watchlist/watchlist-panel"
import { InsightsPanel } from "../insights/insights-panel"
import { AlertsPanel } from "../alerts/alerts-panel"
import styles from "./consumer-dashboard.module.css"

export interface ConsumerDashboardProps {
  defaultTab?: string
}

export const ConsumerDashboard = ({ defaultTab = "market" }: ConsumerDashboardProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [selectedChain, setSelectedChain] = useState("all")

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.dashboardTitle}>VeritasVault Dashboard</h1>
          <p className={styles.dashboardDescription}>Multi-chain analytics and insights</p>
        </div>
        <div className={styles.headerActions}>
          <ChainSelector
            selectedChain={selectedChain}
            onChainSelect={setSelectedChain}
            className={styles.chainSelector}
          />
          <Button variant="outline" size="sm" className={styles.actionButton}>
            <Bell className={styles.actionIcon} />
            <span>Alerts</span>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className={styles.dashboardTabs}>
        <TabsList className={styles.tabsList}>
          <TabsTrigger value="market" className={styles.tabsTrigger}>
            <BarChart3 className={styles.tabIcon} />
            <span>Market</span>
          </TabsTrigger>
          <TabsTrigger value="portfolio" className={styles.tabsTrigger}>
            <Briefcase className={styles.tabIcon} />
            <span>Portfolio</span>
          </TabsTrigger>
          <TabsTrigger value="watchlist" className={styles.tabsTrigger}>
            <Eye className={styles.tabIcon} />
            <span>Watchlist</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className={styles.tabsTrigger}>
            <LineChart className={styles.tabIcon} />
            <span>Insights</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="market" className={styles.tabContent}>
          <MarketDashboard selectedChain={selectedChain} />
        </TabsContent>

        <TabsContent value="portfolio" className={styles.tabContent}>
          <PortfolioOverview selectedChain={selectedChain} />
        </TabsContent>

        <TabsContent value="watchlist" className={styles.tabContent}>
          <WatchlistPanel selectedChain={selectedChain} />
        </TabsContent>

        <TabsContent value="insights" className={styles.tabContent}>
          <div className={styles.insightsGrid}>
            <InsightsPanel chain={selectedChain} />
            <AlertsPanel chain={selectedChain} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}