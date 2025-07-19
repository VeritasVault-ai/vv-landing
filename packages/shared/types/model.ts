/**
 * Model domain types
 * Contains all types related to analytics models and predictions
 */
import { BaseWebSocketData } from './websocket-infrastructure';

// Model entity
export interface Model {
  id: string;
  name: string;
  status: string;
}

// Model run information
export interface ModelRun {
  modelId: string;
  timestamp: string;
  duration: string;
  status: string;
}

// Compute resources information
export interface ComputeResources {
  available: boolean;
  queueLength: number;
}

// Prediction point
export interface PredictionPoint {
  timestamp: string;
  value: number;
}

// Model results
export interface ModelResults {
  accuracy: number;
  predictions: PredictionPoint[];
  confidence: number;
  executionTime: string;
}

// WebSocket data payload for model domain
export interface ModelData extends BaseWebSocketData {
  modelStatus: string;
  availableModels?: Model[];
  lastRun?: ModelRun;
  computeResources?: ComputeResources;
  activeModel?: string;
  progress?: number;
  estimatedTimeRemaining?: string;
  startTime?: string;
  currentStage?: string;
  results?: ModelResults;
  completionTime?: string;
}