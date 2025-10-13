// MongoDB API Service - Replace with your actual backend API
// This file contains dummy API calls that you need to implement in your backend

const API_BASE_URL = 'YOUR_BACKEND_API_URL'; // Replace with your actual API URL

export interface User {
  _id: string;
  email: string;
  name: string;
  subscription: 'free' | 'premium';
  createdAt: string;
}

export interface Resume {
  _id: string;
  userId: string;
  title: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedIn?: string;
    website?: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    location: string;
    graduationDate: string;
    gpa?: string;
  }>;
  skills: string[];
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
}

class MongoAPIService {
  private getAuthHeader(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // ==================== AUTH ENDPOINTS ====================
  
  async signup(email: string, password: string, name: string): Promise<{ user: User; token: string }> {
    // TODO: Implement in your backend
    // POST /api/auth/signup
    // Body: { email, password, name }
    // Response: { user: User, token: string }
    
    console.log('Signup called:', { email, name });
    
    // Dummy implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          _id: 'dummy-user-' + Date.now(),
          email,
          name,
          subscription: 'free',
          createdAt: new Date().toISOString()
        };
        const token = 'dummy-token-' + Date.now();
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        resolve({ user, token });
      }, 1000);
    });
  }

  async signin(email: string, password: string): Promise<{ user: User; token: string }> {
    // TODO: Implement in your backend
    // POST /api/auth/signin
    // Body: { email, password }
    // Response: { user: User, token: string }
    
    console.log('Signin called:', { email });
    
    // Dummy implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          _id: 'dummy-user-' + Date.now(),
          email,
          name: 'Demo User',
          subscription: 'free',
          createdAt: new Date().toISOString()
        };
        const token = 'dummy-token-' + Date.now();
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        resolve({ user, token });
      }, 1000);
    });
  }

  async signout(): Promise<void> {
    // TODO: Implement in your backend
    // POST /api/auth/signout
    
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // ==================== RESUME ENDPOINTS ====================

  async createResume(resumeData: Omit<Resume, '_id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Resume> {
    // TODO: Implement in your backend
    // POST /api/resumes
    // Headers: Authorization: Bearer {token}
    // Body: resumeData
    // Response: Resume
    
    console.log('Create resume called:', resumeData);
    
    // Dummy implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const resume: Resume = {
          ...resumeData,
          _id: 'resume-' + Date.now(),
          userId: this.getCurrentUser()?._id || 'unknown',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        resolve(resume);
      }, 800);
    });
  }

  async updateResume(resumeId: string, resumeData: Partial<Resume>): Promise<Resume> {
    // TODO: Implement in your backend
    // PUT /api/resumes/:id
    // Headers: Authorization: Bearer {token}
    // Body: resumeData
    // Response: Resume
    
    console.log('Update resume called:', resumeId, resumeData);
    
    // Dummy implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const resume: Resume = {
          _id: resumeId,
          userId: this.getCurrentUser()?._id || 'unknown',
          title: 'Updated Resume',
          personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            location: ''
          },
          summary: '',
          experience: [],
          education: [],
          skills: [],
          isDraft: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...resumeData
        };
        resolve(resume);
      }, 800);
    });
  }

  async getResume(resumeId: string): Promise<Resume> {
    // TODO: Implement in your backend
    // GET /api/resumes/:id
    // Headers: Authorization: Bearer {token}
    // Response: Resume
    
    console.log('Get resume called:', resumeId);
    
    // Dummy implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const resume: Resume = {
          _id: resumeId,
          userId: this.getCurrentUser()?._id || 'unknown',
          title: 'My Resume',
          personalInfo: {
            fullName: 'John Doe',
            email: 'john@example.com',
            phone: '+1 234 567 8900',
            location: 'New York, NY'
          },
          summary: 'Experienced professional with a passion for technology...',
          experience: [],
          education: [],
          skills: [],
          isDraft: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        resolve(resume);
      }, 500);
    });
  }

  async getUserResumes(): Promise<Resume[]> {
    // TODO: Implement in your backend
    // GET /api/resumes
    // Headers: Authorization: Bearer {token}
    // Response: Resume[]
    
    console.log('Get user resumes called');
    
    // Dummy implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 500);
    });
  }

  async deleteResume(resumeId: string): Promise<void> {
    // TODO: Implement in your backend
    // DELETE /api/resumes/:id
    // Headers: Authorization: Bearer {token}
    
    console.log('Delete resume called:', resumeId);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }

  // ==================== SUBSCRIPTION ENDPOINTS ====================

  async createCheckoutSession(plan: 'premium'): Promise<{ url: string }> {
    // TODO: Implement in your backend with Stripe/PayPal
    // POST /api/subscriptions/checkout
    // Headers: Authorization: Bearer {token}
    // Body: { plan }
    // Response: { url: string } (Stripe checkout URL)
    
    console.log('Create checkout session:', plan);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ url: 'https://stripe.com/checkout/dummy' });
      }, 500);
    });
  }

  async getSubscriptionStatus(): Promise<{ subscription: 'free' | 'premium'; expiresAt?: string }> {
    // TODO: Implement in your backend
    // GET /api/subscriptions/status
    // Headers: Authorization: Bearer {token}
    
    const user = this.getCurrentUser();
    return Promise.resolve({ 
      subscription: user?.subscription || 'free'
    });
  }
}

export const mongoApi = new MongoAPIService();