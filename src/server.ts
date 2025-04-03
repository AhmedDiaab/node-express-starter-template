import { createServer } from 'http';
import app from './app';
import { env } from '@/utils';

function main() {
    const server = createServer(app);

    const { port } = env;

    server.listen(port, () => {
        console.log(`Server is running on port ${port}⬆️⬆️⬆️`);
    });
}

main();