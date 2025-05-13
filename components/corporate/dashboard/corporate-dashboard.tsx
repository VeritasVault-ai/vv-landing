'use client'

import { CorporateDashboard as ModularCorporateDashboard } from '@/src/components/dashboard/CorporateDashboard'

/**
 * Re-export the modular corporate dashboard implementation
 * This maintains backward compatibility while using the new modular implementation
 */
export function CorporateDashboard() {
  return <ModularCorporateDashboard />
}