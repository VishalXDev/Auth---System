import argon2 from 'argon2';
import { randomInt } from 'crypto';
import dayjs from 'dayjs';
import { env } from './env';
import { prisma } from './db';
import { OTP_MAX_ATTEMPTS, OTP_TTL_SEC } from './config';
import { customAlphabet } from 'nanoid';
import type { Otp } from '@prisma/client';

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 24);

export function generateOtpCode(): string {
  const n = randomInt(0, 1_000_000);
  return n.toString().padStart(6, '0');
}

export async function hashOtp(phone: string, code: string): Promise<string> {
  const salted = `${code}:${phone}:${env.OTP_PEPPER}`;
  return argon2.hash(salted, {
    type: argon2.argon2id,
    timeCost: 3,
    memoryCost: 8192, // tuned for balance, adjust in prod
    parallelism: 1,
  });
}

export async function verifyOtpHash(phone: string, code: string, codeHash: string): Promise<boolean> {
  const salted = `${code}:${phone}:${env.OTP_PEPPER}`;
  return argon2.verify(codeHash, salted);
}

/**
 * Creates an OTP challenge row. Returns { challengeId, code, expiresAt }.
 * NOTE: Never log or return the code in production.
 */
export async function createOtpChallenge(phone: string) {
  const challengeId = nanoid();
  const code = generateOtpCode();
  const codeHash = await hashOtp(phone, code);
  const expiresAt = dayjs().add(OTP_TTL_SEC, 'second').toDate();

  await prisma.otp.create({
    data: { phone, challengeId, codeHash, expiresAt },
  });

  return { challengeId, code, expiresAt };
}

/**
 * Atomically consumes an attempt (increments) and returns the updated record.
 */
export async function recordAttempt(challengeId: string): Promise<Otp> {
  return prisma.otp.update({
    where: { challengeId },
    data: { attempts: { increment: 1 } },
  });
}

export function isExpired(d: Date): boolean {
  return dayjs(d).isBefore(dayjs());
}

export function attemptsExceeded(attempts: number): boolean {
  return attempts >= OTP_MAX_ATTEMPTS;
}
