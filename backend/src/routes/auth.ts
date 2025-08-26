import { Router } from 'express';
import { verifyOtpSchema } from '@/schemas';
import { prisma } from '@/db';
import { verifyOtpHash, isExpired, attemptsExceeded, recordAttempt } from '@/otp';
import { limitVerifyByPhone } from '@/ratelimit';
import { zodReply, badRequest, ok } from '@/http';
import { issueTokens, rotateRefresh, revokeRefresh, clearTokens } from '@/tokens';
import { requireAuth, AuthedRequest } from '@/middleware/auth';
import { COOKIE_NAMES } from '@/config';

const router = Router();

/**
 * POST /auth/verify-otp
 */
router.post('/verify-otp', limitVerifyByPhone(), async (req, res) => {
  try {
    const { phone, challengeId, code } = verifyOtpSchema.parse(req.body);

    const otpRec = await prisma.otp.findUnique({ where: { challengeId } });
    if (!otpRec) return badRequest(res, 'Invalid challenge');

    if (isExpired(otpRec.expiresAt)) return badRequest(res, 'OTP expired');
    if (attemptsExceeded(otpRec.attempts)) return badRequest(res, 'Too many attempts');

    const updated = await recordAttempt(challengeId);
    const okCode = await verifyOtpHash(phone, code, updated.codeHash);
    if (!okCode) return badRequest(res, 'Invalid code');

    const user = await prisma.user.upsert({
      where: { phone },
      update: {},
      create: { phone },
    });

    await prisma.otp.delete({ where: { challengeId } });

    const { accessToken } = await issueTokens(res, user.id);

    return ok(res, { accessToken, user: { id: user.id, phone: user.phone } });
  } catch (e) {
    return zodReply(res, e);
  }
});

/**
 * GET /auth/profile
 */
router.get('/profile', requireAuth, async (req: AuthedRequest, res) => {
  const userId = req.user?.sub;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, phone: true, name: true, createdAt: true },
  });

  if (!user) return res.status(404).json({ error: 'User not found' });

  return ok(res, { user });
});

/**
 * POST /auth/refresh
 */
router.post('/refresh', async (req, res) => {
  try {
    const rawRefresh = req.cookies[COOKIE_NAMES.refresh];
    if (!rawRefresh) return res.status(401).json({ error: 'No refresh token' });

    const { accessToken } = await rotateRefresh(res, rawRefresh);
    return ok(res, { accessToken });
  } catch (e) {
    return res.status(401).json({ error: 'Invalid refresh' });
  }
});

/**
 * POST /auth/logout
 */
router.post('/logout', async (req, res) => {
  const rawRefresh = req.cookies[COOKIE_NAMES.refresh];
  if (rawRefresh) {
    await revokeRefresh(rawRefresh);
  }
  clearTokens(res);
  return ok(res, { message: 'Logged out' });
});

export default router;
