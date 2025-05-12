import { BaseService, ApiResponse } from './base-service';
import { ModelResultsData } from '@/lib/repositories/model-repository';

/**
 * Type definitions for model service responses
 */
export type ModelResultsResponse = ApiResponse<ModelResultsData>;

/**
 * Service layer for interacting with the model results API
 */
class ModelService extends BaseService {
  /**
   * Fetch model results data
   */
  async getModelResults(): Promise<ModelResultsData> {
    const response = await this.get<ModelResultsData>('/api/models/results');
    return response.data;
  }
  
  /**
   * Run a new model simulation
   */
  async runModelSimulation(parameters: {
    model: string;
    inputs: Record<string, any>;
  }): Promise<ModelResultsData> {
    const response = await this.post<ModelResultsData>('/api/models/simulate', parameters);
    return response.data;
  }
  
  /**
   * Save model results
   */
  async saveModelResults(modelResults: ModelResultsData): Promise<{ success: boolean }> {
    const response = await this.post<{ success: boolean }>('/api/models/save', modelResults);
    return response.data;
  }
}

// Export a singleton instance
export const modelService = new ModelService();