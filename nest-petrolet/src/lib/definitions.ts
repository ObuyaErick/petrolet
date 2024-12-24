import { IsNotEmpty } from 'class-validator';

export class FilterParams {
  @IsNotEmpty({ message: 'please provide a non empty query value' })
  q: string;
}

export type OrderCriteria = 'asc' | 'desc';

export interface OrderBy {
  key: string;
  order?: OrderCriteria;
}
