import { Strategy } from "passport";
import { IAuthStrategy } from "./interfaces";

export abstract class BaseAuthStrategy<TStrategy extends Strategy = Strategy, TOptions = any>
    implements IAuthStrategy<TStrategy, TOptions> {
    abstract name: string;
    abstract StrategyClass: new (...args: any[]) => TStrategy;
    abstract getOptions(): TOptions | Partial<TOptions>;
    abstract verify(...args: any[]): any;

    getStrategy(): TStrategy {
        const strategy = new this.StrategyClass(this.getOptions(), this.verify.bind(this));
        return strategy;
    }
}