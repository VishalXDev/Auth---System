import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "accessToken";

// Save access token
export function setAccessToken(token: string) {
  Cookies.set(ACCESS_TOKEN_KEY, token, { secure: false, sameSite: "lax" });
}

// Get access token
export function getAccessToken(): string | undefined {
  return Cookies.get(ACCESS_TOKEN_KEY);
}

// Clear tokens (logout)
export function clearTokens() {
  Cookies.remove(ACCESS_TOKEN_KEY);
}
