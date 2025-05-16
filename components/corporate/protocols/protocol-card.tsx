import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import styles from "./protocol-allocation.module.css";
import { ProtocolCardProps } from "./protocol-allocation.types";

/**
 * Renders a card displaying protocol information, including the protocol name, percentage, and value.
 *
 * The percentage is normalized to a numeric value for the progress bar, and the value is formatted as a localized string if numeric.
 *
 * @param name - The protocol's display name.
 * @param percentage - The protocol's percentage value, as a number or string.
 * @param value - The protocol's value, as a number or string.
 * @param color - The base color used for the progress bar background.
 */
export function ProtocolCard({ name, percentage, value, color }: ProtocolCardProps) {
  const numericPercentage = typeof percentage === 'string' ? parseFloat(percentage) || 0 : percentage;
  const formattedValue = typeof value === 'string' ? value : (value || 0).toLocaleString();
  
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