import { z } from 'zod';

// E.164 format: +<country><subscriber> (8–15 digits total)
export const phoneSchema = z
  .string()
  .regex(/^\+[1-9]\d{7,14}$/, 'Phone must be E.164 (e.g. +919876543210)');

export const sendOtpSchema = z.object({
  phone: phoneSchema,
});

export const verifyOtpSchema = z.object({
  phone: phoneSchema,
  challengeId: z.string().length(24, 'Invalid challengeId'),
  code: z.string().regex(/^\d{6}$/, '6-digit code'),
});
