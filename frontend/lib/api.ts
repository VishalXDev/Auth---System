// lib/api.ts - Fixed version with better error handling
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { getAccessToken, setAccessToken, clearTokens } from "./auth";

// Extend Axios config to allow custom retry marker
interface RetryConfig extends AxiosRequestConfig {
  __retried?: boolean;
}

// Create axios instance with proper configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3004",
  withCredentials: true, // Important: sends cookies (refresh token)
  timeout: 10000, // 10 second timeout
});

// Request interceptor - attach access token
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle 401 with automatic refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string | null) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig;

    // If error is not 401, or request already retried, reject
    if (!originalRequest || error.response?.status !== 401 || originalRequest.__retried) {
      return Promise.reject(error);
    }

    // If already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string | null) => {
            if (token) {
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers.Authorization = `Bearer ${token}`;
              originalRequest.__retried = true;
              resolve(api(originalRequest));
            } else {
              reject(error);
            }
          },
          reject: (err: any) => {
            reject(err);
          }
        });
      });
    }

    // Start refresh process
    isRefreshing = true;

    try {
      console.log("🔄 Attempting to refresh token...");
      
      const response = await api.post("/auth/refresh");
      const { accessToken } = response.data;
      
      console.log("✅ Token refreshed successfully");
      
      // Save new access token
      setAccessToken(accessToken);
      
      // Process queued requests
      processQueue(null, accessToken);
      
      // Retry original request with new token
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      }
      originalRequest.__retried = true;
      
      return api(originalRequest);
      
    } catch (refreshError) {
      console.log("❌ Token refresh failed, redirecting to login");
      
      // Clear tokens and redirect to login
      processQueue(refreshError, null);
      clearTokens();
      
      // Only redirect in browser environment
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;