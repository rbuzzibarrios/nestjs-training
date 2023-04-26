import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'mysql2';
import { Book } from '../../books/entities/book.entity';

export class CreateBookSeeder implements Seeder {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Book)().createMany(5);
  }
}
