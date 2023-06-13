import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  genre: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  author: string;

  @IsOptional()
  publisher: string;

  @IsOptional()
  pages: number;

  @IsOptional()
  image_url: string;
}
