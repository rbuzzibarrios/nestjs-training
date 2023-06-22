import { IsOptional, IsNumberString } from 'class-validator';
export class PaginateRequest {
  @IsOptional()
  @IsNumberString()
  page: 1;

  @IsOptional()
  @IsNumberString()
  perPage: 10;

  @IsOptional()
  column: string;

  @IsOptional()
  order: 'ASC' | 'DESC';
}
