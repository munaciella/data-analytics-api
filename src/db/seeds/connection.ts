import { Pool, PoolConfig } from 'pg';
import * as dotenv from 'dotenv';
import path from 'path';

const ENV: string = process.env.NODE_ENV || 'development';

dotenv.config({
    path: path.resolve(__dirname, `../../../.env.${ENV}`)
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    console.error('PGDATABASE:', process.env.PGDATABASE);
    console.error('DATABASE_URL:', process.env.DATABASE_URL);
    throw new Error('Environment variable PGDATABASE or DATABASE_URL is not set');
}

const poolConfig: PoolConfig = {};

if (ENV === 'production') {
    if (!process.env.DATABASE_URL) {
        throw new Error('Environment variable DATABASE_URL is required in production environment');
    }
    poolConfig.connectionString = process.env.DATABASE_URL;
    poolConfig.ssl = {
        rejectUnauthorized: false
    };
    poolConfig.max = 20;
} else {
    poolConfig.database = process.env.PGDATABASE;
}

const pool = new Pool(poolConfig);

export default pool;
