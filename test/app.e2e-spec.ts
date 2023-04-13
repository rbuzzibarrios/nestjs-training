import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        // TypeOrmModule.forRoot({
        //   type: 'mysql',
        //   host: process.env.DATABASE_HOST,
        //   port: process.env.DATABASE_PORT
        //     ? (process.env.DATABASE_PORT as unknown as number)
        //     : 3306,
        //   username: process.env.DATABASE_USER,
        //   password: process.env.DATABASE_PASSWORD,
        //   database: process.env.DATABASE_NAME,
        //   // entities: ['./**/*.entity.ts'],
        //   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        //   synchronize: true,
        //   autoLoadEntities: true,
        // }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
