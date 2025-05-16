"use client"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import styles from "./user-demographics.module.css"

interface DemographicData {
  name: string
  value: number
}

interface UserDemographicsData {
  ageGroups: DemographicData[]
  regions: DemographicData[]
  platforms: DemographicData[]
}

interface UserDemographicsProps {
  data: UserDemographicsData | undefined
  isLoading: boolean
}

const COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#ef4444", // red
  "#64748b", // slate
]

export function UserDemographics({ data, isLoading }: UserDemographicsProps) {
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.chartSection}>
          <h4 className={styles.chartTitle}>Age Distribution</h4>
          <div className={styles.skeleton}></div>
        </div>
        <div className={styles.chartSection}>
          <h4 className={styles.chartTitle}>Geographic Distribution</h4>
          <div className={styles.skeleton}></div>
        </div>
      </div>
    )
  }

  if (!data) {
    return <div className={styles.noData}>No demographic data available</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.chartSection}>
        <h4 className={styles.chartTitle}>Age Distribution</h4>
        <div className={styles.pieContainer}>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.ageGroups}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.ageGroups.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, "Percentage"]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.375rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.legendContainer}>
            {data.ageGroups.map((entry, index) => (
              <div key={`legend-${index}`} className={styles.legendItem}>
                <div
                  className={styles.legendColor}
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span>{entry.name}: {entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.chartSection}>
        <h4 className={styles.chartTitle}>Geographic Distribution</h4>
        <div className={styles.pieContainer}>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.regions}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.regions.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, "Percentage"]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.375rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.legendContainer}>
            {data.regions.map((entry, index) => (
              <div key={`legend-${index}`} className={styles.legendItem}>
                <div
                  className={styles.legendColor}
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span>{entry.name}: {entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}