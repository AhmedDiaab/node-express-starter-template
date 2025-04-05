import { pinoHttp } from 'pino-http';
import { logger } from "@/utils/logger.util";

export const loggerMiddleware = pinoHttp({ logger });
