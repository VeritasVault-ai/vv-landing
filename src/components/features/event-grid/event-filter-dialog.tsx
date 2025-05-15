"use client"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { EventGridFilter } from "@/types/event-grid"
import styles from "./event-filter-dialog.module.css"

export interface EventFilterDialogProps {
  isOpen: boolean
  onClose: () => void
  currentFilter?: EventGridFilter
  onFilterChange: (filter: EventGridFilter | undefined) => void
}

// Define BlockchainEventType enum
export enum BlockchainEventType {
  BLOCK = "BLOCK",
  TRANSACTION = "TRANSACTION",
  CONTRACT_INVOCATION = "CONTRACT_INVOCATION",
  ANY = "ANY",
}

export const EventFilterDialog = ({ isOpen, onClose, currentFilter, onFilterChange }: EventFilterDialogProps) => {
  const [filter, setFilter] = useState<EventGridFilter>({})

  // Initialize filter with current values when dialog opens
  useEffect(() => {
    if (isOpen && currentFilter) {
      setFilter({ ...currentFilter })
    } else if (isOpen) {
      setFilter({})
    }
  }, [isOpen, currentFilter])

  const handleApplyFilter = () => {
    // Remove empty filter properties
    const cleanedFilter: EventGridFilter = {}
    if (filter.eventType) cleanedFilter.eventType = filter.eventType
    if (filter.subjectBeginsWith) cleanedFilter.subjectBeginsWith = filter.subjectBeginsWith
    if (filter.subjectEndsWith) cleanedFilter.subjectEndsWith = filter.subjectEndsWith
    if (filter.dataFilter && filter.dataFilter.key && filter.dataFilter.value !== undefined) {
      cleanedFilter.dataFilter = {
        key: filter.dataFilter.key,
        value: filter.dataFilter.value,
      }
    }

    // Only apply filter if there are actual filter criteria
    if (Object.keys(cleanedFilter).length > 0) {
      onFilterChange(cleanedFilter)
    } else {
      onFilterChange(undefined)
    }
  }

  const handleClearFilter = () => {
    setFilter({})
    onFilterChange(undefined)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <DialogTitle>Filter Events</DialogTitle>
          <DialogDescription>Set criteria to filter the events in the feed.</DialogDescription>
        </DialogHeader>

        <div className={styles.filterForm}>
          <div className={styles.formGroup}>
            <Label htmlFor="eventType">Event Type</Label>
            <Select
              value={filter.eventType || ""}
              onValueChange={(value) => setFilter({ ...filter, eventType: value || undefined })}
            >
              <SelectTrigger id="eventType">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any event type</SelectItem>
                {Object.values(BlockchainEventType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="subjectBeginsWith">Subject Begins With</Label>
            <Input
              id="subjectBeginsWith"
              value={filter.subjectBeginsWith || ""}
              onChange={(e) => setFilter({ ...filter, subjectBeginsWith: e.target.value || undefined })}
              placeholder="e.g. /blockchain/ethereum"
            />
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="subjectEndsWith">Subject Ends With</Label>
            <Input
              id="subjectEndsWith"
              value={filter.subjectEndsWith || ""}
              onChange={(e) => setFilter({ ...filter, subjectEndsWith: e.target.value || undefined })}
              placeholder="e.g. /confirmed"
            />
          </div>

          <div className={styles.dataFilterSection}>
            <div className={styles.sectionHeader}>
              <Label>Data Filter</Label>
              {filter.dataFilter && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilter({ ...filter, dataFilter: undefined })}
                  className={styles.clearButton}
                >
                  <X className={styles.clearIcon} />
                  Clear
                </Button>
              )}
            </div>

            <div className={styles.dataFilterFields}>
              <div className={styles.formGroup}>
                <Label htmlFor="dataFilterKey">Property Path</Label>
                <Input
                  id="dataFilterKey"
                  value={filter.dataFilter?.key || ""}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      dataFilter: {
                        ...(filter.dataFilter || {}),
                        key: e.target.value,
                        value: filter.dataFilter?.value || "",
                      },
                    })
                  }
                  placeholder="e.g. network or transaction.status"
                />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="dataFilterValue">Value</Label>
                <Input
                  id="dataFilterValue"
                  value={filter.dataFilter?.value || ""}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      dataFilter: {
                        ...(filter.dataFilter || {}),
                        key: filter.dataFilter?.key || "",
                        value: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g. ethereum or success"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className={styles.dialogFooter}>
          <Button variant="outline" onClick={handleClearFilter}>
            Clear All
          </Button>
          <Button onClick={handleApplyFilter}>Apply Filter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}