import { IsOptional, ValidateNested } from 'class-validator';
import { PaginateRequest } from '../../paginate/paginate-request';
import { Type } from 'class-transformer';

class FiltersBookDto {
  @IsOptional()
  title: string;

  @IsOptional()
  genre: string;

  @IsOptional()
  description: string;

  @IsOptional()
  author: string;
}

export class BodyBookRequestDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => FiltersBookDto)
  filters: FiltersBookDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PaginateRequest)
  paginate: PaginateRequest;
}
