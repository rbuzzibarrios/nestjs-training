import { IsOptional, ValidateNested } from 'class-validator';
import { CreateBookDto } from './create-book.dto';
import { PaginateRequest } from '../../paginate/paginate-request';

export class BodyBookRequestDto {
  @IsOptional()
  filters?: CreateBookDto;

  @IsOptional()
  @ValidateNested()
  paginate?: PaginateRequest;
}
