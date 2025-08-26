import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from './env';
import { ACCESS_TOKEN_TTL_SEC, REFRESH_TOKEN_TTL_SEC } from './config';

export function signAccess(payload: object): string {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_TTL_SEC });
}

export function signRefresh(payload: object): string {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_TTL_SEC });
}

export function verifyAccess(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload;
}

export function verifyRefresh(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload;
}
