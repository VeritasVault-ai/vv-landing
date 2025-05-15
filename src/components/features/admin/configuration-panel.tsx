"use client"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Database, Cloud, Key, Server } from "lucide-react"
import { ApiConfigSection } from "./config-sections/api-config-section"
import { DatabaseConfigSection } from "./config-sections/database-config-section"
import { IntegrationsConfigSection } from "./config-sections/integrations-config-section"
import { SecurityConfigSection } from "./config-sections/security-config-section"
import { SystemConfigSection } from "./config-sections/system-config-section"
import styles from "./configuration-panel.module.css"

export const ConfigurationPanel = () => {
  const [activeTab, setActiveTab] = useState("api")

  return (
    <div className={styles.container}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className={styles.tabs}>
        <TabsList className={styles.tabsList}>
          <TabsTrigger value="api" className={styles.tabsTrigger}>
            <Globe className={styles.tabIcon} />
            <span>API Settings</span>
          </TabsTrigger>
          <TabsTrigger value="database" className={styles.tabsTrigger}>
            <Database className={styles.tabIcon} />
            <span>Database</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className={styles.tabsTrigger}>
            <Cloud className={styles.tabIcon} />
            <span>Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="security" className={styles.tabsTrigger}>
            <Key className={styles.tabIcon} />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="system" className={styles.tabsTrigger}>
            <Server className={styles.tabIcon} />
            <span>System</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="api" className={styles.tabContent}>
          <ApiConfigSection />
        </TabsContent>

        <TabsContent value="database" className={styles.tabContent}>
          <DatabaseConfigSection />
        </TabsContent>

        <TabsContent value="integrations" className={styles.tabContent}>
          <IntegrationsConfigSection />
        </TabsContent>

        <TabsContent value="security" className={styles.tabContent}>
          <SecurityConfigSection />
        </TabsContent>

        <TabsContent value="system" className={styles.tabContent}>
          <SystemConfigSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}