import { Bell } from 'lucide-react';
import type { DashboardConfig } from '../types';
import { EventGridDashboard } from '@/src/components/features/event-grid/event-grid-dashboard';

export const events: DashboardConfig = {
  id: 'events',
  name: 'Event Grid',
  icon: <Bell size={18} />,
  component: () => <EventGridDashboard />,
  description: 'Monitor real-time blockchain events',
  path: '/corporate/dashboard/events',
  category: 'admin',
};