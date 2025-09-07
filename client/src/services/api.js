import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const resumeAPI = {
  create: (resumeData) => api.post('/resumes', resumeData),
  getAll: () => api.get('/resumes'),
  getOne: (id) => api.get(`/resumes/${id}`),
  update: (id, resumeData) => api.put(`/resumes/${id}`, resumeData),
  delete: (id) => api.delete(`/resumes/${id}`),
  getSuggestions: (resumeData) => api.post('/suggestion', resumeData),
  exportPDF: (id, template) => api.get(`/pdf/${id}?template=${template}`),
};

export default api;
