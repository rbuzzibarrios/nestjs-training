import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { BodyBookRequestDto } from './dto/body-book-request.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookRepository.save(createBookDto);
  }

  findAll(params: BodyBookRequestDto): Promise<Book[]> {
    const { order, column, perPage, page, ...filters } = params;

    let options: FindManyOptions = {
      order: {
        [column || 'id']: order || 'ASC',
      },
    };

    if (filters) {
      options = {
        where: { ...filters },
        ...options,
      };
    }

    if (page != undefined && perPage != undefined) {
      options = {
        ...options,
        skip: page === 1 ? 0 : ((page || 1) - 1) * (perPage || 10),
        take: perPage,
      };
    }

    return this.bookRepository.find(options);
  }

  async findOne(id: number): Promise<Book | null> {
    return await this.bookRepository.findOneBy({ id });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookRepository.save({ ...updateBookDto, id });
  }

  remove(id: number) {
    return this.bookRepository.delete(id);
  }
}
