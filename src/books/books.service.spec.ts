import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import factoryBook from '../database/factories/book.factory';

describe('BooksService', () => {
  let service: BooksService;
  const mockBookRepository = {
    save: jest
      .fn()
      .mockImplementation((dto) =>
        Promise.resolve<Book>({ id: Math.round(Math.random()), ...dto }),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a book', async () => {
    const bookData = await factoryBook.make();

    const createdBook = await service.create(bookData);

    expect(createdBook).toEqual(expect.objectContaining(bookData));
  });
});
