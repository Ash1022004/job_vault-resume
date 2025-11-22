// Resume Analyzer API Service
export interface AnalysisResult {
  score: string;
  missing_keywords: string[];
  suggestions: string[];
  formatting_issues?: string[];
  strengths?: string[];
  improvements?: string[];
  parsed?: {
    extracted_text_length: number;
  };
}

export interface AnalysisRequest {
  file: File;
  jobDescription?: string;
}

export class ResumeAnalyzerService {
  private baseUrl = 'http://127.0.0.1:5001';

  async analyzeResume(request: AnalysisRequest): Promise<AnalysisResult> {
    const formData = new FormData();
    formData.append('resume', request.file);
    
    if (request.jobDescription && request.jobDescription.trim()) {
      formData.append('job_description', request.jobDescription.trim());
    }

    try {
      const response = await fetch(`${this.baseUrl}/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to analysis server. Please ensure the backend is running on port 5001.');
      }
      throw error;
    }
  }

  // Parse resume to extract text
  async parseResume(file: File): Promise<{ extracted_text: string }> {
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch(`${this.baseUrl}/parse`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to analysis server. Please ensure the backend is running on port 5001.');
      }
      throw error;
    }
  }


  // Health check method to verify backend connection
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/`, {
        method: 'GET',
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const resumeAnalyzerService = new ResumeAnalyzerService();
