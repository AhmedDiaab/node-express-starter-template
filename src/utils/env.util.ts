import { config } from 'dotenv-flow';
import { Level } from 'pino';
import { env as ENV, cwd, exit } from 'process';

class EnvironmentVariables {
    private _environmentVariables: string[];

    constructor() {
        const fileName = `.env.${ENV.NODE_ENV}`;

        config({
            pattern: fileName,
            path: cwd(),
        });
        
        console.log('Environment variables initialized');
        this._environmentVariables = [];
        this._initialize();
        this._validateVariables();
    
    }

    private _initialize() {
        this._environmentVariables = [
            'NODE_ENV',
            'PORT',
            'LOG_LEVEL',
            'LOG_FILES_DIRECTORY_NAME',
            'LOG_FILE_NAME',
        ];
    }

    private _validateVariables() {
        const error_messages: string[] = [];
        for (let key of this._environmentVariables) {
            if (!ENV[key]) {
                error_messages.push(`❌ Environment variable ${key} is not set.`);
            }
        }

        if (error_messages.length > 0) {
            console.error(error_messages.join('\n'));
            exit(1);
        }
    }

    get port(): number {
        return +ENV["PORT"]!;
    }

    get nodeEnvironment(): string {
        return ENV["NODE_ENV"]!;
    }

    get logLevel(): Level {
        return ENV["LOG_LEVEL"]! as Level;
    }

    get logFilesDirectoryName(): string {
        return ENV["LOG_FILES_DIRECTORY_NAME"]!;
    }

    get logFileName() {
        return ENV["LOG_FILE_NAME"]!;
    }
}

export const env = new EnvironmentVariables();