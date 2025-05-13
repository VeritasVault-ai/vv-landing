'use client'

import React from 'react'
import { CorporateRiskAssessment } from "@/components/corporate/dashboard/corporate-risk-assessment"

/**
 * Content for the Risk tab in the corporate dashboard
 */
export function CorporateRiskTab() {
  return (
    <div className="space-y-6">
      <CorporateRiskAssessment />
    </div>
  )
}