import morgan from 'morgan';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

const logStream = createWriteStream(join(cwd(), 'logs/access.log'), { flags: 'a' });

export const loggerMiddleware = morgan('combined', { stream: logStream }); // Logs requests in Apache-style format
