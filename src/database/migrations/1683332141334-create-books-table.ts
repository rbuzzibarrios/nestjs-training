import { MigrationInterface, QueryRunner } from 'typeorm';

export class createBooksTable1683332141334 implements MigrationInterface {
  name = 'createBooksTable1683332141334';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "books" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "genre" character varying, "description" text NOT NULL, "author" character varying, "publisher" character varying, "pages" integer, "image_url" character varying, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "books"`);
  }
}
