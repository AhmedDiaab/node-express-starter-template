import { pinoHttp } from 'pino-http';
import { logger } from "@/core";

export const loggerMiddleware = pinoHttp({ logger });
