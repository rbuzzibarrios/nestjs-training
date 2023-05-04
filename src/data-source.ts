export const path = require('path') // eslint-disable-line
// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/no-var-requires
const envConfig = require('dotenv').config({
  path: path.resolve(
    './',
    `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
  ),
});

import { DataSource } from 'typeorm';

export function env(key: string | number, defaultValue: string | number = '') {
  return envConfig?.parsed[key] || process?.env[key] || defaultValue;
}

export function isEnv(name = 'production') {
  return process.env.NODE_ENV === name;
}

export const AppDataSource = new DataSource({
  type: env('DATABASE_DRIVER', 'postgres'),
  database: env('DATABASE_NAME'),
  username: env('DATABASE_USER'),
  password: env('DATABASE_PASSWORD'),
  entities: [path.resolve('src/**/*.entity{.ts,.js}')],
  migrations: [path.resolve('src/database/migrations/**/*.ts')],
  dropSchema: isEnv('testing'),
  synchronize: isEnv('testing'),
  logger: 'advanced-console',
  logging: ['warn', 'error'],
});
