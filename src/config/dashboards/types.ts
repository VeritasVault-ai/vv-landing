import { JSX, ReactNode } from 'react';

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
  component: () => JSX.Element;
  description: string;
  path: string;
  category: DashboardCategory;
}