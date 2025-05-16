"use client"
import { useState } from "react"
import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import styles from "../model-portfolio-dashboard.module.css"

interface ModelFeedbackProps {
  modelId: string
}

export const ModelFeedback = ({ modelId }: ModelFeedbackProps) => {
  const [rating, setRating] = useState<number>(0)
  const [hoveredRating, setHoveredRating] = useState<number>(0)
  const [feedback, setFeedback] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating)
  }

  const handleRatingHover = (hoveredRating: number) => {
    setHoveredRating(hoveredRating)
  }

  const handleRatingLeave = () => {
    setHoveredRating(0)
  }

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value)
  }

  const handleSubmit = () => {
    // In a real application, you would submit this to an API
    console.log({
      modelId,
      rating,
      feedback
    })
    setIsSubmitted(true)
  }

  return (
    <Card className={styles.feedbackSection}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Model Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        {!isSubmitted ? (
          <>
            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Rate this model:</div>
              <div className={styles.feedbackRating} onMouseLeave={handleRatingLeave}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`${styles.star} ${
                      (hoveredRating || rating) >= star ? styles.starFilled : ""
                    } cursor-pointer`}
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => handleRatingHover(star)}
                  />
                ))}
              </div>
            </div>
            
            <div className={styles.feedbackForm}>
              <Textarea
                placeholder="Share your feedback about this model portfolio..."
                className={styles.feedbackInput}
                value={feedback}
                onChange={handleFeedbackChange}
              />
              <div className={styles.feedbackActions}>
                <Button 
                  onClick={handleSubmit} 
                  disabled={rating === 0}
                >
                  Submit Feedback
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-green-600 font-medium mb-2">Thank you for your feedback!</p>
            <p className="text-sm text-muted-foreground">Your feedback helps us improve our model portfolios.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}