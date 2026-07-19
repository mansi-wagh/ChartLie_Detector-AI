import axios from 'axios';
import type { AnalysisResult } from '../types';

const api = axios.create({
  baseURL: localStorage.getItem("backend_url") || "/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const customUrl = localStorage.getItem("backend_url");
  if (customUrl) {
    config.baseURL = customUrl;
  }
  return config;
});

export const uploadChart = async (file: File): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post<AnalysisResult>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default api;