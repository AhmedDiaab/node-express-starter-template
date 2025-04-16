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

        this._environmentVariables = [];
        this._initialize();
        this._validateVariables();
        console.log('Environment variables initialized');
    }

    private _initialize() {
        this._environmentVariables = [
            'NODE_ENV',
            'APP_NAME',
            'PORT',
            'LOG_LEVEL',
            'LOG_FILES_DIRECTORY_NAME',
            'LOG_FILE_NAME',
            'DB_HOST',
            'DB_PORT',
            'DB_USERNAME',
            'DB_PASSWORD',
            'DB_NAME',
            'DB_TYPE',
            'DB_LOGGING',
            'DB_SSL',
            'DB_USEUTC',
            'JWT_SECRET',
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

    get appName(): string {
        return ENV["APP_NAME"]!;
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

    get databaseHost() {
        return ENV["DB_HOST"]!;
    }
    
    get databasePort(): number {
        return +ENV["DB_PORT"]!;
    }
    
    get databaseUsername() {
        return ENV["DB_USERNAME"];
    }
    get databasePassword() {
        return ENV["DB_PASSWORD"];
    }
    get databaseName() {
        return ENV["DB_NAME"];
    }
    
    get databaseType() {
        return ENV["DB_TYPE"]!;
    }

    get databaseLogging(): boolean {
        return ENV["DB_LOGGING"]! === "true";
    }
    
    get databaseSSL(): boolean {
        return ENV["DB_SSL"]! === "true";
    }

    get databaseUseUTC() {
        return ENV["DB_USE_UTC"]! === "true";
    }

    get jwtSecret() {
        return ENV["JWT_SECRET"];
    }

}

export const env = new EnvironmentVariables();