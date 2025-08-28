import { Router } from "express";
import { prisma } from "@/db";
import { sendOtpSchema, verifyOtpSchema } from "@/schemas";
import {
  verifyOtpHash,
  isExpired,
  attemptsExceeded,
  recordAttempt,
  hashOtp,
} from "@/otp";
import { limitVerifyByPhone } from "@/ratelimit";
import { zodReply, badRequest, ok } from "@/http";
import {
  issueTokens,
  rotateRefresh,
  revokeRefresh,
  clearTokens,
} from "@/tokens";
import { requireAuth, AuthedRequest } from "@/middleware/auth";
import { COOKIE_NAMES } from "@/config";
import crypto from "crypto";
import twilio from "twilio";

const router = Router();

// 🔧 Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);
const TWILIO_PHONE = process.env.TWILIO_PHONE_NUMBER!;

/**
 * POST /auth/register
 */
router.post("/register", async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: "Phone is required" });

  try {
    const user = await prisma.user.upsert({
      where: { phone },
      update: {},
      create: { phone },
    });

    return ok(res, {
      message: "User registered",
      user: { id: user.id, phone: user.phone },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to register user" });
  }
});

/**
 * POST /auth/send-otp
 */
router.post("/send-otp", async (req, res) => {
  try {
    const { phone } = sendOtpSchema.parse(req.body);

    const devOtp = req.query.dev as string | undefined;
    const code =
      devOtp && /^\d{6}$/.test(devOtp)
        ? devOtp
        : Math.floor(100000 + Math.random() * 900000).toString();

    const challengeId = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.otp.create({
      data: {
        challengeId,
        phone,
        codeHash: await hashOtp(phone, code),
        expiresAt,
        attempts: 0,
      },
    });

    if (process.env.NODE_ENV === "production") {
      // ✅ Send real SMS via Twilio
      await twilioClient.messages.create({
        body: `Your verification code is ${code}`,
        from: TWILIO_PHONE,
        to: phone,
      });
    } else {
      // 🛠️ Dev mode: log OTP in console
      console.log(`📲 OTP for ${phone} [challengeId=${challengeId}]: ${code}`);
    }

    return ok(res, { challengeId, message: "OTP sent" });
  } catch (err) {
    console.error(err);
    return zodReply(res, err);
  }
});

/**
 * POST /auth/verify-otp
 */
router.post("/verify-otp", limitVerifyByPhone(), async (req, res) => {
  try {
    const { phone, challengeId, code } = verifyOtpSchema.parse(req.body);

    const otpRec = await prisma.otp.findUnique({ where: { challengeId } });
    if (!otpRec) return badRequest(res, "Invalid challengeId");

    if (isExpired(otpRec.expiresAt)) return badRequest(res, "OTP expired");
    if (attemptsExceeded(otpRec.attempts))
      return badRequest(res, "Too many attempts");

    const updated = await recordAttempt(challengeId);
    const okCode = await verifyOtpHash(phone, code, updated.codeHash);
    if (!okCode) return badRequest(res, "Invalid code");

    const user = await prisma.user.upsert({
      where: { phone },
      update: {},
      create: { phone },
    });

    await prisma.otp.delete({ where: { challengeId } });

    // 🔑 Issue tokens
    const { accessToken } = await issueTokens(res, user.id);

    return ok(res, { accessToken, user: { id: user.id, phone: user.phone } });
  } catch (e) {
    return zodReply(res, e);
  }
});

/**
 * GET /auth/profile
 */
router.get("/profile", requireAuth, async (req: AuthedRequest, res) => {
  const userId = req.user?.sub;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, phone: true, name: true, createdAt: true },
  });

  if (!user) return res.status(404).json({ error: "User not found" });

  return ok(res, { user });
});

/**
 * POST /auth/refresh
 */
router.post("/refresh", async (req, res) => {
  try {
    const rawRefresh = req.cookies[COOKIE_NAMES.refresh];
    if (!rawRefresh) return res.status(401).json({ error: "No refresh token" });

    const { accessToken } = await rotateRefresh(res, rawRefresh);
    return ok(res, { accessToken });
  } catch (e) {
    return res.status(401).json({ error: "Invalid refresh" });
  }
});

/**
 * POST /auth/logout
 */
router.post("/logout", async (req, res) => {
  const rawRefresh = req.cookies[COOKIE_NAMES.refresh];
  if (rawRefresh) {
    await revokeRefresh(rawRefresh);
  }
  clearTokens(res);
  return ok(res, { message: "Logged out" });
});

export default router;
