import { Request, Response, NextFunction } from 'express';
import { verifyAccess } from '@/jwt';

export interface AuthedRequest extends Request {
  user?: { sub: string };
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.toString().startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.toString().slice(7); // remove "Bearer "
    const decoded = verifyAccess(token);

    // Ensure decoded is object with "sub"
    if (typeof decoded !== 'object' || !('sub' in decoded)) {
      return res.status(401).json({ error: 'Invalid token payload' });
    }

    req.user = decoded as { sub: string };
    return next();
  } catch (err) {
    req.log?.warn({ err }, 'auth_failed'); // works if pino-http is set
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
