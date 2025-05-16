"use client"
import { useState, useEffect } from "react"
import { CheckCircle, AlertCircle, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import styles from "./system-metrics-panel.module.css"

export const SystemMetricsPanel = () => {
  const [cpuUsage, setCpuUsage] = useState(45)
  const [memoryUsage, setMemoryUsage] = useState(62)
  const [diskUsage, setDiskUsage] = useState(38)
  const [apiLatency, setApiLatency] = useState(124)
  const [uptime, setUptime] = useState("5d 12h 34m")

  // Simulate changing metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage((prev) => Math.min(Math.max(prev + (Math.random() * 10 - 5), 10), 95))
      setMemoryUsage((prev) => Math.min(Math.max(prev + (Math.random() * 8 - 4), 20), 90))
      setDiskUsage((prev) => Math.min(Math.max(prev + (Math.random() * 2 - 1), 30), 80))
      setApiLatency((prev) => Math.min(Math.max(prev + (Math.random() * 40 - 20), 80), 300))
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.metricsContainer}>
      <div className={styles.statusRow}>
        <div className={styles.statusItem}>
          <div className={styles.statusIcon}>
            <CheckCircle className={styles.iconSuccess} />
          </div>
          <div>
            <div className={styles.statusLabel}>System Status</div>
            <div className={styles.statusValue}>Operational</div>
          </div>
        </div>
        
        <div className={styles.statusItem}>
          <div className={styles.statusIcon}>
            <Clock className={styles.iconNeutral} />
          </div>
          <div>
            <div className={styles.statusLabel}>Uptime</div>
            <div className={styles.statusValue}>{uptime}</div>
          </div>
        </div>
        
        <div className={styles.statusItem}>
          <div className={styles.statusIcon}>
            <AlertCircle className={cpuUsage > 80 ? styles.iconDanger : styles.iconNeutral} />
          </div>
          <div>
            <div className={styles.statusLabel}>Active Alerts</div>
            <div className={styles.statusValue}>{cpuUsage > 80 ? "1" : "0"}</div>
          </div>
        </div>
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.metricItem}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>CPU Usage</span>
            <span className={styles.metricValue}>{Math.round(cpuUsage)}%</span>
          </div>
          <Progress value={cpuUsage} className={styles.metricProgress} />
        </div>
        
        <div className={styles.metricItem}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Memory Usage</span>
            <span className={styles.metricValue}>{Math.round(memoryUsage)}%</span>
          </div>
          <Progress value={memoryUsage} className={styles.metricProgress} />
        </div>
        
        <div className={styles.metricItem}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Disk Usage</span>
            <span className={styles.metricValue}>{Math.round(diskUsage)}%</span>
          </div>
          <Progress value={diskUsage} className={styles.metricProgress} />
        </div>
        
        <div className={styles.metricItem}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>API Latency</span>
            <span className={styles.metricValue}>{Math.round(apiLatency)} ms</span>
          </div>
          <Progress value={(apiLatency / 300) * 100} className={styles.metricProgress} />
        </div>
      </div>
    </div>
  )
}