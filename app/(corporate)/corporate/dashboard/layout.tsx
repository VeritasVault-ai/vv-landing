// Server component for dashboard layout
import React, { ReactNode } from 'react';
import { CollapsibleSidebar } from '@/components/layout/collapsible-sidebar';
import { EXPERIENCE_TYPES } from '@/src/constants/theme';
import { ThemeProvider } from '@/src/lib/context/ThemeProvider';

export const metadata = {
  title: 'Dashboard | VeritasVault.ai',
  description: 'Enterprise liquidity management dashboard for institutional investors.',
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultExperience={EXPERIENCE_TYPES.CORPORATE}>
      <div className="flex h-screen">
        <CollapsibleSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}