export const ACCESS_TOKEN_TTL_SEC = 10 * 60; // 10 minutes
export const REFRESH_TOKEN_TTL_SEC = 30 * 24 * 60 * 60; // 30 days
export const OTP_TTL_SEC = 5 * 60; // 5 minutes
export const OTP_MAX_ATTEMPTS = 5;

export const COOKIE_NAMES = {
  refresh: 'refresh_token',
};

export const COOKIE_BASE = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: false, // overridden to true in prod
  path: '/',
};
