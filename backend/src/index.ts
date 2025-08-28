import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import { env, isProd } from "./env";
import { limitByIp } from "./ratelimit";
import authRouter from "./routes/auth";

const app = express();

app.use(pinoHttp());
app.use(limitByIp());
app.use(helmet({ crossOriginEmbedderPolicy: false }));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.set("trust proxy", 1);

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);

// Root route → show friendly message when visiting http://localhost:3004/
app.get("/", (_req, res) => {
  res.send(`
    <h1>🚀 Backend is running!</h1>
    <p>Environment: <b>${isProd ? "Production" : "Development"}</b></p>
    <p>Check <a href="/health">/health</a> for API status.</p>
  `);
});

// Health check route
app.get("/health", (_req, res) =>
  res.json({ ok: true, ts: Date.now(), msg: "💚 Healthy" })
);

// Auth routes
app.use("/auth", authRouter);

// Global error handler
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  (req as any).log?.error({ err }, "❌ Unhandled Error");
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(env.PORT, () => {
  console.log(
    `✅ API listening at: http://localhost:${env.PORT} (${isProd ? "prod" : "dev"}) 🚀`
  );
});
