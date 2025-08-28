// tokens.ts
import { prisma } from './db';
import { COOKIE_NAMES, COOKIE_BASE, REFRESH_TOKEN_TTL_SEC } from './config';
import { env } from './env';
import { randomBytes, createHash } from 'crypto';
import dayjs from 'dayjs';
import { signAccess } from './jwt';

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

// 🔑 Issue new access + refresh tokens
export async function issueTokens(res: any, userId: string) {
  const accessToken = signAccess({ sub: userId });

  const rawRefresh = randomBytes(48).toString('hex');
  const refreshHash = hashToken(rawRefresh);
  const expiresAt = dayjs().add(REFRESH_TOKEN_TTL_SEC, 'second').toDate();

  await prisma.refreshToken.create({
    data: { userId, tokenHash: refreshHash, expiresAt },
  });

  // 🍪 Send refresh token only as httpOnly cookie
  res.cookie(COOKIE_NAMES.refresh, rawRefresh, {
    ...COOKIE_BASE,
    secure: env.NODE_ENV === 'production',
    maxAge: REFRESH_TOKEN_TTL_SEC * 1000,
  });

  return { accessToken }; // ✅ only return accessToken (refresh is in cookie)
}

// 🔄 Rotate refresh token and issue new access
export async function rotateRefresh(res: any, rawRefresh: string) {
  const refreshHash = hashToken(rawRefresh);

  const rec = await prisma.refreshToken.findUnique({
    where: { tokenHash: refreshHash },
  });
  if (!rec || rec.revoked || dayjs(rec.expiresAt).isBefore(dayjs())) {
    throw new Error('Invalid refresh');
  }

  // Revoke old
  await prisma.refreshToken.update({
    where: { tokenHash: refreshHash },
    data: { revoked: true },
  });

  // Issue new
  return issueTokens(res, rec.userId);
}

// ❌ Revoke refresh token
export async function revokeRefresh(rawRefresh: string) {
  const refreshHash = hashToken(rawRefresh);
  await prisma.refreshToken.updateMany({
    where: { tokenHash: refreshHash },
    data: { revoked: true },
  });
}

// 🧹 Clear cookies (logout)
export function clearTokens(res: any) {
  res.clearCookie(COOKIE_NAMES.refresh, COOKIE_BASE);
}
