/**
 * Protocol data structure
 */
export interface Protocol {
  name: string;
  totalValueLockedUSD: string;
  percentage: number | string;
  color: string;
}

/**
 * Chart data structure for Recharts
 */
export interface ChartData {
  name: string;
  totalValueLockedUSD: string;
  percentage: number | string;
  color: string;
}

/**
 * Props for ProtocolCard component
 */
export interface ProtocolCardProps {
  name: string;
  percentage: number | string;
  value: string | number;
  color: string;
}

/**
 * Props for ProtocolItem component
 */
export interface ProtocolItemProps {
  protocol: Protocol;
}

/**
 * Props for WarningBanner component
 */
export interface WarningBannerProps {
  message: string;
}

/**
 * Chart configuration
 */
export interface ChartConfig {
  colors?: string[];
  height?: number;
  width?: number;
  [key: string]: any;
}