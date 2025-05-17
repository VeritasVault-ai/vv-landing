import { JSX, ReactNode } from 'react';

// Import from the new modular structure
import { allDashboards } from '@/src/config/dashboardsIndex';
import { getDashboardsByCategory as getModularDashboardsByCategory } from '@/src/config/getDashboards';

/** ----------------------------------------------------
 *  Types & constants
 *  --------------------------------------------------*/
export type DashboardCategory =
  | 'main'
  | 'analytics'
  | 'portfolio'
  | 'admin'
  | 'tools';

export interface DashboardConfig {
  id: string;
  name: string;
  icon: ReactNode;
  /** Component factory – MUST be a function to work with React.lazy/Suspense */
  component: () => JSX.Element;
  description: string;
  path: string;
  category: DashboardCategory;
}

export const dashboardCategories: Record<DashboardCategory, string[]> = {
  main: ['corporate', 'consumer', 'tezos-liquidity', 'market'],
  analytics: ['analytics', 'performance', 'onchain', 'offchain', 'ai-analytics'],
  portfolio: ['portfolio', 'watchlist', 'model-portfolio', 'treasury'],
  admin: ['admin', 'events', 'voting'],
  tools: ['strategies', 'risk-assessment', 'flash-loans'],
};

export const categoryDisplayNames: Record<DashboardCategory, string> = {
  main: 'Main',
  analytics: 'Analytics',
  portfolio: 'Portfolio',
  admin: 'Administration',
  tools: 'Tools',
};

// This function now uses the new modular system
export const getDashboardsByCategory = (
  dashboards: DashboardConfig[],
  category: DashboardCategory
): DashboardConfig[] => {
  // If using the new modular system (no dashboards provided)
  if (!dashboards || dashboards.length === 0) {
    return getModularDashboardsByCategory(category);
  }
  
  // Legacy support for the old system
  return dashboards.filter((d) => dashboardCategories[category].includes(d.id));
};

/** ----------------------------------------------------
 *  Factory helpers
 *  --------------------------------------------------*/

/**
 * Convenience wrapper to dynamically `import()` a component path.
 * Keeps the call site tiny & consistent with the eager path.
 */
const lazyImport = (path: string) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore – dynamic import path is runtime‑checked
  import(path).then((m) => m.default ?? m);

/** ----------------------------------------------------
 *  Public factory
 *  --------------------------------------------------*/

interface CreateConfigOptions {
  /** When true, components will be loaded with React.lazy/dynamic import. */
  lazy?: boolean;
  /** CSS module styles – required if you use the wrapper layout for TL dashboards. */
  styles: Record<string, string>;
  /** Map of *already‑imported* components. Required if `lazy === false`. */
  components?: Record<string, any>;
}

// This function now returns dashboards from the new modular system
export const createDashboardConfig = ({
  lazy = true,
  styles,
  components,
}: CreateConfigOptions): readonly DashboardConfig[] => {
  // Return the dashboards from the new modular system
  return [...allDashboards];
};