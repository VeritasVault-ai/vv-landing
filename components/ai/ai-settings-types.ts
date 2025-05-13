/**
 * Types for AI settings and preferences
 */

export interface AISettings {
  // General settings
  enabled: boolean;
  historyTracking: boolean;
  
  // Feature-specific settings
  features: {
    recommendations: boolean;
    predictions: boolean;
    contentGeneration: boolean;
    dataAnalysis: boolean;
    riskAssessment: boolean;
  };
  
  // Privacy settings
  privacy: {
    allowDataCollection: boolean;
    allowImprovementFeedback: boolean;
    anonymizeInteractions: boolean;
  };
  
  // Personalization settings
  personalization: {
    level: 'none' | 'low' | 'medium' | 'high';
    includeHistoricalData: boolean;
  };
  
  // Display settings
  display: {
    showConfidenceScores: boolean;
    highlightAIContent: boolean;
    showFeedbackPrompts: boolean;
  };
}

// Default AI settings
export const DEFAULT_AI_SETTINGS: AISettings = {
  enabled: true,
  historyTracking: true,
  
  features: {
    recommendations: true,
    predictions: true,
    contentGeneration: true,
    dataAnalysis: true,
    riskAssessment: true,
  },
  
  privacy: {
    allowDataCollection: true,
    allowImprovementFeedback: true,
    anonymizeInteractions: false,
  },
  
  personalization: {
    level: 'medium',
    includeHistoricalData: true,
  },
  
  display: {
    showConfidenceScores: true,
    highlightAIContent: true,
    showFeedbackPrompts: true,
  }
};