import { IsOptional, IsPositive } from 'class-validator';

export class PaginateRequest {
  @IsOptional()
  orderBy?: {
    column?: string;
    order?: 'ASC' | 'DESC';
  };

  @IsOptional()
  @IsPositive()
  page?: 1;

  perPage?: 10;
}
