import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './data-source';
import { ExistsConstraint } from './exists/exists.decorator';
import {
  CacheInterceptor,
  CacheModule,
  CacheStore,
} from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore as unknown as CacheStore,
      url: `redis://${process.env?.REDIS_HOST}:${process.env.REDIS_PORT}`,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.testing', '.env.development', '.env'],
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ExistsConstraint,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [CacheModule],
})
export class AppModule {}
