import { IEntity } from "./entity.interface";
import { IRepository } from "./repository.interface";

export interface IDatabaseClient {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getRepository<T>(entity: IEntity): IRepository<T>;
}
