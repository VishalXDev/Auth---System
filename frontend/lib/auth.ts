import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

// Save tokens
export function setAccessToken(token: string) {
  Cookies.set(ACCESS_TOKEN_KEY, token, { secure: false, sameSite: "lax" });
}
export function setRefreshToken(token: string) {
  Cookies.set(REFRESH_TOKEN_KEY, token, { secure: false, sameSite: "lax" });
}

// Get tokens
export function getAccessToken(): string | undefined {
  return Cookies.get(ACCESS_TOKEN_KEY);
}
export function getRefreshToken(): string | undefined {
  return Cookies.get(REFRESH_TOKEN_KEY);
}

// Clear all tokens (logout)
export function clearTokens() {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
}
