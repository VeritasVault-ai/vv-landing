import type React from "react"
import { Users, UserCheck, BarChart, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import styles from "./kpi-cards.module.css"
import { KPIs } from "@/src/types/analytics"
import { formatCurrency, formatPercentage } from "@/src/lib/formatters"

interface KpiCardsProps {
  data: KPIs | undefined
  isLoading: boolean
}

interface KpiCardProps {
  title: string
  value: string | number
  change: number
  icon: React.ReactNode
  isLoading: boolean
}

function KpiCard({ title, value, change, icon, isLoading }: KpiCardProps) {
  const isPositive = change >= 0
  
  return (
    <div className={styles.card}>
      {isLoading ? (
        <div className={styles.skeleton}>
          <div className={styles.skeletonIcon}></div>
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonValue}></div>
            <div className={styles.skeletonChange}></div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.iconContainer}>{icon}</div>
          <div className={styles.content}>
            <h4 className={styles.title}>{title}</h4>
            <div className={styles.value}>{value}</div>
            <div className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}>
              {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              <span>{formatPercentage(Math.abs(change))}</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export function KpiCards({ data, isLoading }: KpiCardsProps) {
  return (
    <div className={styles.container}>
      <KpiCard
        title="Total Users"
        value={data ? data.totalUsers.toLocaleString() : "0"}
        change={data ? data.userGrowth : 0}
        icon={<Users className={styles.icon} />}
        isLoading={isLoading}
      />
      <KpiCard
        title="Active Users"
        value={data ? data.activeUsers.toLocaleString() : "0"}
        change={data ? data.userGrowth : 0}
        icon={<UserCheck className={styles.icon} />}
        isLoading={isLoading}
      />
      <KpiCard
        title="Transactions"
        value={data ? data.totalTransactions.toLocaleString() : "0"}
        change={data ? data.transactionGrowth : 0}
        icon={<BarChart className={styles.icon} />}
        isLoading={isLoading}
      />
      <KpiCard
        title="Total Volume"
        value={data ? formatCurrency(data.totalVolume) : "$0"}
        change={data ? data.volumeGrowth : 0}
        icon={<DollarSign className={styles.icon} />}
        isLoading={isLoading}
      />
      <KpiCard
        title="Avg. Transaction"
        value={data ? formatCurrency(data.averageTransactionValue) : "$0"}
        change={data ? data.volumeGrowth - data.transactionGrowth : 0}
        icon={<TrendingUp className={styles.icon} />}
        isLoading={isLoading}
      />
    </div>
  )
}