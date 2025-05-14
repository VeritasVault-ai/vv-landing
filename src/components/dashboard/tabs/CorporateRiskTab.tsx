'use client'

import React from 'react'
import { CorporateRiskAssessment } from "@/components/corporate/dashboard/corporate-risk-assessment"

/**
 * Renders the content for the Risk tab in the corporate dashboard.
 *
 * Displays the {@link CorporateRiskAssessment} component within a vertically spaced container.
 */
export function CorporateRiskTab() {
  return (
    <div className="space-y-6">
      <CorporateRiskAssessment />
    </div>
  )
}