import { env } from "@/core";
import { BaseAuthStrategy } from "@lib/auth";
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptionsWithRequest } from 'passport-jwt';

export default class JwtAuthStrategy extends BaseAuthStrategy<JwtStrategy, StrategyOptionsWithRequest> {
    name = 'jwt';
    StrategyClass = JwtStrategy;

    getOptions(): StrategyOptionsWithRequest | Partial<StrategyOptionsWithRequest> {
        return {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: env.jwtSecret,
        };
    }

    async verify(payload: any, done: (error: any, user?: any) => void) {
        try {
            if (payload?.id) {
                return done(null, payload);
            }
            return done(null, false);
        } catch (error) {
            return done(error);
        }
    }
}