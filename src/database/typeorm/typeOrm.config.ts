import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

const envFile = process.env.NODE_ENV === 'production'
  ? '.env.production'
  : process.env.NODE_ENV === 'test'
    ? '.env.test'
    : '.env';

config({ path: envFile });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  database: process.env.DATABASE_NAME || 'ecommercedb',
  username: process.env.DATABASE_USER || 'hassan',
  password: process.env.DATABASE_PASSWORD || 'password',
  entities: [process.env.DATABASE_ENTITIES || 'dist/**/*.entity.{ts,js}'],
  migrations: ['dist/database/migration/history/*.js'],
  logger: 'simple-console',
  synchronize: process.env.NODE_ENV !== 'production', 
  logging: process.env.NODE_ENV === 'development',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;