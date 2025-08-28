import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(3004),
  DATABASE_URL: z.string().min(1), // Prisma DSN (not always a strict URL)
  CORS_ORIGIN: z.string().url(),   // enforce proper origin
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  OTP_PEPPER: z.string().min(16),

  // ✅ Twilio vars
  TWILIO_ACCOUNT_SID: z.string().min(1),
  TWILIO_AUTH_TOKEN: z.string().min(1),
  TWILIO_PHONE_NUMBER: z.string().min(1),
});

export const env = envSchema.parse(process.env);
export const isProd = env.NODE_ENV === "production";
