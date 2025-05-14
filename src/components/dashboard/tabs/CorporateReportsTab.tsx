'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"

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

/**
 * Renders the Reports tab content for the corporate dashboard, displaying a list of available reports with download options.
 *
 * @returns A React element containing a styled card with report entries and download buttons.
 *
 * @remark This component is purely presentational and does not include download logic or dynamic data.
 */
export function CorporateReportsTab() {
  const handleDownloadReport = (reportTitle: string, period: string) => {
    // Implement actual download logic here
    console.log(`Downloading ${reportTitle} for ${period}`);
    // Example:
    // window.open(
    //   `/api/reports/download?title=${encodeURIComponent(reportTitle)}&period=${encodeURIComponent(period)}`
    // );

    // When implementing the actual API call:
    // try {
    //   const response = await fetch(
    //     `/api/reports/download?title=${encodeURIComponent(reportTitle)}&period=${encodeURIComponent(period)}`
    //   );
    //   if (!response.ok) {
    //     throw new Error(`Error downloading report: ${response.statusText}`);
    //   }
    //   const blob = await response.blob();
    //   const url = URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.href = url;
    //   a.download = `${reportTitle} - ${period}.pdf`;
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    // } catch (error) {
    //   console.error('Download failed:', error);
    //   // Show error notification to user
    // }
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
            <ReportItem
              title="Monthly Performance Report"
              period="April 2025"
              onDownload={() => console.log('Downloading Monthly Performance Report')}
            />

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
          </div>
        </CardContent>
        
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
        </CardContent>
  
        <CardContent>
            {/* Additional report entries */}
            <div className="flex justify-between items-center p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="font-medium text-slate-900 dark:text-slate-100">
                    Risk Assessment Report
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Q2 2025
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                onClick={() =>
                  handleDownloadReport("Risk Assessment Report", "Q2 2025")
                }
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
  
        </CardContent>
          
        <CardContent>
            <div className="flex justify-between items-center p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="font-medium text-slate-900 dark:text-slate-100">
                    Regulatory Compliance Report
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Q2 2025
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                onClick={() =>
                  handleDownloadReport("Regulatory Compliance Report", "Q2 2025")
                }
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
  );
}
      }