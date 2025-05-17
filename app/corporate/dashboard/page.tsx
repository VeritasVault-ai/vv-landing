'use client';

export const dynamic = 'force-dynamic'; 
import { CorporateDashboard } from '@/components/corporate/dashboard/corporate-dashboard';
import { Suspense } from "react";
import DashboardLoading from "./loading";

/**
 * Displays the corporate dashboard page with a loading indicator while content is loading.
 *npm run build
 * Renders the dashboard content inside a React Suspense boundary, showing a loading fallback until the content is ready.
 */
export default function CorporateDashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <CorporateDashboard />
    </Suspense>
  )
}