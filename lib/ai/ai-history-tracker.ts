/**
 * AI History Tracker
 * 
 * This module provides functionality to track AI interactions within the application
 * for transparency, auditing, and compliance purposes.
 */


// Define types for AI interactions
export interface AIInteraction {
  id: string;
  timestamp: string;
  feature: AIFeature;
  action: AIAction;
  input?: string;
  output?: string;
  userId?: string;
  confidence?: number;
  metadata?: Record<string, any>;
  feedbackProvided?: boolean;
}

// AI features available in the application
export type AIFeature = 
  | 'recommendation'
  | 'prediction'
  | 'content-generation'
  | 'data-analysis'
  | 'risk-assessment'
  | 'portfolio-optimization';

// Types of AI actions
export type AIAction =
  | 'generate'
  | 'analyze'
  | 'predict'
  | 'recommend'
  | 'classify'
  | 'summarize'
  | 'optimize';

/**
 * AI History Tracker class for logging and retrieving AI interactions
 */
export class AIHistoryTracker {
  private static instance: AIHistoryTracker;
  private history: AIInteraction[] = [];
  private storageKey = 'ai_interaction_history';
  private maxHistoryItems = 100;
  private isEnabled: boolean;
  
  private constructor() {
    // Check if AI tracking is enabled in environment
    this.isEnabled = process.env.NEXT_PUBLIC_AI_TRACKING_ENABLED === 'true';
    
    // Load history from storage if available
    this.loadHistory();
  }
  
  /**
   * Get the singleton instance of AIHistoryTracker
   */
  public static getInstance(): AIHistoryTracker {
    if (!AIHistoryTracker.instance) {
      AIHistoryTracker.instance = new AIHistoryTracker();
    }
    return AIHistoryTracker.instance;
  }
  
  /**
   * Record a new AI interaction
   */
  public recordInteraction(interaction: Omit<AIInteraction, 'id' | 'timestamp'>): string {
    if (!this.isEnabled) return '';
    
    const id = this.generateId();
    const timestamp = new Date().toISOString();
    
    // Sanitize input and output to remove sensitive information
    const sanitizedInteraction = this.sanitizeInteraction({
      ...interaction,
      id,
      timestamp
    });
    
    // Add to history
    this.history.unshift(sanitizedInteraction);
    
    // Trim history if it exceeds maximum size
    if (this.history.length > this.maxHistoryItems) {
      this.history = this.history.slice(0, this.maxHistoryItems);
    }
    
    // Save to storage
    this.saveHistory();
    
    // Also send to server if configured
    this.sendToServer(sanitizedInteraction);
    
    return id;
  }
  
  /**
   * Get all recorded AI interactions
   */
  public getHistory(): AIInteraction[] {
    return [...this.history];
  }
  
  /**
   * Get a specific AI interaction by ID
   */
  public getInteraction(id: string): AIInteraction | undefined {
    return this.history.find(interaction => interaction.id === id);
  }
  
  /**
   * Add user feedback to an AI interaction
   */
  public addFeedback(id: string, feedback: { 
    helpful: boolean; 
    accurate: boolean; 
    comments?: string;
  }): boolean {
    const interaction = this.history.find(item => item.id === id);
    
    if (!interaction) return false;
    
    interaction.feedbackProvided = true;
    interaction.metadata = {
      ...interaction.metadata,
      feedback
    };
    
    this.saveHistory();
    
    // Send feedback to server
    this.sendFeedbackToServer(id, feedback);
    
    return true;
  }
  
  /**
   * Clear all recorded history
   */
  public clearHistory(): void {
    this.history = [];
    this.saveHistory();
  }
  
  /**
   * Enable or disable AI tracking
   */
  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('ai_tracking_enabled', String(enabled));
    }
  }
  
  /**
   * Check if AI tracking is enabled
   */
  public isTrackingEnabled(): boolean {
    return this.isEnabled;
  }
  
  /**
   * Generate a unique ID for an interaction
   */
  private generateId(): string {
    return `ai-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
  
  /**
   * Load history from storage
   */
  private loadHistory(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const storedHistory = localStorage.getItem(this.storageKey);
      if (storedHistory) {
        this.history = JSON.parse(storedHistory);
      }
      
      // Check if user has explicitly disabled tracking
      const trackingEnabled = localStorage.getItem('ai_tracking_enabled');
      if (trackingEnabled !== null) {
        this.isEnabled = trackingEnabled === 'true';
      }
    } catch (error) {
      console.error('Failed to load AI interaction history:', error);
      this.history = [];
    }
  }
  
  /**
   * Save history to storage
   */
  private saveHistory(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.history));
    } catch (error) {
      console.error('Failed to save AI interaction history:', error);
    }
  }
  
  /**
   * Sanitize an interaction to remove sensitive information
   */
  private sanitizeInteraction(interaction: AIInteraction): AIInteraction {
    // Create a deep copy to avoid modifying the original
    const sanitized = JSON.parse(JSON.stringify(interaction)) as AIInteraction;
    
    // Truncate long inputs/outputs
    if (sanitized.input && sanitized.input.length > 500) {
      sanitized.input = sanitized.input.substring(0, 500) + '...';
    }
    
    if (sanitized.output && sanitized.output.length > 1000) {
      sanitized.output = sanitized.output.substring(0, 1000) + '...';
    }
    
    // Remove potentially sensitive information from metadata
    if (sanitized.metadata) {
      const sensitiveKeys = ['password', 'token', 'key', 'secret', 'credentials'];
      
      for (const key of Object.keys(sanitized.metadata)) {
        if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
          sanitized.metadata[key] = '[REDACTED]';
        }
      }
    }
    
    return sanitized;
  }
  
  /**
   * Send interaction data to server for logging/analysis
   */
  private sendToServer(interaction: AIInteraction): void {
    // Skip if server logging is disabled
    if (process.env.NEXT_PUBLIC_AI_SERVER_LOGGING !== 'true') return;
    
    // Implementation would depend on your backend API
    // This is just a placeholder
    fetch('/api/ai/log-interaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(interaction),
    }).catch(error => {
      console.error('Failed to send AI interaction to server:', error);
    });
  }
  
  /**
   * Send feedback to server
   */
  private sendFeedbackToServer(id: string, feedback: any): void {
    // Skip if server logging is disabled
    if (process.env.NEXT_PUBLIC_AI_SERVER_LOGGING !== 'true') return;
    
    // Implementation would depend on your backend API
    fetch('/api/ai/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, feedback }),
    }).catch(error => {
      console.error('Failed to send AI feedback to server:', error);
    });
  }
}

// Export a singleton instance
export const aiHistoryTracker = AIHistoryTracker.getInstance();