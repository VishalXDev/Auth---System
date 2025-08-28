import axios, { AxiosRequestConfig } from "axios";
import { getAccessToken, setAccessToken, clearTokens } from "./auth";

// Extend Axios config to allow custom marker
interface RetryConfig extends AxiosRequestConfig {
  __retried?: boolean;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3004",
  withCredentials: true, // send cookies (refresh token)
});

// Attach access token if present
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Handle 401 with refresh (queueing) ---
let isRefreshing = false;
let queued: Array<(token: string | null) => void> = [];

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const config = error.config as RetryConfig;
    const response = error.response;

    if (!response || response.status !== 401 || config.__retried) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Queue this request until refresh completes
      return new Promise((resolve, reject) => {
        queued.push((newToken) => {
          if (!newToken) return reject(error);
          config.headers = config.headers || {};
          (config.headers as any).Authorization = `Bearer ${newToken}`;
          config.__retried = true;
          resolve(api(config));
        });
      });
    }

    try {
      isRefreshing = true;
      const { data } = await api.post("/auth/refresh"); // returns { accessToken }
      setAccessToken(data.accessToken);

      // Replay all queued requests
      queued.forEach((fn) => fn(data.accessToken));
      queued = [];

      config.headers = config.headers || {};
      (config.headers as any).Authorization = `Bearer ${data.accessToken}`;
      config.__retried = true;
      return api(config);
    } catch (e) {
      queued.forEach((fn) => fn(null));
      queued = [];
      clearTokens();
      if (typeof window !== "undefined") {
        window.location.href = "/"; // go back to OTP entry page
      }
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
