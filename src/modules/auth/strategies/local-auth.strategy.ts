import { BaseAuthStrategy } from '@lib/auth';
import { Strategy as LocalStrategy, IStrategyOptionsWithRequest } from 'passport-local';

export default class LocalAuthStrategy extends BaseAuthStrategy<LocalStrategy, IStrategyOptionsWithRequest> {
    name = 'local';
    StrategyClass = LocalStrategy;

    constructor(private userService: any) {
        super();
    }

    getOptions(): IStrategyOptionsWithRequest | Partial<IStrategyOptionsWithRequest> {
        return {
            usernameField: 'email',
        };
    }

    async verify(email: string, password: string, done: (error: any, user?: any, ...args: any) => void) {
        try {
            const user = await this.userService.findUserByEmail(email);
            if (user && user.password === password) {
                return done(null, user);
            }
            return done(null, false, { message: 'Invalid credentials' });
        } catch (e) {
            return done(e);
        }
    }
}