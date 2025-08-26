import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pinoHttp from 'pino-http';
import { env, isProd } from './env';
import { limitByIp } from './ratelimit';
import authRouter from './routes/auth';

const app = express();

app.use(pinoHttp());
app.use(limitByIp());
app.use(helmet({ crossOriginEmbedderPolicy: false }));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.set('trust proxy', 1);

app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
}));

// Routes
app.get('/health', (_req, res) => res.json({ ok: true, ts: Date.now() }));
app.use('/auth', authRouter);

// Global error handler
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  (req as any).log?.error({ err }, 'unhandled_error');
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(env.PORT, () => {
  console.log(`API listening on http://localhost:${env.PORT} (${isProd ? 'prod' : 'dev'})`);
});
