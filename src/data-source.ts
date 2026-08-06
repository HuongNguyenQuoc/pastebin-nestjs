import { config } from 'dotenv';
import { Paste } from './paste/paste.entity';
import { DataSource } from 'typeorm';
import 'reflect-metadata';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Paste],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // Set to false in production to avoid data loss
});
