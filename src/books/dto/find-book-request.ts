import { Exists } from '../../exists/exists.decorator';

export class FindBookRequest {
  @Exists('Book', 'id')
  id: number | string;
}
