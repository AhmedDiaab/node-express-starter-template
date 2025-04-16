import pino, { type Logger as PinoLoggerType } from 'pino';
import { loggerConfiguration } from '@/config';

class Logger {
    private _logger: PinoLoggerType;

    get logger(): PinoLoggerType {
        return this._logger;
    }
    
    constructor() {
        this._logger = pino(loggerConfiguration);
        this._logger.debug('Logger initialized 🪵')
    }
}

export const logger = new Logger().logger;