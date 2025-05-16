import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import styles from "./performance-metrics.module.css";

interface PerformanceMetric {
  label: string;
  value: number;
  unit: string;
  maxValue?: number;
}

interface PerformanceMetricsProps {
  metrics: PerformanceMetric[];
}

export function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  return (
    <Card className={styles.container}>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={styles.metricsGrid}>
          {metrics.map((metric, index) => (
            <div key={index} className={styles.column}>
              <span className={styles.label}>{metric.label}</span>
              <span className={styles.value}>
                {metric.value}{metric.unit}
              </span>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ 
                    width: `${metric.maxValue 
                      ? Math.min(100, (metric.value / metric.maxValue) * 100) 
                      : Math.min(100, metric.value)}%` 
                  }}
                >
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}