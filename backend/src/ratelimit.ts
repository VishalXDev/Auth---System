import { RateLimiterMemory } from "rate-limiter-flexible";
import { Request, Response, NextFunction } from "express";

/** Generic IP limiter: e.g., 10 requests / 1 minute per IP */
export const ipLimiter = new RateLimiterMemory({
  points: 10,
  duration: 60,
  keyPrefix: "ip",
});

/** OTP send limiter per phone: 5 sends / 15 minutes */
export const phoneSendLimiter = new RateLimiterMemory({
  points: 5,
  duration: 15 * 60,
  keyPrefix: "send_phone",
});

/** OTP verify limiter per phone: 10 tries / 15 minutes */
export const phoneVerifyLimiter = new RateLimiterMemory({
  points: 10,
  duration: 15 * 60,
  keyPrefix: "verify_phone",
});

function getClientIp(req: Request): string {
  if (req.ip) return req.ip;

  const xf = req.headers["x-forwarded-for"];

  if (typeof xf === "string") {
    return xf.split(",")[0]?.trim() ?? "unknown";
  }

  if (Array.isArray(xf) && xf.length > 0) {
    return xf[0]?.trim() ?? "unknown";
  }

  return "unknown";
}

export function limitByIp() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ipLimiter.consume(getClientIp(req));
      return next();
    } catch {
      return res.status(429).json({ error: "Too Many Requests" });
    }
  };
}

export function limitSendByPhone() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const phone = req.body?.phone;
    if (!phone) {
      return res.status(400).json({ error: "phone required" });
    }
    try {
      await phoneSendLimiter.consume(phone);
      return next();
    } catch {
      return res
        .status(429)
        .json({ error: "Please wait before requesting another code" });
    }
  };
}

export function limitVerifyByPhone() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const phone = req.body?.phone;
    if (!phone) {
      return res.status(400).json({ error: "phone required" });
    }
    try {
      await phoneVerifyLimiter.consume(phone);
      return next();
    } catch {
      return res
        .status(429)
        .json({ error: "Too many verification attempts. Try later." });
    }
  };
}
