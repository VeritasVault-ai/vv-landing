"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, ThumbsDown, Send, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { aiHistoryTracker } from "@/lib/ai/ai-history-tracker"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface AIFeedbackProps {
  contentId: string
  compact?: boolean
  className?: string
  onFeedbackSubmitted?: (feedback: {
    contentId: string
    helpful: boolean
    accurate: boolean
    comments?: string
  }) => void
}

/**
 * Renders a user interface for submitting feedback on AI-generated content, supporting both quick thumbs up/down and a detailed feedback form.
 *
 * In compact mode, displays thumbs up and thumbs down buttons for immediate feedback. In full mode, provides a popover form where users can rate helpfulness and accuracy, add optional comments, and submit their feedback. After submission, a thank-you message is shown and the form resets for future use.
 *
 * @param contentId - The identifier of the AI-generated content being reviewed.
 * @param compact - If true, renders a minimal UI with only thumbs up/down buttons.
 * @param className - Optional CSS class names for custom styling.
 * @param onFeedbackSubmitted - Optional callback invoked with feedback data after submission.
 *
 * @remark Feedback is recorded using an internal AI history tracker and the component manages its own submission and reset flow.
 */
export function AIFeedback({
  contentId,
  compact = false,
  className,
  onFeedbackSubmitted
}: AIFeedbackProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [helpful, setHelpful] = useState<boolean | null>(null)
  const [accurate, setAccurate] = useState<boolean | null>(null)
  const [comments, setComments] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = () => {
    if (helpful === null) return

    setSubmitting(true)

    const feedback = {
      contentId,
      helpful: helpful === true,
      accurate: accurate === true,
      comments: comments.trim() || undefined
    }

    // Record feedback in AI history tracker
    aiHistoryTracker.addFeedback(contentId, {
      helpful: feedback.helpful,
      accurate: feedback.accurate,
      comments: feedback.comments
    })

    // Call onFeedbackSubmitted callback if provided
    if (onFeedbackSubmitted) {
      onFeedbackSubmitted(feedback)
    }

    // Simulate API call delay
    setTimeout(() => {
      setSubmitted(true)
      setSubmitting(false)
      
      // Close popover after a delay
      setTimeout(() => {
        setIsOpen(false)
        
        // Reset state after popover closes
        setTimeout(() => {
          setHelpful(null)
          setAccurate(null)
          setComments("")
          setSubmitted(false)
        }, 300)
      }, 2000)
    }, 500)
  }

  // Compact version just shows thumbs up/down buttons
  if (compact) {
    return (
      <div className={cn("flex items-center gap-1 text-sm", className)}>
        <span className="text-slate-500 dark:text-slate-400 text-xs mr-1">Feedback:</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 rounded-full"
          onClick={() => {
            setHelpful(true)
            setAccurate(true)
            handleSubmit()
          }}
          aria-label="This AI content was helpful"
        >
          <ThumbsUp className="h-3 w-3 text-slate-600 dark:text-slate-400" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 rounded-full"
          onClick={() => {
            setHelpful(false)
            setAccurate(false)
            handleSubmit()
          }}
          aria-label="This AI content was not helpful"
        >
          <ThumbsDown className="h-3 w-3 text-slate-600 dark:text-slate-400" />
        </Button>
      </div>
    )
  }

  // Full version with popover
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("text-xs", className)}
          aria-label="Provide feedback on this AI content"
        >
          Provide Feedback
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        {submitted ? (
          <div className="py-4 text-center">
            <div className="text-green-600 dark:text-green-500 font-medium mb-2">
              Thank you for your feedback!
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Your input helps us improve our AI systems.
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-sm">AI Content Feedback</h4>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 rounded-full"
                onClick={() => setIsOpen(false)}
                aria-label="Close feedback form"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Was this content helpful?
                </label>
                <div className="flex gap-2">
                  <Button
                    variant={helpful === true ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setHelpful(true)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Yes
                  </Button>
                  <Button
                    variant={helpful === false ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setHelpful(false)}
                  >
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    No
                  </Button>
                </div>
              </div>
              
              {helpful !== null && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Was this content accurate?
                  </label>
                  <div className="flex gap-2">
                    <Button
                      variant={accurate === true ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                      onClick={() => setAccurate(true)}
                    >
                      Yes
                    </Button>
                    <Button
                      variant={accurate === false ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                      onClick={() => setAccurate(false)}
                    >
                      No
                    </Button>
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="ai-feedback-comments" className="block text-sm font-medium mb-2">
                  Additional comments (optional)
                </label>
                <Textarea
                  id="ai-feedback-comments"
                  placeholder="Share your thoughts about this AI-generated content..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
              </div>
              
              <Button 
                className="w-full"
                disabled={helpful === null || submitting}
                onClick={handleSubmit}
              >
                {submitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}