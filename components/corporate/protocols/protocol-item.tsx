import { Badge } from "@/components/ui/badge";
import { ProtocolItemProps } from "./protocol-allocation.types";
import styles from "./protocol-allocation.module.css";

/**
 * Displays a protocol item in the details list
 */
export function ProtocolItem({ protocol }: ProtocolItemProps) {
  const value = parseFloat(protocol.totalValueLockedUSD) || 0;
  
  return (
    <div className={styles.protocolItem}>
      <div>
        <div className={styles.protocolName}>{protocol.name}</div>
        <div className={styles.protocolPercentage}>
          {protocol.percentage === null || protocol.percentage === undefined
            ? 'N/A'
            : typeof protocol.percentage === 'number'
              ? `${protocol.percentage.toFixed(1)}%`
              : `${protocol.percentage}%`
          } of portfolio
        </div>
      </div>
      <Badge 
        variant="secondary" 
        style={{ backgroundColor: protocol.color + '20', color: protocol.color }}
      >
        ${value.toLocaleString()}
      </Badge>
    </div>
  );
}