"use client"

import type React from "react"
import { useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ChatbotGuide() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hi there! I'm your NeuralLiquid AI guide. I can help you explore the demo and answer any questions you have about our platform. What would you like to know?",
    },
  ])
  const [input, setInput] = useState("")

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }])

    // Simulate AI response
    setTimeout(() => {
      let response

      if (input.toLowerCase().includes("rebalance")) {
        response =
          "Rebalancing is the process of realigning your assets to maintain your desired risk level. In NeuralLiquid, our AI analyzes market conditions and automatically suggests optimal rebalancing strategies to maximize your returns while minimizing risk."
      } else if (input.toLowerCase().includes("optimize")) {
        response =
          "Our yield optimization uses advanced AI algorithms to analyze historical data and market trends to predict the most profitable liquidity pools. The AI then recommends the optimal allocation of your assets across these pools to maximize your returns."
      } else if (input.toLowerCase().includes("flash loan")) {
        response =
          "Flash loans are uncollateralized loans that must be borrowed and repaid within a single transaction block. NeuralLiquid's AI identifies profitable arbitrage opportunities across different protocols and executes them using flash loans, allowing you to earn profits with minimal risk."
      } else {
        response =
          "NeuralLiquid uses advanced AI to optimize your liquidity positions across multiple protocols. You can try the rebalance and optimize features in this demo to see how our AI works. Is there something specific you'd like to know about our platform?"
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }])
    }, 1000)

    // Clear input
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  if (!isOpen) {
    return (
      <Button onClick={toggleChat} className="fixed bottom-4 right-4 rounded-full h-12 w-12 p-0 bg-primary shadow-lg">
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Open AI Guide</span>
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 h-96 shadow-lg">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">AI Guide</CardTitle>
          <Button variant="ghost" size="icon" onClick={toggleChat} className="h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-64 px-4">
          <div className="space-y-4 pt-1 pb-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`rounded-lg px-3 py-2 max-w-[80%] ${
                    message.role === "assistant"
                      ? "bg-muted text-muted-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 pt-2">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
