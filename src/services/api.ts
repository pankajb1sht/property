import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh or logout
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const propertyApi = {
  getAll: (params?: any) => api.get('/properties', { params }),
  getById: (id: string) => api.get(`/properties/${id}`),
  create: (data: any) => api.post('/properties', data),
  update: (id: string, data: any) => api.put(`/properties/${id}`, data),
  delete: (id: string) => api.delete(`/properties/${id}`),
};

export const auctionApi = {
  getAll: (params?: any) => api.get('/auctions', { params }),
  getById: (id: string) => api.get(`/auctions/${id}`),
  create: (data: any) => api.post('/auctions', data),
  update: (id: string, data: any) => api.put(`/auctions/${id}`, data),
  delete: (id: string) => api.delete(`/auctions/${id}`),
  bid: (id: string, amount: number) => api.post(`/auctions/${id}/bid`, { amount }),
};

export const brokerApi = {
  getAll: (params?: any) => api.get('/brokers', { params }),
  getById: (id: string) => api.get(`/brokers/${id}`),
  register: (data: any) => api.post('/brokers/register', data),
  update: (id: string, data: any) => api.put(`/brokers/${id}`, data),
  delete: (id: string) => api.delete(`/brokers/${id}`),
};

export const authApi = {
  login: (credentials: { email: string; password: string }) => 
    api.post('/auth/login', credentials),
  register: (data: any) => api.post('/auth/register', data),
  forgotPassword: (email: string) => 
    api.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) => 
    api.post('/auth/reset-password', { token, password }),
  verifyEmail: (token: string) => 
    api.post('/auth/verify-email', { token }),
};

export default api; 