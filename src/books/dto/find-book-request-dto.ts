import { Exists } from '../../exists/exists.decorator';

export class FindBookRequestDto {
  @Exists('Book', 'id')
  id: number | string;
}
