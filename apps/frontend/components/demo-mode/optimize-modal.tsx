"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface OptimizeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function OptimizeModal({ isOpen, onClose }: OptimizeModalProps) {
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState(0)
  const [complete, setComplete] = useState(false)

  const steps = [
    "Analyzing market volatility...",
    "Evaluating impermanent loss risk...",
    "Calculating optimal yield strategies...",
    "Finalizing optimization plan...",
  ]

  useEffect(() => {
    if (isOpen && !complete) {
      const timer = setTimeout(() => {
        if (progress < 100) {
          setProgress((prev) => {
            const newProgress = prev + 1
            if (newProgress === 25) setStep(1)
            if (newProgress === 50) setStep(2)
            if (newProgress === 75) setStep(3)
            if (newProgress === 100) setComplete(true)
            return newProgress
          })
        }
      }, 30)

      return () => clearTimeout(timer)
    }

    return () => {}
  }, [isOpen, progress, complete])

  const handleClose = () => {
    onClose()
    // Reset state after closing
    setTimeout(() => {
      setProgress(0)
      setStep(0)
      setComplete(false)
    }, 300)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{complete ? "Yield Optimization Complete!" : "Optimizing Yield..."}</DialogTitle>
          <DialogDescription>
            {complete
              ? "Your simulated portfolio has been optimized for maximum yield."
              : "Our AI is analyzing market conditions and optimizing your yield strategy."}
          </DialogDescription>
        </DialogHeader>

        {!complete ? (
          <div className="space-y-4 py-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm font-medium">{steps[step]}</p>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="rounded-md bg-primary/10 p-4">
              <h4 className="font-medium mb-2">Optimization Results</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span>Previous Projected APY</span>
                  <span>14.2%</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>New Projected APY</span>
                  <span className="text-emerald-500">15.4%</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Impermanent Loss Risk</span>
                  <span className="text-amber-500">Reduced by 12%</span>
                </li>
                <li className="flex items-center justify-between border-t pt-2 mt-2 font-medium">
                  <span>Overall Improvement</span>
                  <span className="text-emerald-500">+1.2% APY</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        <DialogFooter>
          {complete ? (
            <Button onClick={handleClose}>Apply Optimization</Button>
          ) : (
            <Button disabled>Processing...</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
