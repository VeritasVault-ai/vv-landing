'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"

/**
 * Content for the Reports tab in the corporate dashboard
 */
export function CorporateReportsTab() {
  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-100">Available Reports</CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400">
            Download or schedule reports for your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
// ─── Add this above your main component ───────────────────────────────────────
interface ReportItemProps {
  title: string;
  period: string;
  onDownload?: () => void;
}

function ReportItem({ title, period, onDownload }: ReportItemProps) {
  return (
    <div className="flex justify-between items-center p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
      <div className="flex items-center gap-3">
        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <div>
          <div className="font-medium text-slate-900 dark:text-slate-100">
            {title}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">{period}</div>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
        onClick={onDownload}
      >
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>
    </div>
  );
}

// ─── Then inside your JSX (e.g. within <CardContent>) ────────────────────────
<CardContent>
  <div className="space-y-4">
    {/* replace the first block */}
    <ReportItem
      title="Monthly Performance Report"
      period="April 2025"
      onDownload={() => console.log('Downloading Monthly Performance Report')}
    />

    {/* the remaining blocks can stay as-is, or you can swap them out the same way */}
    <div className="flex justify-between items-center p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
      <div className="flex items-center gap-3">
        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <div>
          <div className="font-medium text-slate-900 dark:text-slate-100">
            Risk Assessment Report
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">Q2 2025</div>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
      >
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>
    </div>

    {/* …and so on for the other two items */}
  </div>
</CardContent>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}