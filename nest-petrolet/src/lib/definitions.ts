import { IsNotEmpty } from 'class-validator';

export class FilterParams {
  @IsNotEmpty({ message: 'please provide a non empty query value' })
  q: string;
}
