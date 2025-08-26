import { ZodError } from 'zod';
import { Response } from 'express';

export function ok(res: Response, data: any, status = 200) {
  return res.status(status).json(data);
}

export function badRequest(res: Response, msg = 'Bad Request') {
  return res.status(400).json({ error: msg });
}

export function zodReply(res: Response, e: unknown) {
  if (e instanceof ZodError) {
    return res.status(422).json({
      error: 'Validation error',
      details: e.flatten(),
    });
  }
  return res.status(400).json({ error: 'Bad Request' });
}
