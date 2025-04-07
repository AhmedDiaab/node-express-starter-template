import { databaseConfiguration } from "@/config";
import { logger } from "@/utils/logger.util";
import { IDatabaseClient, IEntity, IRepository } from "@lib/database";
import { DataSource } from 'typeorm';

class DatabaseClient implements IDatabaseClient {
    private _dataSource: DataSource

    constructor() {
        this._dataSource = new DataSource(databaseConfiguration)
    }

    get dataSource() {
        return this._dataSource;
    }

    async connect(): Promise<void> {
        try {
            await this._dataSource.initialize();
            logger.debug(`Database connection established successfully 👌 👌 👌`);
        } catch (error: any) {
            logger.error('Error connecting to database ‼️ ‼️ ‼️ ', error.code);
            logger.error(`Error Code: ${error.code}`);
            process.exit(1);
        }
    }
    async disconnect(): Promise<void> {
        await this._dataSource.destroy();
    }
    getRepository<T>(entity: IEntity): IRepository<T> {
        throw new Error('Method not implemented.');
    }

}


export const databaseClient: DatabaseClient = new DatabaseClient();