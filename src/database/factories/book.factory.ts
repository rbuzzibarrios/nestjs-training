// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { Book } from '../../books/entities/book.entity';

define(Book, (faker: typeof Faker) => {
  const book = new Book();
  book.title = `${faker.random.word()}`;
  book.description = `${faker.random.word()}`;

  return book;
});
const factoryBook = factory(Book)();

export default factoryBook;
