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

/**
 * Displays a status summary card with a title, value, description, and icon.
 *
 * Renders a styled card showing a main metric or value, an associated icon, a description, and an optional simulation indicator. The value's appearance can be customized based on the provided status color.
 *
 * @param title - The card's title.
 * @param value - The main metric or value to display.
 * @param description - Additional descriptive text.
 * @param icon - Icon component to display in the header.
 * @param isSimulated - If true, shows a simulation indicator.
 * @param statusColor - Optional status color ('healthy', 'warning', or 'error') for styling the value.
 */
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