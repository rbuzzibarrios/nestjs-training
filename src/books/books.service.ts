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
    let options: FindManyOptions = {
      order: {
        [params?.paginate?.orderBy?.column || 'id']:
          params?.paginate?.orderBy?.order || 'ASC',
      },
    };

    if (params.filters != undefined) {
      options = {
        where: { ...params.filters },
        ...options,
      };
    }

    if (
      params.paginate?.page != undefined &&
      params.paginate?.perPage != undefined
    ) {
      options = {
        ...options,
        skip:
          params?.paginate?.page === 1
            ? 0
            : ((params?.paginate?.page || 1) - 1) *
              (params?.paginate?.perPage || 10),
        take: params?.paginate?.perPage,
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
