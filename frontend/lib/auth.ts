// lib/auth.ts - Fixed version with consistent token storage

// Use localStorage for access token (client-side only)
// Refresh token is handled via httpOnly cookies by the backend

const ACCESS_TOKEN_KEY = "accessToken";

// Save access token to localStorage
export function setAccessToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
}

// Get access token from localStorage
export function getAccessToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  return null;
}

// Clear access token (refresh token cleared by backend via cookies)
export function clearTokens() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!getAccessToken();
}

// Get user ID from token (decode JWT payload)
export function getUserIdFromToken(): string | null {
  const token = getAccessToken();
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || null;
  } catch {
    return null;
  }
}