import { env } from '@/utils';
import { join } from 'path';
import { LoggerOptions } from 'pino';
import { cwd } from 'process';


export const loggerConfiguration: LoggerOptions = {
    level: env!.logLevel,
    transport: {
        targets: [
            {
                level: env!.logLevel,
                target: 'pino-pretty', // Pretty print for development
                options: { colorize: true, singleLine: true },
            },
            {
                target: 'pino/file', // Logs to file
                level: 'info',
                options: {
                    destination: join(cwd(), env.logFilesDirectoryName, env.logFileName),
                    mkdir: true
                }
            }
        ]
    }
};