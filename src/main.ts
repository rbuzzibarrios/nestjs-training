import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(`${process.env.API_PREFIX}/v${process.env.API_VERSION}`);

  app.setGlobalPrefix(`${process.env.API_PREFIX}/v${process.env.API_VERSION}`);

  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
  // await app.listen(
  //   process.env.PORT ? parseInt(process.env.PORT) : 3000,
  //   process.env.APP_URL as string,
  // );
  // process.env.APP_URL as string,
}

bootstrap();
