import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register({
          isGlobal: true,
        }),
      ],
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: APP_INTERCEPTOR,
          useClass: CacheInterceptor,
        },
        {
          provide: getRepositoryToken(Book),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
