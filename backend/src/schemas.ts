import { z } from 'zod';

// E.164 format: +<country><subscriber> (8–15 digits total)
export const phoneSchema = z
  .string()
  .regex(/^\+[1-9]\d{7,14}$/, 'Phone must be E.164 (e.g. +919876543210)');

// Request body for sending OTP
export const sendOtpSchema = z.object({
  phone: phoneSchema,
});

// Request body for verifying OTP
export const verifyOtpSchema = z.object({
  phone: phoneSchema,
  challengeId: z
    .string()
    .refine(
      (val) =>
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(val) || // UUID
        /^c[a-z0-9]{24,}$/i.test(val), // CUID
      { message: 'Invalid challengeId' }
    ),
  code: z.string().regex(/^\d{6}$/, '6-digit code'),
});
