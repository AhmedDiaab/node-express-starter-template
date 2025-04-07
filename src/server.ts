import { createServer } from 'http';
import { env } from '@/utils';
import { logger } from '@/utils/logger.util';
import app from '@/app';
import { databaseClient } from '@/database';

async function main() {
    const server = createServer(app);

    // Initialize database connection
    await databaseClient.connect();

    const { port, appName, nodeEnvironment } = env;

    server.listen(port, () => {
        logger.debug(`Starting ${appName}`);
        logger.debug(`Running in ${nodeEnvironment} mode`);
        logger.debug(`Server is running on port ${port} ⬆️ ⬆️ ⬆️`);
    });
}

main();