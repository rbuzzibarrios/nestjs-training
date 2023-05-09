import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { ApiProperty } from '@nestjs/swagger'

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  // @ApiProperty({ example: 'Don Quijote de la Mancha' })
  @Column()
  title: string;

  // @ApiProperty({ example: 'Novela' })
  @Column({ nullable: true })
  genre: string;

  // @ApiProperty({
  // example: 'Esta edición del Ingenioso hidalgo don Quijote de la Mancha ...',
  // })
  @Column('text')
  description: string;

  // @ApiProperty({ example: 'Miguel de Cervantes' })
  @Column({ nullable: true })
  author: string;

  // @ApiProperty({ example: 'Santillana' })
  @Column({ nullable: true })
  publisher: string;

  // @ApiProperty({ example: 592 })
  @Column({ nullable: true })
  pages: number;

  // @ApiProperty({ example: 'www.imagen.com/quijote.png' })
  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true })
  isbn_number: string;
}
