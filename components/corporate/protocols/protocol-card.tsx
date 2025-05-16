import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProtocolCardProps } from "./protocol-allocation.types";
import styles from "./protocol-allocation.module.css";

/**
 * Displays a card with protocol information including name, percentage, and value
 */
export function ProtocolCard({ name, percentage, value, color }: ProtocolCardProps) {
  const numericPercentage = typeof percentage === 'string' ? parseFloat(percentage) : percentage;
  const formattedValue = typeof value === 'string' ? value : value.toLocaleString();
  
  return (
    <Card>
      <CardHeader className={styles.pb2}>
        <CardDescription>{name}</CardDescription>
        <CardTitle className={styles.valueText}>
          {typeof percentage === 'number' ? percentage.toFixed(1) : percentage}%
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress 
          value={numericPercentage} 
          className={styles.progressBar}
          style={{ backgroundColor: color + '40' }} // Add transparency
        />
        <p className={`${styles.smallText} ${styles.mt2}`}>
          ${formattedValue}
        </p>
      </CardContent>
    </Card>
  );
}