// lib/auth/passport.manager.ts
import passport, { Strategy } from 'passport';
import fs from 'fs';
import path from 'path';
import { IAuthStrategy } from '@lib/auth';

class PassportManager {
    private static _instance: PassportManager;

    private constructor() {
        this._loadStrategies();
    }

    // Singleton pattern to ensure only one instance
    static getInstance(): PassportManager {
        if (!PassportManager._instance) {
            PassportManager._instance = new PassportManager();
        }
        return PassportManager._instance;
    }

    // Dynamically load all strategies from the strategies folder
    private _loadStrategies(): void {
        const strategiesDir = path.join(__dirname, 'strategies');
        const strategyFiles = fs.readdirSync(strategiesDir);

        strategyFiles.forEach((file) => {
            if (file.includes('.strategy')) {
                const StrategyClass = require(path.join(strategiesDir, file)).default;
                const strategyInstance = new StrategyClass();
                this._registerStrategy(strategyInstance);
            }
        });
    }

    // Register a strategy
    private _registerStrategy(strategy: IAuthStrategy<Strategy>) {
        passport.use(strategy.getStrategy());
    }

    // Initialize Passport middleware
    initialize() {
        return passport.initialize();
    }

    // Handle Passport session (if you use sessions)
    session() {
        return passport.session();
    }
}

export const passportManager = PassportManager.getInstance();
