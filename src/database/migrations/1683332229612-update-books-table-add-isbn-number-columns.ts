import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateBooksTableAddIsbnNumberColumns1683332229612
  implements MigrationInterface
{
  name = 'updateBooksTableAddIsbnNumberColumns1683332229612';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "books" ADD "isbn_number" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "isbn_number"`);
  }
}
