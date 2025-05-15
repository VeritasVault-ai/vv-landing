"use client"
import { useState } from "react"
import { Download } from "lucide-react"
import type { DateRange } from "@/types/analytics"
import styles from "./report-generator.module.css"

interface ReportGeneratorProps {
  dateRange: DateRange
}

export function ReportGenerator({ dateRange }: ReportGeneratorProps) {
  const [reportType, setReportType] = useState("summary")
  const [format, setFormat] = useState("pdf")
  const [sections, setSections] = useState({
    userActivity: true,
    transactions: true,
    chainComparison: true,
    assets: true,
    demographics: true,
  })

  const handleSectionToggle = (section: keyof typeof sections) => {
    setSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleGenerateReport = () => {
    // In a real application, this would call an API endpoint to generate the report
    console.log("Generating report with settings:", {
      reportType,
      format,
      sections,
      dateRange,
    })
    
    // Mock download behavior
    alert("Report generation started. The download will begin shortly.")
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Generate Analytics Report</h3>
      </div>
      
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="reportType">
            Report Type
          </label>
          <select
            id="reportType"
            className={styles.select}
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="summary">Summary Report</option>
            <option value="detailed">Detailed Report</option>
            <option value="executive">Executive Summary</option>
            <option value="custom">Custom Report</option>
          </select>
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="format">
            Format
          </label>
          <select
            id="format"
            className={styles.select}
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="pdf">PDF Document</option>
            <option value="excel">Excel Spreadsheet</option>
            <option value="csv">CSV Data</option>
            <option value="json">JSON Data</option>
          </select>
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Include Sections</label>
          <div className={styles.checkboxGroup}>
            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id="userActivity"
                className={styles.checkbox}
                checked={sections.userActivity}
                onChange={() => handleSectionToggle("userActivity")}
              />
              <label htmlFor="userActivity" className={styles.checkboxLabel}>
                User Activity
              </label>
            </div>
            
            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id="transactions"
                className={styles.checkbox}
                checked={sections.transactions}
                onChange={() => handleSectionToggle("transactions")}
              />
              <label htmlFor="transactions" className={styles.checkboxLabel}>
                Transaction Metrics
              </label>
            </div>
            
            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id="chainComparison"
                className={styles.checkbox}
                checked={sections.chainComparison}
                onChange={() => handleSectionToggle("chainComparison")}
              />
              <label htmlFor="chainComparison" className={styles.checkboxLabel}>
                Chain Comparison
              </label>
            </div>
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>&nbsp;</label>
          <div className={styles.checkboxGroup}>
            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id="assets"
                className={styles.checkbox}
                checked={sections.assets}
                onChange={() => handleSectionToggle("assets")}
              />
              <label htmlFor="assets" className={styles.checkboxLabel}>
                Top Assets
              </label>
            </div>
            
            <div className={styles.checkboxItem}>
              <input
                type="checkbox"
                id="demographics"
                className={styles.checkbox}
                checked={sections.demographics}
                onChange={() => handleSectionToggle("demographics")}
              />
              <label htmlFor="demographics" className={styles.checkboxLabel}>
                User Demographics
              </label>
            </div>
          </div>
        </div>
        
        <div className={styles.actions}>
          <button className={`${styles.button} ${styles.buttonSecondary}`}>Cancel</button>
          <button className={`${styles.button} ${styles.buttonPrimary}`} onClick={handleGenerateReport}>
            <Download className={styles.buttonIcon} />
            Generate Report
          </button>
        </div>
      </div>
    </div>
  )
}