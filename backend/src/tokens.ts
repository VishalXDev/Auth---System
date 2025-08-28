import { prisma } from "./db";
import { COOKIE_NAMES, COOKIE_BASE, REFRESH_TOKEN_TTL_SEC } from "./config";
import { env } from "./env";
import { randomBytes } from "crypto";
import dayjs from "dayjs";
import { signAccess } from "./jwt";
import argon2 from "argon2";

async function hashToken(token: string): Promise<string> {
  return argon2.hash(token, {
    type: argon2.argon2id,
    timeCost: 3,
    memoryCost: 8192,
    parallelism: 1,
  });
}

async function verifyTokenHash(token: string, tokenHash: string): Promise<boolean> {
  return argon2.verify(tokenHash, token);
}

// 🔑 Issue new access + refresh tokens
export async function issueTokens(res: any, userId: string) {
  const accessToken = signAccess({ sub: userId });

  const rawRefresh = randomBytes(48).toString("hex");
  const refreshHash = await hashToken(rawRefresh);
  const expiresAt = dayjs().add(REFRESH_TOKEN_TTL_SEC, "second").toDate();

  await prisma.refreshToken.create({
    data: { userId, tokenHash: refreshHash, expiresAt },
  });

  // 🍪 Send refresh token only as httpOnly cookie
  res.cookie(COOKIE_NAMES.refresh, rawRefresh, {
    ...COOKIE_BASE,
    secure: env.NODE_ENV === "production",
    maxAge: REFRESH_TOKEN_TTL_SEC * 1000,
  });

  return { accessToken }; // ✅ only return accessToken (refresh is in cookie)
}

// 🔄 Rotate refresh token and issue new access
export async function rotateRefresh(res: any, rawRefresh: string) {
  // Find any non-revoked refresh tokens for this rawRefresh
  const rec = await prisma.refreshToken.findFirst({
    where: { revoked: false },
    orderBy: { createdAt: "desc" },
  });

  if (!rec) throw new Error("Invalid refresh");
  if (dayjs(rec.expiresAt).isBefore(dayjs())) throw new Error("Expired refresh");

  const ok = await verifyTokenHash(rawRefresh, rec.tokenHash);
  if (!ok) throw new Error("Invalid refresh");

  // Revoke old
  await prisma.refreshToken.update({
    where: { id: rec.id },
    data: { revoked: true },
  });

  // Issue new
  return issueTokens(res, rec.userId);
}

// ❌ Revoke refresh token
export async function revokeRefresh(rawRefresh: string) {
  // revoke all matches just in case
  const tokens = await prisma.refreshToken.findMany({ where: { revoked: false } });
  for (const t of tokens) {
    if (await verifyTokenHash(rawRefresh, t.tokenHash)) {
      await prisma.refreshToken.update({
        where: { id: t.id },
        data: { revoked: true },
      });
    }
  }
}

// 🧹 Clear cookies (logout)
export function clearTokens(res: any) {
  res.clearCookie(COOKIE_NAMES.refresh, COOKIE_BASE);
}
