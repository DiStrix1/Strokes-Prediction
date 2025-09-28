const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface StrokePredictionRequest {
  gender: 'Male' | 'Female' | 'Other';
  age: number;
  hypertension: 0 | 1;
  heart_disease: 0 | 1;
  ever_married: 'Yes' | 'No';
  work_type: 'Private' | 'Self-employed' | 'Govt_job' | 'children' | 'Never_worked';
  Residence_type: 'Urban' | 'Rural';
  avg_glucose_level: number;
  bmi: number;
  smoking_status: 'formerly smoked' | 'never smoked' | 'smokes' | null;
  threshold?: number;
}

export interface StrokePredictionResponse {
  probability: number;
  prediction: 0 | 1;
  threshold: number;
}

class APIService {
  async predictStroke(data: StrokePredictionRequest): Promise<StrokePredictionResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new APIServiceError(
          errorData?.message || `API request failed with status ${response.status}`,
          errorData
        );
      }

      const result = await response.json();
      return result;
    } catch (error) {
      if (error instanceof APIServiceError) {
        throw error;
      }
      
      // Network or other errors
      throw new APIServiceError(
        error instanceof Error ? error.message : 'Network error occurred',
        error
      );
    }
  }
}

class APIServiceError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'APIServiceError';
  }
}

export const apiService = new APIService();
export { APIServiceError as APIError };