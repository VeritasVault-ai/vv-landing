"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StandaloneThemeToggle } from "@/components/ui/standalone-theme-toggle"

interface VersionComparisonScreenProps {
  selectedVersion: "standard" | "corporate" | null
  onVersionChange: (version: "standard" | "corporate" | null) => void
}

export function VersionComparisonScreen({ selectedVersion, onVersionChange }: VersionComparisonScreenProps) {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="max-w-5xl w-full mx-auto text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
          Choose Your Experience
        </h1>
        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-8">
          Select the version that best fits your needs
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {/* Standard Version Card */}
          <div
            className={`flex-1 p-6 rounded-xl border transition-all ${
              selectedVersion === "standard"
                ? "border-blue-500 shadow-lg shadow-blue-100 dark:shadow-blue-900/20"
                : "border-slate-200 dark:border-slate-800"
            }`}
          >
            <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">Standard Version</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Perfect for individual investors and small teams</p>
            <ul className="text-left mb-6 space-y-2">
              <li className="flex items-center text-slate-700 dark:text-slate-300">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                User-friendly interface
              </li>
              <li className="flex items-center text-slate-700 dark:text-slate-300">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Essential analytics
              </li>
              <li className="flex items-center text-slate-700 dark:text-slate-300">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Basic AI recommendations
              </li>
            </ul>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => onVersionChange("standard")}
              variant={selectedVersion === "standard" ? "default" : "outline"}
            >
              {selectedVersion === "standard" ? "Selected" : "Select Standard"}
            </Button>
          </div>

          {/* Corporate Version Card */}
          <div
            className={`flex-1 p-6 rounded-xl border transition-all ${
              selectedVersion === "corporate"
                ? "border-blue-500 shadow-lg shadow-blue-100 dark:shadow-blue-900/20"
                : "border-slate-200 dark:border-slate-800"
            }`}
          >
            <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">Corporate Version</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Designed for enterprises and institutional investors
            </p>
            <ul className="text-left mb-6 space-y-2">
              <li className="flex items-center text-slate-700 dark:text-slate-300">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Advanced risk management
              </li>
              <li className="flex items-center text-slate-700 dark:text-slate-300">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Comprehensive analytics
              </li>
              <li className="flex items-center text-slate-700 dark:text-slate-300">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Enterprise-grade security
              </li>
            </ul>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => onVersionChange("corporate")}
              variant={selectedVersion === "corporate" ? "default" : "outline"}
            >
              {selectedVersion === "corporate" ? "Selected" : "Select Corporate"}
            </Button>
          </div>
        </div>

        {selectedVersion && (
          <div className="mt-8">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href={`/${selectedVersion}`}>Continue to {selectedVersion} version</Link>
            </Button>
          </div>
        )}
      </div>

      <div className="mt-auto">
        <StandaloneThemeToggle className="mx-auto" />
      </div>
    </main>
  )
}
