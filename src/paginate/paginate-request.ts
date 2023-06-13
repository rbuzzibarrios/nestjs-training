import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderByRequest {
  @IsNotEmpty()
  column: string;

  @IsNotEmpty()
  order: 'ASC' | 'DESC';
}

export class PaginateRequest {
  @IsOptional()
  @ValidateNested()
  @Type(() => OrderByRequest)
  orderBy: OrderByRequest;

  @IsOptional()
  @IsPositive()
  page: 1;

  @IsOptional()
  @IsPositive()
  perPage: 10;
}
