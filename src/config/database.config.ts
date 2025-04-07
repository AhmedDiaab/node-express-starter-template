import { env } from "@/utils";
import { DataSourceOptions } from "typeorm";

export const databaseConfiguration: DataSourceOptions = {
    type: env!.databaseType as any,
    host: env!.databaseHost,
    port: env!.databasePort,
    username: env!.databaseUsername,
    password: env!.databasePassword,
    database: env!.databaseName,
    logging: env!.databaseLogging,
    ssl: env!.databaseSSL,
    useUTC: env!.databaseUseUTC,
    migrations: [
        "src/database/migrations/*.ts"
    ],
    entities: ["src/database/models/*.model.ts"],
}