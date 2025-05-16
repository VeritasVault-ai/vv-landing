"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminAlertsList } from "@/src/components/features/admin/admin-alerts-list"
import { ConfigurationPanel } from "@/src/components/features/admin/configuration-panel"
import { SystemMetricsPanel } from "@/src/components/features/admin/system-metrics-panel"
import { UserManagementPanel } from "@/src/components/features/admin/user-management-panel"
import { EventFeed } from "@/src/components/features/event-grid/event-feed"
import { Activity, BarChart3, Bell, Layers, Settings, Shield, Users } from "lucide-react"
import { useState } from "react"
import styles from "./admin-dashboard.module.css"

export interface AdminDashboardProps {
  defaultTab?: string
}

export const AdminDashboard = ({ defaultTab = "overview" }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>
          <p className={styles.dashboardDescription}>Monitor system events and manage VeritasVault.net services</p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="outline" size="sm" className={styles.actionButton}>
            <Bell className={styles.actionIcon} />
            <span>Notifications</span>
          </Button>
          <Button variant="outline" size="sm" className={styles.actionButton}>
            <Settings className={styles.actionIcon} />
            <span>Settings</span>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className={styles.dashboardTabs}>
        <TabsList className={styles.tabsList}>
          <TabsTrigger value="overview" className={styles.tabsTrigger}>
            <BarChart3 className={styles.tabIcon} />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="events" className={styles.tabsTrigger}>
            <Activity className={styles.tabIcon} />
            <span>Event Grid</span>
          </TabsTrigger>
          <TabsTrigger value="users" className={styles.tabsTrigger}>
            <Users className={styles.tabIcon} />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="security" className={styles.tabsTrigger}>
            <Shield className={styles.tabIcon} />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="config" className={styles.tabsTrigger}>
            <Layers className={styles.tabIcon} />
            <span>Configuration</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className={styles.tabContent}>
          <div className={styles.overviewGrid}>
            <Card className={styles.overviewCard}>
              <CardHeader className={styles.cardHeader}>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Current system metrics and health status</CardDescription>
              </CardHeader>
              <CardContent>
                <SystemMetricsPanel />
              </CardContent>
            </Card>

            <Card className={styles.overviewCard}>
              <CardHeader className={styles.cardHeader}>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>System alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminAlertsList limit={5} />
              </CardContent>
            </Card>

            <Card className={styles.eventFeedCard}>
              <CardHeader className={styles.cardHeader}>
                <CardTitle>Event Stream</CardTitle>
                <CardDescription>Real-time system events</CardDescription>
              </CardHeader>
              <CardContent className={styles.eventFeedContent}>
                <EventFeed
                  topicId="system-events"
                  title="System Events"
                  description="Real-time system events and notifications"
                  maxEvents={10}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className={styles.tabContent}>
          <div className={styles.eventsGrid}>
            <Card className={styles.fullWidthCard}>
              <CardHeader className={styles.cardHeader}>
                <CardTitle>Event Grid Monitor</CardTitle>
                <CardDescription>Monitor and filter real-time events from all topics</CardDescription>
              </CardHeader>
              <CardContent className={styles.eventGridContent}>
                <EventFeed
                  topicId="all-events"
                  title="All Events"
                  description="Aggregated events from all topics"
                  maxEvents={50}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className={styles.tabContent}>
          <Card className={styles.fullWidthCard}>
            <CardHeader className={styles.cardHeader}>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users, roles, and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <UserManagementPanel />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className={styles.tabContent}>
          <div className={styles.securityGrid}>
            <Card className={styles.securityCard}>
              <CardHeader className={styles.cardHeader}>
                <CardTitle>Security Alerts</CardTitle>
                <CardDescription>Critical security notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <EventFeed
                  topicId="security-alerts"
                  title="Security Events"
                  description="Security-related events and alerts"
                  initialFilter={{ eventType: "security.alert" }}
                  maxEvents={20}
                />
              </CardContent>
            </Card>

            <Card className={styles.securityCard}>
              <CardHeader className={styles.cardHeader}>
                <CardTitle>Access Logs</CardTitle>
                <CardDescription>Recent system access attempts</CardDescription>
              </CardHeader>
              <CardContent>
                <EventFeed
                  topicId="access-logs"
                  title="Access Events"
                  description="Authentication and authorization events"
                  initialFilter={{ eventType: "security.access" }}
                  maxEvents={20}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="config" className={styles.tabContent}>
          <Card className={styles.fullWidthCard}>
            <CardHeader className={styles.cardHeader}>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>Configure system settings and integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <ConfigurationPanel />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}