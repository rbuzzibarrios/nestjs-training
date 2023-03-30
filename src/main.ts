import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(
    process.env.PORT ? parseInt(process.env.PORT) : 3000,
    process.env.APP_URL as string,
  );
}

bootstrap();
