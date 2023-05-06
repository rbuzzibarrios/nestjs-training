import { DataSource } from 'typeorm';

import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const path = require('path') // eslint-disable-line
// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/no-var-requires
const envConfig = require('dotenv').config({
  path: path.resolve(
    './',
    `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
  ),
});

export function env(key: string | number, defaultValue: string | number = '') {
  return envConfig?.parsed[key] || process?.env[key] || defaultValue;
}

export function isEnv(name = 'production') {
  return process.env.NODE_ENV === name;
}

export const AppDataSource = new DataSource({
  type: env('DATABASE_DRIVER', 'mysql'),
  host: env('DATABASE_HOST'),
  port: env('DATABASE_PORT', 3306),
  database: env('DATABASE_NAME'),
  username: env('DATABASE_USER'),
  password: env('DATABASE_PASSWORD'),
  entities: [path.resolve(__dirname, '**/*.entity{.ts,.js}')],
  migrations: [path.resolve(__dirname, 'database/migrations/**/*.ts')],
  dropSchema: isEnv('testing'),
  synchronize: isEnv('testing'),
  logger: 'advanced-console',
  logging: ['warn', 'error'],
});

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      ...AppDataSource.options,
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
    };
  },
};
