import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify"

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  console.log(`${process.env.API_PREFIX}/v${process.env.API_VERSION}`);

  app.setGlobalPrefix(`${process.env.API_PREFIX}/v${process.env.API_VERSION}`);
  app.useGlobalPipes(new ValidationPipe());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
  // await app.listen(
  //   process.env.PORT ? parseInt(process.env.PORT) : 3000,
  //   process.env.APP_URL as string,
  // );
  // process.env.APP_URL as string,
}

bootstrap();
