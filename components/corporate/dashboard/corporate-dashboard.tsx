'use client'

import { CorporateDashboard as ModularCorporateDashboard } from '@/src/components/dashboard/CorporateDashboard'

/**
 * Renders the modular corporate dashboard component for backward compatibility.
 *
 * This component serves as a wrapper to preserve the original `CorporateDashboard` export while delegating all functionality to the modular implementation.
 */
export function CorporateDashboard() {
  return <ModularCorporateDashboard />
}