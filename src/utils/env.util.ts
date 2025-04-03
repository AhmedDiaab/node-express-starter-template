import { config } from 'dotenv-flow';

class EnvironmentVariables {
    private _environmentVariables: string[];

    constructor() {
        config();
        this._environmentVariables = [];
        this._initialize();
        this._validateVariables();
    }

    private _initialize() {
        this._environmentVariables = [
            'NODE_ENV',
            'PORT',
        ];
    }

    private _validateVariables() {
        const error_messages: string[] = [];
        for (let key of this._environmentVariables) {
            if (!process.env[key]) {
                error_messages.push(`❌ Environment variable ${key} is not set.`);
            }
        }

        if (error_messages.length > 0) {
            console.error(error_messages.join('\n'));
            process.exit(1);
        }
    }

    get port() {
        return process.env["PORT"];
    }

    get nodeEnvironment() {
        return process.env["NODE_ENV"];
    }
}

export const env = new EnvironmentVariables();