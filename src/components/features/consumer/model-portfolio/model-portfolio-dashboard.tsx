"use client"
import { Download, FileText, Share2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModelInfoCard } from "./components/model-info-card"
import { ModelViews } from "./components/model-views"
import { ModelAllocations } from "./components/model-allocations"
import { ModelExecution } from "./components/model-execution"
import { ModelVerification } from "./components/model-verification"
import { ModelRiskStrategy } from "./components/model-risk-strategy"
import { ModelAuditTrail } from "./components/model-audit-trail"
import { ModelFeedback } from "./components/model-feedback"
import styles from "./model-portfolio-dashboard.module.css"

export interface ModelPortfolioDashboardProps {
  modelId: string
  modelName: string
}

export const ModelPortfolioDashboard = ({ modelId, modelName }: ModelPortfolioDashboardProps) => {
  // This would typically come from an API call based on the modelId
  const modelData = {
    id: modelId,
    name: modelName,
    createdAt: "2025-05-10T14:30:00Z",
    lastUpdated: "2025-05-14T09:15:00Z",
    riskProfile: "Moderate",
    modelHash: "0x7a3f5e4d2b1c8a9e6f0d2c4b5a3f1e0d2b3c4a5e6f7d8c9b0a1e2d3",
    performance: {
      totalReturn: 12.4,
      volatility: 8.2,
      sharpeRatio: 1.3,
      maxDrawdown: -15.8,
    },
    views: [
      { asset: "STETH", value: "1.00%" },
      { asset: "GHO", value: "1.60%" },
      { asset: "USDC", value: "4.49%" },
      { asset: "WBTC", value: "-0.10%" },
      { asset: "JITOSOL", value: "1.04%" },
    ],
    allocations: [
      { asset: "STETH", weight: 68.3 },
      { asset: "GHO", weight: 1.3 },
      { asset: "USDC", weight: 3.9 },
      { asset: "WBTC", weight: 15.9 },
      { asset: "JITOSOL", weight: 10.7 },
    ],
    executionHistory: [
      {
        id: "exec-001",
        timestamp: "2025-05-14T09:15:00Z",
        status: "completed",
        transactionHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3",
        gasUsed: 245000,
        blockNumber: 18456732,
      },
      {
        id: "exec-002",
        timestamp: "2025-05-13T14:22:00Z",
        status: "completed",
        transactionHash: "0x3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5",
        gasUsed: 232000,
        blockNumber: 18450123,
      }
    ],
    verificationData: {
      modelVerified: true,
      lastVerifiedAt: "2025-05-14T10:00:00Z",
      verificationHash: "0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7",
      verificationMethod: "Zero-knowledge proof",
    },
    auditTrail: [
      {
        timestamp: "2025-05-14T09:15:00Z",
        event: "Model Execution",
        details: "Portfolio rebalanced according to updated risk parameters",
        actor: "System",
      },
      {
        timestamp: "2025-05-13T14:22:00Z",
        event: "Risk Parameters Updated",
        details: "Risk tolerance adjusted from 'Conservative' to 'Moderate'",
        actor: "User",
      },
      {
        timestamp: "2025-05-12T10:30:00Z",
        event: "Model Created",
        details: "Initial model portfolio created with conservative risk profile",
        actor: "User",
      }
    ]
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.title}>
            <FileText className={styles.titleIcon} />
            {modelData.name}
          </h2>
          <p className={styles.description}>
            Model portfolio based on your risk profile: <strong>{modelData.riskProfile}</strong>
          </p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="outline" size="sm" className={styles.actionButton}>
            <Share2 className={styles.actionIcon} />
            <span>Share</span>
          </Button>
          <Button variant="outline" size="sm" className={styles.actionButton}>
            <Download className={styles.actionIcon} />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className={styles.modelInfoGrid}>
        <ModelInfoCard 
          createdAt={modelData.createdAt}
          lastUpdated={modelData.lastUpdated}
          riskProfile={modelData.riskProfile}
          modelHash={modelData.modelHash}
        />
      </div>

      <div className={styles.modelMetrics}>
        <Card className={styles.metricCard}>
          <div className={styles.metricLabel}>Total Return</div>
          <div className={styles.metricValue}>{modelData.performance.totalReturn}%</div>
          <div className={`${styles.metricChange} ${styles.positive}`}>
            <span>Since inception</span>
          </div>
        </Card>
        <Card className={styles.metricCard}>
          <div className={styles.metricLabel}>Volatility</div>
          <div className={styles.metricValue}>{modelData.performance.volatility}%</div>
          <div className={`${styles.metricChange} ${styles.neutral}`}>
            <span>Annualized</span>
          </div>
        </Card>
        <Card className={styles.metricCard}>
          <div className={styles.metricLabel}>Sharpe Ratio</div>
          <div className={styles.metricValue}>{modelData.performance.sharpeRatio}</div>
          <div className={`${styles.metricChange} ${styles.positive}`}>
            <span>Risk-adjusted return</span>
          </div>
        </Card>
        <Card className={styles.metricCard}>
          <div className={styles.metricLabel}>Max Drawdown</div>
          <div className={styles.metricValue}>{modelData.performance.maxDrawdown}%</div>
          <div className={`${styles.metricChange} ${styles.negative}`}>
            <span>Historical maximum</span>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className={styles.tabs}>
        <TabsList className={styles.tabsList}>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="execution">Execution</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className={styles.tabContent}>
          <div className={styles.overviewGrid}>
            <ModelViews views={modelData.views} />
            <ModelAllocations allocations={modelData.allocations} />
            <ModelRiskStrategy riskProfile={modelData.riskProfile} />
            <ModelFeedback modelId={modelData.id} />
          </div>
        </TabsContent>
        
        <TabsContent value="execution" className={styles.tabContent}>
          <ModelExecution executionHistory={modelData.executionHistory} />
        </TabsContent>
        
        <TabsContent value="verification" className={styles.tabContent}>
          <ModelVerification verificationData={modelData.verificationData} />
        </TabsContent>
        
        <TabsContent value="audit" className={styles.tabContent}>
          <ModelAuditTrail auditTrail={modelData.auditTrail} />
        </TabsContent>
      </Tabs>
    </div>
  )
}