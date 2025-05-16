import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimulationIndicator } from "@/components/corporate/simulation-indicator";
import { LucideIcon } from "lucide-react";
import styles from "./status-card.module.css";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  isSimulated?: boolean;
  statusColor?: 'healthy' | 'warning' | 'error';
}

export function StatusCard({
  title,
  value,
  description,
  icon: Icon,
  isSimulated = false,
  statusColor
}: StatusCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-slate-500" />
      </CardHeader>
      <CardContent>
        <div className={cn(
          styles.metricValue,
          statusColor && styles[`status${statusColor.charAt(0).toUpperCase() + statusColor.slice(1)}`]
        )}>
          {value}
        </div>
        <p className={styles.smallText}>
          {description}
        </p>
        {isSimulated && (
          <div className={styles.simulationIndicator}>
            <SimulationIndicator showLabel />
          </div>
        )}
      </CardContent>
    </Card>
  );
}