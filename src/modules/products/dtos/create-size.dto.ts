import { IsString } from 'class-validator';

export class CreateSizeDto {
  @IsString()
  value: string;
}
