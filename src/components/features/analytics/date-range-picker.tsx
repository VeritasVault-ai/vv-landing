"use client"
import type React from "react"
import { useState } from "react"
import type { DateRange } from "@/types/analytics"
import { Calendar, ChevronDown } from "lucide-react"
import styles from "./date-range-picker.module.css"

interface DateRangePickerProps {
  dateRange: DateRange
  onChange: (range: DateRange) => void
}

export function DateRangePicker({ dateRange, onChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }
  
  const presetRanges = [
    {
      label: "Last 7 days",
      range: {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        end: new Date(),
      },
    },
    {
      label: "Last 30 days",
      range: {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        end: new Date(),
      },
    },
    {
      label: "This month",
      range: {
        start: new Date(new Date().setDate(1)),
        end: new Date(),
      },
    },
    {
      label: "Last 3 months",
      range: {
        start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        end: new Date(),
      },
    },
    {
      label: "Year to date",
      range: {
        start: new Date(new Date().getFullYear(), 0, 1),
        end: new Date(),
      },
    },
  ]
  
  const handlePresetClick = (range: DateRange) => {
    onChange(range)
    setIsOpen(false)
  }
  
  const handleCustomDateChange = (e: React.ChangeEvent<HTMLInputElement>, type: "start" | "end") => {
    const newDate = new Date(e.target.value)
    if (!isNaN(newDate.getTime())) {
      onChange({
        ...dateRange,
        [type]: newDate,
      })
    }
  }
  
  return (
    <div className={styles.container}>
      <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        <Calendar className={styles.icon} />
        <span className={styles.dateText}>
          {formatDate(dateRange.start)} - {formatDate(dateRange.end)}
        </span>
        <ChevronDown className={styles.chevron} />
      </button>
      
      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.presets}>
            <h4 className={styles.presetsTitle}>Presets</h4>
            <div className={styles.presetButtons}>
              {presetRanges.map((preset) => (
                <button
                  key={preset.label}
                  className={styles.presetButton}
                  onClick={() => handlePresetClick(preset.range)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className={styles.customRange}>
            <h4 className={styles.customRangeTitle}>Custom Range</h4>
            <div className={styles.dateInputs}>
              <div className={styles.dateInputGroup}>
                <label className={styles.dateLabel}>Start Date</label>
                <input
                  type="date"
                  className={styles.dateInput}
                  value={dateRange.start.toISOString().split("T")[0]}
                  onChange={(e) => handleCustomDateChange(e, "start")}
                  max={dateRange.end.toISOString().split("T")[0]}
                />
              </div>
              <div className={styles.dateInputGroup}>
                <label className={styles.dateLabel}>End Date</label>
                <input
                  type="date"
                  className={styles.dateInput}
                  value={dateRange.end.toISOString().split("T")[0]}
                  onChange={(e) => handleCustomDateChange(e, "end")}
                  min={dateRange.start.toISOString().split("T")[0]}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
          </div>
          
          <div className={styles.actions}>
            <button className={styles.cancelButton} onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button className={styles.applyButton} onClick={() => setIsOpen(false)}>
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  )
}