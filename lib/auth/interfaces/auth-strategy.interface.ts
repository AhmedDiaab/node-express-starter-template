import { Strategy } from "passport";

export interface IAuthStrategy<TStrategy extends Strategy = Strategy, TOptions = any> {
    name: string;
    StrategyClass: new (...args: any[]) => TStrategy;
    getOptions(): TOptions | Partial<TOptions>;
    verify(...args: any[]): any;
    getStrategy(): TStrategy;
}