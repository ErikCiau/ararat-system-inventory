import { IsInt, IsUUID } from 'class-validator';

export class CreateVariantDto {
  @IsUUID()
  product: string;
  @IsInt()
  quantity: number;
  @IsInt()
  type: number;
  @IsInt()
  size: number;
}
