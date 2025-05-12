// src/app/dashboard/layout.tsx
'use client';

import React, { ReactNode } from 'react';
import { ThemeProvider } from '@/lib/context/ThemeProvider';
import DashboardSidebar from '@/components/dashboard/Sidebar';

export const metadata = {
  title: 'Dashboard | VeritasVault.ai',
  description: 'Enterprise liquidity management dashboard for institutional investors.',
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultExperience="corporate">
      <div className="flex h-screen">
        {/* Sidebar on the left */}
        <DashboardSidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
