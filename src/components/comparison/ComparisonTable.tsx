"use client"

import { User, Building } from "lucide-react"
import { FeatureCategory } from "./FeatureCategory"
import { FeatureRow } from "./FeatureRow"

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-4 border-b border-border"></th>
            <th className="p-4 border-b border-border">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-2">
                  <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="font-bold text-lg">Standard</span>
              </div>
            </th>
            <th className="p-4 border-b border-border">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-2">
                  <Building className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="font-bold text-lg">Corporate</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <FeatureCategory title="Core Features" />
          <FeatureRow
            feature="AI-powered liquidity optimization"
            standardIncluded={true}
            corporateIncluded={true}
            tooltip="Optimize liquidity positions using advanced AI algorithms"
          />
          <FeatureRow
            feature="Real-time market analytics"
            standardIncluded={true}
            corporateIncluded={true}
            tooltip="Access real-time data and analytics on market conditions"
          />
          <FeatureRow
            feature="Automated risk management"
            standardIncluded={true}
            corporateIncluded={true}
            tooltip="Automated tools to manage and mitigate risks"
          />
          <FeatureRow
            feature="Multi-chain support"
            standardIncluded={false}
            corporateIncluded={true}
            tooltip="Support for multiple blockchain networks"
          />

          <FeatureCategory title="Analytics & Reporting" />
          <FeatureRow
            feature="Basic analytics dashboard"
            standardIncluded={true}
            corporateIncluded={true}
            tooltip="Standard analytics dashboard with key metrics"
          />
          <FeatureRow
            feature="Advanced analytics"
            standardIncluded={false}
            corporateIncluded={true}
            tooltip="In-depth analytics with custom metrics and visualizations"
          />
          <FeatureRow
            feature="Custom reports"
            standardIncluded={false}
            corporateIncluded={true}
            tooltip="Generate custom reports for specific needs"
          />
          <FeatureRow
            feature="Export capabilities"
            standardIncluded="Limited"
            corporateIncluded={true}
            tooltip="Export data and reports in various formats"
          />

          <FeatureCategory title="Strategy Management" />
          <FeatureRow
            feature="Strategy creation"
            standardIncluded={true}
            corporateIncluded={true}
            tooltip="Create custom liquidity strategies"
          />
          <FeatureRow
            feature="AI strategy recommendations"
            standardIncluded={true}
            corporateIncluded={true}
            tooltip="Get AI-powered strategy recommendations"
          />
          <FeatureRow
            feature="Strategy templates"
            standardIncluded="5 templates"
            corporateIncluded="Unlimited"
            tooltip="Pre-built strategy templates"
          />
          <FeatureRow
            feature="Backtesting"
            standardIncluded="Basic"
            corporateIncluded="Advanced"
            tooltip="Test strategies against historical data"
          />
          <FeatureRow
            feature="Active strategies"
            standardIncluded="Up to 5"
            corporateIncluded="Unlimited"
            tooltip="Number of strategies that can be active simultaneously"
          />

          <FeatureCategory title="Security & Compliance" />
          <FeatureRow
            feature="Two-factor authentication"
            standardIncluded={true}
            corporateIncluded={true}
            tooltip="Secure your account with 2FA"
          />
          <FeatureRow
            feature="Role-based access control"
            standardIncluded={false}
            corporateIncluded={true}
            tooltip="Define user roles and permissions"
          />
          <FeatureRow
            feature="Audit logs"
            standardIncluded={false}
            corporateIncluded={true}
            tooltip="Track all actions and changes"
          />
          <FeatureRow
            feature="Compliance reporting"
            standardIncluded={false}
            corporateIncluded={true}
            tooltip="Generate reports for regulatory compliance"
          />

          <FeatureCategory title="Support" />
          <FeatureRow
            feature="Community support"
            standardIncluded={true}
            corporateIncluded={true}
            tooltip="Access to community forums and resources"
          />
          <FeatureRow
            feature="Email support"
            standardIncluded="48 hours"
            corporateIncluded="4 hours"
            tooltip="Response time for email support"
          />
          <FeatureRow
            feature="Live chat support"
            standardIncluded={false}
            corporateIncluded={true}
            tooltip="Real-time chat support"
          />
          <FeatureRow
            feature="Phone support"
            standardIncluded={false}
            corporateIncluded={true}
            tooltip="Direct phone support"
          />
          <FeatureRow
            feature="Dedicated account manager"
            standardIncluded={false}
            corporateIncluded={true}
            tooltip="Personal account manager for your organization"
          />
        </tbody>
      </table>
    </div>
  )
}