'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"

/**
 * Content for the Reports tab in the corporate dashboard
 */
export function CorporateReportsTab() {
  const handleDownloadReport = (reportTitle: string, period: string) => {
    // Implement actual download logic here
    console.log(`Downloading ${reportTitle} for ${period}`);
    // Example:
    // window.open(
    //   `/api/reports/download?title=${encodeURIComponent(reportTitle)}&period=${encodeURIComponent(period)}`
    // );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-100">
            Available Reports
          </CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400">
            Download or schedule reports for your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="font-medium text-slate-900 dark:text-slate-100">
                    Monthly Performance Report
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    April 2025
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                onClick={() =>
                  handleDownloadReport("Monthly Performance Report", "April 2025")
                }
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>

            {/* Repeat onClick handlers for the other buttons similarly */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
}