import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './data-source';
import { ExistsConstraint } from './exists/exists.decorator';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.testing', '.env.development', '.env'],
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService, ExistsConstraint],
})
export class AppModule {}
