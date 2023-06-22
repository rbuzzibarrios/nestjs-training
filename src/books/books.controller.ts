import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ValidationPipe,
  UsePipes,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FindBookRequestDto } from './dto/find-book-request-dto';
import { BodyBookRequestDto } from './dto/body-book-request.dto';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('books')
@UseInterceptors(CacheInterceptor)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get('search')
  @CacheKey('custom_key')
  @CacheTTL(6000)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  findAll(@Query() body: BodyBookRequestDto) {
    return this.booksService.findAll(body);
  }

  @Get(':id')
  @CacheKey('get_book')
  @CacheTTL(6000)
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  update(
    @Param() params: FindBookRequestDto,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(+params.id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
