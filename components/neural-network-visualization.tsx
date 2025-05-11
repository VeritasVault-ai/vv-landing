"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Info, Play, Pause, RefreshCw, Layers, Code } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define node types with implementation details
const NODE_TYPES = {
  INPUT: {
    name: "Data Sources",
    color: "#3A86FF",
    description: "Market APIs, blockchain nodes, exchange connectors",
    symbol: "DS",
    pulseFrequency: "high",
    tech: "REST APIs, WebSockets, RPC nodes",
    implementation: "Microservices that connect to external data providers",
    example: "Market Data API",
  },
  PROCESSING: {
    name: "Data Processing",
    color: "#06D6A0",
    description: "Feature engineering, data transformation",
    symbol: "DP",
    pulseFrequency: "medium",
    tech: "Apache Spark, Pandas, NumPy",
    implementation: "ETL pipelines that transform raw data into features",
    example: "Feature Engineering Service",
  },
  DECISION: {
    name: "Decision Engine",
    color: "#FFD166",
    description: "ML models, trading algorithms",
    symbol: "DE",
    pulseFrequency: "low",
    tech: "TensorFlow, PyTorch, scikit-learn",
    implementation: "Model serving infrastructure with A/B testing capabilities",
    example: "ML Model Serving",
  },
  MEMORY: {
    name: "Data Storage",
    color: "#EF476F",
    description: "Databases, caching layers, state management",
    symbol: "DB",
    pulseFrequency: "very-low",
    tech: "PostgreSQL, Redis, TimescaleDB",
    implementation: "Distributed database clusters with replication",
    example: "Time-Series Database",
  },
  AGGREGATION: {
    name: "Data Fusion",
    color: "#118AB2",
    description: "Combines multiple data sources",
    symbol: "DF",
    pulseFrequency: "medium",
    tech: "Apache Kafka, RabbitMQ",
    implementation: "Event streaming platform with custom aggregation logic",
    example: "Data Fusion Service",
  },
  FILTER: {
    name: "Validation & Cleaning",
    color: "#7209B7",
    description: "Anomaly detection, data validation",
    symbol: "VC",
    pulseFrequency: "high",
    tech: "Statistical models, rule engines",
    implementation: "Real-time validation services with alerting",
    example: "Data Validation Service",
  },
  OUTPUT: {
    name: "Execution Layer",
    color: "#F72585",
    description: "Strategy execution, API calls, smart contracts",
    symbol: "EX",
    pulseFrequency: "medium",
    tech: "Exchange APIs, Web3 libraries",
    implementation: "Transaction management system with retry logic",
    example: "Strategy Execution Service",
  },
  CORE: {
    name: "Orchestration Engine",
    color: "#8A2BE2",
    description: "Coordinates system components",
    symbol: "OE",
    pulseFrequency: "high",
    tech: "Kubernetes, Airflow, custom scheduler",
    implementation: "Central orchestration service with monitoring",
    example: "System Orchestrator",
  },
}

// Message types with colors and descriptions
const MESSAGE_TYPES = {
  data: {
    color: "#3A86FF",
    name: "Raw Data",
    description: "Unprocessed data from external sources",
  },
  processed: {
    color: "#06D6A0",
    name: "Processed Data",
    description: "Cleaned and transformed data",
  },
  decision: {
    color: "#FFD166",
    name: "Decision Signal",
    description: "Trading or allocation decision",
  },
  historical: {
    color: "#EF476F",
    name: "Historical Data",
    description: "Data retrieved from storage",
  },
  control: {
    color: "#8A2BE2",
    name: "Control Message",
    description: "System coordination command",
  },
  feedback: {
    color: "#F72585",
    name: "Feedback Signal",
    description: "Execution result or status update",
  },
}

export function NeuralNetworkVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showLabels, setShowLabels] = useState(false)
  const [showLegend, setShowLegend] = useState(false)
  const [showImplementation, setShowImplementation] = useState(false)
  const animationRef = useRef<number | null>(null)
  const [networkSpeed, setNetworkSpeed] = useState(1)
  const [selectedNodeType, setSelectedNodeType] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<{ x: number; y: number; type: string } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const container = canvas.parentElement
      if (!container) return

      canvas.width = container.clientWidth
      canvas.height = container.clientHeight

      // Clear any previous drawings when resizing
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Node class with enhanced features and implementation details
    class Node {
      x: number
      y: number
      radius: number
      color: string
      pulseRadius: number
      pulseOpacity: number
      pulseSpeed: number
      connections: Node[]
      label: string
      activity: number
      targetActivity: number
      activityChangeSpeed: number
      type: string
      symbol: string
      description: string
      tech: string
      implementation: string
      pulseFrequency: string
      isHighlighted: boolean
      processingData: boolean
      processingAnimation: number
      dataQueue: number
      lastPacketTime: number
      messageQueue: { type: string; size: number }[]

      constructor(x: number, y: number, radius: number, type: string, label?: string) {
        const nodeType = NODE_TYPES[type as keyof typeof NODE_TYPES]

        this.x = x
        this.y = y
        this.radius = radius
        this.color = nodeType.color
        this.pulseRadius = radius
        this.pulseOpacity = 0

        // Set pulse speed based on node type
        switch (nodeType.pulseFrequency) {
          case "very-low":
            this.pulseSpeed = 0.01 + Math.random() * 0.01
            break
          case "low":
            this.pulseSpeed = 0.015 + Math.random() * 0.015
            break
          case "medium":
            this.pulseSpeed = 0.02 + Math.random() * 0.02
            break
          case "high":
            this.pulseSpeed = 0.025 + Math.random() * 0.025
            break
          default:
            this.pulseSpeed = 0.02 + Math.random() * 0.02
        }

        this.connections = []
        this.label = label || nodeType.example
        this.activity = 0.2 + Math.random() * 0.3 // Base activity level
        this.targetActivity = this.activity
        this.activityChangeSpeed = 0.01 + Math.random() * 0.02
        this.type = type
        this.symbol = nodeType.symbol
        this.description = nodeType.description
        this.tech = nodeType.tech
        this.implementation = nodeType.implementation
        this.pulseFrequency = nodeType.pulseFrequency
        this.isHighlighted = false
        this.processingData = false
        this.processingAnimation = 0
        this.dataQueue = 0
        this.lastPacketTime = 0
        this.messageQueue = []
      }

      draw(showLabels: boolean, showImplementation: boolean) {
        const isSelected = selectedNodeType === this.type || selectedNodeType === null
        const alpha = isSelected ? 1 : 0.3

        // Draw node with glow effect
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2)

        // Create gradient for glow effect
        const gradient = ctx!.createRadialGradient(this.x, this.y, this.radius * 0.5, this.x, this.y, this.radius * 1.2)
        gradient.addColorStop(0, this.color)
        gradient.addColorStop(
          1,
          `rgba(${Number.parseInt(this.color.slice(1, 3), 16)}, ${Number.parseInt(this.color.slice(3, 5), 16)}, ${Number.parseInt(this.color.slice(5, 7), 16)}, 0)`,
        )

        ctx!.fillStyle = gradient
        ctx!.globalAlpha = alpha
        ctx!.fill()
        ctx!.globalAlpha = 1

        // Draw inner circle with activity-based brightness
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.radius * 0.7, 0, Math.PI * 2)
        ctx!.fillStyle = this.color
        ctx!.globalAlpha = (0.3 + this.activity * 0.7) * alpha // Activity affects brightness
        ctx!.fill()
        ctx!.globalAlpha = 1

        // Draw symbol in the center
        ctx!.font = `${this.radius * 0.8}px Arial`
        ctx!.fillStyle = "white"
        ctx!.textAlign = "center"
        ctx!.textBaseline = "middle"
        ctx!.globalAlpha = alpha
        ctx!.fillText(this.symbol, this.x, this.y)
        ctx!.globalAlpha = 1

        // Draw pulse
        if (this.pulseOpacity > 0) {
          ctx!.beginPath()
          ctx!.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2)
          ctx!.strokeStyle = `rgba(${Number.parseInt(this.color.slice(1, 3), 16)}, ${Number.parseInt(this.color.slice(3, 5), 16)}, ${Number.parseInt(this.color.slice(5, 7), 16)}, ${this.pulseOpacity * alpha})`
          ctx!.lineWidth = 2
          ctx!.stroke()
        }

        // Draw processing animation if active
        if (this.processingData) {
          this.drawProcessingAnimation(alpha)
        }

        // Draw message queue indicator if there are pending messages
        if (this.messageQueue.length > 0) {
          this.drawMessageQueueIndicator(alpha)
        }

        // Draw highlight if node is highlighted
        if (this.isHighlighted) {
          ctx!.beginPath()
          ctx!.arc(this.x, this.y, this.radius * 1.3, 0, Math.PI * 2)
          ctx!.strokeStyle = "white"
          ctx!.lineWidth = 2
          ctx!.stroke()
        }

        // Only draw activity percentage if showLabels is true
        if (showLabels && isSelected) {
          // Draw activity percentage
          const activityPercent = Math.round(this.activity * 100)
          ctx!.font = "10px Arial"
          ctx!.fillStyle = "rgba(255, 255, 255, 0.7)"
          ctx!.textAlign = "center"
          ctx!.fillText(`${activityPercent}%`, this.x, this.y + this.radius + 15)
        }
      }

      drawProcessingAnimation(alpha: number) {
        // Draw spinning arc to indicate processing
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.radius * 1.2, this.processingAnimation, this.processingAnimation + Math.PI, false)
        ctx!.strokeStyle = `rgba(255, 255, 255, ${0.7 * alpha})`
        ctx!.lineWidth = 2
        ctx!.stroke()
      }

      drawMessageQueueIndicator(alpha: number) {
        // Draw message queue visualization - stack of small rectangles
        const queueSize = Math.min(this.messageQueue.length, 5)
        const rectWidth = this.radius * 1.2
        const rectHeight = this.radius * 0.4

        for (let i = 0; i < queueSize; i++) {
          const message = this.messageQueue[i]
          const yOffset = i * (rectHeight * 0.6)

          ctx!.fillStyle = `rgba(255, 255, 255, ${(0.8 - i * 0.15) * alpha})`
          ctx!.fillRect(this.x - rectWidth / 2, this.y + this.radius * 1.5 + yOffset, rectWidth, rectHeight)

          // Draw message type indicator
          ctx!.font = `${rectHeight * 0.6}px Arial`
          ctx!.fillStyle = this.color
          ctx!.textAlign = "center"
          ctx!.textBaseline = "middle"
          ctx!.fillText(message.type.substring(0, 1), this.x, this.y + this.radius * 1.5 + yOffset + rectHeight / 2)
        }

        // If there are more messages than we're showing
        if (this.messageQueue.length > queueSize) {
          ctx!.font = `${rectHeight * 0.6}px Arial`
          ctx!.fillStyle = `rgba(255, 255, 255, ${0.7 * alpha})`
          ctx!.textAlign = "center"
          ctx!.fillText(
            `+${this.messageQueue.length - queueSize}`,
            this.x,
            this.y + this.radius * 1.5 + queueSize * (rectHeight * 0.6) + rectHeight,
          )
        }
      }

      // Helper function to wrap text
      wrapText(text: string, maxWidth: number): string[] {
        const words = text.split(" ")
        const lines: string[] = []
        let currentLine = words[0]

        ctx!.font = "9px Arial"

        for (let i = 1; i < words.length; i++) {
          const word = words[i]
          const width = ctx!.measureText(currentLine + " " + word).width

          if (width < maxWidth) {
            currentLine += " " + word
          } else {
            lines.push(currentLine)
            currentLine = word
          }
        }

        lines.push(currentLine)
        return lines
      }

      update(networkSpeed: number, currentTime: number) {
        // Update pulse with network speed factor
        this.pulseRadius += this.pulseSpeed * networkSpeed
        this.pulseOpacity -= 0.01 * networkSpeed

        if (this.pulseRadius > this.radius * 3 || this.pulseOpacity <= 0) {
          this.pulseRadius = this.radius
          this.pulseOpacity = 0.6
        }

        // Update processing animation
        if (this.processingData) {
          this.processingAnimation += 0.1 * networkSpeed
          if (this.processingAnimation >= Math.PI * 2) {
            this.processingAnimation = 0
          }
        }

        // Occasionally change target activity based on node type
        const changeChance = this.getActivityChangeChance()
        if (Math.random() < changeChance * networkSpeed) {
          this.targetActivity = this.getTypeBasedActivity()
        }

        // Smoothly transition to target activity
        if (this.activity < this.targetActivity) {
          this.activity += this.activityChangeSpeed * networkSpeed
          if (this.activity > this.targetActivity) this.activity = this.targetActivity
        } else if (this.activity > this.targetActivity) {
          this.activity -= this.activityChangeSpeed * networkSpeed
          if (this.activity < this.targetActivity) this.activity = this.targetActivity
        }

        // Type-specific behaviors
        this.updateTypeSpecificBehavior(networkSpeed, currentTime)

        // Process message queue
        this.processMessageQueue(networkSpeed)
      }

      processMessageQueue(networkSpeed: number) {
        // Process messages in the queue
        if (this.messageQueue.length > 0 && !this.processingData && Math.random() < 0.05 * networkSpeed) {
          const message = this.messageQueue.shift()
          if (message) {
            this.processingData = true

            // Different processing times based on message type and node type
            let processingTime = 500

            if (this.type === "PROCESSING") {
              processingTime = 800 // Processing nodes take longer
            } else if (this.type === "MEMORY") {
              processingTime = 1000 // Memory operations are slowest
            } else if (this.type === "DECISION") {
              processingTime = 700 // Decision making takes time
            }

            setTimeout(() => {
              this.processingData = false

              // After processing, potentially send to a connection
              if (this.connections.length > 0 && Math.random() < 0.7) {
                // Choose a connection based on message type and node types
                let targetNode

                if (message.type === "query" && this.connections.some((n) => n.type === "MEMORY")) {
                  // Queries preferentially go to memory nodes
                  const memoryNodes = this.connections.filter((n) => n.type === "MEMORY")
                  targetNode = memoryNodes[Math.floor(Math.random() * memoryNodes.length)]
                } else if (message.type === "data" && this.connections.some((n) => n.type === "PROCESSING")) {
                  // Raw data preferentially goes to processing nodes
                  const processingNodes = this.connections.filter((n) => n.type === "PROCESSING")
                  targetNode = processingNodes[Math.floor(Math.random() * processingNodes.length)]
                } else if (message.type === "result" && this.connections.some((n) => n.type === "OUTPUT")) {
                  // Results preferentially go to output nodes
                  const outputNodes = this.connections.filter((n) => n.type === "OUTPUT")
                  targetNode = outputNodes[Math.floor(Math.random() * outputNodes.length)]
                } else {
                  // Otherwise random
                  targetNode = this.connections[Math.floor(Math.random() * this.connections.length)]
                }

                createPacket(this, targetNode, message.type)
              }
            }, processingTime / networkSpeed)
          }
        }
      }

      getActivityChangeChance() {
        // Different node types have different activity change frequencies
        switch (this.type) {
          case "INPUT":
            return 0.02 // Input nodes change frequently
          case "MEMORY":
            return 0.005 // Memory nodes are more stable
          case "CORE":
            return 0.01 // Core is moderately stable
          default:
            return 0.01
        }
      }

      getTypeBasedActivity() {
        // Different node types have different activity patterns
        switch (this.type) {
          case "INPUT":
            return 0.4 + Math.random() * 0.6 // Input nodes are often active
          case "PROCESSING":
            return 0.3 + Math.random() * 0.7 // Processing nodes vary widely
          case "DECISION":
            return Math.random() > 0.5 ? 0.8 + Math.random() * 0.2 : 0.1 + Math.random() * 0.2 // Decision nodes tend to be either very active or quiet
          case "MEMORY":
            return 0.2 + Math.random() * 0.4 // Memory nodes maintain moderate activity
          case "CORE":
            return 0.5 + Math.random() * 0.5 // Core is always somewhat active
          default:
            return 0.2 + Math.random() * 0.8
        }
      }

      updateTypeSpecificBehavior(networkSpeed: number, currentTime: number) {
        // Implement type-specific behaviors
        switch (this.type) {
          case "INPUT":
            // Input nodes occasionally generate data messages
            if (Math.random() < 0.02 * networkSpeed && currentTime - this.lastPacketTime > 1000) {
              this.lastPacketTime = currentTime

              // Add to message queue
              this.messageQueue.push({ type: "data", size: Math.floor(Math.random() * 5) + 1 })

              // Find connections to send data to
              if (this.connections.length > 0) {
                // Input nodes preferentially send to filter nodes first
                const filterNodes = this.connections.filter((node) => node.type === "FILTER")
                if (filterNodes.length > 0) {
                  const targetNode = filterNodes[Math.floor(Math.random() * filterNodes.length)]
                  createPacket(this, targetNode, "data")
                } else {
                  const targetNode = this.connections[Math.floor(Math.random() * this.connections.length)]
                  createPacket(this, targetNode, "data")
                }
              }
            }
            break

          case "PROCESSING":
            // Processing nodes transform data
            if (this.messageQueue.length > 0 && !this.processingData && Math.random() < 0.03 * networkSpeed) {
              // Processing takes time
              this.processingData = true
              setTimeout(() => {
                this.processingData = false
                this.messageQueue.shift() // Remove processed message

                // After processing, send to aggregation or decision nodes
                if (this.connections.length > 0) {
                  const preferredNodes = this.connections.filter(
                    (node) => node.type === "AGGREGATION" || node.type === "DECISION",
                  )

                  const targetNode =
                    preferredNodes.length > 0
                      ? preferredNodes[Math.floor(Math.random() * preferredNodes.length)]
                      : this.connections[Math.floor(Math.random() * this.connections.length)]

                  createPacket(this, targetNode, "processed")
                }
              }, 800 / networkSpeed)
            }
            break

          case "MEMORY":
            // Memory nodes handle queries and storage
            if (Math.random() < 0.01 * networkSpeed && currentTime - this.lastPacketTime > 2000) {
              this.lastPacketTime = currentTime

              // Memory nodes occasionally send historical data
              if (this.connections.length > 0) {
                const targetNode = this.connections[Math.floor(Math.random() * this.connections.length)]
                createPacket(this, targetNode, "historical")
              }
            }
            break

          case "CORE":
            // Core node coordinates activity
            if (Math.random() < 0.03 * networkSpeed && currentTime - this.lastPacketTime > 800) {
              this.lastPacketTime = currentTime

              // Core sends coordination messages to multiple nodes
              const connectionCount = Math.min(this.connections.length, 2 + Math.floor(Math.random() * 2))
              const selectedConnections = [...this.connections]
                .sort(() => 0.5 - Math.random())
                .slice(0, connectionCount)

              selectedConnections.forEach((targetNode) => {
                createPacket(this, targetNode, "control")
              })
            }
            break

          case "DECISION":
            // Decision nodes make decisions based on processed data
            if (this.messageQueue.length > 0 && !this.processingData && Math.random() < 0.04 * networkSpeed) {
              this.processingData = true
              setTimeout(() => {
                this.processingData = false
                this.messageQueue.shift()

                // After decision, send to output or memory
                if (this.connections.length > 0) {
                  const outputNodes = this.connections.filter((node) => node.type === "OUTPUT")
                  if (outputNodes.length > 0 && Math.random() < 0.7) {
                    // 70% chance to send to output
                    const targetNode = outputNodes[Math.floor(Math.random() * outputNodes.length)]
                    createPacket(this, targetNode, "decision")
                  } else {
                    // Otherwise send to any connection
                    const targetNode = this.connections[Math.floor(Math.random() * this.connections.length)]
                    createPacket(this, targetNode, "decision")
                  }
                }
              }, 700 / networkSpeed)
            }
            break

          case "OUTPUT":
            // Output nodes execute strategies
            if (this.messageQueue.length > 0 && !this.processingData) {
              this.processingData = true
              setTimeout(() => {
                this.processingData = false
                this.messageQueue.shift()

                // Output nodes may send feedback to core
                const coreNodes = this.connections.filter((node) => node.type === "CORE")
                if (coreNodes.length > 0 && Math.random() < 0.3) {
                  const targetNode = coreNodes[0]
                  createPacket(this, targetNode, "feedback")
                }
              }, 600 / networkSpeed)
            }
            break
        }
      }

      drawConnections(showActivity: boolean) {
        this.connections.forEach((node) => {
          // Skip drawing if either node is filtered out
          if (selectedNodeType !== null && this.type !== selectedNodeType && node.type !== selectedNodeType) {
            return
          }

          // Calculate connection strength based on both nodes' activity
          const connectionStrength = (this.activity + node.activity) / 2
          const alpha = selectedNodeType === null ? 1 : 0.7

          ctx!.beginPath()
          ctx!.moveTo(this.x, this.y)
          ctx!.lineTo(node.x, node.y)

          // Use gradient for connections
          const gradient = ctx!.createLinearGradient(this.x, this.y, node.x, node.y)
          gradient.addColorStop(0, this.color)
          gradient.addColorStop(1, node.color)

          // Determine connection style based on node types
          let lineStyle = "solid"
          let lineWidth = 1 + connectionStrength * 2

          // Input to filter: data ingestion pipeline
          if ((this.type === "INPUT" && node.type === "FILTER") || (node.type === "INPUT" && this.type === "FILTER")) {
            lineStyle = "dashed"
            lineWidth = 2 + connectionStrength * 2
          }

          // Filter to processing: cleaned data flow
          if (
            (this.type === "FILTER" && node.type === "PROCESSING") ||
            (node.type === "FILTER" && this.type === "PROCESSING")
          ) {
            lineStyle = "solid"
            lineWidth = 2 + connectionStrength * 2
          }

          // Memory connections: database queries
          if (this.type === "MEMORY" || node.type === "MEMORY") {
            lineStyle = "dotted"
          }

          // Decision to output: execution pathway
          if (
            (this.type === "DECISION" && node.type === "OUTPUT") ||
            (node.type === "DECISION" && this.type === "OUTPUT")
          ) {
            lineStyle = "solid"
            lineWidth = 3 + connectionStrength * 2
          }

          // Core connections: control messages
          if (this.type === "CORE" || node.type === "CORE") {
            lineStyle = "dashed"
            lineWidth = 1 + connectionStrength
          }

          // Apply line style
          if (lineStyle === "dashed") {
            ctx!.setLineDash([5, 3])
          } else if (lineStyle === "dotted") {
            ctx!.setLineDash([2, 2])
          } else {
            ctx!.setLineDash([])
          }

          ctx!.strokeStyle = showActivity
            ? `rgba(${Number.parseInt(gradient.toString().slice(1, 3), 16) || 150}, ${Number.parseInt(gradient.toString().slice(3, 5), 16) || 200}, ${Number.parseInt(gradient.toString().slice(5, 7), 16) || 255}, ${(0.1 + connectionStrength * 0.4) * alpha})`
            : `rgba(100, 149, 237, ${0.2 * alpha})`

          ctx!.lineWidth = lineWidth
          ctx!.stroke()
          ctx!.setLineDash([]) // Reset line dash
        })
      }

      receiveData(messageType: string) {
        // Add to message queue when node receives data
        this.messageQueue.push({ type: messageType, size: Math.floor(Math.random() * 3) + 1 })

        // Limit queue size
        if (this.messageQueue.length > 10) {
          this.messageQueue.shift()
        }

        // Increase activity when receiving data
        this.targetActivity = Math.min(1, this.targetActivity + 0.2)
      }

      // Check if a point is inside this node
      containsPoint(x: number, y: number): boolean {
        const distance = Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2))
        return distance <= this.radius
      }
    }

    // Enhanced data packet class with message types
    class DataPacket {
      startNode: Node
      endNode: Node
      x: number
      y: number
      progress: number
      speed: number
      color: string
      size: number
      trail: { x: number; y: number; opacity: number }[]
      pulseSize: number
      pulseDirection: number
      messageType: string

      constructor(startNode: Node, endNode: Node, messageType: string) {
        this.startNode = startNode
        this.endNode = endNode
        this.x = startNode.x
        this.y = startNode.y
        this.progress = 0
        this.messageType = messageType

        // Speed varies by node types and message type
        if (startNode.type === "MEMORY" || endNode.type === "MEMORY") {
          // Memory operations are slower
          this.speed = 0.005 + Math.random() * 0.005
        } else if (messageType === "control" || messageType === "feedback") {
          // Control and feedback messages are high priority and move faster
          this.speed = 0.015 + Math.random() * 0.01
        } else {
          // Default speed
          this.speed = 0.01 + Math.random() * 0.01
        }

        // Set color based on message type
        this.color = MESSAGE_TYPES[messageType as keyof typeof MESSAGE_TYPES]?.color || "#FFFFFF"

        this.size = 3
        this.trail = []
        this.pulseSize = this.size
        this.pulseDirection = 1
      }

      draw() {
        // Skip drawing if either node is filtered out
        if (
          selectedNodeType !== null &&
          this.startNode.type !== selectedNodeType &&
          this.endNode.type !== selectedNodeType
        ) {
          return
        }

        const alpha = selectedNodeType === null ? 1 : 0.7

        // Draw trail
        this.trail.forEach((point, index) => {
          ctx!.beginPath()
          ctx!.arc(point.x, point.y, this.size * 0.7, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(${Number.parseInt(this.color.slice(1, 3), 16)}, ${Number.parseInt(this.color.slice(3, 5), 16)}, ${Number.parseInt(this.color.slice(5, 7), 16)}, ${point.opacity * alpha})`
          ctx!.fill()
        })

        // Draw packet with pulsing effect
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.pulseSize, 0, Math.PI * 2)
        ctx!.fillStyle = this.color
        ctx!.globalAlpha = alpha
        ctx!.fill()
        ctx!.globalAlpha = 1

        // Add glow effect
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.pulseSize * 1.5, 0, Math.PI * 2)
        const gradient = ctx!.createRadialGradient(
          this.x,
          this.y,
          this.pulseSize * 0.5,
          this.x,
          this.y,
          this.pulseSize * 2,
        )
        gradient.addColorStop(0, this.color)
        gradient.addColorStop(
          1,
          `rgba(${Number.parseInt(this.color.slice(1, 3), 16)}, ${Number.parseInt(this.color.slice(3, 5), 16)}, ${Number.parseInt(this.color.slice(5, 7), 16)}, 0)`,
        )
        ctx!.fillStyle = gradient
        ctx!.globalAlpha = 0.3 * alpha
        ctx!.fill()
        ctx!.globalAlpha = 1

        // Draw message type indicator
        if (showLabels) {
          const messageSymbol = this.getMessageSymbol()
          ctx!.font = "8px Arial"
          ctx!.fillStyle = "white"
          ctx!.textAlign = "center"
          ctx!.textBaseline = "middle"
          ctx!.globalAlpha = alpha
          ctx!.fillText(messageSymbol, this.x, this.y)
          ctx!.globalAlpha = 1
        }
      }

      getMessageSymbol() {
        switch (this.messageType) {
          case "data":
            return "D"
          case "processed":
            return "P"
          case "decision":
            return "!"
          case "historical":
            return "H"
          case "control":
            return "C"
          case "feedback":
            return "F"
          default:
            return "•"
        }
      }

      update(networkSpeed: number) {
        this.progress += this.speed * networkSpeed

        // Update position
        this.x = this.startNode.x + (this.endNode.x - this.startNode.x) * this.progress
        this.y = this.startNode.y + (this.endNode.y - this.startNode.y) * this.progress

        // Update pulse effect
        this.pulseSize += 0.05 * this.pulseDirection * networkSpeed
        if (this.pulseSize > this.size * 1.3) this.pulseDirection = -1
        if (this.pulseSize < this.size * 0.8) this.pulseDirection = 1

        // Add trail points
        if (Math.random() < 0.2 * networkSpeed) {
          this.trail.push({
            x: this.x,
            y: this.y,
            opacity: 0.7,
          })
        }

        // Update trail
        this.trail.forEach((point) => {
          point.opacity -= 0.02 * networkSpeed
        })

        // Remove faded trail points
        this.trail = this.trail.filter((point) => point.opacity > 0)

        if (this.progress >= 1) {
          // Activate the end node when packet arrives
          this.endNode.targetActivity = Math.min(1, this.endNode.targetActivity + 0.3)
          this.endNode.receiveData(this.messageType)
          return true // Reached destination
        }

        return false
      }
    }

    // Create specialized nodes with implementation-specific labels
    const centerNode = new Node(canvas.width / 2, canvas.height / 2, 12, "CORE")
    const nodes: Node[] = [centerNode]

    // Create outer nodes with specific types and implementation-focused labels
    const nodeTypes = [
      { type: "INPUT", label: "Market Data API" },
      { type: "FILTER", label: "Data Validation" },
      { type: "PROCESSING", label: "Feature Engineering" },
      { type: "AGGREGATION", label: "Data Fusion Service" },
      { type: "DECISION", label: "ML Model Serving" },
      { type: "MEMORY", label: "Time-Series DB" },
      { type: "OUTPUT", label: "Strategy Execution" },
    ]

    const numOuterNodes = nodeTypes.length
    const radius = Math.min(canvas.width, canvas.height) * 0.35

    for (let i = 0; i < numOuterNodes; i++) {
      const angle = (i / numOuterNodes) * Math.PI * 2
      const x = centerNode.x + Math.cos(angle) * radius
      const y = centerNode.y + Math.sin(angle) * radius

      const node = new Node(x, y, 8, nodeTypes[i].type, nodeTypes[i].label)
      nodes.push(node)

      // Connect to center node (orchestration engine)
      centerNode.connections.push(node)
      node.connections.push(centerNode)
    }

    // Create logical connections between nodes based on real data flow
    // Input -> Filter -> Processing
    nodes[1].connections.push(nodes[2]) // Market Data -> Data Validation
    nodes[2].connections.push(nodes[3]) // Data Validation -> Feature Engineering

    // Processing -> Aggregation -> Decision
    nodes[3].connections.push(nodes[4]) // Feature Engineering -> Data Fusion
    nodes[4].connections.push(nodes[5]) // Data Fusion -> ML Model

    // Memory connections
    nodes[6].connections.push(nodes[4]) // Time-Series DB -> Data Fusion
    nodes[5].connections.push(nodes[6]) // ML Model -> Time-Series DB

    // Decision -> Output
    nodes[5].connections.push(nodes[7]) // ML Model -> Strategy Execution

    // Create data packets
    let packets: DataPacket[] = []

    const createPacket = (startNode: Node, endNode: Node, messageType: string) => {
      // Only create packet if nodes are connected
      if (startNode.connections.includes(endNode)) {
        packets.push(new DataPacket(startNode, endNode, messageType))
      }
    }

    // Handle mouse move for hover effects
    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      // Check if mouse is over any node
      let hoveredNodeFound = false
      for (const node of nodes) {
        if (node.containsPoint(x, y)) {
          setHoveredNode({ x: node.x, y: node.y, type: node.type })
          hoveredNodeFound = true
          break
        }
      }

      if (!hoveredNodeFound) {
        setHoveredNode(null)
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      if (!isPlaying) return

      ctx!.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      nodes.forEach((node) => node.drawConnections(showLabels))

      // Update and draw nodes
      const currentTime = Date.now()
      nodes.forEach((node) => {
        node.update(networkSpeed, currentTime)
        node.draw(showLabels, showImplementation)
      })

      // Update and draw packets
      packets = packets.filter((packet) => {
        packet.draw()
        const reachedDestination = packet.update(networkSpeed)
        return !reachedDestination
      })

      // Create new packet occasionally from input nodes or core
      if (Math.random() < 0.03 * networkSpeed && packets.length < 20) {
        // Prefer input nodes as sources
        const inputNodes = nodes.filter((node) => node.type === "INPUT" || node.type === "CORE")
        if (inputNodes.length > 0) {
          const startNode = inputNodes[Math.floor(Math.random() * inputNodes.length)]
          if (startNode.connections.length > 0) {
            const endNode = startNode.connections[Math.floor(Math.random() * startNode.connections.length)]
            createPacket(startNode, endNode, "data")
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      canvas.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, showLabels, networkSpeed, selectedNodeType, showImplementation, hoveredNode])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleLabels = () => {
    setShowLabels(!showLabels)
  }

  const toggleLegend = () => {
    setShowLegend(!showLegend)
  }

  const toggleImplementation = () => {
    setShowImplementation(!showImplementation)
  }

  const increaseSpeed = () => {
    setNetworkSpeed((prev) => Math.min(prev + 0.5, 3))
  }

  const decreaseSpeed = () => {
    setNetworkSpeed((prev) => Math.max(prev - 0.5, 0.5))
  }

  const handleNodeTypeSelect = (type: string | null) => {
    setSelectedNodeType(type)
  }

  return (
    <div className="w-full h-80 md:h-96 relative rounded-xl overflow-hidden border border-white/10 bg-[#0a0f2c]">
      <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />

      {/* Controls overlay */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-4">
        <div className="text-sm text-gray-300 bg-black/40 px-3 py-1 rounded-full">
          System architecture visualization
        </div>

        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-black/40 hover:bg-black/60 text-white"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isPlaying ? "Pause" : "Play"} visualization</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-black/40 hover:bg-black/60 text-white"
                  onClick={toggleLabels}
                >
                  <Info size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{showLabels ? "Hide" : "Show"} activity levels</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-black/40 hover:bg-black/60 text-white"
                  onClick={toggleLegend}
                >
                  <Layers size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{showLegend ? "Hide" : "Show"} component legend</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-black/40 hover:bg-black/60 text-white"
                  onClick={toggleImplementation}
                >
                  <Code size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{showImplementation ? "Hide" : "Show"} tech details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex items-center bg-black/40 rounded-full px-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-transparent text-white"
              onClick={decreaseSpeed}
              disabled={networkSpeed <= 0.5}
            >
              -
            </Button>
            <span className="text-xs text-white w-12 text-center">Speed: {networkSpeed.toFixed(1)}x</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-transparent text-white"
              onClick={increaseSpeed}
              disabled={networkSpeed >= 3}
            >
              +
            </Button>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-black/40 hover:bg-black/60 text-white"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset visualization</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Explanation overlay - appears when showing labels */}
      {showLabels && (
        <div className="absolute top-4 left-4 max-w-xs bg-black/70 p-3 rounded-lg text-xs text-white">
          <h4 className="font-semibold mb-1">System Architecture</h4>
          <p>
            This visualization demonstrates the microservice architecture of our AI liquidity management system. Each
            node represents a different service or component that processes data and makes decisions.
          </p>
          <p className="mt-2">
            The connections show API calls, message queues, and data flows between services. Different line styles
            represent different communication protocols.
          </p>
        </div>
      )}

      {/* Node type legend */}
      {showLegend && (
        <div className="absolute top-4 right-4 bg-black/70 p-3 rounded-lg text-xs text-white max-w-xs overflow-y-auto max-h-[80%]">
          <h4 className="font-semibold mb-2">System Components</h4>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(NODE_TYPES).map(([key, value]) => (
              <div
                key={key}
                className={`p-2 rounded-md cursor-pointer ${
                  selectedNodeType === key ? "bg-white/20" : "bg-black/40 hover:bg-black/60"
                }`}
                onClick={() => handleNodeTypeSelect(selectedNodeType === key ? null : key)}
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: value.color }}></div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{value.name}</span>
                      <span className="text-xs px-1.5 py-0.5 bg-black/30 rounded-full">{value.symbol}</span>
                    </div>
                    <p className="text-xs text-gray-300 mt-0.5">{value.description}</p>
                    {showImplementation && (
                      <div className="mt-1 text-xs bg-black/30 p-1 rounded">
                        <span className="text-gray-400">Tech: </span>
                        <span>{value.tech}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {selectedNodeType && (
              <Button variant="ghost" size="sm" className="mt-1 text-xs h-7" onClick={() => handleNodeTypeSelect(null)}>
                Show All Components
              </Button>
            )}
          </div>
          <div className="mt-3 pt-2 border-t border-white/20">
            <h5 className="font-medium mb-1">Message Types</h5>
            <div className="grid grid-cols-1 gap-1">
              {Object.entries(MESSAGE_TYPES).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2 p-1 rounded hover:bg-black/30">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: value.color }}></div>
                  <span className="font-medium text-xs">{value.name}</span>
                  <span className="text-xs text-gray-300">{value.description}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-white/20">
            <h5 className="font-medium mb-1">Connection Types</h5>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-0 border-t-2 border-white"></div>
                <span className="text-xs">Direct API calls</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0 border-t-2 border-white border-dashed"></div>
                <span className="text-xs">Message queue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0 border-t-2 border-white border-dotted"></div>
                <span className="text-xs">Database queries</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hover tooltip for nodes */}
      {hoveredNode && !showLegend && (
        <div
          className="absolute bg-black/80 p-2 rounded text-xs text-white pointer-events-none"
          style={{
            left: hoveredNode.x + 20,
            top: hoveredNode.y - 20,
            transform: "translateY(-100%)",
            maxWidth: "200px",
          }}
        >
          <div className="font-medium">{NODE_TYPES[hoveredNode.type as keyof typeof NODE_TYPES].name}</div>
          <div className="text-gray-300 mt-1">
            {NODE_TYPES[hoveredNode.type as keyof typeof NODE_TYPES].description}
          </div>
          {showImplementation && (
            <div className="mt-1 text-gray-400">
              Tech: {NODE_TYPES[hoveredNode.type as keyof typeof NODE_TYPES].tech}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
