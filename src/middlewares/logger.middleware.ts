import { pinoHttp } from 'pino-http';
import { logger } from "@/utils";

export const loggerMiddleware = pinoHttp({ logger });
