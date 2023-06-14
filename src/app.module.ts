import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './data-source';
import { ExistsConstraint } from './exists/exists.decorator';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.testing', '.env.development', '.env'],
    }),
    CacheModule.register({
      isGlobal: true
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
  exports: [CacheModule]
})
export class AppModule {}
