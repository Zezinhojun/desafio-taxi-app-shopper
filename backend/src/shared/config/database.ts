import path from "path";
import { DataSource } from "typeorm";


export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME ?? 'root',
    password: process.env.DB_PASSWORD ?? 'password',
    database: process.env.DB_NAME ?? 'taxi_app',
    synchronize: true,
    entities: [
        path.join(__dirname + "/../src/data/datasources/entities/*.ts"),
        path.join(__dirname + "/../dist/data/datasources/entities/*.js"),
    ]
})