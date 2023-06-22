import { IsOptional } from 'class-validator';
import { PaginateRequest } from '../../paginate/paginate-request';

export class BodyBookRequestDto extends PaginateRequest {
  @IsOptional()
  title: string;

  @IsOptional()
  genre: string;

  @IsOptional()
  description: string;

  @IsOptional()
  author: string;
}
